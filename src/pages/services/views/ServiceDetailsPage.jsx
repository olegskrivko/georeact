import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Lottie from 'lottie-react';
import { useSnackbar } from 'notistack';

import spinnerAnimation from '../../../assets/Animation-1749725645616.json';
import ImgPlaceholder from '../../../assets/placeholder.svg';
import LeafletServiceDetailsMap from '../../../shared/maps/LeafletServiceDetailsMap';
import RatingForm from '../components/RatingForm';
import SectionLabel from '../components/SectionLabel';
import ServiceIconLabelTabs from '../components/ServiceIconLabelTabs';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [centerCoords, setCenterCoords] = useState([56.946285, 24.105078]);
  const { enqueueSnackbar } = useSnackbar();
  const mapRef = useRef(null);

  const handleLocationClick = () => {
    const { latitude, longitude } = shelter;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank');
  };
  // Handle map location pan to the given latitude and longitude
  const handlePanToLocation = (lat, lng) => {
    console.log('ServiceDetailsPage: handlePanToLocation called with lat:', lat, 'lng:', lng);
    const newCoords = [lat, lng];
    console.log('ServiceDetailsPage: Setting centerCoords to:', newCoords);
    setCenterCoords(newCoords);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserCoords({ latitude, longitude });

      if (service?.locations?.length) {
        const calculatedDistances = service.locations.map((loc) =>
          calculateDistance(latitude, longitude, loc.latitude, loc.longitude),
        );
        setDistances(calculatedDistances);
      }
    });
  }, [service]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2); // km
  };

  // Fetch service details with or without authentication
  useEffect(() => {
    const fetchService = async () => {
      const accessToken = localStorage.getItem('access_token');
      try {
        const response = await axios.get(`${API_BASE_URL}/api/services/${id}`);
        setService(response.data);

        // Center map on first location if available
        if (response.data.locations && response.data.locations.length > 0) {
          const firstLocation = response.data.locations[0];
          if (firstLocation.latitude && firstLocation.longitude) {
            const lat = parseFloat(firstLocation.latitude);
            const lng = parseFloat(firstLocation.longitude);
            console.log('ServiceDetailsPage: Centering map on first location:', [lat, lng]);
            setCenterCoords([lat, lng]);
          }
        }

        if (accessToken) {
          // If the user is authenticated, fetch favorite status
          fetchFavoriteStatus(accessToken);
        }
        setLoading(false);
        // fetchServiceStats(); // <-- replaced by trackViewAndFetchStats
      } catch (error) {
        console.error('Error fetching service details:', error);
        setError('Failed to load service details. Please try again later.');
        setLoading(false);
      }
    };

    // Fetch favorite status
    const fetchFavoriteStatus = async (accessToken) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/accounts/favorite-services/${id}/`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.ok) {
          const data = await response.json();
          setIsFavorite(data.is_favorite);
        } else {
          setIsFavorite(false);
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    fetchFavoriteStatus();

    fetchService();
  }, [id]);

  const handleFavorite = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      alert('You must be logged in to manage favorites.');
      return;
    }

    const url = `${API_BASE_URL}/api/accounts/favorite-services/${id}/`;
    try {
      const response = await fetch(url, {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsFavorite(!isFavorite);
        enqueueSnackbar(isFavorite ? 'Service removed from favorites' : 'Service added to favorites', {
          variant: 'success',
        });
      } else {
        const errorData = await response.json();
        enqueueSnackbar(errorData.detail || 'Something went wrong', {
          variant: 'error',
        });
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
      enqueueSnackbar('Error updating favorite status. Please try again later.', { variant: 'error' });
    }
  };

  if (loading && !service) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ width: 180, height: 180 }}>
          <Lottie animationData={spinnerAnimation} loop autoplay />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" disableGutters>
      <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3, overflow: 'hidden' }}>
        <Grid container>
          {/* Left: Cover Image */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                image={service?.cover_url || ImgPlaceholder}
                alt={service.operating_name}
                sx={{
                  width: '100%',
                  height: { xs: 280, sm: 360, md: 320 },
                  objectFit: 'cover',
                  minHeight: 280,
                }}
              />

              {localStorage.getItem('access_token') && (
                <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                  <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
                    <IconButton onClick={handleFavorite} sx={{ backgroundColor: '#f7f9fd' }}>
                      {isFavorite ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon color="primary" />}
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Box>
          </Grid>

          {/* Right: Name, description on top, animal types on bottom */}
          <Grid
            size={{ xs: 12, md: 8 }}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            sx={{ height: { xs: 360, sm: 400, md: 320 }, p: { xs: 1, sm: 2, md: 3 } }}
          >
            {/* Top content */}
            <Box>
              <Typography variant="h3" fontWeight={700} color="primary">
                {service.operating_name}
              </Typography>

              <Typography
                variant="subtitle1"
                color="primary"
                fontWeight={600}
                display="flex"
                alignItems="center"
                gap={0.5}
                sx={{ mt: 1 }}
              >
                {service.price_type === 4
                  ? 'Price by agreement'
                  : `Price starting from ${service.price} EUR / ${service.price_type_display.toLowerCase()}`}
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                {service.description}
              </Typography>
            </Box>

            <Box>
              <Box display="flex" flexWrap="wrap" gap={1}>
                <Box
                  component="span"
                  sx={{
                    display: 'inline-block',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '16px',
                    backgroundColor: '#00b5ad',
                    color: '#fff',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    letterSpacing: 0.5,
                    userSelect: 'none',
                  }}
                >
                  {service.category_display}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>

      <SectionLabel variant="subtitle1">Contacts</SectionLabel>
      <Grid container spacing={2} mb={2}>
        <Grid size={{ xs: 12 }}>
          <Card
            sx={{
              p: { xs: 1, sm: 2 },
              borderRadius: 3,
              background: '#fff',
              boxShadow: 3,
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton
                style={{
                  backgroundColor: '#00b3a4',
                  color: '#f7f9fd',
                  pointerEvents: 'none',
                }}
              >
                <PublicIcon />
              </IconButton>
              <Box>
                <Typography variant="body2" color="primary" fontWeight={600}>
                  Website:{' '}
                </Typography>
                {service.website_url ? (
                  <MuiLink
                    href={service.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="none"
                    color="#000"
                  >
                    {service.website_url}
                  </MuiLink>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No website
                  </Typography>
                )}
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={2} mt={2}>
              <IconButton
                style={{
                  backgroundColor: '#00b3a4',
                  color: '#f7f9fd',
                  pointerEvents: 'none',
                }}
              >
                <PhoneIcon />
              </IconButton>
              <Box>
                <Typography variant="body2" color="primary" fontWeight={600}>
                  Phone:{' '}
                </Typography>
                {service.full_phone_number ? (
                  <Typography variant="body2">
                    <MuiLink
                      href={`tel:${service.full_phone_number}`}
                      underline="none"
                      color="#000"
                      sx={{ cursor: 'pointer' }}
                    >
                      {service.full_phone_number}
                    </MuiLink>
                  </Typography>
                ) : (
                  <Typography variant="body2">No phone</Typography>
                )}
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={2} mt={2}>
              <IconButton
                style={{
                  backgroundColor: '#00b3a4',
                  color: '#f7f9fd',
                  pointerEvents: 'none',
                }}
              >
                <EmailIcon />
              </IconButton>
              <Box>
                <Typography variant="body2" color="primary" fontWeight={600}>
                  Email:{' '}
                </Typography>
                {service.email ? (
                  <Typography variant="body1">
                    <MuiLink href={`mailto:${service.email}`} underline="none" color="#000" sx={{ cursor: 'pointer' }}>
                      {service.email}
                    </MuiLink>
                  </Typography>
                ) : (
                  <Box>
                    <Typography variant="body1" color="textSecondary">
                      Email not provided
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Box mt={4}>
        <SectionLabel variant="subtitle1">Locations Map</SectionLabel>
        <div ref={mapRef}>
          <LeafletServiceDetailsMap shelters={service.locations} centerCoords={centerCoords} />
        </div>
      </Box>

      <RatingForm serviceId={id} />

      <ServiceIconLabelTabs service={service} mapRef={mapRef} onPanToLocation={handlePanToLocation} />
    </Container>
  );
};

export default ServiceDetailsPage;
