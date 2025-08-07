import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, Typography } from '@mui/material';

const AccountDeletedPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          my: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4" textAlign="center" color="primary" fontWeight="bold" gutterBottom>
          Your account has been deleted
        </Typography>

        <Typography variant="body1" textAlign="center" component="p" color="text.secondary" sx={{ mb: 3 }}>
          Thank you for being part of our community. We're sorry to see you go! If you ever decide to return, we would be happy to welcome you back.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ borderRadius: 2, py: 1, px: 3 }}
        >
          Return to homepage
        </Button>
      </Box>
    </Container>
  );
};

export default AccountDeletedPage;
