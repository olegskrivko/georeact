// // LocationPicker.js
// import React, { useState } from 'react';
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
//     return (
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
//         <Typography variant="body2">Click on the map to set your location.</Typography>
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
// export default LocationPicker;
// import React, { useState } from 'react';
// import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
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
//     return (
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
//   const handleUseCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       alert('Geolocation is not supported by your browser.');
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const coords = {
//           lat: pos.coords.latitude,
//           lng: pos.coords.longitude,
//         };
//         setPosition(coords);
//       },
//       () => {
//         alert('Unable to retrieve your location.');
//       },
//     );
//   };
//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
//       <DialogTitle>Select Location</DialogTitle>
//       <DialogContent>
//         <Typography variant="body2">Click on the map or use your current location.</Typography>
//         <div style={{ height: 400, marginTop: 16 }}>
//           <MapContainer center={position} zoom={12} style={{ height: '100%' }}>
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             <LocationMarker />
//           </MapContainer>
//         </div>
//       </DialogContent>
//       <DialogActions>
//         <Stack direction="row" spacing={2} sx={{ px: 2, py: 1 }}>
//           <Button onClick={handleUseCurrentLocation}>Use My Location</Button>
//           <Button onClick={onClose}>Cancel</Button>
//           <Button onClick={() => onSave(position)} variant="contained">
//             Save
//           </Button>
//         </Stack>
//       </DialogActions>
//     </Dialog>
//   );
// };
// export default LocationPicker;
// import React, { useState } from 'react';
// import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
// import {
//   Button,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Stack,
//   Typography,
// } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// const DEFAULT_POSITION = { lat: 56.9496, lng: 24.1052 }; // Riga fallback
// const LocationPicker = ({ open, onClose, onSave, initialPosition }) => {
//   const theme = useTheme();
//   const cardBg = theme.palette.custom.card.main;
//   const cardText = theme.palette.custom.card.contrastText;
//   const [position, setPosition] = useState(initialPosition || DEFAULT_POSITION);
//   const [locating, setLocating] = useState(false);
//   const LocationMarker = () => {
//     useMapEvents({
//       click(e) {
//         setPosition(e.latlng);
//       },
//     });
//     return (
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
//   const fetchIpLocation = async () => {
//     try {
//       const res = await fetch('https://ipapi.co/json/');
//       if (!res.ok) throw new Error('IP location fetch failed');
//       const data = await res.json();
//       if (data.latitude && data.longitude) {
//         setPosition({ lat: data.latitude, lng: data.longitude });
//       } else {
//         alert('IP-based location failed. Using default.');
//         setPosition(DEFAULT_POSITION);
//       }
//     } catch (err) {
//       console.error('IP Location error:', err);
//       alert('Unable to get location via IP. Using default.');
//       setPosition(DEFAULT_POSITION);
//     } finally {
//       setLocating(false);
//     }
//   };
//   const handleUseCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       alert('Geolocation is not supported by your browser.');
//       fetchIpLocation();
//       return;
//     }
//     setLocating(true);
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const coords = {
//           lat: pos.coords.latitude,
//           lng: pos.coords.longitude,
//         };
//         setPosition(coords);
//         setLocating(false);
//       },
//       (error) => {
//         console.error('Geolocation error:', error);
//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             alert('Location permission denied. Falling back to IP.');
//             break;
//           case error.POSITION_UNAVAILABLE:
//             alert('Position unavailable. Falling back to IP.');
//             break;
//           case error.TIMEOUT:
//             alert('Location request timed out. Falling back to IP.');
//             break;
//           default:
//             alert('Unknown error. Falling back to IP.');
//         }
//         fetchIpLocation();
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000, // 10 seconds
//         maximumAge: 0,
//       },
//     );
//   };
//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       fullWidth
//       maxWidth="md"
//       PaperProps={{
//         sx: {
//           background: cardBg,
//           color: cardText,
//           borderRadius: 3,
//           p: 2,
//         },
//       }}
//     >
//       <DialogTitle>Select Location</DialogTitle>
//       <DialogContent>
//         <Typography variant="body2">Click on the map or use your current location.</Typography>
//         <div style={{ height: 400, marginTop: 16 }}>
//           <MapContainer center={position} zoom={12} style={{ height: '100%' }}>
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             <LocationMarker />
//           </MapContainer>
//         </div>
//       </DialogContent>
//       <DialogActions>
//         <Stack direction="row" spacing={2} sx={{ px: 2, py: 1 }} alignItems="center">
//           <Button onClick={handleUseCurrentLocation} disabled={locating}>
//             {locating ? <CircularProgress size={18} sx={{ mr: 1 }} /> : null}
//             {locating ? 'Locating...' : 'Use My Location'}
//           </Button>
//           <Button onClick={onClose}>Cancel</Button>
//           <Button onClick={() => onSave(position)} variant="contained" disabled={locating}>
//             Save
//           </Button>
//         </Stack>
//       </DialogActions>
//     </Dialog>
//   );
// };
// export default LocationPicker;
import React, { useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DEFAULT_POSITION = { lat: 56.9496, lng: 24.1052 }; // Riga fallback

const LocationPicker = ({ open, onClose, onSave, initialPosition }) => {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm')); // Fullscreen on small screens

  const [position, setPosition] = useState(initialPosition || DEFAULT_POSITION);
  const [locating, setLocating] = useState(false);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });

    return (
      <Marker
        position={position}
        icon={L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })}
      />
    );
  };

  const fetchIpLocation = async () => {
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (!res.ok) throw new Error('IP location fetch failed');
      const data = await res.json();

      if (data.latitude && data.longitude) {
        setPosition({ lat: data.latitude, lng: data.longitude });
      } else {
        alert('IP-based location failed. Using default.');
        setPosition(DEFAULT_POSITION);
      }
    } catch (err) {
      console.error('IP Location error:', err);
      alert('Unable to get location via IP. Using default.');
      setPosition(DEFAULT_POSITION);
    } finally {
      setLocating(false);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      fetchIpLocation();
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setPosition(coords);
        setLocating(false);
      },
      (error) => {
        console.error('Geolocation error:', error);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert('Location permission denied. Falling back to IP.');
            break;
          case error.POSITION_UNAVAILABLE:
            alert('Position unavailable. Falling back to IP.');
            break;
          case error.TIMEOUT:
            alert('Location request timed out. Falling back to IP.');
            break;
          default:
            alert('Unknown error. Falling back to IP.');
        }

        fetchIpLocation();
      },
      {
        enableHighAccuracy: true,
        timeout: 10000, // 10 seconds
        maximumAge: 0,
      },
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          background: cardBg,
          color: cardText,
          borderRadius: fullScreen ? 0 : 3,
          // p: 2,
          p: { xs: 1, sm: 2 },
        },
      }}
    >
      <DialogTitle>Select Location</DialogTitle>
      <DialogContent>
        <Typography variant="body2">Click on the map or use your current location.</Typography>
        <div style={{ height: fullScreen ? '100vh' : 400, marginTop: 16 }}>
          <MapContainer center={position} zoom={12} style={{ height: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
          </MapContainer>
        </div>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={2} sx={{ px: 2, py: 1 }} alignItems="center" justifyContent="flex-end">
          <Button onClick={handleUseCurrentLocation} disabled={locating}>
            {locating ? <CircularProgress size={18} sx={{ mr: 1 }} /> : null}
            {locating ? 'Locating...' : 'Use My Location'}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave(position)} variant="contained" disabled={locating}>
            Save
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default LocationPicker;
