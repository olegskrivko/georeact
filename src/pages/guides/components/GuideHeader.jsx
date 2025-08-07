import { Typography } from '@mui/material';
import { format, parseISO } from 'date-fns';

const GuideHeader = ({ title, description, createdAt }) => {
  const formattedDate = createdAt ? format(parseISO(createdAt), 'MMMM d, yyyy') : 'Unknown date';

  return (
    <>
      <Typography
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
      </Typography>

      <Typography variant="body1" color="textSecondary" component="p" sx={{ textAlign: 'justify' }}>
        {description}
      </Typography>

      <Typography variant="body2" color="textSecondary" textAlign="left" sx={{ mb: 1, fontStyle: 'italic' }}>
        Published: {formattedDate}
      </Typography>
    </>
  );
};

export default GuideHeader;
