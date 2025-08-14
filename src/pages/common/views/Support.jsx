import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CopyAll, Pets } from '@mui/icons-material';
import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import ImgCollaboration from '../../../assets/images/support/creative_team_amico.svg';
import ImgSupport from '../../../assets/images/support/piggy_bank_amico.svg';
import { DOMAIN_URL, PAYPAL_BUTTON_ID } from '../../../constants/config';

const Support = () => {
  const theme = useTheme();
  const collaborationPoints = [
    'Animal shelters and rescue organizations – to help find homes for lost pets faster.',
    'Veterinary clinics and specialists – to provide valuable advice to pet owners.',
    'Technology and data partnerships – to improve artificial intelligence and data analysis capabilities in finding lost pets.',
    'Social media and media collaborations – to spread information about lost animals as widely as possible.',
    "Developers and designers – if you want to join our team to improve the app's functionality or design, we would be happy to collaborate.",
  ];
  const supportPoints = [
    'Financial support for hosting or cloud services coverage.',
    'Sponsoring the development of new app features.',
    'Sharing our project on social media.',
    'Recommendations or contacts that can help with growth.',
  ];

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(DOMAIN_URL).then(
      () => toast.success('URL copied!'),
      () => toast.error('Failed to copy URL'),
    );
  };

  return (
    <Container maxWidth="lg" disableGutters>
      {/* Helmet for SEO metadata */}
      <Helmet>
        <title>Support - Pet Search Platform</title>
        <meta name="description" content="Support our pet search mission by sharing, donating, or sponsoring." />
        <meta name="keywords" content="support, donate, sponsor, help pets" />
      </Helmet>

      {/* Toast notifications for success and error messages */}
      <ToastContainer />

      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 5,
          mt: { xs: 4, sm: 3, md: 2, lg: 1 },
          color: theme.palette.text.secondary,
        }}
      >
        Support the Project
      </Typography>
      <Grid container spacing={6} alignItems="center">
        {/* Left Side - Illustration Section */}
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <CardMedia
              component="img"
              src={ImgCollaboration}
              alt="Support"
              sx={{
                width: { xs: '100%', sm: '80%', md: '100%' },
                objectFit: 'contain',
                userSelect: 'none',
                pointerEvents: 'none',
                borderRadius: 2,
                mb: 1,
              }}
            />
          </Box>
        </Grid>

        {/* Right Side - Content Section */}
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Typography variant="body1" sx={{ mb: 3 }}>
            We believe that collaborative partnerships can make our platform even better! If you are an animal shelter,
            veterinary clinic, technology company, or simply a passionate animal lover, we would love to hear your
            ideas.
          </Typography>

          <Typography variant="h6" color="primary" sx={{ my: 1, fontWeight: 500 }}>
            We are open to various types of partnerships:
          </Typography>

          <List>
            {collaborationPoints.map((point, index) => (
              <ListItem key={index} sx={{ pl: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <IconButton
                    sx={{
                      cursor: 'default',
                      mr: 2,
                      color: 'primary.main',
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.2)',
                      },
                    }}
                  >
                    <Pets />
                  </IconButton>
                </ListItemIcon>

                <ListItemText primary={point} />
              </ListItem>
            ))}
          </List>

          <Typography variant="body1" sx={{ mt: 3, mb: 4 }}>
            If you have ideas or desire to collaborate, contact us! Together we can create a safer and more supportive
            environment for pet owners.
          </Typography>
        </Grid>
      </Grid>
      {/* Bottom part  */}
      <Grid container spacing={6} alignItems="center">
        {/* Left Side - Illustration Section */}
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} sx={{ order: { xs: 2, sm: 2, md: 1 } }}>
          <Typography variant="body1" sx={{ mb: 3 }}>
            We are grateful for any support or sponsor assistance that can help us unlock the full potential of our web
            application. If you share our vision and would like to invest in premium level and service usage costs,
            please contact us.
          </Typography>
          <Typography variant="h6" color="primary" sx={{ my: 1, fontWeight: 500 }}>
            Ways you can help:
          </Typography>

          {/* List of support options */}
          <List>
            {supportPoints.map((point, index) => (
              <ListItem key={index} sx={{ pl: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {/* <Pets fontSize="small" sx={{ color: '#16477c' }} /> */}
                  <IconButton
                    sx={{
                      cursor: 'default',
                      mr: 2,
                      color: 'primary.main',
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.2)',
                      },
                    }}
                  >
                    <Pets />
                  </IconButton>
                </ListItemIcon>
                <ListItemText primary={point} />
              </ListItem>
            ))}
          </List>

          <Typography variant="body1" sx={{ mt: 3 }}>
            You can also support our project by simply sharing this link:
          </Typography>

          <Box display="flex" alignItems="center" sx={{ my: 2 }}>
            <TextField
              fullWidth
              value={DOMAIN_URL}
              variant="outlined"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <IconButton onClick={handleCopyUrl} sx={{ color: '#16477c' }}>
                    <CopyAll />
                  </IconButton>
                ),
              }}
            />
          </Box>

          {/* PayPal Donation Button Section */}
          <Typography variant="body1" sx={{ mt: 3, mb: 2 }}>
            You can also donate to our project to help us grow! Donations are processed using the secure PayPal
            platform, which guarantees the protection of your data. Your support is very important, and we highly value
            it.
          </Typography>
          {/* PayPal Button for donations */}
          <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{ borderRadius: 2, mt: 4, py: 1 }}
              color="primary"
              onClick={() =>
                window.open(`https://www.paypal.com/donate/?hosted_button_id=${PAYPAL_BUTTON_ID}`, '_blank')
              }
            >
              Donate Now
            </Button>
          </Box>
        </Grid>

        {/* Right Side - Content Section */}
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} sx={{ order: { xs: 1, sm: 1, md: 2 } }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <CardMedia
              component="img"
              src={ImgSupport}
              alt="Support"
              sx={{
                width: { xs: '100%', sm: '80%', md: '100%' },
                objectFit: 'contain',
                userSelect: 'none',
                pointerEvents: 'none',
                borderRadius: 2,
                mb: 1,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Support;
