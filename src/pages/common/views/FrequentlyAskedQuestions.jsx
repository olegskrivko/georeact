import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// adjust path
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
  IconButton,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

import { LanguageContext } from '../../../contexts/LanguageContext';
import api from '../../../utils/api';

// <- use the axios instance with Accept-Language interceptor
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const FrequentlyAskedQuestions = () => {
  const { t } = useTranslation('faq');
  const { selectedLanguage } = useContext(LanguageContext); // watch this
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const cardTextSecondary = theme.palette.text.secondary;

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchFAQs = async () => {
      setLoading(true);
      try {
        console.log('Fetching FAQs for language:', selectedLanguage);
        const response = await api.get('/api/core/faqs/');
        console.log('Response data:', response.data);
        console.log('Request headers:', response.config.headers);
        setFaqs(response.data);
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setError('Failed to load FAQs.');
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, [selectedLanguage]); // ✅ refetch whenever language changes
  // useEffect(() => {
  //   const fetchFAQs = async () => {
  //     try {
  //       console.log('Fetching FAQs from API with base URL:', api.defaults.baseURL);
  //       const response = await api.get('/api/core/faqs/');
  //       console.log('Response data:', response.data);
  //       console.log('Request headers:', response.config.headers);
  //       setFaqs(response.data);
  //     } catch (err) {
  //       console.error('Error fetching FAQs:', err);
  //       setError('Failed to load FAQs.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchFAQs();
  // }, []);

  // useEffect(() => {
  //   const fetchFAQs = async () => {
  //     try {
  //       const response = await axios.get(`${API_BASE_URL}/api/core/faqs/`);
  //       setFaqs(response.data);
  //     } catch (err) {
  //       console.error('Error fetching FAQs:', err);
  //       setError('Failed to load FAQs.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchFAQs();
  // }, []);

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
          mt: { xs: 4, sm: 3, md: 2, lg: 1 },
          color: theme.palette.text.secondary,
        }}
      >
        {t('heading.h1')}
      </Typography>
      <Grid container spacing={3}>
        {faqs.map((faq, index) => (
          <Grid size={{ xs: 12 }} key={index}>
            <Accordion
              sx={{
                py: 1,
                borderRadius: 3,
                background: cardBg,
                color: cardText,
                transition: 'transform 0.2s ease',
                boxShadow: '0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`faq-${index}-content`}
                id={`faq-${index}-header`}
              >
                <Box display="flex" alignItems="center">
                  {/* <Box
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
                  > */}
                  <IconButton
                    sx={{
                      mr: 2,
                      color: 'primary.main',
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.2)',
                      },
                    }}
                  >
                    <TipsAndUpdatesIcon />
                  </IconButton>
                  {/* </Box> */}
                  <Typography variant="h6" sx={{ fontWeight: 500, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    {faq.question}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body1"
                  sx={{
                    color: cardTextSecondary,
                    fontWeight: 400,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    lineHeight: 1.6,
                  }}
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
