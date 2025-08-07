import { Link } from 'react-router-dom';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import ImgPlaceholder from '../../../assets/placeholder.svg';

const PetCard = ({ pet, onPanToLocation }) => {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const petLatitude = pet.latitude;
  const petLongitude = pet.longitude;

  const handleLocationClick = () => {
    console.log('Pet coords from pet card:', petLatitude, petLongitude);
    onPanToLocation(petLatitude, petLongitude);
  };

  return (
    <Card sx={{ background: cardBg, color: cardText }}>
      <Link to={`/pets/${pet.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Box position="relative" sx={{ width: '100%', aspectRatio: '4 / 3', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            src={pet?.pet_image_1 || ImgPlaceholder}
            alt={pet?.species_display}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Chip
            label={pet?.status_display}
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
        </Box>
      </Link>

      <CardActions disableSpacing style={{ justifyContent: 'start' }}>
        <Box sx={{ gap: 1 }} style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="primary" style={{ backgroundColor: '#f7f9fd' }} onClick={handleLocationClick}>
            <LocationOnIcon />
          </IconButton>
          <Box>
            <Typography component="p" variant="body2">
              {pet?.species_display}
            </Typography>
            <Typography component="p" variant="caption">
              {/* {pet?.distance_from_riga_km < 1 ? 'Within 1 km' : `${pet?.distance_from_riga_km} km`} */}

              {pet?.distance_km < 1 ? 'Within 1 km' : `${pet?.distance_km} km`}
            </Typography>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default PetCard;
