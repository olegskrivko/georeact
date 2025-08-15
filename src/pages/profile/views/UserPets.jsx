import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import PetsIcon from '@mui/icons-material/Pets';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { MenuItem, Modal, Select } from '@mui/material';
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
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// ✅ Import missing icon
import axios from 'axios';
import Lottie from 'lottie-react';
import { useSnackbar } from 'notistack';

import spinnerAnimation from '../../../assets/Animation-1749725645616.json';
import ImgPlaceholder from '../../../assets/placeholder.svg';
import { useAuth } from '../../../contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function UserPets() {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [ownedPets, setOwnedPets] = useState([]);
  const [quota, setQuota] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const initialStatus = selectedPet?.status;
  const MAX_PETS = 5;
  const finalStatusOptions = {
    1: [
      // lost
      { value: 1, label: 'Not Resolved' },
      { value: 8, label: 'Found Dead' },
      { value: 7, label: 'Owner Not Found' },
      { value: 9, label: 'Other' },
    ],

    2: [
      // found
      { value: 1, label: 'Not Resolved' },
      { value: 2, label: 'Returned to Owner' },
      { value: 3, label: 'Given to Shelter' },
      { value: 4, label: 'Still Being Searched' },
      { value: 9, label: 'Other' },
    ],
    3: [
      // seen
      { value: 1, label: 'Not Resolved' },
      { value: 5, label: 'Not Relevant' },
      { value: 6, label: 'Found Dead' },
      { value: 7, label: 'Owner Not Found' },
      { value: 9, label: 'Other' },
    ],
  };
  console.log('selectedPet', selectedPet);
  const fetchUserPetsAndQuota = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setError('You must be logged in to view your pets.');
      setLoading(false);
      return;
    }

    try {
      const [petsRes, quotaRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/accounts/user-pets/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
        axios.get(`${API_BASE_URL}/api/pets/pet-quota/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      ]);

      setOwnedPets(petsRes.data);
      setQuota(quotaRes.data);
    } catch (error) {
      console.error('Error fetching pets or quota:', error);
      setError('Failed to fetch pets or quota.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPetsAndQuota();
  }, []);

  const openDeleteDialog = (pet) => {
    setPetToDelete(pet);
    setDeleteDialogOpen(true);
  };
  const handleEditPet = (pet) => {
    setSelectedPet(pet);
    setNewStatus(pet.final_status || '');
    setEditModalOpen(true);
  };

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
  // Determine number of ghost cards
  const ghostCount = MAX_PETS - ownedPets.length;
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
          My Pets
        </Typography>
        {/* Header */}
        {/* <Typography
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
          My Pets
        </Typography> */}
        {/* Quota */}
        {/* {quota && (
          <Card
            sx={{
              p: { xs: 1, sm: 2 },
              mb: 4,
              borderRadius: 3,
              background: cardBg,
              color: cardText,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
              Your Limit
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 1 }}>
              Allowed pet count: <strong>{quota.limit}</strong>
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 1 }}>
              Currently used: <strong>{quota.used}</strong>
            </Typography>
            <Box mt={3}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Subscription limits:
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Chip label="Freemium: 1" size="small" color="primary" sx={{ pointerEvents: 'none' }} tabIndex={-1} />
                <Chip label="Plus: 3" size="small" color="primary" sx={{ pointerEvents: 'none' }} tabIndex={-1} />
                <Chip label="Premium: 5" size="small" color="primary" sx={{ pointerEvents: 'none' }} tabIndex={-1} />
              </Box>
            </Box>
          </Card>
        )} */}

        {/* Pets List */}
        {ownedPets.length === 0 ? (
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
                  You haven't added any pets yet.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {ownedPets.map((pet) => (
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} key={pet.id}>
                <Card
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
                    </Box>

                    <Tooltip title="Download Poster">
                      <Link to={`/pets/${pet.id}/poster`} style={{ textDecoration: 'none' }}>
                        <IconButton edge="end" size="small" color="warning" aria-label="delete" sx={{ mr: 1 }}>
                          <FileDownloadIcon />
                        </IconButton>
                      </Link>
                    </Tooltip>
                    {pet.is_closed ? (
                      <Tooltip title="Advertisement Closed">
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={() => handleEditPet(pet)}
                          color="info"
                          aria-label="delete"
                          sx={{ mr: 1 }}
                        >
                          <LockOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Close">
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={() => handleEditPet(pet)}
                          color="info"
                          aria-label="delete"
                          sx={{ mr: 1 }}
                        >
                          <LockOpenIcon />
                        </IconButton>
                      </Tooltip>
                    )}

                    <Tooltip title="Delete">
                      <IconButton color="error" size="small" onClick={() => openDeleteDialog(pet)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Card>
              </Grid>
            ))}
            {/* Ghost cards */}
            {Array.from({ length: MAX_PETS - ownedPets.length }).map((_, index) => (
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} key={`ghost-${index}`}>
                <Card
                  sx={{
                    p: { xs: 1, sm: 2 },
                    borderRadius: 3,
                    display: 'flex',
                    justifyContent: 'space-between', // push icon to right
                    alignItems: 'center',
                    // cursor: 'pointer',
                    border: '1px dashed #00b3a4',
                    background: cardBg,
                    color: cardText,
                    transition: 'transform 0.2s ease',
                    boxShadow: '0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                    },
                    minHeight: 80,
                  }}
                >
                  {/* Invisible placeholder avatar */}
                  <Avatar
                    src={ImgPlaceholder}
                    alt={'Unknown'}
                    sx={{
                      width: 64,
                      height: 64,
                      mr: { xs: 1, sm: 2 },
                      visibility: 'hidden', // keeps the space
                    }}
                  />

                  {/* Add pet icon */}
                  <Tooltip title="Add Pet">
                    <IconButton
                      component={Link}
                      to="/add-pet"
                      sx={{
                        color: 'primary.main',
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        padding: 0,
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.2)',
                        },
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Footer */}
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
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

            {/* {quota && quota.remaining <= 0 ? (
              <Box
                sx={{
                  color: 'gray',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  opacity: 0.5,
                  cursor: 'not-allowed',
                }}
              >
                <AddIcon fontSize="small" />
                Add
              </Box>
            ) : (
              <Link
                to="/add-pet"
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
                <AddIcon fontSize="small" />
                Add
              </Link>
            )} */}

            {/* <Button
              component={Link}
              to="/add-pet"
              startIcon={<AddIcon />}
              disabled={quota && quota.remaining <= 0}
              size="small"
              sx={{
                textTransform: 'none',
              }}
            >
              Pievienot
            </Button> */}
          </Box>
        </Grid>

        {/* Edit Dialog */}
        <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} maxWidth="xs" fullWidth>
          <DialogTitle>Edit Status</DialogTitle>
          <DialogContent>
            {/* <Select fullWidth value={newStatus} onChange={(e) => setNewStatus(e.target.value)} sx={{ mt: 1, mb: 2 }}>
            <MenuItem value={1}>Nav atrisināts</MenuItem>
            <MenuItem value={2}>Atgriezts saimniekam</MenuItem>
            <MenuItem value={3}>Nodots patversmei</MenuItem>
            <MenuItem value={4}>Joprojām tiek meklēts</MenuItem>
            <MenuItem value={5}>Nav aktuāli</MenuItem>
            <MenuItem value={6}>Atradies miris</MenuItem>
            <MenuItem value={7}>Saimnieks neatrasts</MenuItem>
          </Select> */}
            <Select fullWidth value={newStatus} onChange={(e) => setNewStatus(e.target.value)} sx={{ mt: 1, mb: 2 }}>
              {(finalStatusOptions[initialStatus] || []).map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={async () => {
                try {
                  const accessToken = localStorage.getItem('access_token');
                  await axios.patch(
                    `${API_BASE_URL}/api/accounts/user-pets/${selectedPet.id}/update/`,
                    { final_status: newStatus },
                    { headers: { Authorization: `Bearer ${accessToken}` } },
                  );
                  await fetchUserPetsAndQuota();
                  setEditModalOpen(false);
                } catch (err) {
                  console.error('Error updating status', err);
                  enqueueSnackbar('Failed to update status.', { variant: 'error' });
                }
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          aria-labelledby="delete-confirmation-dialog"
        >
          <DialogTitle id="delete-confirmation-dialog" sx={{ p: { xs: 2, sm: 2 } }}>
            Delete Pet
          </DialogTitle>
          <DialogContent sx={{ p: { xs: 2, sm: 2 } }}>
            <Typography>
              Are you sure you want to delete this {petToDelete?.species || 'pet'}? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: { xs: 2, sm: 2 } }}>
            <Button onClick={() => setDeleteDialogOpen(false)} disabled={deleting}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={async () => {
                if (!petToDelete) return;
                setDeleting(true);
                const accessToken = localStorage.getItem('access_token');
                try {
                  const response = await fetch(`${API_BASE_URL}/api/accounts/user-pets/${petToDelete.id}/delete/`, {
                    method: 'DELETE',
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                      'Content-Type': 'application/json',
                    },
                  });

                  if (response.ok) {
                    enqueueSnackbar('Pet deleted successfully.', { variant: 'success' });
                    await fetchUserPetsAndQuota(); // refetch pets after delete
                    setDeleteDialogOpen(false);
                    setPetToDelete(null);
                  } else {
                    const errorData = await response.json();
                    enqueueSnackbar(`Error: ${errorData.detail}`, { variant: 'error' });
                  }
                } catch (error) {
                  console.error('Error deleting pet:', error);
                  enqueueSnackbar('Failed to delete pet.', { variant: 'error' });
                } finally {
                  setDeleting(false);
                }
              }}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

export default UserPets;
