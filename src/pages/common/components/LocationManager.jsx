// // React + MUI + Leaflet + Django DRF integration example
// import React, { useEffect, useState } from 'react';
// import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// const DEFAULT_POSITION = { lat: 56.9496, lng: 24.1052 }; // Riga fallback
// const LocationPicker = ({ open, onClose, onSave, initialPosition }) => {
//   const [position, setPosition] = useState(initialPosition || DEFAULT_POSITION);
//   const LocationMarker = () => {
//     useMapEvents({
//       click(e) {
//         setPosition(e.latlng);
//       },
//     });
//     return position === null ? null : (
//       <Marker
//         position={position}
//         icon={L.icon({
//           iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
//           iconSize: [25, 41],
//           iconAnchor: [12, 41],
//         })}
//       />
//     );
//   };
//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
//       <DialogTitle>Select Location</DialogTitle>
//       <DialogContent>
//         <Typography variant="body2">Click on map to set your location.</Typography>
//         <div style={{ height: 400, marginTop: 16 }}>
//           <MapContainer center={position} zoom={12} style={{ height: '100%' }}>
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             <LocationMarker />
//           </MapContainer>
//         </div>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={() => onSave(position)} variant="contained">
//           Save
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };
// // const LocationManager = () => {
// //   const [location, setLocation] = useState(null);
// //   const [city, setCity] = useState('Loading...');
// //   const [modalOpen, setModalOpen] = useState(false);
// //   // Try GPS → fallback to IP-based location
// //   useEffect(() => {
// //     const fetchLocation = async () => {
// //       navigator.geolocation.getCurrentPosition(
// //         (pos) => {
// //           const coords = {
// //             lat: pos.coords.latitude,
// //             lng: pos.coords.longitude,
// //           };
// //           setLocation(coords);
// //           reverseGeocode(coords);
// //         },
// //         async () => {
// //           // IP fallback
// //           const res = await fetch('https://ipapi.co/json/');
// //           const data = await res.json();
// //           const coords = { lat: data.latitude, lng: data.longitude };
// //           setLocation(coords);
// //           setCity(data.city);
// //         },
// //       );
// //     };
// //     const reverseGeocode = async ({ lat, lng }) => {
// //       const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
// //       const data = await res.json();
// //       setCity(data.address?.city || data.address?.town || data.address?.village || 'Your area');
// //     };
// //     fetchLocation();
// //   }, []);
// //   const handleManualSave = (coords) => {
// //     setLocation(coords);
// //     setModalOpen(false);
// //     localStorage.setItem('userLocation', JSON.stringify(coords));
// //   };
// //   return (
// //     <div style={{ padding: 16 }}>
// //       <Typography variant="subtitle1">
// //         Using your location near <strong>{city}</strong>
// //       </Typography>
// //       <Button onClick={() => setModalOpen(true)} variant="outlined" sx={{ mt: 1 }}>
// //         Change Location
// //       </Button>
// //       <LocationPicker
// //         open={modalOpen}
// //         onClose={() => setModalOpen(false)}
// //         onSave={handleManualSave}
// //         initialPosition={location}
// //       />
// //     </div>
// //   );
// // };
// const LocationManager = () => {
//   const [location, setLocation] = useState(null);
//   const [city, setCity] = useState('Loading...');
//   const [modalOpen, setModalOpen] = useState(false);
//   // Reverse geocode function moved here so we can reuse it
//   const reverseGeocode = async ({ lat, lng }) => {
//     try {
//       const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
//       const data = await res.json();
//       setCity(data.address?.city || data.address?.town || data.address?.village || 'Your area');
//     } catch (err) {
//       setCity('Unknown');
//     }
//   };
//   // Try GPS → fallback to IP-based location
//   useEffect(() => {
//     const fetchLocation = async () => {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const coords = {
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           };
//           setLocation(coords);
//           reverseGeocode(coords);
//         },
//         async () => {
//           // IP fallback
//           const res = await fetch('https://ipapi.co/json/');
//           const data = await res.json();
//           const coords = { lat: data.latitude, lng: data.longitude };
//           setLocation(coords);
//           setCity(data.city);
//         },
//       );
//     };
//     // Load from localStorage if available
//     const saved = localStorage.getItem('userLocation');
//     if (saved) {
//       const parsed = JSON.parse(saved);
//       setLocation(parsed);
//       reverseGeocode(parsed);
//     } else {
//       fetchLocation();
//     }
//   }, []);
//   const handleManualSave = (coords) => {
//     setLocation(coords);
//     localStorage.setItem('userLocation', JSON.stringify(coords));
//     reverseGeocode(coords); // 🔥 update the city name
//     setModalOpen(false);
//   };
//   return (
//     <div style={{ padding: 16 }}>
//       <Typography variant="subtitle1">
//         Using your location near <strong>{city}</strong>
//       </Typography>
//       <Button onClick={() => setModalOpen(true)} variant="outlined" sx={{ mt: 1 }}>
//         Change Location
//       </Button>
//       <LocationPicker
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         onSave={handleManualSave}
//         initialPosition={location}
//       />
//     </div>
//   );
// };
// export default LocationManager;
// import React, { useContext, useState } from 'react';
// import { Button, Typography } from '@mui/material';
// import { LocationContext } from '../../../contexts/LocationContext';
// import LocationPicker from './LocationPicker';
// // ✅ import the picker
// const LocationManager = () => {
//   const { location, city, updateLocation } = useContext(LocationContext);
//   const [modalOpen, setModalOpen] = useState(false);
//   return (
//     <div style={{ padding: 16 }}>
//       <Typography variant="subtitle1">
//         Using your location near <strong>{city}</strong>
//       </Typography>
//       <Button onClick={() => setModalOpen(true)} variant="outlined" sx={{ mt: 1 }}>
//         Change Location
//       </Button>
//       <LocationPicker
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         onSave={(coords) => {
//           updateLocation(coords); // ✅ this goes through context
//           setModalOpen(false);
//         }}
//         initialPosition={location}
//       />
//     </div>
//   );
// };
// export default LocationManager;
import React, { useContext, useState } from 'react';

import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import RoomIcon from '@mui/icons-material/Room';
import { IconButton, Tooltip, Typography } from '@mui/material';

import { LocationContext } from '../../../contexts/LocationContext';
import LocationPicker from './LocationPicker';

const LocationManager = ({ mode = 'full' }) => {
  const { location, city, updateLocation } = useContext(LocationContext);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleSave = (coords) => {
    updateLocation(coords);
    setModalOpen(false);
  };

  return (
    <div
      style={{
        padding: mode === 'full' ? '16px' : 0,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {mode === 'full' && (
        <Typography variant="subtitle1" component="span" sx={{ color: '#fff' }}>
          Using your location near <strong style={{ color: '#00b3a4' }}>{city}</strong>
        </Typography>
      )}
      <Tooltip title="Change Location">
        <IconButton onClick={handleOpen} size="small">
          <RoomIcon style={{ color: '#00b3a4' }} fontSize="small" />
        </IconButton>

        {/* <IconButton
          onClick={handleOpen}
          size="small"
          sx={{
            color: 'primary.main',
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.2)',
            },
          }}
        >
          <RoomIcon style={{ color: '#00b3a4' }} fontSize="small" />
        </IconButton> */}
      </Tooltip>
      <LocationPicker
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialPosition={location}
      />
    </div>
  );
};

export default LocationManager;
