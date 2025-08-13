import { useEffect, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const FrequentlyAskedQuestions = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/core/faqs/`);
        setFaqs(response.data);
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setError('Failed to load FAQs.');
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center" mt={4}>
          {error}
        </Typography>
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
        Frequently Asked Questions
      </Typography>
      <Grid container spacing={3}>
        {faqs.map((faq, index) => (
          <Grid size={{ xs: 12 }} key={index}>
            <Accordion
              sx={{
                py: 1,
                borderRadius: 3,
                background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
                '&:hover': {
                  boxShadow: '0px 3px 10px rgba(0,0,0,0.1)',
                  transform: 'scale(1.01)',
                  background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`faq-${index}-content`}
                id={`faq-${index}-header`}
              >
                <Box display="flex" alignItems="center">
                  <Box
                    component="span"
                    sx={{
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f7f9fd',
                      borderRadius: '50%',
                      width: 32,
                      height: 32,
                      color: 'primary.main',
                    }}
                  >
                    <TipsAndUpdatesIcon fontSize="small" />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: '#16477c', fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  >
                    {faq.question}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body1"
                  sx={{ color: '#444', fontSize: { xs: '0.9rem', sm: '1rem' }, lineHeight: 1.6 }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FrequentlyAskedQuestions;
