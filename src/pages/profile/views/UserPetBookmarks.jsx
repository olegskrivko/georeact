import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import FlagIcon from '@mui/icons-material/Flag';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import PetsIcon from '@mui/icons-material/Pets';
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
import ImgPlaceholder from '../../../assets/placeholder.svg';
import { useAuth } from '../../../contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function UserPetBookmarks() {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const { user } = useAuth(); // Assuming you are managing user state in context
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoritedPets, setFavoritedPets] = useState([]);

  useEffect(() => {
    const fetchFavoritedPets = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        setError('You must be logged in to view saved pets.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/accounts/favorite-pets/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Add Authorization header with token
          },
        });

        setFavoritedPets(response.data); // Since axios already parses the response
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error('Error fetching favorited pets data:', error);
        setError('Failed to fetch saved pets.');
        setLoading(false); // Stop loading even when there's an error
      }
    };

    fetchFavoritedPets();
  }, []);

  const handleDeletePet = async (petId) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      alert('You must be logged in to remove pets from favorites.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/accounts/favorite-pets/${petId}/remove/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove the deleted pet from state
        setFavoritedPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.detail}`);
      }
    } catch (error) {
      console.error('Error removing pet from favorites:', error);
      alert('Failed to remove pet from favorites.');
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
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
          color="primary"
          align="center"
          sx={{
            mb: 5,
            mt: { xs: 4, sm: 3, md: 2, lg: 1 },
            color: theme.palette.text.secondary,
          }}
        >
          Saved Pets
        </Typography>
        {favoritedPets.length === 0 ? (
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Paper
              sx={{
                p: { xs: 1, sm: 2 },
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
              <Box display="flex" alignItems="center">
                <IconButton
                  sx={{
                    color: 'primary.main',
                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.2)',
                    },
                  }}
                >
                  <BookmarkIcon />
                </IconButton>
                <Typography variant="body1" color="text.secondary" sx={{ ml: { xs: 1, sm: 2 } }}>
                  No saved listings yet.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {favoritedPets.map((pet) => (
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} key={pet.id}>
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
                    <Link to={`/pets/${pet.id}`} style={{ textDecoration: 'none' }}>
                      <Avatar
                        src={pet.pet_image_1 || ImgPlaceholder}
                        alt={pet?.species_display || 'Unknown'}
                        sx={{
                          width: 64,
                          height: 64,
                          mr: { xs: 1, sm: 2 },
                          cursor: 'pointer',
                          border: '2px solid #00b3a4',
                        }}
                      >
                        {pet?.species_display?.[0] || '?'}
                      </Avatar>
                    </Link>
                    <Box flexGrow={1}>
                      <Typography variant="body2">{pet?.status_display || 'Unknown'}</Typography>
                      {/* <Typography variant="h6">
                        <Chip
                          label={pet?.status_display || 'Unknown'}
                          onClick={() => {}} // dummy click
                          sx={{
                            cursor: 'default', // removes the hand pointer
                            pointerEvents: 'auto', // ensures chip behaves normally visually
                          }}
                          size="small"
                          color="primary"
                        />
                      </Typography> */}
                      <Box display="flex" alignItems="center" justifyContent="flex-start" gap={1.5}>
                        {/* <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,

                            color: 'primary.main',
                          }}
                        >
                          {pet?.species_display || 'Unknown'}
                        </Typography> */}
                        <Chip
                          label={pet?.species_display || 'Unknown'}
                          onClick={() => {}} // dummy click
                          sx={{
                            cursor: 'default', // removes the hand pointer
                            pointerEvents: 'auto', // ensures chip behaves normally visually
                          }}
                          size="small"
                          color="primary"
                        />
                      </Box>
                    </Box>
                    {/* <Box flexGrow={1}>
                      <Typography
                        variant="caption"
                        component="p"
                        sx={{
                          fontWeight: 500,
                          color: 'primary.main',
                          textTransform: 'uppercase',
                        }}
                      >
                        {pet?.status_display || 'Unknown'} {pet?.species_display || 'Unknown'}
                      </Typography>
                    </Box> */}

                    {pet.is_closed && (
                      <Tooltip title="Listing Closed">
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            mr: 1,
                            cursor: 'default', // removes hand pointer
                          }}
                        >
                          <LockOutlineIcon sx={{ color: 'text.disabled' }} />
                        </Box>
                      </Tooltip>
                    )}

                    <Tooltip title="Remove">
                      <IconButton
                        edge="end"
                        color="error"
                        size="small"
                        aria-label="delete"
                        onClick={() => handleDeletePet(pet.id)}
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

export default UserPetBookmarks;
