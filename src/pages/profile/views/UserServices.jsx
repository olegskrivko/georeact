import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import WorkIcon from '@mui/icons-material/Work';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
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
// ✅ Import missing icon
import axios from 'axios';
import Lottie from 'lottie-react';
import { useSnackbar } from 'notistack';

import spinnerAnimation from '../../../assets/Animation-1749725645616.json';
import ImgPlaceholder from '../../../assets/placeholder.svg';
import { useAuth } from '../../../contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function UserServices() {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const { user } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ownedServices, setOwnedServices] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [quota, setQuota] = useState(null);
  console.log('user', user);
  console.log('ownedServices', ownedServices);
  const MAX_SERVICES = 5;
  const fetchUserServices = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setError('You must be logged in to view services.');
      setLoading(false);
      return;
    }
    try {
      const [servicesRes, quotaRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/accounts/user-services/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
        axios.get(`${API_BASE_URL}/api/services/service-quota/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      ]);
      setOwnedServices(servicesRes.data);
      setQuota(quotaRes.data);
    } catch (error) {
      console.error('Error fetching services or quota:', error);
      setError('Failed to fetch services or quota');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserServices();
  }, []);

  const handleEditService = (serviceId) => {
    // navigate(`/user-profile/edit-service/${serviceId}`);
  };

  const openDeleteDialog = (service) => {
    setServiceToDelete(service);
    setDeleteDialogOpen(true);
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
          My Services
        </Typography>

        {ownedServices.length === 0 ? (
          // ✅ Display message when user has no services

          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Paper
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
                <IconButton color="primary" style={{ backgroundColor: '#f7f9fd', cursor: 'default' }}>
                  <WorkIcon />
                </IconButton>
                <Typography variant="body1" color="textSecondary" sx={{ ml: { xs: 1, sm: 2 } }}>
                  You haven't added any services yet.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {ownedServices.map((service) => (
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
                  {/* <CardContent> */}
                  <Box display="flex" alignItems="center">
                    <MuiLink href={`/services/${service.id}`} underline="none">
                      <Avatar
                        src={service.service_image_1 || ''}
                        alt={service.operating_name || 'Unknown'}
                        sx={{
                          width: 64,
                          height: 64,
                          mr: { xs: 1, sm: 2 },
                          cursor: 'pointer',
                          border: '2px solid #00b3a4',
                        }}
                      >
                        {service.operating_name || '?'}
                      </Avatar>
                    </MuiLink>
                    <Box flexGrow={1}>
                      <Typography variant="body2">{service?.operating_name}</Typography>
                      {/* <Typography variant="h6">
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
                      </Typography> */}
                      {/* <Box display="flex" alignItems="center" justifyContent="flex-start" gap={1.5}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,

                            color: 'primary.main',
                          }}
                        >
                          {service?.category_display || 'Unknown'}
                        </Typography>
                      </Box> */}
                      <Box>
                        {service.service_categories && service.service_categories.length > 0 && (
                          <Box display="flex" flexWrap="wrap" gap={1}>
                            {service.service_categories.map((type) => (
                              <Chip
                                label={type?.name}
                                onClick={() => {}} // dummy click
                                sx={{
                                  cursor: 'default', // removes the hand pointer
                                  pointerEvents: 'auto', // ensures chip behaves normally visually
                                }}
                                size="small"
                                color="primary"
                              />
                            ))}
                          </Box>
                        )}
                      </Box>
                    </Box>

                    <Tooltip title="Edit">
                      <IconButton
                        edge="end"
                        disabled
                        color="primary"
                        style={{ marginLeft: '0.5rem' }}
                        aria-label="edit"
                        onClick={() => handleEditService(service.id)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    {/* <Tooltip title="Izdzēst">
                      <IconButton
                        edge="end"
                        color="error"
                        style={{ marginLeft: '0.5rem' }}
                        aria-label="delete"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip> */}
                    <Tooltip title="Delete">
                      <IconButton color="error" size="small" onClick={() => openDeleteDialog(service)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  {/* </CardContent> */}
                </Card>
              </Grid>
            ))}

            {Array.from({ length: quota?.limit - ownedServices.length }).map((_, index) => (
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
                  <Tooltip title="Add Service">
                    <IconButton
                      component={Link}
                      to="/add-service"
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
                  to="/add-service"
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
            </Box>
          </Grid>

          {/* Delete Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            aria-labelledby="delete-confirmation-dialog"
          >
            <DialogTitle id="delete-confirmation-dialog" sx={{ p: { xs: 2, sm: 2 } }}>
              Delete Service
            </DialogTitle>
            <DialogContent sx={{ p: { xs: 2, sm: 2 } }}>
              <Typography>
                Are you sure you want to delete this {serviceToDelete?.title || 'service'}? This action cannot be
                undone.
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
                  if (!serviceToDelete) return;
                  setDeleting(true);
                  const accessToken = localStorage.getItem('access_token');
                  try {
                    const response = await fetch(
                      `${API_BASE_URL}/api/accounts/user-services/${serviceToDelete.id}/delete/`,
                      {
                        method: 'DELETE',
                        headers: {
                          Authorization: `Bearer ${accessToken}`,
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    if (response.ok) {
                      enqueueSnackbar('Service deleted successfully.', { variant: 'success' });
                      await fetchUserServices();
                      setDeleteDialogOpen(false);
                      setServiceToDelete(null);
                    } else {
                      const errorData = await response.json();
                      enqueueSnackbar(`Error: ${errorData.detail}`, { variant: 'error' });
                    }
                  } catch (error) {
                    console.error('Error deleting service:', error);
                    enqueueSnackbar('Failed to delete service.', { variant: 'error' });
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
        </Grid>
      </Box>
    </Container>
  );
}

export default UserServices;
