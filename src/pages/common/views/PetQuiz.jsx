import React, { useState } from 'react';

import PetsIcon from '@mui/icons-material/Pets';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const questions = [
  {
    question: 'How much space do you have for a pet?',
    options: [
      { answer: 'Small apartment', scores: { cat: 2, dog: -1 } },
      { answer: 'Medium-sized house', scores: { cat: 1, dog: 1 } },
      { answer: 'Large house with a yard', scores: { dog: 2, cat: 0 } },
    ],
  },
  {
    question: 'How active are you in your daily life?',
    options: [
      { answer: 'Very active, love sports', scores: { dog: 2, cat: -1 } },
      { answer: 'Moderately active', scores: { dog: 1, cat: 1 } },
      {
        answer: 'Not very active, prefer a calm life',
        scores: { cat: 2, dog: -1 },
      },
    ],
  },
  {
    question: 'How much time can you dedicate to pet care?',
    options: [
      { answer: 'A lot of free time', scores: { dog: 2, cat: 1 } },
      { answer: 'Sometimes free time', scores: { cat: 2, dog: 0 } },
      { answer: 'Very little time', scores: { none: 2, dog: -1, cat: -1 } },
    ],
  },
  {
    question: 'Do you have children at home?',
    options: [
      { answer: 'Yes, small children', scores: { dog: 2, cat: -1 } },
      { answer: 'Yes, older children', scores: { dog: 1, cat: 1 } },
      { answer: 'No children', scores: { cat: 2, dog: 0 } },
    ],
  },
  {
    question: 'How often are you away from home?',
    options: [
      { answer: 'Rarely, mostly at home', scores: { dog: 2, cat: 1 } },
      { answer: 'Sometimes', scores: { cat: 2, dog: 0 } },
      {
        answer: 'Often away or traveling',
        scores: { none: 2, dog: -1, cat: -1 },
      },
    ],
  },
  {
    question: 'What kind of environment do you prefer at home?',
    options: [
      { answer: 'Lively, noisy, active', scores: { dog: 2, cat: -1 } },
      { answer: 'Balanced', scores: { dog: 1, cat: 1 } },
      { answer: 'Quiet and peaceful', scores: { cat: 2, dog: 0 } },
    ],
  },
  {
    question: 'Do you or anyone in your household have allergies?',
    options: [
      {
        answer: 'Yes, sensitive to fur',
        scores: { none: 2, cat: -1, dog: -1 },
      },
      { answer: 'No allergies', scores: { dog: 1, cat: 1 } },
    ],
  },
  {
    question: 'How independent do you want your pet to be?',
    options: [
      { answer: 'Very independent', scores: { cat: 2, dog: -1 } },
      { answer: 'Balanced', scores: { dog: 1, cat: 1 } },
      { answer: 'Needs a lot of attention', scores: { dog: 2, cat: 0 } },
    ],
  },
  {
    question: 'What is your monthly budget for a pet?',
    options: [
      { answer: 'Low (up to €50)', scores: { cat: 2, dog: -1 } },
      { answer: 'Medium (€50–100)', scores: { dog: 1, cat: 1 } },
      { answer: 'High (more than €100)', scores: { dog: 2, cat: 1 } },
    ],
  },
];
const PetQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [aiRecommendation, setAiRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnswer = (selectedOption) => {
    console.log('Selected answer:', selectedOption.answer);
    setSelectedAnswers([...selectedAnswers, selectedOption.answer]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log('All questions answered, sending to API...');
      console.log('Final answers:', selectedAnswers);
      sendAnswersToAPI();
    }
  };

  const formatRecommendation = (data) => {
    if (!data || !data.pet) return null;

    const { pet } = data;
    return {
      type: pet.type,
      description: pet.description,
      characteristics: {
        size: pet.characteristics.size,
        energyLevel: pet.characteristics['energy level'],
        socialBehavior: pet.characteristics['social behavior'],
      },
      likes: pet.likes.general,
      dislikes: pet.dislikes.general,
      whyThisPet: pet.whyThisPet,
    };
  };

  const sendAnswersToAPI = async () => {
    console.log('Starting API call...');
    const token = localStorage.getItem('access_token');
    console.log('Token:', token);

    if (!token) {
      console.log('No token found');
      setError('Please log in to get pet recommendations');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Making API request to:', `${API_BASE_URL}/api/chatbot/pet-recommendation/`);
      console.log('Request payload:', { answers: selectedAnswers });

      const response = await axios.post(
        `${API_BASE_URL}/api/chatbot/pet-recommendation/`,
        { answers: selectedAnswers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('=== Debug Frontend Response ===');
      console.log('Full response:', response);
      console.log('Response data:', response.data);
      console.log('Response data type:', typeof response.data);
      console.log('Response data keys:', Object.keys(response.data));
      console.log('Pet data:', response.data.pet);
      console.log('=============================');

      if (!response.data || !response.data.pet) {
        console.error('Invalid response format:', response.data);
        setError('Received invalid response from server');
        return;
      }

      setAiRecommendation(response.data.pet);
      console.log('AI recommendation set to state:', response.data.pet);
    } catch (error) {
      console.error('=== Debug Error ===');
      console.error('Error object:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      console.error('Error details:', error.response?.data);
      console.error('===================');

      if (error.response?.status === 401) {
        setError('Your session has expired. Please log in again.');
      } else {
        setError('Failed to get recommendation. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers([]);
    setCurrentQuestion(0);
    setAiRecommendation(null);
    setError(null);
  };

  if (isLoading) {
    return (
      <Container component="main" maxWidth="lg" sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6">Getting your pet recommendation...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" disableGutters>
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 5,
          fontWeight: 800,
          background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Pet Selection Quiz with AI
      </Typography>
      {error && (
        <Box
          sx={{
            mb: 2,
            p: 2,
            bgcolor: 'error.light',
            color: 'error.contrastText',
            borderRadius: 1,
          }}
        >
          {error}
        </Box>
      )}
      {!aiRecommendation ? (
        <Box>
          <LinearProgress variant="determinate" value={(currentQuestion / questions.length) * 100} sx={{ mb: 4 }} />
          <Typography variant="h5" align="center" sx={{ mt: 8, mb: 4, fontWeight: 500, color: '#16477c' }}>
            {questions[currentQuestion].question}
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {questions[currentQuestion].options.map((option, index) => (
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} key={index}>
                <Card
                  onClick={() => handleAnswer(option)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAnswer(option)}
                  role="button"
                  tabIndex={0}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
                    boxShadow: '0px 3px 10px rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: '0px 6px 20px rgba(0,0,0,0.1)',
                      transform: 'scale(1.01)',
                      background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton color="primary" sx={{ backgroundColor: '#f7f9fd' }}>
                      <PetsIcon />
                    </IconButton>
                    <Typography variant="body1" color="textSecondary" sx={{ ml: 2 }}>
                      {option.answer}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box>
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ color: 'primary.main' }}>
              {aiRecommendation.type.charAt(0).toUpperCase() + aiRecommendation.type.slice(1)}
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 3 }}>
              {aiRecommendation.description}
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              Characteristics
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" color="text.secondary">
                  Size
                </Typography>
                <Typography variant="body1">{aiRecommendation.characteristics.size}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" color="text.secondary">
                  Energy Level
                </Typography>
                <Typography variant="body1">{aiRecommendation.characteristics.energyLevel}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" color="text.secondary">
                  Social Behavior
                </Typography>
                <Typography variant="body1">{aiRecommendation.characteristics.socialBehavior}</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 3 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                  Likes
                </Typography>
                <Typography variant="body1">{aiRecommendation.likes.general || aiRecommendation.likes}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                  Dislikes
                </Typography>
                <Typography variant="body1">{aiRecommendation.dislikes.general || aiRecommendation.dislikes}</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              Why This Pet?
            </Typography>
            <Typography variant="body1" paragraph>
              {aiRecommendation.whyThisPet}
            </Typography>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                onClick={resetQuiz}
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  background: 'linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)',
                }}
              >
                Try Again
              </Button>
            </Box>
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default PetQuiz;
