import React from 'react';
import { Helmet } from 'react-helmet-async';

import CopyrightIcon from '@mui/icons-material/Copyright';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PetsIcon from '@mui/icons-material/Pets';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Lottie from 'lottie-react';

import AnimationRobot from '../../../assets/Animation-1749072232400.json';
import AnimationLoaderPaws from '../../../assets/Animation-1749725645616.json';
import cookiesImg from '../../../assets/cookies.svg';
import ImgAPI from '../../../assets/images/about/application_programming_interface_amico.svg';
import ImgNavigation from '../../../assets/images/about/navigation_pana.svg';
import ImgQRCode from '../../../assets/images/about/qr_code_bro.svg';
import ImgFeedback from '../../../assets/images/contact/customer_feedback_amico_blue.svg';
import ImgSocialMedia from '../../../assets/images/contact/mobile_marketing_cuate_blue.svg';
import ImgBanner from '../../../assets/images/home/banner_dog.jpg';
import ImgInnovationAnimated from '../../../assets/images/home/innovation_animate.svg';
import ImgPet1 from '../../../assets/images/home/pet_icon_1.jpg';
import ImgPet2 from '../../../assets/images/home/pet_icon_2.jpg';
import ImgPet3 from '../../../assets/images/home/pet_icon_3.jpg';
import ImgPet4 from '../../../assets/images/home/pet_icon_4.jpg';
import ImgPet5 from '../../../assets/images/home/pet_icon_5.jpg';
import ImgPet6 from '../../../assets/images/home/pet_icon_6.jpg';
import ImgPagenotfound from '../../../assets/images/pagenotfound/monster_404_error_rafiki.svg';
import AvatarBear from '../../../assets/images/profile/bear.svg';
import AvatarCat from '../../../assets/images/profile/cat.svg';
import AvatarDog from '../../../assets/images/profile/dog.svg';
import AvatarFox from '../../../assets/images/profile/fox.svg';
import AvatarHorse from '../../../assets/images/profile/horse.svg';
import AvatarOwl from '../../../assets/images/profile/owl.svg';
import AvatarPenguin from '../../../assets/images/profile/penguin.svg';
import AvatarPig from '../../../assets/images/profile/pig.svg';
import ImgSupport from '../../../assets/images/support/cat_astronaut_cuate_blue.svg';
import ImgCollaboration from '../../../assets/images/support/creative_team_amico_blue.svg';
import ImgLogo from '../../../assets/logo.svg';
import IconCat from '../../../assets/map_icons/catlocation.svg';
import IconDog from '../../../assets/map_icons/doglocation.svg';
import IconPaw from '../../../assets/map_icons/location.svg';
import IconShelter from '../../../assets/map_icons/pet_house.png';
import IconQRCode from '../../../assets/map_icons/qr-code.png';
import IconService from '../../../assets/map_icons/suitcase.png';
import IconLocation from '../../../assets/map_icons/userlocation.svg';

const attributionList = [
  {
    title: 'Adorable Cat Portrait',
    author: 'Pexels',
    source: 'https://storyset.com/city',
    license: 'Pexels License',
    category: 'Illustration',
    imageUrl: ImgSocialMedia,

    description: 'Cute cat portrait used in pet listings',
  },
  {
    title: 'Pet Care Icons',
    author: 'Unsplash',
    source: 'https://storyset.com/city',
    license: 'MIT License',
    category: 'Illustration',
    imageUrl: ImgFeedback,

    description: 'Pet care and service icons throughout the application',
  },
  {
    title: 'Dog Walking Scene',
    author: 'Pixabay',
    source: 'https://storyset.com/city',
    license: 'Pixabay License',
    category: 'Illustration',
    imageUrl: ImgCollaboration,

    description: 'Dog walking service illustration',
  },
  {
    title: 'Pet Shelter Building',
    author: 'Freepik',
    source: 'https://www.freepik.com/pet-shelter',
    license: 'Freepik License',
    category: 'Illustration',
    imageUrl: ImgSupport,

    description: 'Animal shelter building illustration',
  },
  {
    title: 'Business illustrations by Storyset',
    author: 'Business illustrations by Storyset',
    source: 'https://storyset.com/veterinary',
    license: 'Creative Commons',
    category: 'Illustration',
    imageUrl: ImgAPI,

    description: 'Veterinary care service illustrations',
  },
  {
    title: 'Pet Food Bowl',
    author: 'Icons8',
    source: 'https://icons8.com/pet-food',
    license: 'Icons8 License',
    category: 'Illustration',
    imageUrl: ImgNavigation,

    description: 'Pet food and care related icons',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Illustration',
    imageUrl: ImgQRCode,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Illustration',
    imageUrl: ImgInnovationAnimated,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Illustration',
    imageUrl: ImgPagenotfound,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Golden Retriever Puppy',
    author: 'Unsplash',
    source: 'https://unsplash.com/photos/golden-retriever-puppy',
    license: 'Unsplash License',
    category: 'Icons',
    imageUrl: cookiesImg,

    description: 'Beautiful golden retriever puppy for pet adoption section',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Icons',
    imageUrl: IconCat,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Icons',
    imageUrl: IconDog,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Icons',
    imageUrl: IconShelter,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Icons',
    imageUrl: IconQRCode,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Icons',
    imageUrl: IconService,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Icons',
    imageUrl: IconLocation,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Icons',
    imageUrl: IconPaw,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Images',
    imageUrl: ImgBanner,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Images',
    imageUrl: ImgPet1,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Images',
    imageUrl: ImgPet2,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Images',
    imageUrl: ImgPet3,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Images',
    imageUrl: ImgPet4,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Images',
    imageUrl: ImgPet5,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Images',
    imageUrl: ImgPet6,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Icons',
    imageUrl: AvatarBear,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Icons',
    imageUrl: AvatarCat,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Icons',
    imageUrl: AvatarDog,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Icons',
    imageUrl: AvatarFox,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Icons',
    imageUrl: AvatarHorse,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Icons',
    imageUrl: AvatarOwl,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Icons',
    imageUrl: AvatarPenguin,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Icons',
    imageUrl: AvatarPig,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Lost Pet Poster',
    author: 'Vecteezy',
    source: 'https://www.vecteezy.com/lost-pet',
    license: 'Vecteezy License',
    category: 'Icons',
    imageUrl: ImgLogo,

    description: 'Lost pet poster templates and illustrations',
  },
  {
    title: 'Loading Spinner 1',
    author: 'LottieFiles',
    source: 'https://lottiefiles.com/',
    license: 'Free',
    category: 'Animation',
    lottieData: AnimationRobot,
    description: 'Animated loader graphic.',
  },
  {
    title: 'Loading Spinner 2',
    author: 'LottieFiles',
    source: 'https://lottiefiles.com/',
    license: 'Free',
    category: 'Animation',
    lottieData: AnimationLoaderPaws,
    description: 'Another engaging animated graphic.',
  },
];

