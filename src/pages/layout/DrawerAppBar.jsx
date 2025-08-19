// DrawerAppBar.js
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import PetsIcon from '@mui/icons-material/Pets';
// React MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import logoImg from '../../assets/logo.svg';
import { COMPANY_NAME } from '../../constants/config';
import { useAuth } from '../../contexts/AuthContext';
import { LanguageContext } from '../../contexts/LanguageContext';
import LanguageSelectorTrigger from '../common/components/LanguageSelectorTrigger';
import LocationManager from '../common/components/LocationManager';
import ThemeToggle from '../common/components/ThemeToggleButton';

const drawerWidth = 240;

const links = [
  { path: '/pets', label: 'link.pets' },
  { path: '/shelters', label: 'link.shelters' },
  { path: '/services', label: 'link.services' },
  { path: '/guides', label: 'link.guides' },
];

// const navItems = {
//   '/pets': 'pets',
//   '/shelters': 'shelters',
//   '/services': 'services',
//   '/guides': 'guides',
// };

function DrawerAppBar(props) {
  const { t } = useTranslation('navbar');
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);
  console.log('selectedLanguage', selectedLanguage);
  console.log('t', t);
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box
        style={{
          width: '100%',
          height: '3.5rem',
          // background: 'linear-gradient(190deg, #16477c 0%, #00b5ad 100%)',
          background: theme.palette.custom.navbar,

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'left',
        }}
      >
        <Typography variant="body1" ml={2}>
          <Link
            to="/"
            style={{
              color: '#F5F3CE',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 600,
              letterSpacing: '0.5px',
            }}
          >
            {' '}
            <img
              src={logoImg}
              alt="Logo"
              style={{
                height: 28,
                marginRight: '0.5rem',
              }}
            />
            {/* <DarkModeIcon sx={{ marginRight: '0.4rem', color: '#F5F3CE' }} /> */}
            {COMPANY_NAME}
          </Link>
        </Typography>
      </Box>

      <Divider />
      <List>
        {/* {Object.entries(navItems).map(([path, label]) => (
          <ListItem key={path} disablePadding>
            <ListItemButton sx={{ textAlign: 'left' }}>
              <Link
                key={path}
                to={path}
                style={{
                  textDecoration: 'none',
                  color: cardText,
                }}
              >
           
                <ListItemText primary={t(label)} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))} */}
        {links.map((link) => (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'left' }}>
              <Link
                key={link.path}
                to={link.path}
                style={{
                  textDecoration: 'none',
                  color: cardText,
                }}
              >
                {/* <ListItemText primary={label} /> */}
                <ListItemText primary={t(link.label)} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'left' }}>
            <Link
              to={user ? '/user-profile' : '/login'}
              style={{
                textDecoration: 'none',
                color: cardText,

                width: '100%',
              }}
            >
              {/* <ListItemText primary={user ? 'Profile' : 'Login'} /> */}
              <ListItemText primary={user ? t('link.profile') : t('link.login')} />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  {
    /* <a href="https://storyset.com/people">People illustrations by Storyset</a> */
  }
  return (
    <Box sx={{ flexGrow: 1, zIndex: '99' }}>
      <AppBar
        component="nav"
        position="static"
        sx={{
          // background: '#5B9BD5' ,
          // background: 'linear-gradient(to right, rgba(0,150,136,0.7), rgba(63,81,181,0.7))',
          // background: 'linear-gradient(190deg, #16477c 0%, #00b5ad 100%)',
          background: theme.palette.custom.navbar,
        }}
      >
        <Container maxWidth="lg" disableGutters sx={{ px: { xs: 1, sm: 2, md: 3, lg: 4 } }}>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              // backgroundColor: 'red',
              // padding: '1 !important',
              // margin: '0 !important',
              // px: { xs: 1, sm: 2, md: 3 },
              p: '0 !important',
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              size="small"
              sx={{ mr: 2, display: { sm: 'none' }, color: '#EAEAEA' }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div">
              <Link
                to="/"
                style={{
                  color: '#FFFACD',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                }}
              >
                <img
                  src={logoImg}
                  alt="Logo"
                  style={{
                    height: 28,
                    marginRight: '0.5rem',
                  }}
                />
                {COMPANY_NAME}
              </Link>
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {/* {Object.entries(navItems).map(([path, key]) => (
                <Link
                  key={path}
                  to={path}
                  style={{
                    textDecoration: 'none',
                    color: '#EAEAEA',
                  }}
                >
                  <Button size="small" sx={{ color: '#EAEAEA' }}>
                    {t(key)}
                  </Button>
                </Link>
              ))} */}
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    textDecoration: 'none',
                    color: '#EAEAEA',
                  }}
                >
                  <Button size="small" sx={{ color: '#EAEAEA' }}>
                    {t(link.label)}
                  </Button>
                </Link>
              ))}
              {/* Show Profile or Login Button */}
              <Link to={user ? '/user-profile' : '/login'}>
                <Button size="small" sx={{ color: '#EAEAEA' }}>
                  {/* {user ? 'Profile' : 'Login'} */}
                  {user ? t('link.profile') : t('link.login')}
                </Button>
              </Link>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
              <LocationManager mode="icon-only" />
              <ThemeToggle />
              <LanguageSelectorTrigger />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },

            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: theme.palette.custom.body,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default DrawerAppBar;
