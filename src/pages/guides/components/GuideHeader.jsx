import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { format, parseISO } from 'date-fns';

const GuideHeader = ({ title, description, createdAt }) => {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const cardTextSecondary = theme.palette.text.secondary;
  const formattedDate = createdAt ? format(parseISO(createdAt), 'MMMM d, yyyy') : 'Unknown date';

  return (
    <>
      {/* <Typography
        component="h1"
        align="center"
        sx={{
          fontWeight: 800,
          fontSize: {
            xs: '1.5rem',
            sm: '2rem',
            md: '2.5rem',
            lg: '2.5rem',
          },
          mb: 5,
          background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {title}
      </Typography> */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 5,
          mt: { xs: 4, sm: 3, md: 2, lg: 1 },
          color: theme.palette.text.secondary,
        }}
      >
        {title}
      </Typography>
      <Typography variant="body1" color="textSecondary" component="p" sx={{ mb: 2, textAlign: 'justify' }}>
        {description}
      </Typography>

      <Typography variant="body2" color="textSecondary" textAlign="left" sx={{ mb: 1, fontStyle: 'italic' }}>
        Published: {formattedDate}
      </Typography>
    </>
  );
};

export default GuideHeader;
