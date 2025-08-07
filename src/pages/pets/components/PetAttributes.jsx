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
import { Box, Grid } from '@mui/material';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import PetAttributeItem from './PetAttributeItem';

const PetAttributes = ({ pet }) => {
  const AGE_LABELS_BY_SPECIES = {
    1: { 1: 'Puppy', 2: 'Adult', 3: 'Senior' },
    2: { 1: 'Kitten', 2: 'Adult', 3: 'Senior' },
    3: { 1: 'Baby', 2: 'Adult', 3: 'Senior' },
  };

  const ageLabel = AGE_LABELS_BY_SPECIES[pet.species]?.[pet.age] || '-';

  const eventDate = pet.event_occurred_at ? new Date(pet.event_occurred_at.replace(' ', 'T')) : null;

  const formattedDate = eventDate ? format(eventDate, 'd. MMMM yyyy', { locale: enUS }) : 'Not available';

  const attributes = [
    { icon: <SearchIcon />, label: 'Status', value: pet.status_display || '' },
    { icon: <PetsIcon />, label: 'Species', value: pet.species_display || '' },
    { icon: <HeightIcon />, label: 'Size', value: pet.size_display || '' },
    { icon: <MaleIcon />, label: 'Gender', value: pet.gender_display || '' },
    { icon: <CakeIcon />, label: 'Age', value: ageLabel },
    { icon: <MergeTypeIcon />, label: 'Breed', value: pet.breed || '' },
    { icon: <TextureIcon />, label: 'Coat Pattern', value: pet.pattern_display || '' },
    { icon: <ColorLensIcon />, label: 'Primary Color', value: pet.primary_color_display || '' },
    { icon: <ColorLensIcon />, label: 'Secondary Color', value: pet.secondary_color_display || '' },
    { icon: <EventIcon />, label: 'Date', value: formattedDate },
  ];

  return (
    <Box>
      <Grid container spacing={1}>
        {attributes.map((attr, idx) => (
          <Grid key={idx} size={{ xs: 12 }}>
            <PetAttributeItem {...attr} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PetAttributes;
