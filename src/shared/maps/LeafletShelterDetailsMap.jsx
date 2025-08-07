import React, { useEffect, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContainer, Marker, useMap, useMapEvents } from 'react-leaflet';

import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Box, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import MapTiler SDK
import locationIcon from '../../assets/map_icons/pet_house.png';

const defaultIcon = new L.Icon({
  iconUrl: locationIcon,
  iconSize: new L.Point(40, 47),
});
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

// Marker component that only displays a static marker
const LocationMarker = ({ position }) => {
  // const iconMarkup = renderToStaticMarkup(<LocationOnIcon style={{ color: '#D30A0A', fontSize: '2rem' }} />);
  // const customIcon = L.divIcon({ html: iconMarkup, className: 'custom-icon' });
  return position ? <Marker position={position} icon={defaultIcon} /> : null;
};

// Main Leaflet Map component
const LeafletShelterDetailsMap = ({ location }) => {
  const [position, setPosition] = useState([
    typeof location.lat === 'number' && !isNaN(location.lat) ? location.lat : 0,
    typeof location.lng === 'number' && !isNaN(location.lng) ? location.lng : 0,
  ]);

  // Sync location prop changes with position state
  useEffect(() => {
    const validLat = location.lat !== null && location.lat !== undefined && location.lat !== '' && !isNaN(location.lat);
    const validLng = location.lng !== null && location.lng !== undefined && location.lng !== '' && !isNaN(location.lng);
    if (validLat && validLng) {
      setPosition([Number(location.lat), Number(location.lng)]);
    }
  }, [location]);

  // Use MUI's useMediaQuery hook to detect small screen
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <div style={{ position: 'relative' }}>
      <Box
        sx={{
          height: isSmallScreen ? '240px' : '360px',
          width: '100%',
        }}
      >
        <MapContainer center={position} zoom={14} style={{ height: '100%', width: '100%' }}>
          {/* MapTiler Layer */}
          <MapTilerLayerComponent />
          <MapController position={position} />
          <LocationMarker position={position} />
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

export default LeafletShelterDetailsMap;
