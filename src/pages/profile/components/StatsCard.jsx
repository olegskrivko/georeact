import { Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const StatsCard = ({ totalPosters, postersCountByPet }) => {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  return (
    <Paper
      sx={{
        p: { xs: 1, sm: 2 },
        borderRadius: 3,
        background: cardBg,
        color: cardText,
      }}
    >
      {/* <Typography variant="h6" sx={{ fontWeight: '700', mb: 2 }}>
        Posters Statistics
      </Typography> */}

      <Typography component="p" variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
        Total Posters: {totalPosters}
      </Typography>

      <Typography component="p" variant="body1" sx={{ mb: 1, fontWeight: 600 }}>
        Posters per Pet:
      </Typography>

      <Stack
        component="ul"
        sx={{
          pl: 3,
          listStyleType: 'disc',

          fontWeight: 500,
          fontSize: '1rem',
        }}
      >
        {Object.entries(postersCountByPet).map(([petId, count]) => (
          <Typography key={petId} component="li" sx={{ mb: 0.5 }}>
            Pet ID {petId}: {count} poster{count > 1 ? 's' : ''}
          </Typography>
        ))}
      </Stack>
    </Paper>
  );
};

export default StatsCard;
