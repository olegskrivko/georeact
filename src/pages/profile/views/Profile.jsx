import { Suspense, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MapIcon from '@mui/icons-material/Map';
import PetsIcon from '@mui/icons-material/Pets';
import SettingsIcon from '@mui/icons-material/Settings';
import WorkIcon from '@mui/icons-material/Work';
import { Avatar, Box, Container, Grid, IconButton, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useAuth } from '../../../contexts/AuthContext';
import AvatarWithAnimal from '../components/AvatarWithAnimal';

const Profile = () => {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <Typography>Loading...</Typography>;

  const cardItems = [
    {
      to: '/user-profile/bookmarks/pets',
      icon: <BookmarkIcon />,
      label: 'Saved Pet Listings',
    },
    {
      to: '/user-profile/pets',
      icon: <PetsIcon />,
      label: 'My Pets',
    },
    {
      to: '/user-profile/bookmarks/services',
      icon: <FavoriteIcon />,
      label: 'Saved Services',
    },
    {
      to: '/user-profile/services',
      icon: <WorkIcon />,
      label: 'My Services',
    },
    {
      to: '/user-profile/map',
      icon: <MapIcon />,
      label: 'Map with Current Listings',
    },
    {
      to: '/user-profile/settings',
      icon: <SettingsIcon />,
      label: 'Settings',
    },
  ];

  return (
    <Container component="main" maxWidth="lg" disableGutters>
      <Box sx={{ textAlign: 'center', my: { xs: 2, sm: 2, md: 3, lg: 4, xl: 4 } }}>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AvatarWithAnimal animal={user.avatar} username={user.username} />
          <Typography variant="h6" color="primary" mt={1} mb={2} style={{ fontWeight: 'bold' }}>
            {user.username}
          </Typography>
        </Box>
        <Grid container spacing={2} justifyContent="center">
          {cardItems.map(({ to, icon, label }) => (
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} key={to}>
              <Link to={to} style={{ textDecoration: 'none' }}>
                <Paper
                  sx={{
                    p: { xs: 1, sm: 2 },
                    borderRadius: 3,
                    cursor: 'pointer',
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
                    <IconButton
                      sx={{
                        color: 'primary.main',
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.2)',
                        },
                      }}
                    >
                      {icon}
                    </IconButton>
                    <Typography variant="body1" color="text.secondary" sx={{ ml: { xs: 1, sm: 2 } }}>
                      {label}
                    </Typography>
                  </Box>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;
