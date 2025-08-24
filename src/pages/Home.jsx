import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
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
import FeaturesSection from './common/components/FeaturesSection';
import TestimonialSlider from './common/components/TestimonialSlider';

const featuresIconMap = [GroupsIcon, DevicesIcon, SmartphoneIcon, AutoFixHighIcon];
const supportIconMap = [ComputerIcon, QrCodeIcon, MapIcon, NotificationsIcon];

function Home() {
  const { t } = useTranslation('home');
  const featureItems = t('featuresSection.items', { returnObjects: true }).map((item, i) => ({
    ...item,
    icon: featuresIconMap[i],
  }));

  const supportItems = t('supportSection.items', { returnObjects: true }).map((item, i) => ({
    ...item,
    icon: supportIconMap[i],
  }));

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

      <Box sx={{ background: theme.palette.custom?.section || theme.palette.background.paper }}>
        <CallToActionBanner
          title={t('petsSection.title')}
          description={t('petsSection.paragraph')}
          imageSrc={illustrationPets}
          imagePosition="right"
          mainButton={{ text: t('petsSection.button.view'), path: '/pets', variant: 'contained' }}
          optionButton={{ text: t('petsSection.button.add'), path: '/add-pet', variant: 'outlined' }}
        />

        <FeaturesSection
          title={t('supportSection.title')}
          subtitle={t('supportSection.subtitle')}
          items={supportItems}
        />
      </Box>
      <PetPath />

      <CallToActionBanner
        title={t('servicesSection.title')}
        description={t('servicesSection.paragraph')}
        imageSrc={illustrationServices}
        imagePosition="left"
        mainButton={{ text: t('servicesSection.button.view'), path: '/services', variant: 'contained' }}
        optionButton={{ text: t('servicesSection.button.add'), path: '/add-service', variant: 'outlined' }}
      />

      <TestimonialSlider />
      <CallToActionBanner
        title={t('guidesSection.title')}
        description={t('guidesSection.paragraph')}
        imageSrc={illustrationGuides}
        imagePosition="right"
        mainButton={{ text: t('guidesSection.button.view'), path: '/guides', variant: 'contained' }}
      />
      <FeaturesSection
        title={t('featuresSection.title')}
        subtitle={t('featuresSection.subtitle')}
        items={featureItems}
      />

      <Container component="section" maxWidth="lg" sx={{ py: 4, px: 0 }}>
        {/* Header */}
        <Grid container spacing={3} textAlign="center" sx={{ mb: 6 }}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h4" fontWeight={600} gutterBottom style={{ color: '#16477c' }}>
              {t('postManagementSection.title')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: '600px',
                margin: '0 auto',
                color: '#555',
              }}
            >
              {t('postManagementSection.description')}
            </Typography>
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
