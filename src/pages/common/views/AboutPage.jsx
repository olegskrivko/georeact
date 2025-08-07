import { Helmet } from 'react-helmet-async';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import ImgAPI from '../../../assets/images/about/application_programming_interface_amico.svg';
import ImgNavigation from '../../../assets/images/about/navigation_pana.svg';
import ImgQRCode from '../../../assets/images/about/qr_code_bro.svg';
import Jumbotron from '../components/Jumbotron';

function AboutPage() {
  return (
    <Container maxWidth="lg" disableGutters>
      {/* SEO META TAGS */}
      <Helmet>
        <title>About Us - Pet Search Platform</title>
        <meta name="description" content="Learn about our app for finding lost pets and helping owners." />
        <meta name="keywords" content="lost pets, pet search, community help" />
      </Helmet>
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
        Application Purpose
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Typography variant="body1">
            The application is designed to effectively help lost pets return to their owners faster. It facilitates
            information exchange and allows for transparent tracking of the search process. The application stands out
            with its modern design, real-time notifications, and artificial intelligence features.
          </Typography>
        </Grid>
      </Grid>

      <Box style={{ marginTop: '80px', marginBottom: '40px' }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Typography variant="h4" align="center" sx={{ fontWeight: 500, color: '#16477c', mb: 4 }}>
              Path to Solution
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Left Paragraph */}
      <Box style={{ marginTop: '80px', marginBottom: '40px' }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
            <Typography variant="h5" textAlign="left" gutterBottom sx={{ color: '#00b5ad' }}>
              Search Challenges
            </Typography>
            <Typography variant="body1" component="p" gutterBottom style={{ textAlign: 'left' }}>
              Lost pet posters on the streets often create confusion — whether the pet has already been found or is
              still being searched for. Without additional information, posters can be misleading as they are not
              updated or removed in a timely manner. Additionally, posters deteriorate in outdoor conditions, reducing
              their effectiveness.
            </Typography>
            <Typography variant="body1" component="p" gutterBottom style={{ textAlign: 'left' }}>
              Additional information about lost pets is often scattered across various social media channels and
              platforms, making it difficult to provide effective and quick assistance. To solve these problems,
              professionally designed posters with QR codes are offered, allowing quick access to the most current
              information about a specific pet on the digital platform. This approach ensures transparent and always
              current monitoring of the search process.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
            <Box position="relative" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <CardMedia component="img" src={ImgQRCode} alt="QR code image" />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Right Paragraph */}
      <Box style={{ marginTop: '80px', marginBottom: '40px' }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }} order={{ xs: 2, md: 1 }}>
            <Box position="relative" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <CardMedia
                component="img"
                src={ImgAPI}
                alt="Web API image"
                style={{
                  width: 'auto',
                  maxHeight: '380px',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }} order={{ xs: 1, md: 2 }}>
            <Typography variant="h5" textAlign="left" gutterBottom sx={{ color: '#00b5ad' }}>
              Innovative Solution
            </Typography>
            <Typography variant="body1" component="p" style={{ textAlign: 'left' }}>
              To effectively solve the problems of searching for lost pets, an application was created that combines
              information in one place and allows easy access to the most current data. It expands the capabilities of
              traditional search methods by integrating real-time notifications and interactive elements, such as QR
              codes on posters. This approach ensures fast and convenient information exchange, promotes community
              engagement, and allows support to be provided even to those who have difficulty using social networks or
              other platforms.
            </Typography>
            <List dense disablePadding sx={{ mt: 2 }}>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 30, color: '#00b5ad' }}>
                  <CheckCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Real-time notifications about lost pets" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 30, color: '#00b5ad' }}>
                  <CheckCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Interactive QR codes on posters" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 30, color: '#00b5ad' }}>
                  <CheckCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Ability for users to mark pet locations on the map" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 30, color: '#00b5ad' }}>
                  <CheckCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Ability to save posts for convenient status tracking" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 30, color: '#00b5ad' }}>
                  <CheckCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="The app can be downloaded for easier access" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>

      {/* Result and Development Direction */}
      <Box style={{ marginTop: '80px', marginBottom: '40px' }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Typography variant="h4" align="center" sx={{ fontWeight: 500, color: '#16477c', mb: 4 }}>
              Result and Development Direction
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Typography variant="body1" component="p" style={{ textAlign: 'left' }}>
              The application was created to solve specific problems and create sustainable value for society, and is
              constantly being improved. From a simple idea, it has evolved into a powerful tool that effectively
              supports pet owners in crisis situations. The platform combines modern design, artificial intelligence
              solutions, and user-friendly interface, making pet search transparent and effective.
            </Typography>
            <Typography variant="body1" component="p" style={{ textAlign: 'left' }}>
              Users can post lost and found pets for free, as well as find related services, shelters, and receive
              practical advice in emergency situations.
            </Typography>
            <Typography variant="body1" component="p" style={{ textAlign: 'left' }}>
              The platform operates thanks to free access and active community engagement. The project continues to
              develop, implementing new features to strengthen community support and increase the platform's impact.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box style={{ marginTop: '80px', marginBottom: '40px' }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Box position="relative" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <CardMedia
                component="img"
                src={ImgNavigation}
                alt="Navigation image"
                style={{
                  width: 'auto',
                  maxHeight: '380px',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Jumbotron />
    </Container>
  );
}

export default AboutPage;
