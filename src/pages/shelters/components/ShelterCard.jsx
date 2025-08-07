import { Link } from 'react-router-dom';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Card, CardActions, CardMedia, IconButton, Typography } from '@mui/material';

import ImgPlaceholder from '../../../assets/placeholder.svg';

const ShelterCard = ({ shelter, onPanToLocation }) => {
  const handleMapIconClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (shelter.latitude && shelter.longitude && onPanToLocation) {
      onPanToLocation(parseFloat(shelter.latitude), parseFloat(shelter.longitude));
    }
  };

  return (
    <Card>
      <Link to={`/shelters/${shelter.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Box position="relative" sx={{ width: '100%', aspectRatio: '4 / 3', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            image={shelter?.cover_url || ImgPlaceholder}
            alt={shelter?.cover_alt || 'Shelter image'}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
      </Link>
      <CardActions disableSpacing style={{ justifyContent: 'start' }}>
        <Box sx={{ gap: 1 }} style={{ display: 'flex', alignItems: 'center', color: '#343a40' }}>
          <IconButton color="primary" style={{ backgroundColor: '#f7f9fd' }} onClick={handleMapIconClick}>
            <LocationOnIcon />
          </IconButton>
          <Box>
            <Typography component="p" variant="body2">
              {shelter.operating_name?.length > 20
                ? `${shelter.operating_name.slice(0, 20)}...`
                : shelter.operating_name}
            </Typography>
            <Typography component="p" variant="caption">
              {shelter.distance_from_riga_km < 1 ? 'Within 1 km' : `${shelter.distance_from_riga_km} km`}
            </Typography>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ShelterCard;
