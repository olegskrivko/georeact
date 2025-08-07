import { Link } from 'react-router-dom';

import { Box, Button, CardMedia, Container, Link as MuiLink, Typography } from '@mui/material';

import ImgNotFound from '../../../assets/images/pagenotfound/monster_404_error_rafiki.svg';

const PageNotFound = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Image Above Text */}
        <CardMedia
          component="img"
          src={ImgNotFound}
          alt="404 Not Found"
          sx={{
            width: {
              xs: '100%', // full width on extra small screens
              sm: '80%',
              md: '80%',
              lg: '80%',
            },
            objectFit: 'contain',
            pointerEvents: 'none',
            userSelect: 'none',
            border: 'none',
          }}
        />

        {/* 404 Page Text */}
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2, mt: 4 }}>
          404 - Page Not Found
        </Typography>
        <Typography variant="body2" align="center" sx={{ mb: 4 }}>
          Oops! The page you're looking for doesn't exist.
        </Typography>

        {/* Button to Go Back Home */}
        <Button
          variant="contained"
          component={Link}
          to="/"
          fullWidth
          sx={{ borderRadius: 2, mt: 4, py: 1 }}
          color="primary"
        >
          Back to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default PageNotFound;
