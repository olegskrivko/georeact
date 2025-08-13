// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AddCircle, Delete } from '@mui/icons-material';
// import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import CloseIcon from '@mui/icons-material/Close';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Checkbox,
//   FormControl,
//   FormControlLabel,
//   Grid,
//   IconButton,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
// } from '@mui/material';
// import axios from 'axios';
// import {
//   PHONE_CODE_CHOICES,
//   PRICE_TYPE_CHOICES,
//   PROVIDER_TYPES,
//   SERVICE_CATEGORIES,
// } from '../../../constants/petOptions';
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// export default function AddServicePage() {
//   const navigate = useNavigate();
//   const [formState, setFormState] = useState({
//     category: '',
//     provider_type: '',
//     title: '',
//     description: '',
//     price: '',
//     price_type: '',
//     email: '',
//     // phone: '',
//     phone_number: '',
//     phone_code: '371',
//     website: '',
//     facebook: '',
//     youtube: '',
//     instagram: '',
//     showSocials: false,
//     //   locations: [{ title: '', description: '', lat: '', lng: '' }],
//     locations: [
//       {
//         title: '',
//         description: '',
//         lat: '',
//         lng: '',
//         region: '',
//         city: '',
//         street: '',
//         postal_code: '',
//         full_address: '',
//       },
//     ],
//     service_image_1: '',
//     service_image_2: '',
//     service_image_3: '',
//     service_image_4: '',
//   });
//   const [extraImagesPreview, setExtraImagesPreview] = useState({
//     service_image_1: '',
//     service_image_2: '',
//     service_image_3: '',
//     service_image_4: '',
//   });
//   const [imageErrors, setImageErrors] = useState({
//     service_image_1: '',
//     service_image_2: '',
//     service_image_3: '',
//     service_image_4: '',
//   });
//   const validateImage = (file, field) => {
//     let errors = {};
//     let success = {};
//     // ✅ Allowed file types
//     const allowedTypes = ['image/jpeg', 'image/jpg'];
//     if (!allowedTypes.includes(file.type)) {
//       errors[field] = '❌ Atļauts tikai JPG formāts.';
//     }
//     // ✅ Max file size (5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       errors[field] = '❌ Maksimālais bildes izmērs ir 5MB.';
//     }
//     // ✅ Check file name length
//     if (file.name.length > 50) {
//       errors[field] = '❌ Faila nosaukums ir pārāk garš.';
//     }
//     // ✅ If no errors, show success message
//     if (Object.keys(errors).length === 0) {
//       success[field] = '✅ Faila formāts un izmērs ir pareizs!';
//     }
//     return { errors, success };
//   };
//   const handleImageUpload = (file, field) => {
//     if (!file) return;
//     const { errors } = validateImage(file, field);
//     if (Object.keys(errors).length > 0) {
//       setImageErrors((prev) => ({ ...prev, [field]: errors[field] }));
//       return;
//     }
//     // Reset errors if valid
//     setImageErrors((prev) => ({ ...prev, [field]: null }));
//     // Resize and store image in state
//     resizeAndCropImage(file, (resizedFile) => {
//       setFormState((prevState) => ({
//         ...prevState,
//         [field]: resizedFile,
//       }));
//       const previewUrl = URL.createObjectURL(resizedFile);
//       setExtraImagesPreview((prev) => ({
//         ...prev,
//         [field]: previewUrl,
//       }));
//     });
//   };
//   const handleChange = (field, value) => {
//     setFormState((prevState) => {
//       let newState = { ...prevState, [field]: value };
//       // Reset secondary color when pattern changes
//       // if (field === 'pattern') {
//       //   newState.secondary_color = { hex: "", label: "", value: "", };
//       // }
//       return newState;
//     });
//   };
//   const handleClearSelect = (field) => {
//     setFormState((prevState) => {
//       let updatedState = { ...prevState };
//       // Check the field passed and clear corresponding fields
//       if (field === 'pattern') {
//         updatedState.pattern = '';
//         updatedState.primary_color = { hex: '', label: '', value: '' };
//         updatedState.secondary_color = { hex: '', label: '', value: '' };
//       } else if (field === 'primary_color') {
//         updatedState.primary_color = { hex: '', label: '', value: '' };
//         updatedState.secondary_color = { hex: '', label: '', value: '' };
//       } else if (field === 'secondary_color') {
//         updatedState.secondary_color = { hex: '', label: '', value: '' };
//       }
//       return updatedState;
//     });
//   };
//   const resizeAndCropImage = (file, callback) => {
//     const reader = new FileReader();
//     reader.onload = function (event) {
//       const img = new Image();
//       img.onload = function () {
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');
//         const targetWidth = 800;
//         const targetAspectRatio = 4 / 3;
//         const targetHeight = targetWidth / targetAspectRatio;
//         const quality = 0.8;
//         let srcX = 0,
//           srcY = 0,
//           srcWidth = img.width,
//           srcHeight = img.height;
//         if (img.width / img.height > targetAspectRatio) {
//           srcWidth = img.height * targetAspectRatio;
//           srcX = (img.width - srcWidth) / 2;
//         } else {
//           srcHeight = img.width / targetAspectRatio;
//           srcY = (img.height - srcHeight) / 2;
//         }
//         canvas.width = targetWidth;
//         canvas.height = targetHeight;
//         ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, 0, 0, targetWidth, targetHeight);
//         const fileExtension = file.name.split('.').pop().toLowerCase();
//         const mimeType = fileExtension === 'png' ? 'image/png' : 'image/jpeg';
//         canvas.toBlob(
//           (blob) => {
//             const resizedFile = new File([blob], `resized_service.${fileExtension}`, { type: mimeType });
//             callback(resizedFile);
//           },
//           mimeType,
//           quality,
//         );
//       };
//       img.src = event.target.result;
//     };
//     reader.readAsDataURL(file);
//   };
//   const handleClearImage = (field) => {
//     // Clear the image from form state and preview
//     setFormState((prevState) => ({ ...prevState, [field]: '' }));
//     setExtraImagesPreview((prev) => ({ ...prev, [field]: '' }));
//   };
//   useEffect(() => {
//     return () => {
//       Object.values(extraImagesPreview).forEach((preview) => {
//         if (preview) URL.revokeObjectURL(preview);
//       });
//     };
//   }, [extraImagesPreview]);
//   const handleLocationChange = (index, field) => (e) => {
//     const newLocations = [...formState.locations];
//     newLocations[index][field] = e.target.value;
//     setFormState((prevState) => ({
//       ...prevState,
//       locations: newLocations,
//     }));
//   };
//   const handleAddLocation = () => {
//     setFormState((prev) => ({
//       ...prev,
//       locations: [...prev.locations, { title: '', description: '', lat: '', lng: '' }],
//     }));
//   };
//   const handleRemoveLocation = (index) => {
//     const updatedLocations = formState.locations.filter((_, i) => i !== index);
//     setFormState((prev) => ({
//       ...prev,
//       locations: updatedLocations,
//     }));
//   };
//   /** Submit form data to the backend */
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log('🚀 Submitting form:', formState);
//     try {
//       const accessToken = localStorage.getItem('access_token');
//       const formData = new FormData();
//       // Format the locations properly
//       // formState.locations.forEach((loc, index) => {
//       //     const lat = parseFloat(loc.lat).toFixed(6);
//       //     const lng = parseFloat(loc.lng).toFixed(6);
//       //     if (isNaN(lat) || isNaN(lng)) {
//       //       console.error(`❌ Invalid coordinates at location ${index + 1}`);
//       //       return;
//       //     }
//       //     // Append each location's fields to FormData
//       //     formData.append(`locations[${index}][title]`, loc.title);
//       //     formData.append(`locations[${index}][description]`, loc.description);
//       //     formData.append(`locations[${index}][lat]`, lat);
//       //     formData.append(`locations[${index}][lng]`, lng);
//       //   });
//       // const locations = [
//       //     {
//       //       title: 'vv',
//       //       description: 'vvv',
//       //       lat: '22.450000',
//       //       lng: '56.230000'
//       //     },
//       //     {
//       //       title: 'mmm',
//       //       description: 'mmm',
//       //       lat: '23.450000',
//       //       lng: '57.230000'
//       //     }
//       //   ];
//       //   formData.append("locations", JSON.stringify(locations));
//       formData.append('locations', JSON.stringify(formState.locations));
//       //   formData.append("locations", locations);
//       // Append form fields
//       formData.append('category', formState.category);
//       formData.append('provider_type', formState.provider_type);
//       formData.append('phone_number', formState.phone_number);
//       formData.append('phone_code', formState.phone_code);
//       formData.append('title', formState.title);
//       formData.append('description', formState.description);
//       formData.append('price', formState.price);
//       formData.append('price_type', formState.price_type);
//       formData.append('email', formState.email);
//       formData.append('phone', formState.phone);
//       formData.append('website', formState.website);
//       //   formData.append('latitude', latitude);
//       //   formData.append('longitude', longitude);
//       // Append images
//       ['service_image_1', 'service_image_2', 'service_image_3', 'service_image_4'].forEach((field) => {
//         if (formState[field]) {
//           formData.append(`${field}_media`, formState[field]);
//         }
//       });
//       // Append the author (logged-in user)
//       //   if (user?.userId) {
//       //     formData.append('user', user.userId);
//       //   }
//       console.log('🚀 FormData ready to send:', Object.fromEntries(formData.entries()));
//       // Send request to backend
//       const response = await axios.post(`${API_BASE_URL}/api/services/`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       console.log('✅ Service successfully added!', response.data);
//       navigate(`/services/${response.data.id}`);
//     } catch (error) {
//       console.error('❌ Error sending service data:', error.response?.data || error.message);
//     }
//   };
//   const getImageBackground = (field) => {
//     return extraImagesPreview[field] ? `url(${extraImagesPreview[field]}) center/cover` : '#f5f5f5';
//   };
//   return (
//     <Box p={4}>
//       <Typography variant="h4" gutterBottom>
//         Add a New Service
//       </Typography>
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography variant="h6">Service Info</Typography>
//           <Box my={2}>
//             <Grid container spacing={2}>
//               {['service_image_1', 'service_image_2', 'service_image_3', 'service_image_4'].map((field) => (
//                 <Grid item xs={6} md={3} key={field}>
//                   <Box sx={{ position: 'relative' }}>
//                     <input
//                       accept="image/*"
//                       id={field}
//                       type="file"
//                       onChange={(e) => handleImageUpload(e.target.files[0], field)}
//                       style={{ display: 'none' }}
//                     />
//                     <label htmlFor={field} style={{ display: 'block' }}>
//                       <Box
//                         sx={{
//                           width: '100%',
//                           aspectRatio: '4 / 3',
//                           background: getImageBackground(field),
//                           // border: `2px dashed ${imageErrors[field] ? "red" : "#aaa"}`,
//                           // border: extraImagesPreview[field] ? "none" : "1px solid #aaa",
//                           border: imageErrors[field] ? '1px solid red' : 'none',
//                           display: 'flex',
//                           flexDirection: 'column',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           textAlign: 'center',
//                           cursor: 'pointer',
//                           borderRadius: '12px',
//                           color: '#666',
//                           position: 'relative',
//                           transition: 'border 0.3s ease',
//                           '&:hover': { borderColor: '#666' },
//                         }}
//                       >
//                         {!extraImagesPreview[field] && (
//                           <>
//                             <AddPhotoAlternateIcon sx={{ fontSize: 40, mb: 1, color: '#999' }} />
//                             <Typography variant="body2">Izvēlēties bildi</Typography>
//                             <Typography variant="caption">Atļautais formāts: JPG, Max 5MB</Typography>
//                           </>
//                         )}
//                       </Box>
//                     </label>
//                     {/* Close IconButton placed outside the label */}
//                     {extraImagesPreview[field] && (
//                       <IconButton
//                         size="small"
//                         onClick={(e) => {
//                           e.stopPropagation(); // Prevents event from bubbling up
//                           handleClearImage(field);
//                         }}
//                         sx={{
//                           position: 'absolute',
//                           top: 4, // Adjust positioning
//                           right: 4, // Adjust positioning
//                           zIndex: 10, // Ensure it's above other elements
//                           backgroundColor: '#f5f5f5',
//                           '&:hover': { backgroundColor: '#e0e0e0' },
//                           borderRadius: '50%',
//                           boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
//                         }}
//                       >
//                         <CloseIcon fontSize="small" sx={{ color: '#616161' }} />
//                       </IconButton>
//                     )}
//                   </Box>
//                   {imageErrors[field] && (
//                     <Typography color="red" variant="body2" mt={1} textAlign="center">
//                       {imageErrors[field]}
//                     </Typography>
//                   )}
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//           <TextField
//             label="Title"
//             fullWidth
//             margin="normal"
//             value={formState.title}
//             onChange={(e) => handleChange('title', e.target.value)}
//           />
//           <TextField
//             label="Description"
//             fullWidth
//             multiline
//             rows={4}
//             margin="normal"
//             value={formState.description}
//             onChange={(e) => handleChange('description', e.target.value)}
//           />
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Kategorija</InputLabel>
//             <Select
//               value={formState.category}
//               label="Kategorija"
//               onChange={(e) => handleChange('category', e.target.value)}
//             >
//               {SERVICE_CATEGORIES.map((category) => (
//                 <MenuItem key={category.value} value={category.value}>
//                   {category.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Pakalpojuma sniedzējs</InputLabel>
//             <Select
//               value={formState.provider_type}
//               label="Pakalpojuma sniedzējs"
//               onChange={(e) => handleChange('provider_type', e.target.value)}
//             >
//               {PROVIDER_TYPES.map((provider) => (
//                 <MenuItem key={provider.value} value={provider.value}>
//                   {provider.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <TextField
//             label="Cena"
//             type="number"
//             fullWidth
//             margin="normal"
//             value={formState.price}
//             onChange={(e) => handleChange('price', e.target.value)}
//           />
//           {/* <FormControl fullWidth margin="normal">
//             <InputLabel>Price Unit</InputLabel>
//             <Select value={formState.priceUnit} label="Price Unit"  onChange={(e) => handleChange('priceUnit', e.target.value)}>
//               <MenuItem value="hour">Per Hour</MenuItem>
//               <MenuItem value="day">Per Day</MenuItem>
//               <MenuItem value="item">Per Item</MenuItem>
//             </Select>
//           </FormControl> */}
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Mērvienība</InputLabel>
//             <Select
//               value={formState.price_type}
//               label="Mērvienība"
//               onChange={(e) => handleChange('price_type', e.target.value)}
//             >
//               {PRICE_TYPE_CHOICES.map((unit) => (
//                 <MenuItem key={unit.value} value={unit.value}>
//                   {unit.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </CardContent>
//       </Card>
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography variant="h6">Contacts</Typography>
//           <TextField
//             label="Email"
//             fullWidth
//             margin="normal"
//             value={formState.email}
//             onChange={(e) => handleChange('email', e.target.value)}
//           />
//           {/* <FormControl fullWidth margin="normal">
//   <InputLabel>Mērvienība</InputLabel>
//   <Select
//     value={formState.phone_code}
//     label="Mērvienība"
//     onChange={(e) => handleChange('phone_code', e.target.value)}
//   >
//     {PRICE_TYPE_CHOICES.map((code) => (
//       <MenuItem key={unit.value} value={code.value}>
//         {code.label}
//       </MenuItem>
//     ))}
//   </Select>
// </FormControl> */}
//           <FormControl fullWidth variant="outlined">
//             <InputLabel id="phoneCode-label" shrink>
//               Telefona kods
//             </InputLabel>
//             <Select
//               labelId="phoneCode-label"
//               id="phoneCode"
//               name="phone_code"
//               readOnly
//               value={formState.phone_code}
//               onChange={(e) => handleChange('phone_code', e.target.value)}
//               label="Telefona kods"
//               notched
//             >
//               {PHONE_CODE_CHOICES.map((code) => (
//                 <MenuItem key={code.value} value={code.value}>
//                   {code.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <TextField
//             label="Telefons"
//             fullWidth
//             margin="normal"
//             value={formState.phone_number}
//             onChange={(e) => handleChange('phone_number', e.target.value)}
//           />
//           <TextField
//             label="Website"
//             fullWidth
//             margin="normal"
//             value={formState.website}
//             onChange={(e) => handleChange('website', e.target.value)}
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={formState.showSocials}
//                 onChange={() => handleChange('showSocials', !formState.showSocials)}
//               />
//             }
//             label="Add Social Networks"
//           />
//           {formState.showSocials && (
//             <>
//               <TextField
//                 label="Facebook"
//                 fullWidth
//                 margin="normal"
//                 value={formState.facebook}
//                 onChange={(e) => handleChange('facebook', e.target.value)}
//               />
//               <TextField
//                 label="YouTube"
//                 fullWidth
//                 margin="normal"
//                 value={formState.youtube}
//                 onChange={(e) => handleChange('youtube', e.target.value)}
//               />
//               <TextField
//                 label="Instagram"
//                 fullWidth
//                 margin="normal"
//                 value={formState.instagram}
//                 onChange={(e) => handleChange('instagram', e.target.value)}
//               />
//             </>
//           )}
//         </CardContent>
//       </Card>
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography variant="h6">Locations</Typography>
//           {formState.locations.map((loc, index) => (
//             <Grid container spacing={2} alignItems="center" key={index} sx={{ mb: 2 }}>
//               <Grid item xs={12} sm={4}>
//                 <TextField label="Title" fullWidth value={loc.title} onChange={handleLocationChange(index, 'title')} />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   label="Description"
//                   fullWidth
//                   value={loc.description}
//                   onChange={handleLocationChange(index, 'description')}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={2}>
//                 <TextField label="Lat" fullWidth value={loc.lat} onChange={handleLocationChange(index, 'lat')} />
//               </Grid>
//               <Grid item xs={12} sm={2}>
//                 <TextField label="Lng" fullWidth value={loc.lng} onChange={handleLocationChange(index, 'lng')} />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Region"
//                   fullWidth
//                   value={loc.region}
//                   onChange={handleLocationChange(index, 'region')}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField label="City" fullWidth value={loc.city} onChange={handleLocationChange(index, 'city')} />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Street"
//                   fullWidth
//                   value={loc.street}
//                   onChange={handleLocationChange(index, 'street')}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Postal code"
//                   fullWidth
//                   value={loc.postal_code}
//                   onChange={handleLocationChange(index, 'postal_code')}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Full address"
//                   fullWidth
//                   value={loc.full_address}
//                   onChange={handleLocationChange(index, 'full_address')}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={1}>
//                 <IconButton color="error" onClick={() => handleRemoveLocation(index)}>
//                   <Delete />
//                 </IconButton>
//               </Grid>
//             </Grid>
//           ))}
//           <Button startIcon={<AddCircle />} onClick={handleAddLocation}>
//             Add Location
//           </Button>
//         </CardContent>
//       </Card>
//       <Button variant="contained" color="primary" onClick={handleSubmit}>
//         Submit
//       </Button>
//     </Box>
//   );
// }
import React, { useState } from 'react';

