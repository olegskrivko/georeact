import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ComputerIcon from '@mui/icons-material/Computer';
import DevicesIcon from '@mui/icons-material/Devices';
import GroupsIcon from '@mui/icons-material/Groups';
import MapIcon from '@mui/icons-material/Map';
import NotificationsIcon from '@mui/icons-material/Notifications';
import QrCodeIcon from '@mui/icons-material/QrCode';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
// React MUI components
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import illustrationGuides from '../assets/images/home/innovation_amico.svg';
import illustrationServices from '../assets/images/home/veterinary_bro.svg';
import illustrationPets from '../assets/images/support/cat_astronaut_cuate_blue.svg';
import PetPath from '../pages/common/components/PetPath';
import ChatBot from './assistant/components/ChatBot';
import CallToActionBanner from './common/components/CallToActionBanner';
import TestimonialSlider from './common/components/TestimonialSlider';

function Home() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <React.Fragment>
      <Helmet>
        <title>Home - Find Your Lost Pet</title>
        <meta
          name="description"
          content="Help find lost pets and reunite families with their beloved animals. Report, search, and share important information in your region."
        />
        <meta
          name="keywords"
          content="lost pet, find dog, find cat, pet lost, PetRescue, search pet, found animals Latvia"
        />
        <meta property="og:title" content="Home - Find Your Lost Pet" />
        <meta
          property="og:description"
          content="Together we help lost pets return home. Report or search for a lost pet in your area."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* <Container component="main" maxWidth="lg" sx={{ py: 6, paddingLeft: '0', paddingRight: '0' }}></Container> */}

      <Box sx={{ background: theme.palette.custom?.section || theme.palette.background.paper }}>
        <CallToActionBanner
          title="Lost or Found a Pet? "
          description="Use our app to share details with people nearby, get updates from the community on sightings, and increase the chances of a safe return."
          imageSrc={illustrationPets}
          imagePosition="right"
          mainButton={{ text: 'View Map', path: '/pets', variant: 'contained' }}
          optionButton={{ text: 'Add Pet', path: '/add-pet', variant: 'outlined' }}
        />
        <Container
          component="main"
          maxWidth="lg"
          sx={{
            py: 4,
            paddingLeft: '0',
            paddingRight: '0',
            // background: theme.palette.custom?.section || theme.palette.background.paper,
          }}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }} textAlign="center">
              <Typography
                variant={isSmallScreen ? 'h6' : 'h4'}
                sx={{
                  fontWeight: 400,
                  color: '#00b5ad',
                  fontFamily: 'Titillium Web, sans-serif',
                  textTransform: 'uppercase',
                  mb: 4,
                }}
              >
                Digital Support
              </Typography>

              <Typography
                variant={isSmallScreen ? 'h4' : 'h2'}
                color="primary"
                sx={{
                  fontWeight: 500,
                  color: theme.palette.text.secondary,
                  // color: '#16477c',
                  // // background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
                  // // WebkitBackgroundClip: 'text',
                  // // WebkitTextFillColor: 'transparent',
                }}
              >
                How exactly do we help you?
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3} style={{ marginTop: '1rem', marginBottom: '3rem' }}>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} textAlign="center">
              <CardContent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <ComputerIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />

                <div>
                  <Typography
                    variant="h6"
                    style={{
                      marginBottom: '0.5rem',
                      textAlign: 'center',
                      color: '#00b5ad',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    Inclusion on our website
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      textAlign: 'center',
                      color: '#616f7d',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    Your pet is added to our page, making reporting observations especially convenient.
                  </Typography>
                </div>
              </CardContent>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} textAlign="center">
              <CardContent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <QrCodeIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />

                <div>
                  <Typography
                    variant="h6"
                    style={{
                      marginBottom: '0.5rem',
                      textAlign: 'center',
                      color: '#00b5ad',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    Printable poster
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      textAlign: 'center',
                      color: '#616f7d',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    Receive a professionally designed lost pet poster with QR code.
                  </Typography>
                </div>
              </CardContent>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} textAlign="center">
              <CardContent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <MapIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />
                <div>
                  <Typography
                    variant="h6"
                    style={{
                      marginBottom: '0.5rem',
                      textAlign: 'center',
                      color: '#00b5ad',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    Receive observation reports
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      textAlign: 'center',
                      color: '#616f7d',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    Check new observations reported by the community to track leads about your pet.
                  </Typography>
                </div>
              </CardContent>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} textAlign="center">
              <CardContent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <NotificationsIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />
                <div>
                  <Typography
                    variant="h6"
                    style={{
                      marginBottom: '0.5rem',
                      textAlign: 'center',
                      color: '#00b5ad',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    Push notifications
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      textAlign: 'center',
                      color: '#616f7d',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    Receive instant alerts when a lost or found pet is reported in your vicinity.
                  </Typography>
                </div>
              </CardContent>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <PetPath />

      {/* <MapBannerBottom /> */}
      <CallToActionBanner
        title="Pet Services Near You"
        description="Find trusted pet services – from grooming and training to veterinary care. Browse guides, discover local providers, and get the support your pet needs."
        imageSrc={illustrationServices}
        imagePosition="left"
        mainButton={{ text: 'View Services', path: '/services', variant: 'contained' }}
        optionButton={{ text: 'Add Service', path: '/add-service', variant: 'outlined' }}
      />

      <TestimonialSlider />
      <CallToActionBanner
        title="Practical pet care tips"
        description="Learn how to best care for your pet – from daily care to emergency situations. Practical tips, guides, and answers to important questions all in one place."
        imageSrc={illustrationGuides}
        imagePosition="right"
        mainButton={{ text: 'View Tips', path: '/guides', variant: 'contained' }}
      />
      <Container component="main" maxWidth="lg" sx={{ py: 4, paddingLeft: '0', paddingRight: '0' }}>
        <Grid container spacing={3} style={{ marginTop: '1rem', marginBottom: '3rem' }}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} textAlign="center">
            <Typography
              variant={isSmallScreen ? 'h6' : 'h4'}
              sx={{
                fontWeight: 400,
                color: '#00b5ad',
                fontFamily: 'Titillium Web, sans-serif',
                textTransform: 'uppercase',
                mb: 4,
              }}
            >
              Modern Solution
            </Typography>

            <Typography
              variant={isSmallScreen ? 'h4' : 'h2'}
              sx={{
                fontWeight: 500,
                color: '#16477c',
                background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Technology that unites pet lovers
            </Typography>
          </Grid>

          <Grid container spacing={3} style={{ marginTop: '1rem', marginBottom: '3rem' }}>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} textAlign="center">
              <CardContent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <GroupsIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />
                <div>
                  <Typography
                    variant="h6"
                    style={{
                      marginBottom: '0.5rem',
                      textAlign: 'center',
                      color: '#00b5ad',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    Technology that unites pet lovers
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      textAlign: 'center',
                      color: '#616f7d',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    Our application connects people with a common goal – to help find lost pets. A community that
                    collaborates and cares.
                  </Typography>
                </div>
              </CardContent>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} textAlign="center">
              <CardContent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <DevicesIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />
                <div>
                  <Typography
                    variant="h6"
                    style={{
                      marginBottom: '0.5rem',
                      textAlign: 'center',
                      color: '#00b5ad',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    Mobile-optimized platform
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      textAlign: 'center',
                      color: '#616f7d',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    Whether using a phone or tablet – our platform is adapted for comfortable and fast use on all
                    devices. Access what you need anytime and anywhere.
                  </Typography>
                </div>
              </CardContent>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} textAlign="center">
              <CardContent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <SmartphoneIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />
                <div>
                  <Typography
                    variant="h6"
                    style={{
                      marginBottom: '0.5rem',
                      textAlign: 'center',
                      color: '#00b5ad',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    App experience – in browser
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      textAlign: 'center',
                      color: '#616f7d',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    Add our platform to your device's home screen and use it like a real app. No download from store –
                    simple, fast, and always available.
                  </Typography>
                </div>
              </CardContent>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} textAlign="center">
              <CardContent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <AutoFixHighIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />
                <div>
                  <Typography
                    variant="h6"
                    style={{
                      marginBottom: '0.5rem',
                      textAlign: 'center',
                      color: '#00b5ad',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    Artificial Intelligence for your pet's benefit
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      textAlign: 'center',
                      color: '#616f7d',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    Our AI assistant answers questions about pets – from daily care to emergency situations. Knowledge
                    always at hand so you feel safe and informed.
                  </Typography>
                </div>
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Container component="main" maxWidth="lg" sx={{ py: 6, paddingLeft: '0', paddingRight: '0' }}>
        <ChatBot />
      </Container>
    </React.Fragment>
  );
}

export default Home;
