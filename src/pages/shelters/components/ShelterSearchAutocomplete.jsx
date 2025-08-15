import { useEffect, useState } from 'react';

import { Autocomplete, Box, CircularProgress, InputLabel, ListItem, TextField } from '@mui/material';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ShelterSearchAutocomplete = ({ filters, searchValue, onSearchSelect }) => {
  const [inputValue, setInputValue] = useState('');
  console.log('filtersfilters', filters);
  useEffect(() => {
    // Whenever searchValue from parent changes, update the input
    setInputValue(searchValue || '');
  }, [searchValue]);

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputValue.length >= 3) {
      setLoading(true);
      const fetchSuggestions = async () => {
        try {
          // Added part after ?search=${inputValue} will suggest based on already filtered pets
          const res = await axios.get(
            `${API_BASE_URL}/api/shelters/?search=${inputValue}&category=${filters.category}&size=${filters.size}&animal_type_slug=${filters.animal_type_slug}`,
          );
          const suggestions = res.data.results.map((shelter) => ({
            label: `${shelter.operating_name || ''} ${shelter.description || ''}`.trim(),
            value: shelter.operating_name || '',
          }));
          setOptions(suggestions);
        } catch (err) {
          console.error('Failed to fetch suggestions:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchSuggestions();
    } else {
      setOptions([]);
    }
  }, [inputValue]);

  return (
    <ListItem sx={{ padding: '0 !important', paddingTop: '0.8rem !important' }}>
      <Box sx={{ width: '100%' }}>
        <InputLabel sx={{ fontWeight: '500', color: '#00b3a4' }}>Search</InputLabel>
        <Autocomplete
          freeSolo
          options={options}
          loading={loading}
          inputValue={inputValue}
          onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
          onChange={(e, newValue) => {
            if (newValue === null) {
              setInputValue('');
              onSearchSelect('');
            } else if (typeof newValue === 'string') {
              onSearchSelect(newValue);
            } else if (newValue?.value) {
              onSearchSelect(newValue.label);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Start typing to search..."
              variant="outlined"
              size="small"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading && <CircularProgress color="inherit" size={20} />}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Box>
    </ListItem>
  );
};

export default ShelterSearchAutocomplete;
