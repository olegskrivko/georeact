import { useEffect, useState } from 'react';

import { Box, Button, Chip, InputLabel, List, ListItem } from '@mui/material';
import axios from 'axios';

import { CATEGORY_CHOICES, PROVIDER_TYPES } from '../../../constants/Choices';
import SearchAutocomplete from './ServiceSearchAutocomplete';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ServiceSidebar = ({ filters, setFilters, onFilterChange, onReset }) => {
  const [serviceCategories, setServiceCategories] = useState([]);

  useEffect(() => {
    const fetchServiceCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/services/service-categories/`);
        console.log('Fetched serviceCategories:', res.data); // ✅ log actual response
        setServiceCategories(res.data);
      } catch (err) {
        setServiceCategories([]);
      }
    };
    fetchServiceCategories();
  }, []);

  const handleServiceCategoryChipClick = (slug) => {
    const newFilters = {
      ...filters,
      service_category_slug: filters.service_category_slug === slug ? '' : slug,
    };
    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const handleChipClick = (type, value) => {
    const newFilters = {
      ...filters,
      [type]: filters[type] === value ? '' : value,
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
        {/* <ListItem sx={{ padding: '0 !important' }}>
          <Box>
            <InputLabel sx={{ fontWeight: '500', color: '#00b3a4' }}>Category</InputLabel>
            {CATEGORY_CHOICES.map((category) => (
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
        </ListItem> */}

        {/* Category Filter */}
        <ListItem sx={{ padding: '0 !important' }}>
          <Box mt={2}>
            <InputLabel sx={{ fontWeight: '500', color: '#00b3a4' }}>Category</InputLabel>
            {serviceCategories.map((type) => (
              <Chip
                key={type.slug}
                label={type.name}
                clickable
                color={filters.service_category_slug === type.slug ? 'primary' : 'default'}
                onClick={() => handleServiceCategoryChipClick(type.slug)}
                sx={{ marginRight: '5px', marginBottom: '5px' }}
              />
            ))}
          </Box>
        </ListItem>

        {/* Service Provider Filter */}
        <ListItem sx={{ padding: '0 !important', paddingTop: '0.8rem !important' }}>
          <Box>
            <InputLabel sx={{ fontWeight: '500', color: '#00b3a4' }}>Service Provider</InputLabel>
            {PROVIDER_TYPES.map((provider) => (
              <Chip
                key={provider.value}
                label={provider.label}
                clickable
                color={filters.provider === provider.value ? 'primary' : 'default'}
                onClick={() => handleChipClick('provider', provider.value)}
                sx={{ marginRight: '5px', marginBottom: '5px' }}
              />
            ))}
          </Box>
        </ListItem>

        {/* Search Filter */}
        <SearchAutocomplete filters={filters} searchValue={filters.search} onSearchSelect={handleSearchSelect} />

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

export default ServiceSidebar;
