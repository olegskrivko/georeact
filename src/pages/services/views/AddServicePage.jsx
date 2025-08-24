import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AddCircle, RemoveCircle } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

import {
  COUNTRY_DIALING_CODE_CHOICES,
  PRICE_TYPE_CHOICES,
  PROVIDER_TYPES,
  SERVICE_CATEGORIES,
} from '../../../constants/petOptions';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DAYS_OF_WEEK = [
  { value: 0, label: 'Monday' },
  { value: 1, label: 'Tuesday' },
  { value: 2, label: 'Wednesday' },
  { value: 3, label: 'Thursday' },
  { value: 4, label: 'Friday' },
  { value: 5, label: 'Saturday' },
  { value: 6, label: 'Sunday' },
];

export default function AddServicePage() {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const cardTextSecondary = theme.palette.text.secondary;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 🎯 DEFAULT VALUES FOR EASY TESTING
  const [serviceData, setServiceData] = useState({
    legal_name: 'Test Legal Company Name',
    operating_name: 'Test Pet Service',
    registration_number: 'TEST123456',
    established_at: '2025-01-01',
    description:
      'This is a test service for testing the API. We provide excellent pet care services including grooming, walking, and training.',
    price: '99.99',
    price_type: '1',
    service_categories: ['walking'], // Changed to array to support multiple categories
    provider: '1',
    email: 'test@example.com',
    national_number: '12345678',
    country_code: '371',
    website_url: 'https://test-service.com',
    locations: [
      {
        location_title: 'Main Office',
        location_description: 'Our main service location in the city center',
        street_address: 'Test Street 123',
        city: 'Riga',
        state_or_province: 'Riga',
        postal_code: 'LV-1000',
        latitude: '56.9496',
        longitude: '24.1052',
        full_address: 'Test Street 123, Riga, Riga, LV-1000',
      },
    ],
  });

  const [images, setImages] = useState({
    service_image_1: null,
    service_image_2: null,
    service_image_3: null,
    service_image_4: null,
  });

  // Handle service-level field changes
  const handleServiceChange = (e) => {
    const { name, value } = e.target;

    if (name === 'service_categories') {
      // Handle multiple selection for service categories
      setServiceData((prev) => ({
        ...prev,
        service_categories: value,
      }));
    } else {
      setServiceData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Location handlers
  const handleLocationChange = (index, e) => {
    const newLocations = [...serviceData.locations];
    newLocations[index][e.target.name] = e.target.value;

    // Auto-generate full_address when location fields change
    const location = newLocations[index];
    const addressParts = [
      location.street_address,
      location.city,
      location.state_or_province,
      location.postal_code,
    ].filter(Boolean);
    location.full_address = addressParts.join(', ');

    setServiceData({ ...serviceData, locations: newLocations });
  };

  const addLocation = () => {
    setServiceData({
      ...serviceData,
      locations: [
        ...serviceData.locations,
        {
          location_title: 'Additional Location',
          location_description: 'Description of additional location',
          street_address: 'Another Street 456',
          city: 'Riga',
          state_or_province: 'Riga',
          postal_code: 'LV-1001',
          latitude: '56.9500',
          longitude: '24.1100',
          full_address: 'Another Street 456, Riga, Riga, LV-1001',
        },
      ],
    });
  };

  const removeLocation = (index) => {
    if (serviceData.locations.length > 1) {
      const newLocations = [...serviceData.locations];
      newLocations.splice(index, 1);
      setServiceData({ ...serviceData, locations: newLocations });
    }
  };

  // Image handling
  const handleImageChange = (field, file) => {
    setImages((prev) => ({ ...prev, [field]: file }));
  };

  // 🎯 SUBMIT HANDLER WITH PROPER LOCATIONS HANDLING
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate required fields
      if (
        !serviceData.operating_name ||
        !serviceData.description ||
        !serviceData.price ||
        !serviceData.service_categories ||
        !serviceData.service_categories.length || // Check if array has items
        !serviceData.provider
      ) {
        throw new Error('Please fill in all required fields');
      }

      // Validate service categories (max 3)
      if (serviceData.service_categories.length > 3) {
        throw new Error('You can select up to 3 service categories');
      }

      // Validate locations
      if (!serviceData.locations.length) {
        throw new Error('At least one location is required');
      }

      // Validate images
      if (!images.service_image_1) {
        throw new Error('At least one image is required');
      }

      // 🎯 BUILD FORMDATA WITH PROPER LOCATIONS HANDLING
      const formData = new FormData();

      // Append main service fields
      formData.append('legal_name', serviceData.legal_name || '');
      formData.append('operating_name', serviceData.operating_name);
      formData.append('registration_number', serviceData.registration_number || '');
      formData.append('established_at', serviceData.established_at || '');
      formData.append('description', serviceData.description);
      formData.append('price', serviceData.price);
      formData.append('price_type', serviceData.price_type);

      // Handle multiple service categories - send as JSON string
      formData.append('service_categories', JSON.stringify(serviceData.service_categories));

      formData.append('provider', serviceData.provider);
      formData.append('email', serviceData.email || '');
      formData.append('national_number', serviceData.national_number || '');
      formData.append('country_code', serviceData.country_code);
      formData.append('website_url', serviceData.website_url || '');

      // 🎯 CRITICAL: Append images
      Object.entries(images).forEach(([field, file]) => {
        if (file) {
          formData.append(`${field}_media`, file);
        }
      });

      // 🎯 CRITICAL: Append locations as JSON string (backend expects this format)
      formData.append('locations', JSON.stringify(serviceData.locations));

      // Debug: Log what we're sending
      console.log('🚀 Submitting service data:', serviceData);
      console.log('🚀 Locations being sent:', serviceData.locations);
      console.log('🚀 Images being sent:', images);
      console.log('🚀 FormData entries:', Object.fromEntries(formData.entries()));

      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('Authentication required. Please log in.');
      }

      const response = await axios.post(`${API_BASE_URL}/api/services/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setSuccess('Service created successfully!');
      console.log('✅ Service created:', response.data);

      // Redirect to the service detail page
      setTimeout(() => {
        navigate(`/services/${response.data.id}`);
      }, 1500);
    } catch (error) {
      console.error('❌ Error creating service:', error);
      setError(error.response?.data?.error || error.message || 'Failed to create service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" disableGutters>
      <Grid container spacing={3}>
        {/* // <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, maxWidth: 1200, mx: 'auto' }}> */}
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Add New Service 🐾
          </Typography>

          <Alert severity="info" sx={{ mb: 2 }}>
            🎯 <strong>Test Mode:</strong> All fields are pre-filled with test data for easy testing!
          </Alert>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          {/* Service Information */}
          {/* <Card sx={{ mb: 3 }}> */}
          <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3, overflow: 'hidden', background: cardBg, color: cardText }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Service Information
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Operating Name *"
                    name="operating_name"
                    value={serviceData.operating_name}
                    onChange={handleServiceChange}
                    fullWidth
                    margin="normal"
                    required
                    helperText="This is the name customers will see"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Legal Name"
                    name="legal_name"
                    value={serviceData.legal_name}
                    onChange={handleServiceChange}
                    fullWidth
                    margin="normal"
                    helperText="Official company name (optional)"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Registration Number"
                    name="registration_number"
                    value={serviceData.registration_number}
                    onChange={handleServiceChange}
                    fullWidth
                    margin="normal"
                    helperText="Business registration number (optional)"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Established Date"
                    name="established_at"
                    type="date"
                    value={serviceData.established_at}
                    onChange={handleServiceChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    helperText="When your business started (optional)"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Description *"
                    name="description"
                    value={serviceData.description}
                    onChange={handleServiceChange}
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                    required
                    helperText="Describe your services in detail"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    type="number"
                    label="Price *"
                    name="price"
                    value={serviceData.price}
                    onChange={handleServiceChange}
                    fullWidth
                    margin="normal"
                    required
                    inputProps={{ min: 0, step: 0.01 }}
                    helperText="Set your service price"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Price Type *</InputLabel>
                    <Select
                      label="Price Type *"
                      name="price_type"
                      value={serviceData.price_type}
                      onChange={handleServiceChange}
                      required
                    >
                      {PRICE_TYPE_CHOICES.map((price) => (
                        <MenuItem key={price.value} value={price.value}>
                          {price.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Service Categories * (Max 3)</InputLabel>
                    <Select
                      label="Service Categories * (Max 3)"
                      name="service_categories"
                      multiple
                      value={serviceData.service_categories}
                      onChange={handleServiceChange}
                      required
                      renderValue={(selected) => selected.join(', ')}
                      inputProps={{
                        maxLength: 3,
                      }}
                    >
                      {SERVICE_CATEGORIES.map((category) => (
                        <MenuItem key={category.value} value={category.value}>
                          {category.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block' }}>
                      Select up to 3 service categories that best describe your services
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Provider Type *</InputLabel>
                    <Select
                      label="Provider Type *"
                      name="provider"
                      value={serviceData.provider}
                      onChange={handleServiceChange}
                      required
                    >
                      {PROVIDER_TYPES.map((provider) => (
                        <MenuItem key={provider.value} value={provider.value}>
                          {provider.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Contact Information */}

          <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3, overflow: 'hidden', background: cardBg, color: cardText }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={serviceData.email}
                    onChange={handleServiceChange}
                    fullWidth
                    margin="normal"
                    helperText="Contact email for customers"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Phone Number"
                    name="national_number"
                    value={serviceData.national_number}
                    onChange={handleServiceChange}
                    fullWidth
                    margin="normal"
                    helperText="Contact phone number"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Phone Code</InputLabel>
                    <Select
                      label="Phone Code"
                      name="country_code"
                      value={serviceData.country_code}
                      onChange={handleServiceChange}
                    >
                      {COUNTRY_DIALING_CODE_CHOICES.map((code) => (
                        <MenuItem key={code.value} value={code.value}>
                          {code.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Website"
                    name="website_url"
                    value={serviceData.website_url}
                    onChange={handleServiceChange}
                    fullWidth
                    margin="normal"
                    helperText="Your business website (optional)"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Images */}
          <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3, overflow: 'hidden', background: cardBg, color: cardText }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Service Images *
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                At least one image is required. Supported formats: JPG, PNG. Max size: 5MB.
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(images).map(([field, file]) => (
                  <Grid size={{ xs: 12, md: 6 }} key={field}>
                    <Box sx={{ textAlign: 'center' }}>
                      <input
                        accept="image/*"
                        id={field}
                        type="file"
                        onChange={(e) => handleImageChange(field, e.target.files[0])}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor={field}>
                        <Box
                          sx={{
                            width: '100%',
                            aspectRatio: '4/3',
                            border: '2px dashed #ccc',
                            borderRadius: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            backgroundColor: file ? '#f0f8ff' : '#fafafa',
                            '&:hover': { borderColor: '#666' },
                          }}
                        >
                          {file ? (
                            <Typography variant="body2" color="primary">
                              {file.name}
                            </Typography>
                          ) : (
                            <>
                              <AddCircle sx={{ fontSize: 40, color: '#999', mb: 1 }} />
                              <Typography variant="body2" color="textSecondary">
                                Add Image
                              </Typography>
                            </>
                          )}
                        </Box>
                      </label>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Locations */}
          <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3, overflow: 'hidden', background: cardBg, color: cardText }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Locations *
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                At least one location is required. Provide coordinates for accurate mapping.
              </Typography>

              {serviceData.locations.map((loc, locIndex) => (
                <Box key={locIndex} sx={{ border: '1px solid #e0e0e0', p: 2, mt: 2, borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1">Location #{locIndex + 1}</Typography>
                    <IconButton
                      color="error"
                      onClick={() => removeLocation(locIndex)}
                      disabled={serviceData.locations.length === 1}
                    >
                      <RemoveCircle />
                    </IconButton>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="Location Title *"
                        name="location_title"
                        value={loc.location_title}
                        onChange={(e) => handleLocationChange(locIndex, e)}
                        fullWidth
                        margin="normal"
                        required
                        helperText="Name for this location"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="Location Description *"
                        name="location_description"
                        value={loc.location_description}
                        onChange={(e) => handleLocationChange(locIndex, e)}
                        fullWidth
                        margin="normal"
                        required
                        helperText="Describe this location"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="Street Address"
                        name="street_address"
                        value={loc.street_address}
                        onChange={(e) => handleLocationChange(locIndex, e)}
                        fullWidth
                        margin="normal"
                        helperText="Street address"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="City"
                        name="city"
                        value={loc.city}
                        onChange={(e) => handleLocationChange(locIndex, e)}
                        fullWidth
                        margin="normal"
                        helperText="City name"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="Region/State"
                        name="state_or_province"
                        value={loc.state_or_province}
                        onChange={(e) => handleLocationChange(locIndex, e)}
                        fullWidth
                        margin="normal"
                        helperText="Region or state"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="Postal Code"
                        name="postal_code"
                        value={loc.postal_code}
                        onChange={(e) => handleLocationChange(locIndex, e)}
                        fullWidth
                        margin="normal"
                        helperText="Postal/ZIP code"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="Latitude *"
                        name="latitude"
                        type="number"
                        value={loc.latitude}
                        onChange={(e) => handleLocationChange(locIndex, e)}
                        fullWidth
                        margin="normal"
                        required
                        inputProps={{ step: '0.000001', min: -90, max: 90 }}
                        placeholder="e.g., 56.9496"
                        helperText="Latitude coordinate (required)"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="Longitude *"
                        name="longitude"
                        type="number"
                        value={loc.longitude}
                        onChange={(e) => handleLocationChange(locIndex, e)}
                        fullWidth
                        margin="normal"
                        required
                        inputProps={{ step: '0.000001', min: -180, max: 180 }}
                        placeholder="e.g., 24.1052"
                        helperText="Longitude coordinate (required)"
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        label="Full Address"
                        name="full_address"
                        value={loc.full_address}
                        fullWidth
                        margin="normal"
                        InputProps={{ readOnly: true }}
                        helperText="Auto-generated from location fields"
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}

              <Button variant="outlined" onClick={addLocation} sx={{ mt: 2 }} startIcon={<AddCircle />}>
                Add Another Location
              </Button>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              sx={{ minWidth: 200 }}
            >
              {loading ? 'Creating Service...' : '🚀 Create Service'}
            </Button>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}
