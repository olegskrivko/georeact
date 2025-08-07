import {
  Cake as CakeIcon,
  ColorLens as ColorLensIcon,
  Event as EventIcon,
  Height as HeightIcon,
  Male as MaleIcon,
  MergeType as MergeTypeIcon,
  Pets as PetsIcon,
  Search as SearchIcon,
  Texture as TextureIcon,
} from '@mui/icons-material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BadgeIcon from '@mui/icons-material/Badge';
import CasesIcon from '@mui/icons-material/Cases';
import EuroIcon from '@mui/icons-material/Euro';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ReviewsIcon from '@mui/icons-material/Reviews';
import StarIcon from '@mui/icons-material/Star';
import StoreIcon from '@mui/icons-material/Store';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { Box, Grid } from '@mui/material';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import ServiceAttributeItem from './ServiceAttributeItem';

const ServiceAttributes = ({ service }) => {
  // const AGE_LABELS_BY_SPECIES = {
  //   1: { 1: 'Puppy', 2: 'Adult', 3: 'Senior' },
  //   2: { 1: 'Kitten', 2: 'Adult', 3: 'Senior' },
  //   3: { 1: 'Baby', 2: 'Adult', 3: 'Senior' },
  // };

  // const ageLabel = AGE_LABELS_BY_SPECIES[pet.species]?.[pet.age] || '-';

  const eventDate = service.created_at ? new Date(service.created_at.replace(' ', 'T')) : null;

  const formattedDate = eventDate ? format(eventDate, 'd. MMMM yyyy', { locale: enUS }) : 'Not available';

  const attributes = [
    { icon: <ApartmentIcon />, label: 'Title', value: service.operating_name || '' },
    { icon: <CasesIcon />, label: 'Category', value: service.category_display || '' },
    { icon: <BadgeIcon />, label: 'Provider', value: service.provider_display || '' },

    {
      icon: <EuroIcon />,
      label: 'Price starting from ',
      value: `${service.price || ''}/${service.price_type_display || ''}`,
    },
    {
      icon: <PendingActionsIcon />,
      label: 'Currently Available',
      value: service.is_available ? 'Yes' : 'No',
    },
    {
      icon: <TravelExploreIcon />,
      label: 'Business Online',
      value: service.is_online ? 'Yes' : 'No',
    },

    { icon: <EventIcon />, label: 'Joined', value: formattedDate },
    { icon: <ReviewsIcon />, label: 'Reviews', value: service.review_count },
    { icon: <StarIcon />, label: 'Rating', value: `${service.rating}/5` },
  ];

  return (
    <Box>
      <Grid container spacing={1}>
        {attributes.map((attr, idx) => (
          <Grid key={idx} size={{ xs: 12 }}>
            <ServiceAttributeItem {...attr} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ServiceAttributes;