import { AddCircle, RemoveCircle } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

const DAYS_OF_WEEK = [
  { value: 0, label: 'Monday' },
  { value: 1, label: 'Tuesday' },
  { value: 2, label: 'Wednesday' },
  { value: 3, label: 'Thursday' },
  { value: 4, label: 'Friday' },
  { value: 5, label: 'Saturday' },
  { value: 6, label: 'Sunday' },
];

export default function ServiceForm() {
  const [serviceData, setServiceData] = useState({
    legal_name: '',
    operating_name: '',
    description: '',
    price: '',
    price_type: '',
    category: '',
    provider: '',
    locations: [
      {
        location_title: '',
        location_description: '',
        street_address: '',
        city: '',
        state_or_province: '',
        postal_code: '',
        country: '',
        latitude: '',
        longitude: '',
        working_hours: [
          {
            day: '',
            from_hour: '',
            to_hour: '',
          },
        ],
      },
    ],
  });

  // Handle service-level field changes
  const handleServiceChange = (e) => {
    setServiceData({ ...serviceData, [e.target.name]: e.target.value });
  };

  // Location handlers
  const handleLocationChange = (index, e) => {
    const newLocations = [...serviceData.locations];
    newLocations[index][e.target.name] = e.target.value;
    setServiceData({ ...serviceData, locations: newLocations });
  };

  const addLocation = () => {
    setServiceData({
      ...serviceData,
      locations: [
        ...serviceData.locations,
        {
          location_title: '',
          location_description: '',
          street_address: '',
          city: '',
          state_or_province: '',
          postal_code: '',
          country: '',
          latitude: '',
          longitude: '',
          working_hours: [
            {
              day: '',
              from_hour: '',
              to_hour: '',
            },
          ],
        },
      ],
    });
  };

  const removeLocation = (index) => {
    const newLocations = [...serviceData.locations];
    newLocations.splice(index, 1);
    setServiceData({ ...serviceData, locations: newLocations });
  };

  // Working hours handlers
  const handleWorkingHourChange = (locIndex, whIndex, e) => {
    const newLocations = [...serviceData.locations];
    newLocations[locIndex].working_hours[whIndex][e.target.name] = e.target.value;
    setServiceData({ ...serviceData, locations: newLocations });
  };

  const addWorkingHour = (locIndex) => {
    const newLocations = [...serviceData.locations];
    newLocations[locIndex].working_hours.push({ day: '', from_hour: '', to_hour: '' });
    setServiceData({ ...serviceData, locations: newLocations });
  };

  const removeWorkingHour = (locIndex, whIndex) => {
    const newLocations = [...serviceData.locations];
    newLocations[locIndex].working_hours.splice(whIndex, 1);
    setServiceData({ ...serviceData, locations: newLocations });
  };

  // Submit handler (just logs here)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting service:', serviceData);
    // TODO: call API to save
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Add Service
      </Typography>

      <TextField
        label="Legal Name"
        name="legal_name"
        value={serviceData.legal_name}
        onChange={handleServiceChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Operating Name"
        name="operating_name"
        value={serviceData.operating_name}
        onChange={handleServiceChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Description"
        name="description"
        value={serviceData.description}
        onChange={handleServiceChange}
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />
      {/* Add price, price_type, category, provider dropdowns similarly */}

      <Typography variant="h5" sx={{ mt: 4 }}>
        Locations
      </Typography>

      {serviceData.locations.map((loc, locIndex) => (
        <Box key={locIndex} sx={{ border: '1px solid #ccc', p: 2, mt: 2, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Location #{locIndex + 1}</Typography>
            <IconButton
              color="error"
              onClick={() => removeLocation(locIndex)}
              disabled={serviceData.locations.length === 1}
            >
              <RemoveCircle />
            </IconButton>
          </Box>
          <TextField
            label="Location Title"
            name="location_title"
            value={loc.location_title}
            onChange={(e) => handleLocationChange(locIndex, e)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Location Description"
            name="location_description"
            value={loc.location_description}
            onChange={(e) => handleLocationChange(locIndex, e)}
            fullWidth
            multiline
            rows={2}
            margin="normal"
          />
          <TextField
            label="Street Address"
            name="street_address"
            value={loc.street_address}
            onChange={(e) => handleLocationChange(locIndex, e)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="City"
            name="city"
            value={loc.city}
            onChange={(e) => handleLocationChange(locIndex, e)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="State / Province"
            name="state_or_province"
            value={loc.state_or_province}
            onChange={(e) => handleLocationChange(locIndex, e)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Postal Code"
            name="postal_code"
            value={loc.postal_code}
            onChange={(e) => handleLocationChange(locIndex, e)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Country"
            name="country"
            value={loc.country}
            onChange={(e) => handleLocationChange(locIndex, e)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Latitude"
            name="latitude"
            value={loc.latitude}
            onChange={(e) => handleLocationChange(locIndex, e)}
            fullWidth
            margin="normal"
            type="number"
            inputProps={{ step: '0.000001' }}
          />
          <TextField
            label="Longitude"
            name="longitude"
            value={loc.longitude}
            onChange={(e) => handleLocationChange(locIndex, e)}
            fullWidth
            margin="normal"
            type="number"
            inputProps={{ step: '0.000001' }}
          />

          <Typography variant="subtitle1" sx={{ mt: 3 }}>
            Working Hours
          </Typography>
          {loc.working_hours.map((wh, whIndex) => (
            <Box key={whIndex} sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id={`day-label-${locIndex}-${whIndex}`}>Day</InputLabel>
                <Select
                  labelId={`day-label-${locIndex}-${whIndex}`}
                  label="Day"
                  name="day"
                  value={wh.day}
                  onChange={(e) => handleWorkingHourChange(locIndex, whIndex, e)}
                  required
                >
                  {DAYS_OF_WEEK.map((day) => (
                    <MenuItem key={day.value} value={day.value}>
                      {day.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="From"
                name="from_hour"
                type="time"
                value={wh.from_hour}
                onChange={(e) => handleWorkingHourChange(locIndex, whIndex, e)}
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                label="To"
                name="to_hour"
                type="time"
                value={wh.to_hour}
                onChange={(e) => handleWorkingHourChange(locIndex, whIndex, e)}
                InputLabelProps={{ shrink: true }}
                required
              />
              <IconButton
                color="error"
                onClick={() => removeWorkingHour(locIndex, whIndex)}
                disabled={loc.working_hours.length === 1}
              >
                <RemoveCircle />
              </IconButton>
            </Box>
          ))}
          <Button variant="outlined" onClick={() => addWorkingHour(locIndex)} sx={{ mt: 1 }} startIcon={<AddCircle />}>
            Add Working Hour
          </Button>
        </Box>
      ))}

      <Button variant="contained" color="primary" onClick={addLocation} sx={{ mt: 3 }} startIcon={<AddCircle />}>
        Add Location
      </Button>

      <Button type="submit" variant="contained" color="success" sx={{ mt: 3 }}>
        Submit Service
      </Button>
    </Box>
  );
}
