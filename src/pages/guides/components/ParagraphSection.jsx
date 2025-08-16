import { CardMedia, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import ImgPlaceholder from '../../../assets/placeholder.svg';

const ParagraphSection = ({ paragraph, index, refProp }) => {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const cardTextSecondary = theme.palette.text.main;

  return (
    <Grid container spacing={3} key={paragraph.slug || index} mb={2} ref={refProp}>
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} order={{ xs: 2, md: index % 2 === 0 ? 1 : 2 }}>
        <CardMedia
          sx={{ height: 500 }}
          image={paragraph?.illustration_url || ImgPlaceholder}
          title={paragraph?.step_title}
          alt={paragraph?.illustration_alt}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} order={{ xs: 1, md: index % 2 === 0 ? 2 : 1 }}>
        <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>
          {paragraph?.step_title}
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'justify' }}>
          {paragraph?.content}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default ParagraphSection;
