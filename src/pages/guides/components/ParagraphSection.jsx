import { CardMedia, Grid, Typography } from '@mui/material';

import ImgPlaceholder from '../../../assets/placeholder.svg';

const ParagraphSection = ({ paragraph, index, refProp }) => (
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
      <Typography variant="h5" sx={{ mb: 2, color: '#16477c' }}>
        {paragraph?.step_title}
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'justify' }}>
        {paragraph?.content}
      </Typography>
    </Grid>
  </Grid>
);

export default ParagraphSection;