const getCategoryColor = (category) => {
  const colors = {
    Photos: '#FF6B35',
    // Images: '#4ECDC4',
    Images: '#45B7D1',
    Illustration: '#96CEB4',
    Icons: '#FFEAA7',
    Animation: '#DDA0DD',
  };
  return colors[category] || '#95A5A6';
};

const AttributionPage = () => {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Attributions & Credits | PetHub</title>
        <meta name="description" content="Credits and attributions for images and assets used in PetHub." />
        <meta property="og:title" content="Attributions & Credits | PetHub" />
        <meta property="og:description" content="Credits and attributions for images and assets used in PetHub." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <Container maxWidth="lg" disableGutters>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(190deg, #16477c 0%, #00b5ad 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            Attributions & Credits
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}>
            We believe in giving proper credit to the talented creators whose work enhances this project. Below are the
            images, icons, and assets we’ve used, along with their respective attributions.
          </Typography>
        </Box>

        {/* Stats Section */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            background: 'linear-gradient(190deg, #16477c 0%, #00b5ad 100%)',
            color: 'white',
            borderRadius: 3,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {attributionList.length}
                </Typography>
                <Typography variant="body1">Total Assets</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {new Set(attributionList.map((item) => item.author)).size}
                </Typography>
                <Typography variant="body1">Unique Sources</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {new Set(attributionList.map((item) => item.category)).size}
                </Typography>
                <Typography variant="body1">Categories</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Attribution Cards */}
        <Grid container spacing={3}>
          {attributionList.map((item, index) => (
            <Grid size={{ xs: 6, sm: 6, md: 3, lg: 3 }} ikey={index}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease-in-out',
                  border: '1px solid rgba(0,0,0,0.05)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <Box sx={{ position: 'relative', p: 1, pb: 0 }}>
                  {/* <CardMedia
                    component="img"
                    height="180"
                    image={item.imageUrl}
                    alt={item.title}
                    sx={{
                      borderRadius: 2,
                      objectFit: 'contain',
                      width: '100%',
                    }}
                  /> */}
                  <Box
                    sx={{
                      width: '100%',
                      height: 180,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    {item.lottieData ? (
                      <Lottie animationData={item.lottieData} loop autoplay style={{ width: '100%', height: '100%' }} />
                    ) : (
                      <CardMedia
                        component="img"
                        height="180"
                        image={item.imageUrl}
                        alt={item.title}
                        sx={{ objectFit: 'contain', width: '100%' }}
                      />
                    )}
                  </Box>

                  <Chip
                    label={item.category}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      backgroundColor: getCategoryColor(item.category),
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                </Box>

                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#2c3e50',
                      mb: 1,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.5 }}>
                    {item.description}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#34495e', mb: 0.5 }}>
                      Author
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.author}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#34495e', mb: 0.5 }}>
                      License
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.license}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#34495e' }}>
                      Source
                    </Typography>
                    <Tooltip title="Visit source">
                      <IconButton
                        component={Link}
                        href={item.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        sx={{
                          color: '#3498db',
                          '&:hover': {
                            backgroundColor: 'rgba(52, 152, 219, 0.1)',
                          },
                        }}
                      >
                        <OpenInNewIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Footer Section */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 4 },
              background: 'linear-gradient(190deg, #16477c 0%, #00b5ad 100%)',
              color: 'white',
              borderRadius: 3,
            }}
          >
            <CopyrightIcon sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Thank You to All Creators
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
              We're grateful to all the talented photographers, designers, and creators who have made their work
              available for use in this project. Your contributions help us create a better experience for pet owners
              and animals alike.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default AttributionPage;
