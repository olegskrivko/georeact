import { useEffect, useRef } from 'react';
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Link } from 'react-router-dom';

import '@maptiler/leaflet-maptilersdk';
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';
import { Box, CardMedia, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import catIconUrl from '../../assets/map_icons/catlocation.svg';
import dogIconUrl from '../../assets/map_icons/doglocation.svg';
// import locationIcon from '../../assets/map_icons/location.svg';
import locationIcon from '../../assets/map_icons/paw.png';
import ImgPlaceholder from '../../assets/placeholder.svg';

// Icons
const defaultIcon = new L.Icon({
  iconUrl: locationIcon,
  iconSize: new L.Point(40, 47),
});

const dogIcon = new L.Icon({
  iconUrl: dogIconUrl,
  iconSize: new L.Point(40, 47),
});

const catIcon = new L.Icon({
  iconUrl: catIconUrl,
  iconSize: new L.Point(40, 47),
});
// User pulse icon
const userPulseIcon = L.divIcon({
  className: '',
  html: `
    <div class="user-location-wrapper">
      <div class="user-location-core"></div>
      <div class="user-location-pulse"></div>
    </div>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});
// Cluster icon
const createClusterCustomIcon = (cluster) => {
  return new L.DivIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: L.point(33, 33, true),
  });
};

const UserLocationUpdater = ({ userLocation }) => {
  const map = useMap();
  const hasCentered = useRef(false);

  useEffect(() => {
    if (!hasCentered.current && userLocation && userLocation.length === 2) {
      map.flyTo(userLocation, map.getZoom(), {
        animate: true,
        duration: 1.0,
      });
      hasCentered.current = true;
    }
  }, [userLocation, map]);

  return null;
};

// Center update hook
const MapUpdater = ({ mapCenter }) => {
  const map = useMap();
  useEffect(() => {
    if (mapCenter?.length === 2) {
      map.setView(mapCenter, 9);
    }
  }, [mapCenter, map]);
  return null;
};

// Layer provider
// const MapTilerLayer = () => {
//   const map = useMap();
//   useEffect(() => {
//     const mtLayer = new MaptilerLayer({
//       apiKey: 'zqJA9kfFpP2bX0hmViWr',
//       style: 'basic-v2',
//     });
//     mtLayer.addTo(map);
//     return () => {
//       map.removeLayer(mtLayer);
//     };
//   }, [map]);

//   return null;
// };
const MapTilerLayerComponent = () => {
  const map = useMap();
  const theme = useTheme();

  useEffect(() => {
    // Pick style based on MUI theme mode
    const style = theme.palette.mode === 'dark' ? 'streets-v2-dark' : 'basic-v2';

    const mtLayer = new MaptilerLayer({
      apiKey: 'zqJA9kfFpP2bX0hmViWr',
      style,
    });

    mtLayer.addTo(map);

    return () => {
      map.removeLayer(mtLayer);
    };
  }, [map, theme.palette.mode]); // re-run if theme mode changes

  return null;
};

function LeafletPetsMap({ pets = [], mapCenter, isLoading, userLocation, mapRef }) {
  const getIconBySpecies = (species) => {
    if (species === 1) return dogIcon;
    if (species === 2) return catIcon;
    return defaultIcon;
  };

  return (
    <Box component="section" ref={mapRef} className="map-container">
      <MapContainer
        style={{ height: '400px', width: '100%' }}
        center={mapCenter}
        zoom={7}
        scrollWheelZoom
        minZoom={1}
        maxZoom={18}
      >
        <MapTilerLayerComponent />
        <MapUpdater mapCenter={mapCenter} />
        <UserLocationUpdater userLocation={userLocation} />
        {userLocation && <Marker position={userLocation} icon={userPulseIcon} />}
        <MarkerClusterGroup
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={150}
          spiderfyOnMaxZoom={false}
          showCoverageOnHover={false}
        >
          {!isLoading && pets.length === 0 ? (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                p: 3,
                borderRadius: 2,
                textAlign: 'center',
                zIndex: 1000,
              }}
            >
              <Typography component="p">No pets to display</Typography>
              <Typography component="p" fontSize="12px" color="#666">
                Try changing the filters or come back later.
              </Typography>
            </Box>
          ) : (
            pets
              .filter((pet) => pet.latitude && pet.longitude)
              .map((pet) => (
                <Marker
                  key={pet.id}
                  icon={getIconBySpecies(pet.species)}
                  position={[parseFloat(pet.latitude), parseFloat(pet.longitude)]}
                >
                  <Popup offset={[0, 5]}>
                    <Box style={{ textAlign: 'center' }}>
                      <Link to={`/pets/${pet.id}`} style={{ textDecoration: 'none' }}>
                        <CardMedia
                          component="img"
                          image={pet?.pet_image_1 || ImgPlaceholder}
                          alt={pet.species_display}
                          style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            border: '3px solid white',
                            objectFit: 'cover',
                          }}
                        />
                      </Link>
                    </Box>
                  </Popup>
                </Marker>
              ))
          )}
        </MarkerClusterGroup>
      </MapContainer>
    </Box>
  );
}

export default LeafletPetsMap;
