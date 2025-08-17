import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
  Link as MuiLink,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Lottie from 'lottie-react';

import spinnerAnimation from '../../../assets/Animation-1749725645616.json';
import { useAuth } from '../../../contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function UserServiceBookmarks() {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const { user } = useAuth(); // Assuming you are managing user state in context
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoritedServices, setFavoritedServices] = useState([]);

  useEffect(() => {
    const fetchFavoritedServices = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        setError('You must be logged in to view favorited services.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/accounts/favorite-services/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Add Authorization header with token
          },
        });

        setFavoritedServices(response.data); // Since axios already parses the response
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error('Error fetching favorited services data:', error);
        setError('Failed to fetch favorited services data');
        setLoading(false); // Stop loading even when there’s an error
      }
    };

    fetchFavoritedServices();
  }, []);

  // const handleDeletePet = async (petId) => {
  //   const accessToken = localStorage.getItem('access_token');
  //   if (!accessToken) {
  //     alert('You must be logged in to delete pets.');
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`https://petfinderbackend-production.up.railway.app/api/user-profile/favorite-pets/${petId}/remove/`, {
  //       method: 'DELETE',
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.ok) {
  //       alert('Pet removed from favorites successfully');
  //       // You can trigger a re-fetch or update your UI accordingly
  //     } else {
  //       const errorData = await response.json();
  //       alert(`Error: ${errorData.detail}`);
  //     }
  //   } catch (error) {
  //     console.error('Error removing pet from favorites:', error);
  //     alert('Error removing pet from favorites');
  //   }
  // };
  const handleDeleteService = async (serviceId) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      alert('You must be logged in to delete services.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/accounts/favorite-services/${serviceId}/remove/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove the deleted service from state
        setFavoritedServices((prevServices) => prevServices.filter((service) => service.id !== serviceId));
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.detail}`);
      }
    } catch (error) {
      console.error('Error removing service from favorites:', error);
      alert('Error removing service from favorites');
    }
  };

  const handleEditService = (serviceId) => {
    navigate(`/user-profile/edit-service/${serviceId}`);
  };

  // Loading and error state handling
  if (loading) {
    return (
      <Container>
        <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ width: 180, height: 180 }}>
            <Lottie animationData={spinnerAnimation} loop autoplay />
          </Box>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h5" color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="lg" disableGutters>
      <Box sx={{ my: { xs: 2, sm: 2, md: 3, lg: 4, xl: 4 } }}>
        <Typography
          variant="h5"
          align="center"
          sx={{
            mb: 5,
            mt: { xs: 4, sm: 3, md: 2, lg: 1 },
            color: theme.palette.text.secondary,
          }}
        >
          Saved Services
        </Typography>
        {favoritedServices.length === 0 ? (
          // <Card
          //   sx={{
          //     p: 2,
          //     borderRadius: 3,
          //     background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
          //     cursor: 'pointer',
          //     transition: 'all 0.3s ease-in-out',
          //     '&:hover': {
          //       background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
          //     },
          //   }}
          // >

          //   <Box display="flex" alignItems="center">
          //     <BookmarkIcon color="primary" sx={{ fontSize: 28, marginRight: '1rem' }} />
          //     <Typography variant="body2" color="textSecondary">
          //       Jums vēl nav saglabātu sludinājumu.
          //     </Typography>
          //   </Box>

          // </Card>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Paper
              sx={{
                p: { xs: 1, sm: 2 },
                borderRadius: 3,
                background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',

                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
                },
              }}
            >
              <Box display="flex" alignItems="center">
                <IconButton color="primary" style={{ backgroundColor: '#f7f9fd', cursor: 'default' }}>
                  <BookmarkIcon />
                </IconButton>
                <Typography variant="body1" color="textSecondary" sx={{ ml: { xs: 1, sm: 2 } }}>
                  No saved services yet.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ) : (
          // <Grid container spacing={2}>
          //   {favoritedServices.map((service) => (
          //     <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} key={service.id}>
          //       <Card
          //         sx={{
          //           px: 2,

          //           borderRadius: 3,
          //           background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
          //           // boxShadow: '0px 3px 10px rgba(0,0,0,0.06)',
          //           cursor: 'pointer',
          //           transition: 'all 0.3s ease-in-out',
          //           '&:hover': {
          //             // boxShadow: '0px 6px 20px rgba(0,0,0,0.1)',
          //             // transform: 'scale(1.01)',
          //             background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
          //           },
          //           // '&:focus': {
          //           //   outline: '2px solid #00b5ad',
          //           // },
          //         }}
          //       >
          //         <CardContent>
          //           <Box display="flex" alignItems="center">
          //             <Avatar
          //               src={service.service_image_1}
          //               alt={service.title}
          //               sx={{ width: 64, height: 64, marginRight: 2 }}
          //             />
          //             <Box flexGrow={1}>
          //               <Typography variant="h6">
          //                 <MuiLink href={`/services/${service.id}`} underline="none">
          //                   <Chip
          //                     label={service.title || 'Nezināms'}
          //                     size="small"
          //                     variant="contained"
          //                     style={{
          //                       backgroundColor: '#5B9BD5',
          //                       color: '#fff',
          //                     }}
          //                   />
          //                 </MuiLink>
          //               </Typography>
          //               <Typography variant="body1" color="textSecondary">
          //                 {service.title || 'Nav statusa'}
          //               </Typography>
          //             </Box>
          //             <Tooltip title="Izdzēst">
          //               <IconButton
          //                 edge="end"
          //                 color="error"
          //                 aria-label="delete"
          //                 style={{ backgroundColor: '#FF746C', color: '#fff' }}
          //                 onClick={() => handleDeleteService(service.id)}
          //               >
          //                 <DeleteIcon />
          //               </IconButton>
          //             </Tooltip>
          //           </Box>
          //         </CardContent>
          //       </Card>
          //     </Grid>
          //   ))}
          // </Grid>
          <Grid container spacing={2}>
            {favoritedServices.map((service) => (
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} key={service.id}>
                <Card
                  sx={{
                    p: { xs: 1, sm: 2 },
                    borderRadius: 3,

                    textAlign: 'left',
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
                  <Box display="flex" alignItems="center">
                    <MuiLink href={`/services/${service.id}`} underline="none">
                      <Avatar
                        src={service.service_image_1 || ''}
                        alt={service.operating_name || 'Unknown'}
                        sx={{ width: 64, height: 64, mr: { xs: 1, sm: 2 }, cursor: 'pointer' }}
                      >
                        {service.operating_name || '?'}
                      </Avatar>
                    </MuiLink>
                    <Box flexGrow={1}>
                      <Typography variant="h6">
                        <Chip
                          label={
                            service?.operating_name
                              ? service.operating_name.length > 20
                                ? service.operating_name.slice(0, 20) + '…'
                                : service.operating_name
                              : 'Unknown'
                          }
                          onClick={() => {}} // dummy click
                          sx={{
                            cursor: 'default', // removes hand pointer
                            pointerEvents: 'auto', // ensures chip behaves normally visually
                          }}
                          size="small"
                          color="primary"
                        />
                      </Typography>
                      <Box display="flex" alignItems="center" justifyContent="flex-start" gap={1.5}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,

                            color: 'primary.main',
                          }}
                        >
                          {service?.category_display || 'Unknown'}
                        </Typography>
                      </Box>
                    </Box>

                    <Tooltip title="Remove">
                      <IconButton
                        edge="end"
                        color="error"
                        size="small"
                        aria-label="delete"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Box textAlign="center" style={{ display: 'flex', justifyContent: 'space-between' }} mt={4}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ArrowBackIcon />}
              component={Link}
              to={`/user-profile`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Atpakaļ
            </Button>
          </Box>
        </Grid>
      </Grid> */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Box mt={4} display="flex" justifyContent="space-between" alignItems="center" textAlign="center">
              <Link
                to="/user-profile"
                style={{
                  color: '#00b5ad',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                }}
              >
                <ArrowBackIcon fontSize="small" />
                Back
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default UserServiceBookmarks;
