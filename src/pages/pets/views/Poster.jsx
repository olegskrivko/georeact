import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { Link, useParams } from 'react-router-dom';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CakeIcon from '@mui/icons-material/Cake';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DescriptionIcon from '@mui/icons-material/Description';
import FemaleIcon from '@mui/icons-material/Female';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import HeightIcon from '@mui/icons-material/Height';
import MaleIcon from '@mui/icons-material/Male';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import MoodIcon from '@mui/icons-material/Mood';
import PersonIcon from '@mui/icons-material/Person';
import PetsIcon from '@mui/icons-material/Pets';
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import TagIcon from '@mui/icons-material/Tag';
import TextureIcon from '@mui/icons-material/Texture';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import html2PDF from 'html2pdf.js';

import { APP_NAME, DOMAIN_URL } from '../../../constants/config';
import { useAuth } from '../../../contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Poster = () => {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const cardTextSecondary = theme.palette.text.secondary;
  const { user } = useAuth();
  const { id } = useParams();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NEW STATES
  const [posterName, setPosterName] = useState('');
  const [posterCount, setPosterCount] = useState(1);
  const [generatedPosters, setGeneratedPosters] = useState([]);
  const [downloading, setDownloading] = useState(null); // track which poster is downloading
  const [downloadedIds, setDownloadedIds] = useState([]);
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);
  const [posterPhone, setPosterPhone] = useState('');
  const [pendingGenerate, setPendingGenerate] = useState(false);

  // Generate default poster name with timestamp
  const generateDefaultPosterName = () => {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    return `poster_${timestamp}`;
  };

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/api/pets/${id}/?format=json`);
        if (!response.ok) throw new Error('Failed to fetch pet details');
        const data = await response.json();
        console.log('pet', pet);
        setPet(data);
        // Set default poster name when pet data is loaded
        setPosterName(generateDefaultPosterName());
        // Pre-fill phone from user or pet if available
        if (user && user.phone) setPosterPhone(user.phone);
        else if (data && data.contact_phone) setPosterPhone(data.contact_phone);
        else setPosterPhone('');
      } catch (err) {
        setError('Failed to fetch pet details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [id, user]);

  const bulkDownloadPDFs = async () => {
    for (const poster of generatedPosters) {
      await generatePDF(poster.id);
    }
  };

  // Open phone dialog before generating posters
  const handleOpenPhoneDialog = () => {
    setPhoneDialogOpen(true);
    setPendingGenerate(true);
  };
  const handleClosePhoneDialog = () => {
    setPhoneDialogOpen(false);
    setPendingGenerate(false);
  };
  const handleConfirmPhoneDialog = () => {
    setPhoneDialogOpen(false);
    setPendingGenerate(false);
    handleGeneratePosters();
  };

  const handleGeneratePosters = async () => {
    try {
      setLoading(true);

      const payload = {
        pet: id,
        name: posterName || generateDefaultPosterName(),
        count: posterCount,
        phone: posterPhone,
      };

      const accessToken = localStorage.getItem('access_token');

      const response = await fetch(`${API_BASE_URL}/api/pets/posters/bulk-create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from server:', errorText);
        throw new Error(`Failed to create posters. Status: ${response.status}`);
      }

      const posters = await response.json();
      setGeneratedPosters(posters);
    } catch (error) {
      console.error(error);
      setError(error.message || 'Could not create posters. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

  const generatePDF = async (posterId) => {
    try {
      setDownloading(posterId);
      const page = document.getElementById(`page-${posterId}`);

      // Find the poster to get its name
      const poster = generatedPosters.find((p) => p.id === posterId);
      const fileName = poster ? `${poster.name}.pdf` : `poster_${posterId}.pdf`;

      const options = {
        jsPDF: { format: 'a4' },
        html2canvas: { useCORS: true, scale: 2 },
        filename: fileName, // Use the poster name for the PDF filename
      };

      await html2PDF().from(page).set(options).save();
      setDownloadedIds((prev) => [...prev, posterId]);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setDownloading(null);
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
    <Container maxWidth="lg" disableGutters>
      {/* Phone Dialog */}
      <Dialog
        open={phoneDialogOpen}
        onClose={handleClosePhoneDialog}
        PaperProps={{
          sx: {
            background: cardBg,
            color: cardText,
            borderRadius: 3,
            p: 2,
          },
        }}
      >
        <DialogTitle>Contact Phone for Poster</DialogTitle>
        <DialogContent>
          <TextField
            label="Phone Number"
            value={posterPhone}
            onChange={(e) => setPosterPhone(e.target.value)}
            fullWidth
            autoFocus
            placeholder="Enter phone number to display"
            sx={{ mt: 1 }}
          />
          <Typography variant="caption" color="textSecondary">
            This phone will be shown on the poster. You can leave it blank if you don't want to display a phone number.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePhoneDialog}>Cancel</Button>
          <Button onClick={handleConfirmPhoneDialog} variant="contained" color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
      {/* Premium Header Section */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 5,
          mt: { xs: 4, sm: 3, md: 2, lg: 1 },
          color: theme.palette.text.secondary,
        }}
      >
        Generate Posters
      </Typography>

      {generatedPosters.length == 0 && (
        <Card
          sx={{
            p: { xs: 1, sm: 2 },
            borderRadius: 3,
            background: cardBg,
            color: cardText,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Poster Name"
                fullWidth
                value={posterName}
                onChange={(e) => setPosterName(e.target.value)}
                placeholder="poster_2024-01-15T10-30-00"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255,255,255,0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255,255,255,0.8)',
                    '&.Mui-focused': {
                      color: 'white',
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                label="Number of Posters (max 50)"
                fullWidth
                type="number"
                value={posterCount}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value >= 1 && value <= 50) {
                    setPosterCount(value);
                  }
                }}
                inputProps={{
                  min: 1,
                  max: 50,
                  step: 1,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255,255,255,0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255,255,255,0.8)',
                    '&.Mui-focused': {
                      color: 'white',
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Button
                onClick={handleOpenPhoneDialog}
                disabled={loading}
                startIcon={!loading && <PhotoFilterIcon />}
                variant="contained"
                fullWidth
                sx={{ borderRadius: 2, py: 2 }}
                color="primary"
              >
                {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Generate Posters'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1.5}>
                {[
                  'You can generate up to 50 posters in a single batch.',
                  'Each poster allows tracking of unique scans.',
                  'To assign coordinates, perform the first scan with geoposition enabled on your phone.',
                  'Do this first scan when the poster is already in place.',
                  'Avoid scanning posters at home for testing purposes.',
                ].map((text, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FiberManualRecordIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.7)' }} />
                    <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem' }}>{text}</Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Card>
      )}
      {/* Center PDF preview horizontally */}
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Box display="flex" flexDirection="column" alignItems="center" width="100%">
          {generatedPosters.length > 0 && (
            <>
              <Box
                sx={{
                  borderRadius: 3,
                  background: cardBg,
                  color: cardText,
                  p: 3,
                  mb: 3,
                  width: '100%',
                  maxWidth: '100%',
                }}
              >
                <Typography variant="h5" mb={2} sx={{ fontWeight: 600 }}>
                  Generated Posters ({generatedPosters.length})
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  startIcon={<ArrowDownwardIcon />}
                  onClick={bulkDownloadPDFs}
                  disabled={downloading !== null}
                  sx={{
                    borderRadius: 2,
                    py: 2,
                  }}
                >
                  Download All Posters as PDF
                </Button>
              </Box>

              {generatedPosters.map((poster) => {
                const posterUrl = `${DOMAIN_URL}/posters/${poster.id}/scan/`;

                return (
                  <Box key={poster.id} mb={4} display="flex" flexDirection="column" alignItems="center">
                    {/* Download Button - Above PDF Content */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                        p: 2,
                        background: 'rgba(102, 126, 234, 0.1)',
                        borderRadius: 2,
                        border: '1px solid rgba(102, 126, 234, 0.2)',
                        width: '100%',
                        maxWidth: '794px',
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600, color: cardTextSecondary }}>
                        {poster.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => generatePDF(poster.id)}
                          startIcon={<FileDownloadIcon />}
                          disabled={downloading === poster.id}
                          // sx={{
                          //   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          //   '&:hover': {
                          //     background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                          //   },
                          // }}
                        >
                          {downloading === poster.id ? 'Generating...' : 'Download PDF'}
                        </Button>
                        {downloadedIds.includes(poster.id) && (
                          <Typography color="success.main" sx={{ fontWeight: 500 }}>
                            ✓ Downloaded
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    {/* PDF Content - Centered Below */}
                    <Box
                      id={`page-${poster.id}`}
                      sx={{
                        background: '#fff',
                        maxWidth: '794px',
                        maxHeight: '1122px',
                        padding: 1,
                        border: '1px solid #ccc',
                        borderRadius: 1,
                        boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                      }}
                    >
                      <Box
                        style={{
                          background: 'darkred',
                          padding: '0.5rem 0',
                        }}
                      >
                        <Typography
                          variant="h4"
                          textAlign="center"
                          sx={{ textTransform: 'uppercase', fontWeight: 700, color: '#fff' }}
                        >
                          ATTENTION!
                        </Typography>
                        <Typography
                          variant="h5"
                          textAlign="center"
                          sx={{ color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 500 }}
                        >
                          Missing {pet.species_display}
                        </Typography>
                      </Box>
                      {/* image */}
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
                                  // borderRadius: '4px',
                                }}
                              />
                              <Typography
                                variant="caption"
                                sx={{
                                  position: 'absolute',
                                  bottom: 8,
                                  right: 8,
                                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
                      {/* attributes */}
                      <Box
                        sx={{
                          background: 'rgba(102, 126, 234, 0.07)',

                          p: 3,

                          boxShadow: '0 2px 8px rgba(102,126,234,0.08)',
                          width: '100%',
                          maxWidth: '100%',
                        }}
                      >
                        <Grid container spacing={3}>
                          <Grid size={{ xs: 4 }}>
                            <Box display="flex" alignItems="center" gap={2}>
                              <MergeTypeIcon color="primary" fontSize="medium" />
                              <Typography sx={{ fontSize: '1.1rem' }}>
                                <strong>Breed:</strong> {pet.breed || '-'}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid size={{ xs: 4 }}>
                            <Box display="flex" alignItems="center" gap={2}>
                              <MaleIcon color="primary" fontSize="medium" />
                              <Typography sx={{ fontSize: '1.1rem' }}>
                                <strong>Gender:</strong> {pet.gender_display || '-'}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid size={{ xs: 4 }}>
                            <Box display="flex" alignItems="center" gap={2}>
                              <TextureIcon color="primary" fontSize="medium" />
                              <Typography sx={{ fontSize: '1.1rem' }}>
                                <strong>Coat:</strong> {pet.pattern_display || '-'}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid size={{ xs: 4 }}>
                            <Box display="flex" alignItems="center" gap={2}>
                              <CakeIcon color="primary" fontSize="medium" />
                              <Typography sx={{ fontSize: '1.1rem' }}>
                                <strong>Age:</strong> {pet.age_display || '-'}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid size={{ xs: 4 }}>
                            <Box display="flex" alignItems="center" gap={2}>
                              <HeightIcon color="primary" fontSize="medium" />
                              <Typography sx={{ fontSize: '1.1rem' }}>
                                <strong>Size:</strong> {pet.size_display || '-'}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid size={{ xs: 4 }}>
                            <Box display="flex" alignItems="center" gap={2}>
                              <ColorLensIcon color="primary" fontSize="medium" />
                              <Typography sx={{ fontSize: '1.1rem' }}>
                                <strong>Primary color:</strong> {pet.primary_color_display || '-'}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid size={{ xs: 4 }}>
                            <Box display="flex" alignItems="center" gap={2}>
                              <AccessTimeIcon color="primary" fontSize="medium" />
                              <Typography sx={{ fontSize: '1.1rem' }}>
                                <strong>Date:</strong> {formatDate(pet.created_at)}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid size={{ xs: 4 }}>
                            {/* <Box display="flex" alignItems="center" gap={2}>
                            <TagIcon color="primary" fontSize="medium" />
                            <Typography sx={{ fontSize: '1.1rem' }}>
                              <strong>ID:</strong> {pet.identifier}
                            </Typography>
                          </Box> */}
                          </Grid>
                          <Grid size={{ xs: 4 }}>
                            <Box display="flex" alignItems="center" gap={2}>
                              <ColorLensIcon color="primary" fontSize="medium" />
                              <Typography sx={{ fontSize: '1.1rem' }}>
                                <strong>Secondary color:</strong> {pet.secondary_color_display || '-'}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                      {/* phone line */}
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
                              If you have seen this pet, please contact!
                            </Typography>
                            {/* Always show phone, even if blank */}
                            <Box display="flex" justifyContent="center" alignItems="center">
                              <span
                                style={{
                                  color: '#fff',
                                  fontSize: '1.4rem',
                                  fontWeight: '500',
                                }}
                              >
                                {posterPhone ? `+${pet.phone_code} ${posterPhone}` : 'Leave info in app'}
                              </span>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                      {/* qrcode */}
                      <Box sx={{ background: 'rgba(102, 126, 234, 0.07)', width: '100%', maxWidth: '100%' }}>
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
                            <Box sx={{ width: '100%', maxWidth: 120, aspectRatio: '1 / 1' }}>
                              <QRCode
                                value={posterUrl}
                                size={120}
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
                              }}
                            >
                              <Stack direction="column" spacing={2} alignItems="left">
                                <Typography variant="body2" textAlign="start" sx={{ fontWeight: 'bold' }}>
                                  1. Scan the QR code and open the link
                                </Typography>
                                <Typography variant="body2" textAlign="start" sx={{ fontWeight: 'bold' }}>
                                  2. Leave a comment if you've seen the pet
                                </Typography>
                                <Typography variant="body2" textAlign="start" sx={{ fontWeight: 'bold' }}>
                                  3. Follow the pet's status and share the link to help
                                </Typography>
                              </Stack>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </>
          )}
        </Box>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Box mt={4} display="flex" justifyContent="space-between" alignItems="center" textAlign="center">
            <Link
              to={`/user-profile/pets`}
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
    </Container>
  );
};

export default Poster;
