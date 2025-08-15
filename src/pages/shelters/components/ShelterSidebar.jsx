import { useEffect, useState } from 'react';

import { Box, Button, Chip, InputLabel, List, ListItem } from '@mui/material';
import axios from 'axios';

import { SHELTER_CATEGORIES, SHELTER_SIZES } from '../../../constants/Choices';
import ShelterSearchAutocomplete from './ShelterSearchAutocomplete';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ShelterSidebar = ({ filters, setFilters, onFilterChange, onReset }) => {
  const [animalTypes, setAnimalTypes] = useState([]);

  useEffect(() => {
    const fetchAnimalTypes = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/shelters/animal-types/`);
        console.log('animalTypes', animalTypes);
        setAnimalTypes(res.data);
      } catch (err) {
        setAnimalTypes([]);
      }
    };
    fetchAnimalTypes();
  }, []);

  const handleChipClick = (type, value) => {
    const newFilters = {
      ...filters,
      [type]: filters[type] === value ? '' : value,
    };
    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const handleAnimalTypeChipClick = (slug) => {
    const newFilters = {
      ...filters,
      animal_type_slug: filters.animal_type_slug === slug ? '' : slug,
    };
    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const handleSearchSelect = (searchTerm) => {
    const newFilters = {
      ...filters,
      search: searchTerm,
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <form>
      <List sx={{ paddingTop: '0' }}>
        {/* Category Filter */}
        <ListItem sx={{ padding: '0 !important' }}>
          <Box>
            <InputLabel sx={{ fontWeight: '500', color: '#00b3a4' }}>Category</InputLabel>
            {SHELTER_CATEGORIES.map((category) => (
              <Chip
                key={category.value}
                label={category.label}
                clickable
                color={filters.category === category.value ? 'primary' : 'default'}
                onClick={() => handleChipClick('category', category.value)}
                sx={{ marginRight: '5px', marginBottom: '5px' }}
              />
            ))}
          </Box>
        </ListItem>
        {/* Size Filter */}
        <ListItem sx={{ padding: '0 !important' }}>
          <Box>
            <InputLabel sx={{ fontWeight: '500', color: '#00b3a4' }}>Size</InputLabel>
            {SHELTER_SIZES.map((size) => (
              <Chip
                key={size.value}
                label={size.label}
                clickable
                color={filters.size === size.value ? 'primary' : 'default'}
                onClick={() => handleChipClick('size', size.value)}
                sx={{ marginRight: '5px', marginBottom: '5px' }}
              />
            ))}
          </Box>
        </ListItem>

        {/* Animal Type Filter */}
        <ListItem sx={{ padding: '0 !important' }}>
          <Box mt={2}>
            <InputLabel sx={{ fontWeight: '500', color: '#00b3a4' }}>Animal Type</InputLabel>
            {animalTypes.map((type) => (
              <Chip
                key={type.slug}
                label={type.name}
                clickable
                color={filters.animal_type_slug === type.slug ? 'primary' : 'default'}
                onClick={() => handleAnimalTypeChipClick(type.slug)}
                sx={{ marginRight: '5px', marginBottom: '5px' }}
              />
            ))}
          </Box>
        </ListItem>

        {/* Search Filter */}
        <ShelterSearchAutocomplete filters={filters} searchValue={filters.search} onSearchSelect={handleSearchSelect} />

        {/* Reset Filters */}
        <ListItem sx={{ p: 0 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{ borderRadius: 2, mt: 4, py: 1 }}
            color="primary"
            onClick={onReset}
          >
            Reset Filters
          </Button>
        </ListItem>
      </List>
    </form>
  );
};

export default ShelterSidebar;
