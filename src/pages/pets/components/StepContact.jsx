import React, { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import {
  AGE_CHOICES,
  AGE_CHOICES_BY_SPECIES,
  COLOR_CHOICES,
  GENDER_CHOICES,
  PATTERN_CHOICES,
  PHONE_CODE_CHOICES,
  SIZE_CHOICES,
  SPECIES_CHOICES,
  STATUS_CHOICES,
} from '../../../constants/petOptions';

const StepContact = ({ formState, formErrors, handleChange }) => {
  return (
    <Box>
      <Grid container spacing={2} my={1}>
        {/* Phone Code Field */}
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="phoneCode-label" shrink>
              Phone code
            </InputLabel>
            <Select
              labelId="phoneCode-label"
              id="phoneCode"
              name="phone_code"
              readOnly
              size="small"
              value={formState.contact.phone_code}
              onChange={(e) => handleChange('contact', 'phone_code', e.target.value)}
              label="Phone code"
              notched
            >
              {PHONE_CODE_CHOICES.map((code) => (
                <MenuItem key={code.value} value={code.value}>
                  {code.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Phone Number Field */}
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <TextField
            id="phone"
            name="phone"
            label="Phone number"
            type="text"
            size="small"
            fullWidth
            placeholder="12345678"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={formState.contact.contact_phone}
            onChange={(e) => handleChange('contact', 'contact_phone', e.target.value)}
          />
        </Grid>

        {/* Notes Field */}
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <TextField
            id="notes"
            name="notes"
            label="Notes"
            fullWidth
            multiline
            size="small"
            rows={4}
            variant="outlined"
            value={formState.contact.notes}
            onChange={(e) => {
              const value = e.target.value.slice(0, 250);
              handleChange('contact', 'notes', value);
            }}
            placeholder="Provide important information about appearance, health, circumstances of loss, or other important facts"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StepContact;
