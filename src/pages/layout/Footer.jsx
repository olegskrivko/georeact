import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import InstallPWAButton from '../../InstallPWAButton';
import { APP_NAME } from '../../constants/config';
import { useAuth } from '../../contexts/AuthContext';
import { LanguageContext } from '../../contexts/LanguageContext';
import LocationManager from '../common/components/LocationManager';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const isSubscriptionActive = (endDate) => {
  if (!endDate) return false;
  return new Date() < new Date(endDate);
};

const Footer = () => {
  const YEAR = new Date().getFullYear();
  const theme = useTheme();
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch(`${API_BASE_URL}/api/payment/subscription/status/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setSubscription(data);
      } catch (error) {
        setSubscription(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptionStatus();
  }, [user]);

  const hasActiveSubscription = subscription && isSubscriptionActive(subscription.subscription_end);
  const isPremiumActive = hasActiveSubscription && subscription?.subscription_type === 'premium';

  const appLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About us' },
    { path: '/pets', label: 'Find a pet' },
    { path: '/services', label: 'Services' },
  ];

  const exploreLinks = [
    { path: '/guides', label: 'Pet care tips' },
    { path: '/shelters', label: 'Shelters' },
    { path: '/virtual-pet-training-classes', label: 'Dog school' },
  ];

  const policyLinks = [
    { path: '/policies', label: 'Policies and guidelines' },
    { path: '/pet-matching-quiz', label: 'Which pet should I choose?' },
    { path: '/pricing', label: 'Pricing plan' },
  ];

  const infoLinks = [
    { path: '/contact', label: 'Contact' },
    { path: '/support', label: 'Support' },
    { path: '/frequently-asked-questions', label: 'Frequently asked questions' },
    { path: '/credits', label: 'Credits' },
  ];

  return (
    <React.Fragment>
      <Box
        component="footer"
        sx={{
          padding: '20px 0',
          textAlign: 'center',
          marginTop: 'auto',
          width: '100%',
          margin: 0,
          // background: 'linear-gradient(190deg, #16477c 0%, #00b5ad 100%)',
          background: theme.palette.custom.footer,
        }}
      >
        <Container
          component="main"
          sx={{
            flexGrow: 1,
            paddingTop: '2rem',
            paddingBottom: '2rem',
            width: '100%',
            overflowX: 'hidden',
            py: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
            px: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
          }}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 3, md: 3, lg: 3 }} textAlign="left">
              <Typography variant="h6" color="#DAFF84" style={{ fontWeight: '500' }}>
                Get Started
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {appLinks.map((link) => (
                  <Typography
                    key={link.path}
                    variant="body1"
                    style={{
                      fontWeight: '400',
                      color: '#EAEAEA',
                      pointerEvents: 'auto',
                    }}
                  >
                    <Link key={link.path} to={link.path} style={{ color: '#EAEAEA', textDecoration: 'none' }}>
                      {link.label}
                    </Link>
                  </Typography>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 3, md: 3, lg: 3 }} textAlign="left">
              <Typography variant="h6" color="#DAFF84" style={{ fontWeight: '500' }}>
                Resources
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {exploreLinks.map((link) => (
                  <Typography
                    key={link.path}
                    variant="body1"
                    style={{
                      fontWeight: '400',
                      color: '#EAEAEA',
                      pointerEvents: 'auto',
                    }}
                  >
                    <Link key={link.path} to={link.path} style={{ color: '#EAEAEA', textDecoration: 'none' }}>
                      {link.label}
                    </Link>
                  </Typography>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 3, md: 3, lg: 3 }} textAlign="left">
              <Typography variant="h6" color="#DAFF84" style={{ fontWeight: '500' }}>
                Learn More
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {policyLinks.map((link) => (
                  <Typography
                    key={link.path}
                    variant="body1"
                    style={{
                      fontWeight: '400',
                      color: '#EAEAEA',
                      pointerEvents: 'auto',
                    }}
                  >
                    <Link key={link.path} to={link.path} style={{ color: '#EAEAEA', textDecoration: 'none' }}>
                      {link.label}
                    </Link>
                  </Typography>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 3, md: 3, lg: 3 }} textAlign="left">
              <Typography variant="h6" color="#DAFF84" style={{ fontWeight: '500' }}>
                Info
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {infoLinks.map((link) => (
                  <Typography
                    key={link.path}
                    variant="body1"
                    style={{
                      fontWeight: '400',
                      color: '#EAEAEA',
                      pointerEvents: 'auto',
                    }}
                  >
                    <Link key={link.path} to={link.path} style={{ color: '#EAEAEA', textDecoration: 'none' }}>
                      {link.label}
                    </Link>
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <LocationManager />
        </Box>

        <Container>
          <Grid container>
            {/* SUPPORT */}
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} textAlign="center">
              <Typography gutterBottom variant="body2" sx={{ color: '#fff' }}>
                We are grateful for any support or sponsorship that can help unlock the full potential of the app -{' '}
                <Link
                  to="/support"
                  style={{
                    color: '#DAFF84',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}
                >
                  Support
                </Link>
              </Typography>
            </Grid>

            {/* COPYRIGHT */}
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} textAlign="center">
              <Typography gutterBottom variant="body2" color="#fff">
                &copy; {YEAR} {APP_NAME}. Copyright
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Install PWA Button Section */}
      <InstallPWAButton />
    </React.Fragment>
  );
};

export default Footer;
