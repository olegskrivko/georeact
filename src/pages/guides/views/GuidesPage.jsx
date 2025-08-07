import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Card, CardContent, CardMedia, CircularProgress, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';

import ImgPlaceholder from '../../../assets/placeholder.svg';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const GuidesPage = () => {
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
        component="h1"
        align="center"
        sx={{
          fontWeight: 800,
          fontSize: {
            xs: '1.5rem',
            sm: '2rem',
            md: '2.5rem',
            lg: '2.5rem',
          },
          mb: 5,
          background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Guides
      </Typography>
      <Grid container spacing={3}>
        {guides.map((guide) => (
          <Grid key={guide.id} size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <Card>
              <Link to={`/guides/${guide.slug}`} style={{ textDecoration: 'none' }}>
                <CardMedia
                  component="img"
                  image={guide?.cover_url || ImgPlaceholder}
                  alt={guide?.cover_alt || 'Guide cover'}
                  sx={{ height: 200, objectFit: 'cover' }}
                />
                <CardContent sx={{ paddingBottom: '1rem !important' }}>
                  <Typography variant="subtitle1" component="h2" noWrap>
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
