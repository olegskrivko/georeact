import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { Link, useParams } from 'react-router-dom';

import { CheckBox } from '@mui/icons-material';
// Optional: to represent species or other info
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CakeIcon from '@mui/icons-material/Cake';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DescriptionIcon from '@mui/icons-material/Description';
import FemaleIcon from '@mui/icons-material/Female';
import HeightIcon from '@mui/icons-material/Height';
import MaleIcon from '@mui/icons-material/Male';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import MoodIcon from '@mui/icons-material/Mood';
import PersonIcon from '@mui/icons-material/Person';
import PetsIcon from '@mui/icons-material/Pets';
import TagIcon from '@mui/icons-material/Tag';
import TextureIcon from '@mui/icons-material/Texture';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Input,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import html2PDF from 'html2pdf.js';

import { APP_NAME, DOMAIN_URL } from '../../../constants/config';
import { useAuth } from '../../../contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Poster = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [phone, setPhone] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [displayText, setDisplayText] = useState('If you have seen it, please call!');

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    // Extract the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2 digits (e.g., 01, 02)
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits

    // Return the date in 'YYYY-MM-DD' format
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchPetDetails = async () => {
      const accessToken = localStorage.getItem('access_token');

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/api/pets/${id}/?format=json`);

        if (!response.ok) {
          throw new Error('Failed to fetch pet details');
        }
        const data = await response.json();
        setPet(data);
      } catch (err) {
        setError('Failed to fetch pet details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [id]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    setDisplayText(`If you have seen it, please call! ${value ? ' ' + value : ''}`);
  };

  const handleAcceptChange = () => {
    setIsEmpty(!isEmpty);
  };

  const generatePDF = async () => {
    try {
      const page = document.getElementById('page');
      const options = {
        jsPDF: { format: 'a4' },
        html2canvas: { useCORS: true, scale: 2 },
      };
      await html2PDF().from(page).set(options).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!pet) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="textSecondary">
          Pet details are unavailable.
        </Typography>
      </Box>
    );
  }

  return (
    <Container component="main" maxWidth="lg" sx={{ paddingLeft: '0 !important', paddingRight: '0 !important' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          // minHeight: '100vh',
          // padding: 2,
        }}
      >
        <Box
          id="page"
          sx={{
            background: '#fff',
            maxWidth: '794px' /* A4 width in pixels */,
            //height: "1123px", /* A4 height in pixels */
            maxHeight: '1122px',
            padding: 1,

            boxSizing: 'border-box',
            border: '1px solid #ccc',
            borderRadius: 1,
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box
            style={{
              background: 'darkred',
              padding: '0.5rem 0',
              marginBottom: '0.5rem',
            }}
          >
            <Typography
              variant="h1"
              textAlign="center"
              style={{
                textTransform: 'uppercase',
                fontWeight: 700,
                color: '#fff',
                fontSize: '2.4rem',
              }}
            >
              UZMANĪBU!
            </Typography>
            <Typography
              variant="h4"
              textAlign="center"
              style={{
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 500,
                // fontSize: '1rem',
              }}
            >
              Lost {pet.species_display}
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              {pet.pet_image_1 && (
                <Box
                  position="relative"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ width: '100%', borderRadius: 1 }}
                >
                  <img
                    src={pet.pet_image_1}
                    alt={pet.name}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '4px',
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      // backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      color: 'black',
                      px: 1,
                      py: 0.2,
                      borderRadius: 1,
                      fontSize: '0.6rem',
                      fontWeight: 500,
                    }}
                  >
                    Made by {APP_NAME}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid size={{ xs: 4, sm: 4, md: 4, lg: 4 }}>
              <Box display="flex" alignItems="center" my={1} gap={1}>
                <IconButton
                  color="primary"
                  sx={{
                    backgroundColor: '#f7f9fd',
                    p: { xs: 0.5, sm: 1 }, // Smaller padding on small screens
                    '& svg': {
                      fontSize: { xs: 18, sm: 24 }, // Icon size responsive
                    },
                  }}
                >
                  <MergeTypeIcon />
                </IconButton>

                <Typography
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '1rem' },
                  }}
                >
                  <strong>Breed:</strong> {pet.breed || '-'}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" my={1} gap={1}>
                <IconButton
                  color="primary"
                  sx={{
                    backgroundColor: '#f7f9fd',
                    p: { xs: 0.5, sm: 1 }, // Smaller padding on small screens
                    '& svg': {
                      fontSize: { xs: 18, sm: 24 }, // Icon size responsive
                    },
                  }}
                >
                  <MaleIcon />
                </IconButton>

                <Typography
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '1rem' },
                  }}
                >
                  <strong>Gender:</strong> {pet.gender_display || '-'}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" my={1} gap={1}>
                <IconButton
                  color="primary"
                  sx={{
                    backgroundColor: '#f7f9fd',
                    p: { xs: 0.5, sm: 1 }, // Smaller padding on small screens
                    '& svg': {
                      fontSize: { xs: 18, sm: 24 }, // Icon size responsive
                    },
                  }}
                >
                  <TextureIcon />
                </IconButton>

                <Typography
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '1rem' },
                  }}
                >
                  <strong>Pattern:</strong> {pet.pattern_display || '-'}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 4, sm: 4, md: 4, lg: 4 }}>
              <Box display="flex" alignItems="center" my={1} gap={1}>
                <IconButton
                  color="primary"
                  sx={{
                    backgroundColor: '#f7f9fd',
                    p: { xs: 0.5, sm: 1 }, // Smaller padding on small screens
                    '& svg': {
                      fontSize: { xs: 18, sm: 24 }, // Icon size responsive
                    },
                  }}
                >
                  <CakeIcon />
                </IconButton>

                <Typography
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '1rem' },
                  }}
                >
                  <strong>Age:</strong> {pet.age_display || '-'}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" my={1} gap={1}>
                <IconButton
                  color="primary"
                  sx={{
                    backgroundColor: '#f7f9fd',
                    p: { xs: 0.5, sm: 1 }, // Smaller padding on small screens
                    '& svg': {
                      fontSize: { xs: 18, sm: 24 }, // Icon size responsive
                    },
                  }}
                >
                  <HeightIcon />
                </IconButton>
                <Typography
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '1rem' },
                  }}
                >
                  <strong>Size:</strong> {pet.size_display || '-'}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" my={1} gap={1}>
                <IconButton
                  color="primary"
                  sx={{
                    backgroundColor: '#f7f9fd',
                    p: { xs: 0.5, sm: 1 }, // Smaller padding on small screens
                    '& svg': {
                      fontSize: { xs: 18, sm: 24 }, // Icon size responsive
                    },
                  }}
                >
                  <ColorLensIcon />
                </IconButton>

                <Typography
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '1rem' },
                  }}
                >
                  <strong>Primary Color:</strong> {pet.primary_color_display || '-'}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 4, sm: 4, md: 4, lg: 4 }}>
              <Box display="flex" alignItems="center" my={1} gap={1}>
                <IconButton
                  color="primary"
                  sx={{
                    backgroundColor: '#f7f9fd',
                    p: { xs: 0.5, sm: 1 }, // Smaller padding on small screens
                    '& svg': {
                      fontSize: { xs: 18, sm: 24 }, // Icon size responsive
                    },
                  }}
                >
                  <AccessTimeIcon />
                </IconButton>
                <Typography
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '1rem' },
                  }}
                >
                  <strong>Date:</strong> {formatDate(pet.created_at)}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" my={1} gap={1}>
                <IconButton
                  color="primary"
                  sx={{
                    backgroundColor: '#f7f9fd',
                    p: { xs: 0.5, sm: 1 }, // Smaller padding on small screens
                    '& svg': {
                      fontSize: { xs: 18, sm: 24 }, // Icon size responsive
                    },
                  }}
                >
                  <TagIcon />
                </IconButton>
                <Typography
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '1rem' },
                  }}
                >
                  <strong>ID:</strong> {pet.identifier}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" my={1} gap={1}>
                <IconButton
                  color="primary"
                  sx={{
                    backgroundColor: '#f7f9fd',
                    p: { xs: 0.5, sm: 1 }, // Smaller padding on small screens
                    '& svg': {
                      fontSize: { xs: 18, sm: 24 }, // Icon size responsive
                    },
                  }}
                >
                  <ColorLensIcon />
                </IconButton>

                <Typography
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '1rem' },
                  }}
                >
                  <strong>Secondary Color:</strong> {pet.secondary_color_display || '-'}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              <Box
                style={{
                  background: 'darkred',
                  padding: '0.5rem 0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '76px',
                }}
              >
                <Typography
                  variant="h6"
                  textAlign="center"
                  style={{
                    textTransform: 'uppercase',
                    fontWeight: '700',
                    color: '#fff',
                  }}
                >
                  If you have seen it, please contact us!
                </Typography>

                {/* Conditionally render input only if phone is not empty */}
                {pet.contact_phone && (
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <span
                      style={{
                        color: '#fff',
                        fontSize: '1.4rem',
                        fontWeight: '500',
                      }}
                    >
                      +{pet.phone_code} {pet.contact_phone}
                    </span>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={3} py={2}>
            <Grid
              size={{ xs: 4, sm: 4, md: 6, lg: 6 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              mt={1}
            >
              <Box sx={{ width: '100%', maxWidth: 160, aspectRatio: '1 / 1' }}>
                <QRCode
                  value={`${DOMAIN_URL}/pets/${pet.id}`}
                  style={{ width: '100%', height: '100%' }}
                  viewBox={`0 0 256 256`}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 8, sm: 8, md: 6, lg: 6 }} mt={1}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'start',
                  // marginLeft: '1rem',
                }}
              >
                <Stack direction="column" spacing={2} alignItems="left">
                  <Typography variant="body2" textAlign="start" sx={{ fontWeight: 'bold' }}>
                    1. Scan the QR code
                  </Typography>
                  <Typography variant="body2" textAlign="start" sx={{ mt: 1, fontWeight: 'bold' }}>
                    2. Click on the link that appears
                  </Typography>
                  <Typography variant="body2" textAlign="start" sx={{ mt: 1, fontWeight: 'bold' }}>
                    3. Write comments if you have any information
                  </Typography>
                  <Typography variant="body2" textAlign="start" sx={{ mt: 1, fontWeight: 'bold' }}>
                    4. Follow the pet's status
                  </Typography>
                  <Typography variant="body2" textAlign="start" sx={{ mt: 1, fontWeight: 'bold' }}>
                    5. Share the link to help the pet
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Container component="main" maxWidth="sm" sx={{ paddingLeft: '0 !important', paddingRight: '0 !important' }}>
          <Grid container spacing={3} py={1}>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              <Box textAlign="center" style={{ display: 'flex', justifyContent: 'space-between' }} mt={4}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<ArrowBackIcon />}
                  component={Link}
                  to={`/pets/${pet.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Back
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  // disabled={!(phone.trim() === '' || isEmpty)}
                  onClick={generatePDF}
                  startIcon={<ArrowDownwardIcon />}
                >
                  Download PDF
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Container>
  );
};

export default Poster;
