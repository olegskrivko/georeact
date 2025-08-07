import React, { useState } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CreatePet() {
  const [petData, setPetData] = useState({
    name: '',
    description: '',
    status: '',
    species: '',
    user: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (e) => {
    setPetData({ ...petData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      setUploading(true);

      let imageUrl = null;

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'my_unsigned_preset');

        const cloudRes = await axios.post('https://api.cloudinary.com/v1_1/dymne7cde/image/upload', formData);

        imageUrl = cloudRes.data.secure_url;
      }

      const payload = {
        ...petData,
        user: Number(petData.user),
        image: imageUrl || null,
      };

      console.log('Payload being sent:', payload);

      const apiRes = await axios.post(`${API_BASE_URL}/api/animals/`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      console.log('Animal created:', apiRes.data);
      alert('Animal created successfully!');
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Error: ' + (error.response?.data?.detail || error.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" mb={2}>
        Create New Pet
      </Typography>

      <TextField
        fullWidth
        label="Pet Name"
        name="name"
        value={petData.name}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        fullWidth
        multiline
        label="Description"
        name="description"
        value={petData.description}
        onChange={handleInputChange}
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select name="status" value={petData.status} onChange={handleInputChange} label="Status">
          <MenuItem value={1}>Available</MenuItem>
          <MenuItem value={2}>Adopted</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Species</InputLabel>
        <Select name="species" value={petData.species} onChange={handleInputChange} label="Species">
          <MenuItem value={1}>Dog</MenuItem>
          <MenuItem value={2}>Cat</MenuItem>
          <MenuItem value={3}>Other</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="User ID"
        name="user"
        value={petData.user}
        onChange={handleInputChange}
        margin="normal"
      />

      <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />} sx={{ mt: 2 }}>
        Upload Image
        <input type="file" hidden onChange={handleFileChange} />
      </Button>

      {imageFile && <Typography mt={1}>Selected: {imageFile.name}</Typography>}

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleSubmit} disabled={uploading}>
        {uploading ? <CircularProgress size={24} /> : 'Submit Pet'}
      </Button>
    </Box>
  );
}
