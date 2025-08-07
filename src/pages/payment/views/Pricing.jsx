import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CheckCircle } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import TestVisaCard from '../components/TestVisaCard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const plans = [
  {
    name: 'Freemium Plan',
    price: 'Free',
    id: 'freemium',
    color: '#d0f0f5',
    features: [
      { text: 'Post 1 lost/found pet' },
      { text: 'Post 1 service' },
      { text: 'Receive real-time notifications' },
      { text: 'Standard listing time up to 30 days' },
      { text: 'AI assistant and artificial intelligence features' },
      { text: 'Kudos ❤️', extra: true },
      { text: 'Social media posting', extra: true },
      { text: 'Individual consultations', extra: true },
      { text: 'Ad-free experience', extra: true },
    ],
  },
  {
    name: 'Plus Plan',
    price: '€5 / month',
    id: 'plus',
    color: '#e8f6f9',
    features: [
      { text: 'Post up to 3 lost/found pets' },
      { text: 'Post up to 3 services' },
      { text: 'Receive real-time notifications' },
      { text: 'Extended listing time 90 days' },
      { text: 'AI assistant and artificial intelligence features' },
      { text: 'Kudos ❤️' },
      { text: 'Social media posting' },
      { text: 'Individual consultations', extra: true },
      { text: 'Ad-free experience', extra: true },
    ],
  },
  {
    name: 'Premium Plan',
    price: '€12 / month',
    id: 'premium',
    color: '#e8f6f9',
    features: [
      { text: 'Post up to 5 lost/found pets' },
      { text: 'Post up to 5 services' },
      { text: 'Receive real-time notifications' },
      { text: 'AI assistant and artificial intelligence features' },
      { text: 'Extended listing time 90 days' },
      { text: 'Kudos ❤️' },
      { text: 'Social media posting' },
      { text: 'Individual consultations' },
      { text: 'Ad-free experience' },
    ],
  },
];

const isSubscriptionActive = (endDate) => {
  if (!endDate) return false;
  return new Date() < new Date(endDate);
};

const PricingPage = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscriptionError, setSubscriptionError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showCardModal, setShowCardModal] = useState(true);

  const fetchSubscriptionStatus = async () => {
    try {
      setLoading(true);
      setSubscriptionError(null);

      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/api/payment/subscription/status/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log('Subscription status response:', data);
      setSubscription(data);
    } catch (error) {
      setSubscriptionError('Failed to get subscription status.');
      console.error('Error fetching subscription status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (subscriptionError) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography color="error">{subscriptionError}</Typography>
      </Box>
    );
  }

  const hasActiveSubscription = subscription && isSubscriptionActive(subscription.subscription_end);
  const currentPlanId = subscription?.subscription_type;

  const handleDisabledClick = (e) => {
    e.preventDefault();
    setDialogOpen(true);
  };

  return (
    <Container maxWidth="lg" disableGutters>
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 5,
          fontWeight: 800,
          background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Choose Your Plan
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {plans.map((plan) => {
          const isActive = plan.id === currentPlanId && hasActiveSubscription;

          return (
            <Grid size={{ xs: 12, sm: 8, md: 4, lg: 4 }} key={plan.id} display="flex" justifyContent="center">
              <Box position="relative" width="100%" maxWidth="380px">
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '12px',
                    border: '1px solid #ddd',
                    textAlign: 'center',
                    height: '100%',
                    background: isActive
                      ? 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)'
                      : 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#16477c' }}>
                      {plan.name}
                    </Typography>
                    <Typography variant="h5" mt={1} sx={{ color: '#00b5ad' }} gutterBottom>
                      {plan.price}
                    </Typography>
                    <List sx={{ textAlign: 'left' }}>
                      {plan.features.map((feat, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            <CheckCircle sx={{ color: feat.extra ? '#FF746C' : '#1976d2' }} />
                          </ListItemIcon>
                          <ListItemText primary={feat.text} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>

                  <CardActions sx={{ width: '100%', px: 2, pb: 2 }}>
                    {isActive ? (
                      <Button variant="contained" fullWidth disabled>
                        Active
                      </Button>
                    ) : hasActiveSubscription ? (
                      <Button
                        fullWidth
                        disabled={false}
                        onClick={handleDisabledClick}
                        variant="contained"
                        sx={{ borderRadius: 2, mt: 4, py: 1 }}
                        color="primary"
                      >
                        Choose
                      </Button>
                    ) : (
                      <Link to={`/checkout?plan=${plan.id}`} style={{ width: '100%', textDecoration: 'none' }}>
                        <Button variant="contained" fullWidth sx={{ borderRadius: 2, mt: 4, py: 1 }} color="primary">
                          Choose
                        </Button>
                      </Link>
                    )}
                  </CardActions>
                </Card>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={3} justifyContent="center">
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} display="flex" justifyContent="center">
          {/* Single message below all cards */}
          <Typography variant="body2" align="center" sx={{ mt: 4, color: '#555' }}>
            To manage or cancel your plan, go to your profile.
          </Typography>
        </Grid>
      </Grid>

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Cannot Purchase New Plan</DialogTitle>
        <DialogContent>
          {hasActiveSubscription && (
            <Box mb={3} textAlign="center" color="error.main" fontWeight="bold">
              You already have an active <u>{currentPlanId}</u> plan until{' '}
              {new Date(subscription.subscription_end).toLocaleDateString()}. New plans can only be purchased after this
              period ends.
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Visa Card Modal */}
      <Dialog open={showCardModal} onClose={() => setShowCardModal(false)}>
        <DialogTitle>Test Visa Card Details</DialogTitle>
        <DialogContent>
          <TestVisaCard />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCardModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PricingPage;
