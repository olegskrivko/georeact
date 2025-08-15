import React from 'react';

import PhoneIcon from '@mui/icons-material/Phone';
import { Avatar, Box, Card, CardContent, IconButton, Link, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import AnimalAvatar from '../../common/components/AnimalAvatar';

const TabContact = ({ pet }) => {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  return (
    <Card
      sx={{
        p: { xs: 1, sm: 2 },
        borderRadius: 3,
        background: cardBg,
        color: cardText,
      }}
    >
      {/* <CardContent style={{ paddingBottom: '1rem' }}> */}
      <Box display="flex" alignItems="center" mb={2}>
        {/* <Avatar
            src={`a.svg`}
            alt={pet.author.username.toUpperCase()}
            style={{ backgroundColor: '#00b3a4', color: '#f7f9fd' }}
          /> */}

        <AnimalAvatar animal={pet.author.avatar} username={pet.author.username} />

        <Box ml={2}>
          <Typography variant="body2" fontWeight="bold">
            {pet.author.username.toUpperCase()}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" alignItems="center" gap={2} mt={2}>
        <IconButton
          sx={{
            pointerEvents: 'none',
            color: 'primary.main',
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.2)',
            },
          }}
        >
          <PhoneIcon />
        </IconButton>

        {pet.contact_phone ? (
          <Typography variant="body1">
            <Link
              href={`tel:+${pet.phone_code}${pet.contact_phone}`}
              underline="none"
              color="inherit"
              sx={{ cursor: 'pointer' }}
            >
              +{pet.phone_code} {pet.contact_phone}
            </Link>
          </Typography>
        ) : (
          <Box>
            <Typography variant="body1" color="textSecondary">
              Phone number not provided
            </Typography>
          </Box>
        )}
      </Box>
      {/* </CardContent> */}
    </Card>
  );
};

export default TabContact;
