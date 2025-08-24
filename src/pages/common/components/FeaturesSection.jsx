import { CardContent, Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const FeaturesSection = ({ title, subtitle, items }) => {
  const theme = useTheme();
  return (
    <Container component="section" maxWidth="lg" sx={{ py: 4, px: 0 }}>
      {/* Header */}
      <Grid container spacing={3} textAlign="center" sx={{ mb: 6 }}>
        <Grid size={{ xs: 12 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 400,
              color: '#00b5ad',
              fontFamily: 'Titillium Web, sans-serif',
              textTransform: 'uppercase',
              mb: 2,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 500,
              color: theme.palette.text.secondary,
              //   color: '#16477c',
              //   background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
              //   WebkitBackgroundClip: 'text',
              //   WebkitTextFillColor: 'transparent',
            }}
          >
            {subtitle}
          </Typography>
        </Grid>
      </Grid>

      {/* Columns */}
      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 6, lg: 3 }} textAlign="center">
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <item.icon sx={{ fontSize: 60, color: '#00b5ad', mb: 2 }} />
              <Typography
                variant="h5"
                sx={{
                  mb: 1,
                  textAlign: 'center',
                  color: '#00b5ad',
                  fontFamily: 'Titillium Web, sans-serif',
                }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  color: '#616f7d',
                  fontFamily: 'Titillium Web, sans-serif',
                }}
              >
                {item.description}
              </Typography>
            </CardContent>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FeaturesSection;
