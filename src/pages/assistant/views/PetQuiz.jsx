import { useEffect, useState } from 'react';

import { Box, Button, CardContent, CircularProgress, Container, Grid, LinearProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const COLORS = {
  dog: '#42a5f5',
  cat: '#ab47bc',
  none: '#90a4ae',
};

const Title = ({ text }) => {
  const theme = useTheme();

  return (
    <Typography
      variant="h4"
      align="center"
      sx={{
        mb: 5,
        mt: { xs: 4, sm: 3, md: 2, lg: 1 },
        color: theme.palette.text.secondary,
      }}
    >
      {text}
    </Typography>
  );
};

const PetQuiz = () => {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const cardTextSecondary = theme.palette.text.secondary;
  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analysisLoading, setAnalysisLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/assistant/pet-quiz/questions/`)
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading questions:', err);
        setLoading(false);
      });
  }, []);

  const handleOptionSelect = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentStep].id]: option.scores,
    }));

    if (currentStep + 1 < questions.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      const allAnswers = {
        ...answers,
        [questions[currentStep].id]: option.scores,
      };
      calculateResult(allAnswers);
    }
  };

  const calculateResult = async (allAnswers) => {
    const totalScores = { dog: 0, cat: 0, none: 0 };

    Object.values(allAnswers).forEach((scores) => {
      scores.forEach((score) => {
        totalScores[score.pet_type] += score.value;
      });
    });

    const bestPet = Object.keys(totalScores).reduce((a, b) => (totalScores[a] > totalScores[b] ? a : b));

    const accessToken = localStorage.getItem('access_token');

    setAnalysisLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/assistant/pet-quiz/analysis/`,
        {
          answers: allAnswers,
          scores: totalScores,
          bestPet,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      setResult({
        bestPet,
        scores: totalScores,
        explanation: response.data.summary,
        topBreeds: response.data.top_breeds,
      });
    } catch (error) {
      console.error('Failed to fetch analysis:', error);

      if (error.response?.status === 401) {
        setResult({
          bestPet,
          scores: totalScores,
          explanation: '🔐 To get AI insights and detailed pet suggestions, please log in.',
          topBreeds: [],
        });
      } else {
        setResult({
          bestPet,
          scores: totalScores,
          explanation: '⚠️ Could not fetch explanation. Please try again later.',
          topBreeds: [],
        });
      }
    } finally {
      setAnalysisLoading(false);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
        <Typography mt={2}>Loading quiz...</Typography>
      </Box>
    );
  }

  if (analysisLoading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
        <Typography mt={2}>Analyzing your results with AI...</Typography>
      </Box>
    );
  }

  if (result) {
    const data = Object.entries(result.scores).map(([type, value]) => ({
      name: type.toUpperCase(),
      value,
    }));

    const readablePet = result.bestPet === 'none' ? 'no specific pet' : result.bestPet;

    return (
      <Container maxWidth="lg" disableGutters>
        <Title text="Pet Matching Quiz with AI" />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Based on your answers, we recommend: <strong>{readablePet.toUpperCase()}</strong>
          </Typography>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={COLORS[entry.name.toLowerCase()]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          {result.explanation && (
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                🤖 AI Summary:
              </Typography>
              <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                {result.explanation}
              </Typography>
            </Box>
          )}

          {result.topBreeds && result.topBreeds.length > 0 && (
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                🐾 Top 5 Matching Breeds:
              </Typography>
              <ul>
                {result.topBreeds.map((breed, idx) => (
                  <li key={idx}>
                    <Typography variant="body1">
                      <strong>{breed.name}</strong>: {breed.reason}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Box>
          )}

          <Box mt={4} display="flex" justifyContent="center">
            <Button variant="contained" sx={{ borderRadius: 2 }} color="primary" onClick={resetQuiz}>
              Restart Quiz
            </Button>
          </Box>
        </CardContent>
      </Container>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <CardContent>
      <Title text="Pet Matching Quiz with AI" />
      <Box mb={3}>
        <Typography variant="subtitle1" gutterBottom>
          Step {currentStep + 1} of {questions.length}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={((currentStep + 1) / questions.length) * 100}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(to right, #42a5f5, #ab47bc)',
            },
          }}
        />
      </Box>

      <Typography variant="h5" gutterBottom sx={{ mt: 1 }}>
        {currentQuestion.text}
      </Typography>

      <Grid container spacing={2} mt={2}>
        {currentQuestion.options.map((option) => (
          <Grid item xs={12} key={option.id}>
            <Button fullWidth variant="contained" color="primary" onClick={() => handleOptionSelect(option)}>
              {option.text}
            </Button>
          </Grid>
        ))}
      </Grid>
    </CardContent>
  );
};

export default PetQuiz;
