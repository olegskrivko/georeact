import { Link } from 'react-router-dom';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Card, CardActions, CardMedia, Chip, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import ImgPlaceholder from '../../../assets/placeholder.svg';

const ServiceCard = ({ service, onPanToLocation }) => {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const isNew = () => {
    const createdDate = new Date(service.created_at);
    const now = new Date();
    const diffInDays = (now - createdDate) / (1000 * 60 * 60 * 24); // convert ms to days
    return diffInDays <= 7;
  };

  const handleMapIconClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const loc = service.locations && service.locations[0];
    if (loc && loc.latitude && loc.longitude && onPanToLocation) {
      onPanToLocation(parseFloat(loc.latitude), parseFloat(loc.longitude));
    }
  };

  return (
    <Card sx={{ background: cardBg, color: cardText }}>
      <Link to={`/services/${service.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Box position="relative" sx={{ width: '100%', aspectRatio: '4 / 3', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            image={service?.cover_url || ImgPlaceholder}
            alt={service.operating_name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {isNew() && (
            <Chip
              label="New"
              variant="contained"
              sx={{
                backgroundColor: 'rgba(0, 179, 164, 0.6)',
                color: 'white',
                position: 'absolute',
                top: '8px',
                right: '8px',
                zIndex: 3,
              }}
            />
          )}
        </Box>
      </Link>
      <CardActions disableSpacing style={{ justifyContent: 'start' }}>
        <Box sx={{ gap: 1 }} style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={handleMapIconClick}
            sx={{
              color: 'primary.main',
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.2)',
              },
            }}
          >
            <LocationOnIcon />
          </IconButton>
          <Box>
            <Typography component="p" variant="body2">
              {service.operating_name?.length > 20
                ? `${service.operating_name.slice(0, 20)}...`
                : service.operating_name}
            </Typography>
            <Typography component="p" variant="caption">
              {service?.min_distance_km < 1 ? 'Within 1 km' : `${service?.min_distance_km} km`}
            </Typography>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ServiceCard;
