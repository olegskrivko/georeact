import { Helmet } from 'react-helmet-async';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';

const trainingTips = [
  {
    key: 'basicCommands',
    src: 'https://www.youtube.com/embed/NFSkzAuCjcI',
  },
  {
    key: 'positiveReinforcement',
    src: 'https://www.youtube.com/embed/VJczka-U0D8',
  },
  {
    key: 'consistency',
    src: 'https://www.youtube.com/embed/Ya72yz1X40g',
  },
  {
    key: 'shortSessions',
    src: 'https://www.youtube.com/embed/CUbZ6refFKA',
  },
  {
    key: 'patience',
    src: 'https://www.youtube.com/embed/jnKxnUvlZcU',
  },
  {
    key: 'breedUnderstanding',
    src: 'https://www.youtube.com/embed/7qW2OU8n9ZM',
  },
  {
    key: 'socialization',
    src: 'https://www.youtube.com/embed/NFSkzAuCjcI',
  },
  {
    key: 'professionalHelp',
    src: 'https://www.youtube.com/embed/VJczka-U0D8',
  },
  {
    key: 'stayCalm',
    src: 'https://www.youtube.com/embed/Ya72yz1X40g',
  },
  {
    key: 'enjoyProcess',
    src: 'https://www.youtube.com/embed/CUbZ6refFKA',
  },
];

const videos = [
  {
    key: 'sitAndLie',
    src: 'https://www.youtube.com/embed/NFSkzAuCjcI',
  },
  {
    key: 'noseTargeting',
    src: 'https://www.youtube.com/embed/VJczka-U0D8',
  },
  {
    key: 'looseLeash',
    src: 'https://www.youtube.com/embed/Ya72yz1X40g',
  },
  {
    key: 'comeBack',
    src: 'https://www.youtube.com/embed/CUbZ6refFKA',
  },
  {
    key: 'wait',
    src: 'https://www.youtube.com/embed/jnKxnUvlZcU',
  },
  {
    key: 'tricksAndGames',
    src: 'https://www.youtube.com/embed/7qW2OU8n9ZM',
  },
];

const PetTraining = () => {
  // English video titles from petTraining.json
  const videoTitles = {
    sitAndLie: 'Command - Sit and Lie Down (ENG)',
    noseTargeting: 'Nose Targeting (ENG)',
    looseLeash: 'Walking with Loose Leash (ENG)',
    comeBack: 'Command - Come Back (ENG)',
    wait: 'Command - Wait (ENG)',
    tricksAndGames: 'Tricks and Games (ENG)',
  };
  const videoSource = 'Source: RSPCA South Australia';

  const trainingTipsContent = {
    basicCommands: {
      title: 'Start with Basic Commands',
      description:
        'Start with basic commands such as sit, stay, and come. These provide the foundation for further training and help strengthen your role as a leader.',
    },
    positiveReinforcement: {
      title: 'Use Positive Reinforcement',
      description:
        'Reward your pet with treats, praise, or play when it exhibits desired behavior. Positive reinforcement encourages the repetition of this behavior.',
    },
    consistency: {
      title: 'Be Consistent',
      description:
        'Consistency is the key to successful training. Consistently use the same cues and rewards so your pet understands what is expected of them.',
    },
    shortSessions: {
      title: 'Keep Training Sessions Short and Positive',
      description:
        'Pets have a short attention span, so keep training sessions short (about 10-15 minutes) and positive. End on a positive note so they maintain interest and look forward to the next session.',
    },
    patience: {
      title: 'Patience is Essential',
      description:
        'Understand that training takes time and patience. Avoid frustration if progress is slow. Each pet learns at their own pace.',
    },
    breedUnderstanding: {
      title: "Understand Your Pet's Breed and Personality",
      description:
        "Different breeds have different temperaments and behaviors. Adapt your training approach to match your pet's specific needs and personality.",
    },
    socialization: {
      title: 'Socialization is Key',
      description:
        'From an early age, introduce your pet to different environments, people, and animals. Proper socialization helps prevent behavioral problems and builds confidence.',
    },
    professionalHelp: {
      title: 'Seek Professional Help When Needed',
      description:
        "If you have difficulty with training or encounter behavioral problems, don't hesitate to seek help from a professional trainer or behavior specialist.",
    },
    stayCalm: {
      title: 'Stay Calm and Positive',
      description:
        'Pets can sense your emotions, so maintain calmness and patience during training. Your positive attitude will help create a positive learning environment.',
    },
    enjoyProcess: {
      title: 'Enjoy the Process',
      description:
        "Your pet's training should be fun and bonding experience for both of you. Celebrate every achievement and enjoy watching your pet grow and learn.",
    },
  };

  return (
    <>
      <Helmet>
        <title>Pet Training Lessons</title>
        <meta
          name="description"
          content="Learn pet training with video tutorials and important tips from experts. Improve your pet's behavior in a positive and fun way."
        />
        <meta
          name="keywords"
          content="pet training, dog training, cat training, pet behavior, positive training, pet tips, video tutorials, animal behavior, dog commands, pet socialization"
        />
        <meta property="og:title" content="Virtual Pet Training Lessons" />
        <meta
          property="og:description"
          content="Learn pet training with video tutorials and important tips from experts. Improve your pet's behavior in a positive and fun way."
        />
        <meta property="og:type" content="website" />
      </Helmet>

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
          Dog School
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Typography variant="body1" component="p" sx={{ mb: 3 }} gutterBottom>
              This comprehensive guide offers carefully selected video materials for effective dog training. You will
              find practical resources that will help you learn essential skills in shaping your dog's behavior.
            </Typography>
            <Typography variant="body1" component="p" sx={{ mb: 3 }} gutterBottom>
              Whether you are a new dog owner or want to expand your knowledge, these videos cover everything - from
              basic commands to more progressive training methods.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {videos.map((video, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={index}>
              <Card sx={{ boxShadow: 4, borderRadius: 2 }}>
                <CardMedia component="div" sx={{ position: 'relative', pt: '56.25%' }}>
                  <iframe
                    src={video.src}
                    title={videoTitles[video.key]}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 0,
                    }}
                  />
                </CardMedia>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: {
                        xs: '1rem',
                        sm: '1rem',
                        md: '1rem',
                        lg: '1.2rem',
                      },
                    }}
                  >
                    {videoTitles[video.key]}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {videoSource}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 500,
            color: '#16477c',
            mt: 8,
            mb: 5,
            fontSize: { xs: '1.8rem', sm: '2rem' },
          }}
        >
          Essential Tips for Effective Pet Training
        </Typography>
        <Grid container spacing={3}>
          {trainingTips.map((tip, index) => (
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} key={index}>
              <Accordion
                sx={{
                  py: 1,
                  borderRadius: 3,
                  background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: '0px 3px 10px rgba(0,0,0,0.1)',
                    transform: 'scale(1.01)',
                    background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-${index}-content`}
                  id={`panel-${index}-header`}
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
                      {trainingTipsContent[tip.key].title}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body1"
                    sx={{ color: '#444', fontSize: { xs: '0.9rem', sm: '1rem' }, lineHeight: 1.6 }}
                  >
                    {trainingTipsContent[tip.key].description}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default PetTraining;
