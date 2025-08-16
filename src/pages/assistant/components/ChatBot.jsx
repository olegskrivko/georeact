import { useEffect, useRef, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, Chip, CircularProgress, Paper, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Lottie from 'lottie-react';

import AIRobot from '../../../assets/Animation-1749072232400.json';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ChatBot = () => {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const cardBody = theme.palette.custom.navbar;
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const bottomRef = useRef(null);

  const avatar = AIRobot;

  const predefinedQuestions = [
    'How should I care for a sick parrot?',
    'What food is best for a kitten?',
    'How to train a new puppy?',
  ];

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChipClick = async (question) => {
    if (loading) return;

    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setNotLoggedIn(true);
      return;
    }

    setNotLoggedIn(false);
    setMessages((prev) => [...prev, { text: question, isUser: true }]);
    await sendMessageToBackend(question);
  };

  const handleMessageSend = async () => {
    if (!inputText.trim() || loading) return;

    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setNotLoggedIn(true);
      return;
    }

    setNotLoggedIn(false);
    setMessages((prev) => [...prev, { text: inputText, isUser: true }]);
    const messageToSend = inputText;
    setInputText('');
    await sendMessageToBackend(messageToSend);
  };

  const sendMessageToBackend = async (message) => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        setNotLoggedIn(true);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/assistant/chatbot/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.reply || 'Server error');
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          text: data.reply || 'Sorry, I didn’t understand your question.',
          isUser: false,
        },
      ]);
    } catch (error) {
      console.error('ChatBot error:', error.message);
      setMessages((prev) => [...prev, { text: error.message || 'Something went wrong.', isUser: false }]);
    } finally {
      setLoading(false);
    }
  };

  const toggleChat = () => setChatOpen((prev) => !prev);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-3px); }
        75% { transform: translateX(3px); }
      }
    `;
    document.head.appendChild(style);

    const timer = setTimeout(() => setShowSpeechBubble(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box>
      {!chatOpen && showSpeechBubble && (
        <Typography
          variant="caption"
          style={{
            position: 'fixed',
            bottom: 100,
            right: 110,
            backgroundColor: '#fff',
            padding: '4px 10px',
            borderRadius: '10px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            fontSize: '12px',
            zIndex: 999,
            color: '#000',
          }}
        >
          Hello! How can I help you?
        </Typography>
      )}

      {!chatOpen && (
        <Button
          onClick={toggleChat}
          style={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            backgroundColor: 'transparent',
            boxShadow: 'none',
            borderRadius: '50%',
            width: '70px',
            height: '70px',
            color: '#fff',
            animation: 'shake 0.5s ease-in-out 1s 3',
            zIndex: 9999,
          }}
        >
          <Box sx={{ width: 180, height: 180, marginRight: '30px' }}>
            <Lottie animationData={avatar} loop autoplay style={{ width: '70px', height: '70px' }} />
          </Box>
        </Button>
      )}

      {chatOpen && (
        <Box
          style={{
            position: 'fixed',
            bottom: isFullscreen ? 0 : 16,
            right: isFullscreen ? 0 : 16,
            width: isFullscreen ? '100vw' : '300px',
            height: isFullscreen ? '100vh' : '400px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff',
            borderRadius: isFullscreen ? 0 : '12px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 9999,
            transition: 'all 0.3s ease',
          }}
        >
          <Box
            style={{
              background: 'linear-gradient(to right, rgba(0,150,136,0.7), rgba(63,81,181,0.7))',
              color: '#fff',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTopLeftRadius: isFullscreen ? 0 : '12px',
              borderTopRightRadius: isFullscreen ? 0 : '12px',
              // background: cardBg,
            }}
          >
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Box style={{ width: '50px', height: '50px' }}>
                <Lottie animationData={avatar} loop autoplay />
              </Box>
              <Typography marginLeft={1} variant="body1">
                AI Assistant
              </Typography>
            </Box>
            <Box>
              <Button onClick={() => setIsFullscreen((prev) => !prev)} style={{ color: '#fff' }}>
                {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </Button>
              <Button onClick={toggleChat} style={{ color: '#fff' }}>
                <CloseIcon />
              </Button>
            </Box>
          </Box>

          <Box style={{ padding: '10px', flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {messages.map((message, index) => (
              <Box
                key={index}
                style={{
                  display: 'flex',
                  marginBottom: '10px',
                  justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                }}
              >
                {!message.isUser && (
                  <Box style={{ width: '60px', height: '60px', marginRight: 10 }}>
                    <Lottie animationData={avatar} loop autoplay />
                  </Box>
                )}
                <Paper
                  style={{
                    maxWidth: '70%',
                    padding: '10px',
                    borderRadius: '12px',
                    backgroundColor: message.isUser ? '#0EB9F0' : '#f1f1f1',
                    color: message.isUser ? '#fff' : '#000',
                  }}
                >
                  {message.text && <Typography>{message.text}</Typography>}

                  {message.pets && Array.isArray(message.pets) && (
                    <Box mt={1}>
                      {message.pets.map((pet, i) => (
                        <a
                          key={i}
                          href={pet.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <Box
                            mb={1}
                            p={1}
                            style={{ border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer' }}
                          >
                            <Typography variant="subtitle2">{pet.name || 'Unknown name'}</Typography>
                            <Typography variant="body2">{`${pet.status_display || ''} ${pet.species_display || ''}`}</Typography>
                            {pet.image && (
                              <img
                                src={pet.image}
                                alt={pet.name || 'Pet'}
                                style={{ width: '100%', borderRadius: '6px', marginTop: '6px' }}
                              />
                            )}
                          </Box>
                        </a>
                      ))}
                    </Box>
                  )}
                </Paper>
              </Box>
            ))}
            <div ref={bottomRef} />
            <Box style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
              {predefinedQuestions.map((question, index) => (
                <Chip
                  key={index}
                  label={question}
                  onClick={() => handleChipClick(question)}
                  disabled={loading}
                  style={{
                    cursor: loading ? 'not-allowed' : 'pointer',
                    background: '#e3f2fd',
                  }}
                />
              ))}
            </Box>
          </Box>

          {notLoggedIn && (
            <Typography
              variant="caption"
              color="error"
              style={{
                padding: '0 10px 6px',
                fontSize: '12px',
              }}
            >
              To use the chatbot, you need to be logged in.
            </Typography>
          )}

          <Box
            style={{
              display: 'flex',
              padding: '10px',
              backgroundColor: '#f7f7f7',
              borderBottomLeftRadius: isFullscreen ? 0 : '12px',
              borderBottomRightRadius: isFullscreen ? 0 : '12px',
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !loading) {
                  e.preventDefault();
                  handleMessageSend();
                }
              }}
            />
            <Button
              onClick={handleMessageSend}
              color="primary"
              disabled={loading || inputText.trim() === ''}
              style={{ marginLeft: '10px', minWidth: '64px' }}
            >
              {loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatBot;
