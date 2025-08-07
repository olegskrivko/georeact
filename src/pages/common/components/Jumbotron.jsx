import { Link } from 'react-router-dom';

import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';

const Jumbotron = () => {
  return (
    <Grid container spacing={3} mt={8}>
      {/* Left Side */}
      <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            p: { xs: 1, sm: 1, md: 2, lg: 2 },
            borderRadius: 3,
            background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
          }}
        >
          <CardContent
            sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', textAlign: 'center', p: '0 !important' }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, color: '#16477c' }}>
              Support the Project
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Your support will help us continue our mission to reunite lost pets with their families. You can also
              support us by sharing the link on social networks or telling friends about our web application. Every
              contribution, big or small, is important, and we truly appreciate your support!
            </Typography>

            <Box mt="auto">
              <Button
                variant="contained"
                component={Link}
                to="/support"
                fullWidth
                sx={{ borderRadius: 2, mt: 4, py: 1 }}
                color="primary"
              >
                Support the Project
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Right Side */}
      <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            p: { xs: 1, sm: 1, md: 2, lg: 2 },
            borderRadius: 3,
            background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
          }}
        >
          <CardContent
            sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', textAlign: 'center', p: '0 !important' }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, color: '#16477c' }}>
              Share Your Opinion
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Your feedback is important as we strive to improve our application and provide the best service to pet
              owners. Please share your comments, suggestions, or criticism to help us make the application even better.
            </Typography>

            <Box mt="auto">
              <Button
                variant="contained"
                component={Link}
                to="/contact"
                fullWidth
                sx={{ borderRadius: 2, mt: 4, py: 1 }}
                color="primary"
              >
                Leave Feedback
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Jumbotron;
