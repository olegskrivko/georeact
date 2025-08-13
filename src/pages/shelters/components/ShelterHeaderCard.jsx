import SouthEastIcon from '@mui/icons-material/SouthEast';
import { Box, Card, CardMedia, Grid, Typography } from '@mui/material';

import ImgPlaceholder from '../../../assets/placeholder.svg';

export default function ShelterHeaderCard({ shelter }) {
  return (
    <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3, overflow: 'hidden' }}>
      <Grid container>
        {/* Left: Cover Image */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CardMedia
            component="img"
            src={shelter?.cover_url || ImgPlaceholder}
            alt={shelter?.operating_name}
            sx={{
              width: '100%',
              height: { xs: 280, sm: 360, md: 320 },
              objectFit: 'cover',
              minHeight: 280,
            }}
          />
        </Grid>

        {/* Right: Text Content */}
        <Grid
          size={{ xs: 12, md: 8 }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          sx={{ height: { xs: 360, sm: 400, md: 320 }, p: { xs: 1, sm: 2, md: 3 } }}
        >
          <Box>
            <Typography variant="h3" fontWeight={700} color="primary">
              {shelter?.operating_name}
            </Typography>

            <Typography
              variant="subtitle1"
              color="primary"
              fontWeight={600}
              display="flex"
              alignItems="center"
              gap={0.5}
              sx={{ mt: 1 }}
            >
              {shelter?.distance_km < 1 ? 'Within 1 km' : `${shelter?.distance_km} km away`}
              <SouthEastIcon fontSize="small" />
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              {shelter?.description}
            </Typography>
          </Box>

          {shelter.animal_types && shelter.animal_types.length > 0 && (
            <Box display="flex" flexWrap="wrap" gap={1}>
              {shelter.animal_types.map((type) => (
                <Box
                  key={type.id}
                  sx={{
                    display: 'inline-block',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '16px',
                    backgroundColor: '#00b5ad',
                    color: '#fff',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    letterSpacing: 0.5,
                    userSelect: 'none',
                  }}
                >
                  {type?.name}
                </Box>
              ))}
            </Box>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}
