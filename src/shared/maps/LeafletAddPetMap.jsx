import React, { useEffect, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContainer, Marker, useMap, useMapEvents } from 'react-leaflet';

import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Box, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import MapTiler SDK

// MapController ensures the map updates only when necessary
const MapController = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 14, { animate: true });
    }
  }, [position, map]);

  return null;
};

// Marker component that updates location on click & drag
const LocationMarker = ({ position, onLocationChange }) => {
  useMapEvents({
    click(e) {
      onLocationChange(e.latlng);
    },
  });

  const iconMarkup = renderToStaticMarkup(<LocationOnIcon style={{ color: '#D30A0A', fontSize: '2rem' }} />);
  const customIcon = L.divIcon({ html: iconMarkup, className: 'custom-icon' });

  return (
    position && (
      <Marker
        position={position}
        icon={customIcon}
        draggable={true}
        eventHandlers={{
          dragend: (event) => {
            const newPos = event.target.getLatLng();
            onLocationChange({ lat: newPos.lat, lng: newPos.lng });
          },
        }}
      />
    )
  );
};

// Main Leaflet Map component
const LeafletAddPetMap = ({ onLocationChange, location }) => {
  const [position, setPosition] = useState([location.lat, location.lng]);

  // Sync location prop changes with position state
  useEffect(() => {
    if (location.lat && location.lng) {
      setPosition([location.lat, location.lng]);
    }
  }, [location]);

  const handleUseMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newPos = [latitude, longitude];
        setPosition(newPos); // Update marker position
        onLocationChange({ lat: latitude, lng: longitude }); // Update form state
      },
      () => {
        alert("Couldn't get location. Please enable GPS.");
      },
    );
  };

  // Use MUI's useMediaQuery hook to detect small screen
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <div style={{ position: 'relative' }}>
      <Box
        sx={{
          height: isSmallScreen ? '240px' : '360px', // Smaller height on small screens
          width: '100%',
        }}
      >
        <MapContainer center={position} zoom={10} style={{ height: '100%', width: '100%' }}>
          {/* MapTiler Layer */}
          <MapTilerLayerComponent />

          <MapController position={position} />

          <LocationMarker
            position={position}
            onLocationChange={(newPos) => {
              setPosition([newPos.lat, newPos.lng]);
              onLocationChange(newPos);
            }}
          />

          {/* Floating GPS Button inside the map */}
          <Tooltip title="Izmantot esošo atrašanās vietu">
            <IconButton
              onClick={handleUseMyLocation}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: 'white',
                zIndex: 1000,
                boxShadow: 3,
                '&:hover': { backgroundColor: '#f0f0f0' },
              }}
            >
              <MyLocationIcon sx={{ color: '#007bff' }} />
            </IconButton>
          </Tooltip>
        </MapContainer>
      </Box>
    </div>
  );
};

// MapTiler Layer component to use MapTiler maps
const MapTilerLayerComponent = () => {
  const map = useMap();

  useEffect(() => {
    const mtLayer = new MaptilerLayer({
      apiKey: 'zqJA9kfFpP2bX0hmViWr', // Use your MapTiler API Key here
      style: 'basic-v2', // You can change to other MapTiler styles, e.g. "streets", "satellite"
    });

    mtLayer.addTo(map); // Add MapTiler layer to the map

    return () => {
      map.removeLayer(mtLayer); // Clean up when the component is unmounted
    };
  }, [map]);

  return null;
};

export default LeafletAddPetMap;
