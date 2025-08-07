// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
// import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Grid, Typography } from '@mui/material';
// const FrequentlyAskedQuestions = () => {
//   const steps = [
//     {
//       question: 'What is the difference between "Seen" and "Found"?',
//       answer:
//         '"Seen" means someone has spotted the pet but hasn\'t caught it. "Found" indicates that the animal is with the finder.',
//     },
//     {
//       question: 'What helps find lost pets?',
//       answer:
//         'The community is the main driving force – people who share, report sightings, or take in animals. Our platform connects finders with owners.',
//     },
//     {
//       question: 'How can I report a found pet?',
//       answer: 'Simply sign up and post a found report with a photo, location, and description.',
//     },
//     {
//       question: "What should I do if I see a pet but can't catch it?",
//       answer:
//         'Use the "Seen" function and post information with a description, time, and location. This can be very helpful for owners!',
//     },
//     {
//       question: 'Can I use the platform from my mobile phone?',
//       answer:
//         'Yes! Our website is fully adapted for mobile devices. You can add posts, search for pets, and contact finders anywhere.',
//     },
//     {
//       question: 'How long does my post remain active?',
//       answer: 'The post remains active until you remove it or mark it as "found" / "returned to owner".',
//     },
//     {
//       question: 'Are there any safety tips when meeting a finder or owner?',
//       answer:
//         'Always meet in public places when possible. If you feel unsafe, bring a friend or choose a veterinary clinic as a meeting place.',
//     },
//     {
//       question: 'Can I add other animals, not just dogs or cats?',
//       answer:
//         'Yes, of course! Although the platform is more oriented towards dogs and cats, you can also add other animals by selecting the species "Other".',
//     },
//     {
//       question: 'Can I offer a reward for finding my pet?',
//       answer:
//         "We don't encourage offering rewards as it can create unexpected situations. The community often helps from the heart – the main goal is to safely return the pet home.",
//     },
//   ];
//   return (
//     <Container maxWidth="lg" disableGutters>
//       <Typography
//         variant="h4"
//         align="center"
//         sx={{
//           mb: 5,
//           fontWeight: 800,
//           background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
//           WebkitBackgroundClip: 'text',
//           WebkitTextFillColor: 'transparent',
//         }}
//       >
//         Frequently Asked Questions
//       </Typography>
//       <Grid container spacing={3}>
//         {steps.map((step, index) => (
//           <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} key={index}>
//             <Accordion
//               sx={{
//                 py: 1,
//                 borderRadius: 3,
//                 background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s ease-in-out',
//                 '&:hover': {
//                   boxShadow: '0px 3px 10px rgba(0,0,0,0.1)',
//                   transform: 'scale(1.01)',
//                   background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
//                 },
//               }}
//             >
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls={`panel-${index}-content`}
//                 id={`panel-${index}-header`}
//               >
//                 <Box display="flex" alignItems="center">
//                   <Box
//                     component="span"
//                     sx={{
//                       mr: 2,
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       backgroundColor: '#f7f9fd',
//                       borderRadius: '50%',
//                       width: 32,
//                       height: 32,
//                       color: 'primary.main',
//                     }}
//                   >
//                     <TipsAndUpdatesIcon fontSize="small" />
//                   </Box>
//                   <Typography
//                     variant="h6"
//                     sx={{ fontWeight: 600, color: '#16477c', fontSize: { xs: '0.9rem', sm: '1rem' } }}
//                   >
//                     {step.question}
//                   </Typography>
//                 </Box>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography
//                   variant="body1"
//                   sx={{ color: '#444', fontSize: { xs: '0.9rem', sm: '1rem' }, lineHeight: 1.6 }}
//                 >
//                   {step.answer}
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };
// export default FrequentlyAskedQuestions;
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
