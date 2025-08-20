import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Box, Card, CardContent, CardMedia, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

import ImgPlaceholder from '../../../assets/placeholder.svg';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const GuidesPage = () => {
  const { t } = useTranslation('guides');
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/guides/`);
        setGuides(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching guides:', error);
        setError('Error fetching guides. Please try again later.');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="h6" color="error">
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
        {guides.map((guide) => (
          <Grid key={guide.id} size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <Card sx={{ background: cardBg, color: cardText }}>
              <Link
                to={`/guides/${guide.slug}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit', // keep text color same
                }}
              >
                <CardMedia
                  component="img"
                  image={guide?.cover_url || ImgPlaceholder}
                  alt={guide?.cover_alt || 'Guide cover'}
                  sx={{ height: 200, objectFit: 'cover' }}
                />
                <CardContent sx={{ paddingBottom: '1rem !important' }}>
                  <Typography
                    variant="subtitle1"
                    component="h2"
                    noWrap
                    sx={{
                      color: 'inherit',
                      '&:visited': { color: 'inherit' },
                    }}
                  >
                    {guide?.title}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default GuidesPage;
