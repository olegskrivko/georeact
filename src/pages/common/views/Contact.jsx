import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LocationOn as LocationOnIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  X as XIcon,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CardContent,
  CardMedia,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Link as MuiLink,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';

import ImgFeedback from '../../../assets/images/contact/customer_feedback_amico_blue.svg';
import ImgSocialMedia from '../../../assets/images/contact/mobile_marketing_cuate_blue.svg';
import { SUBJECT_CHOICES } from '../../../constants/Choices';
import {
  CITY,
  COUNTRY,
  EMAIL,
  FACEBOOK,
  INSTAGRAM,
  PHONE_CODE,
  PHONE_NUMBER,
  X,
  YOUTUBE,
} from '../../../constants/config';
import { useAuth } from '../../../contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Contact = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [subject, setSubject] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
    }
  }, [user]);

  const validate = () => {
    const tempErrors = {};

    if (!name.trim()) {
      tempErrors.name = 'Please enter your name.';
    }
    if (!email) {
      tempErrors.email = 'Please enter your email.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }
    if (!message.trim()) {
      tempErrors.message = 'Message cannot be empty.';
    } else if (message.length < 3) {
      tempErrors.message = 'Message must be at least 3 characters long.';
    } else if (message.length > 500) {
      tempErrors.message = 'Message cannot be longer than 500 characters.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const showAlert = (message, severity = 'success') => {
    setAlert({ show: true, message, severity });
    setTimeout(() => setAlert({ show: false, message: '', severity: 'success' }), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    if (!validate()) {
      showAlert('Please fill in all required fields.', 'error');
      toast.error('Please log in to send a message.');
      return;
    }

    setLoading(true);
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        showAlert('Please log in to send a message.', 'error');
        toast.error('Please log in to send a message.');
        navigate('/login');
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/feedbacks/`,
        {
          subject: parseInt(subject),
          name,
          email,
          message,
          user: user.userId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.status === 201) {
        showAlert('Message sent successfully!');
        toast.success('Message sent successfully!');
        setSubject(5);
        setName('');
        setEmail('');
        setMessage('');
        setErrors({});
      }
    } catch (error) {
      console.error('Contact error:', error);

      if (error.response?.status === 429) {
        showAlert('Please wait before sending the next message. You can send a message again after 1 minute.', 'error');
      } else if (error.response?.status === 401) {
        showAlert('Please log in to send a message.', 'error');
        navigate('/login');
      } else if (error.response?.data) {
        const backendErrors = error.response.data;
        if (typeof backendErrors === 'object') {
          const newErrors = {};
          Object.keys(backendErrors).forEach((key) => {
            if (Array.isArray(backendErrors[key])) {
              newErrors[key] = backendErrors[key][0];
            } else {
              newErrors[key] = backendErrors[key];
            }
          });
          setErrors(newErrors);
          showAlert('Please fix the indicated errors.', 'error');
        } else {
          showAlert(backendErrors.detail || 'An error occurred. Please try again later.', 'error');
        }
      } else {
        showAlert('An error occurred. Please try again later.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLocationClick = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${COUNTRY}, ${CITY}`,
    )}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <Container maxWidth="lg" disableGutters>
      {/* SEO META TAGS */}
      <Helmet>
        <title>Contact - Pet Search Platform</title>
        <meta name="description" content="Get in touch with our pet search team." />
        <meta name="keywords" content="contact, pet support, help" />
      </Helmet>

      <ToastContainer position="top-right" autoClose={3000} />
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
        Contact
      </Typography>
      <Grid container spacing={6} alignItems="center" sx={{ mb: 8 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <CardMedia
              component="img"
              src={ImgSocialMedia}
              alt="Contact illustration"
              sx={{
                width: { xs: '70%', sm: '80%', md: '90%', lg: '100%' },
                objectFit: 'contain',
                userSelect: 'none',
                pointerEvents: 'none',
                borderRadius: 2,
                mb: 1,
              }}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
            <Typography
              variant="h4"
              align="left"
              sx={{ fontWeight: 500, color: '#16477c', mb: 2, fontSize: { xs: '1.8rem', sm: '2rem' } }}
            >
              Any Questions?
            </Typography>
            <Typography gutterBottom variant="body1" sx={{ mb: 2 }}>
              If you have questions, suggestions, or simply want to get in touch with us — fill out the form below, and
              we'll be happy to respond.
            </Typography>
            <Typography gutterBottom variant="body1" sx={{ mb: 2 }}>
              We're happy to hear your opinion! Do you have an idea, suggestion, or have you noticed an error? Please
              fill out the form below, and we'll get in touch with you if needed.
            </Typography>
            <Typography gutterBottom variant="body1" sx={{ mb: 2 }}>
              Your feedback helps us improve the information and services we provide. Whether you want to learn more,
              propose collaboration, or simply share your experience — your opinion is important to us.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={6} alignItems="center">
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, sm: 3, md: 3 },
              borderRadius: 4,
              background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                fontWeight: 600,
                color: '#16477c',
                textAlign: 'center',
              }}
            >
              Contact Us
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
              }}
            >
              {alert.show && (
                <Alert severity={alert.severity} sx={{ mb: 2 }}>
                  {alert.message}
                </Alert>
              )}

              <FormControl fullWidth>
                <InputLabel id="subject-label">Subject</InputLabel>
                <Select
                  labelId="subject-label"
                  value={subject}
                  label="Subject"
                  onChange={(e) => setSubject(e.target.value)}
                  error={!!errors.subject}
                >
                  {SUBJECT_CHOICES.map((choice) => (
                    <MenuItem key={choice.value} value={choice.value}>
                      {choice.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Your Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#00b5ad',
                    },
                  },
                }}
              />
              <TextField
                label="Your Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#00b5ad',
                    },
                  },
                }}
              />
              <TextField
                label="Your Message"
                multiline
                rows={4}
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                error={!!errors.message}
                helperText={errors.message}
                inputProps={{ maxLength: 500 }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#00b5ad',
                    },
                  },
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1,
                  mt: 1,
                }}
              >
                <Checkbox
                  required={!!user}
                  sx={{
                    color: '#00b5ad',
                    '&.Mui-checked': {
                      color: '#00b5ad',
                    },
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  I confirm that I have read the{' '}
                  <MuiLink
                    href="policies"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: '#00b5ad',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    privacy policy
                  </MuiLink>
                  . Data is processed to respond to the request.
                </Typography>
              </Box>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 2,
                  py: 1,
                  background: 'linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)',
                }}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {loading ? 'Sending...' : user ? 'Send Message' : 'Login to Send Message'}
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <CardMedia
              component="img"
              src={ImgFeedback}
              alt="Contact illustration"
              sx={{
                width: { xs: '70%', sm: '80%', md: '90%', lg: '100%' },
                objectFit: 'contain',
                userSelect: 'none',
                pointerEvents: 'none',
                borderRadius: 2,
                mb: 1,
              }}
            />
          </Box>
        </Grid>
      </Grid>

      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: 500, color: '#16477c', mt: 8, mb: 4, mb: 5, fontSize: { xs: '1.8rem', sm: '2rem' } }}
      >
        Contact Information
      </Typography>
      <Grid container spacing={3} style={{ marginTop: '1rem', marginBottom: '3rem' }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} textAlign="center">
          <CardContent
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <MailIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />

            <div>
              <Typography
                variant="h6"
                style={{
                  marginBottom: '0.5rem',
                  textAlign: 'center',
                  color: '#00b5ad',
                  fontFamily: 'Titillium Web, sans-serif',
                }}
              >
                <MuiLink variant="body1" href={`mailto:${EMAIL}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                  {EMAIL}
                </MuiLink>
              </Typography>
              <Typography
                variant="body2"
                style={{
                  textAlign: 'center',
                  color: '#616f7d',
                  fontFamily: 'Titillium Web, sans-serif',
                }}
              >
                Questions, feedback, or collaboration? Write to us!
              </Typography>
            </div>
          </CardContent>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} textAlign="center">
          <CardContent
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <PhoneIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />

            <div>
              <Typography
                variant="h6"
                style={{
                  marginBottom: '0.5rem',
                  textAlign: 'center',
                  color: '#00b5ad',
                  fontFamily: 'Titillium Web, sans-serif',
                }}
              >
                <MuiLink
                  variant="body1"
                  href={`tel:${PHONE_CODE}${PHONE_NUMBER}`}
                  sx={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {`${PHONE_CODE} ${PHONE_NUMBER}`}
                </MuiLink>
              </Typography>
              <Typography
                variant="body2"
                style={{
                  textAlign: 'center',
                  color: '#616f7d',
                  fontFamily: 'Titillium Web, sans-serif',
                }}
              >
                Call us during business hours – we're always ready to help.
              </Typography>
            </div>
          </CardContent>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} textAlign="center">
          <CardContent
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <LocationOnIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />
            <div>
              <Typography
                variant="h6"
                style={{
                  marginBottom: '0.5rem',
                  textAlign: 'center',
                  color: '#00b5ad',
                  fontFamily: 'Titillium Web, sans-serif',
                }}
              >
                <MuiLink
                  variant="body1"
                  href="#"
                  onClick={handleLocationClick}
                  sx={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {`${COUNTRY}, ${CITY}`}
                </MuiLink>
              </Typography>

              <Typography
                variant="body2"
                style={{
                  textAlign: 'center',
                  color: '#616f7d',
                  fontFamily: 'Titillium Web, sans-serif',
                }}
              >
                We are located in this region, but we're always ready to help remotely!
              </Typography>
            </div>
          </CardContent>
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent="center">
        <Grid size={{ xs: 12 }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: 500, color: '#16477c', mt: 8, mb: 4, fontSize: { xs: '1.8rem', sm: '2rem' } }}
          >
            Follow Us on Social Media
          </Typography>

          <Typography variant="body1" align="center" sx={{ maxWidth: 700, mx: 'auto', mb: 3, color: '#555' }}>
            We share useful tips, latest news, collaborations, and stories about lost pets. Join us on Facebook and
            Instagram to always stay in the loop.
          </Typography>
        </Grid>

        <Grid container spacing={2} justifyContent="center">
          {[
            {
              href: FACEBOOK,
              icon: <FacebookIcon fontSize="large" />,
              color: '#16477c',
            },
            {
              href: INSTAGRAM,
              icon: <InstagramIcon fontSize="large" />,
              color: '#16477c',
            },
            {
              href: YOUTUBE,
              icon: <YouTubeIcon fontSize="large" />,
              color: '#16477c',
            },
            { href: X, icon: <XIcon fontSize="large" />, color: '#16477c' },
          ].map(({ href, icon, color }, index) => (
            <Grid item key={index}>
              <MuiLink href={href} target="_blank" rel="noopener" underline="none">
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: color,
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: '#3498db',
                    },
                  }}
                >
                  {icon}
                </Box>
              </MuiLink>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
