import { useEffect, useRef } from 'react';
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Link } from 'react-router-dom';

import '@maptiler/leaflet-maptilersdk';
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';
import { Box, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Typography } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import catIconUrl from '../../assets/map_icons/catlocation.svg';
import dogIconUrl from '../../assets/map_icons/doglocation.svg';
import locationIcon from '../../assets/map_icons/location.svg';
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

const createClusterCustomIcon = (cluster) => {
  return new L.DivIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: L.point(33, 33, true),
  });
};
// const UserLocationUpdater = ({ userLocation }) => {
//   const map = useMap();
//   useEffect(() => {
//     if (userLocation && userLocation.length === 2) {
//       map.flyTo(userLocation, map.getZoom(), {
//         animate: true,
//         duration: 1.0,
//       });
//     }
//     console.log('🧭 New userLocation:', userLocation);
//   }, [userLocation, map]);

//   return null;
// };
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

const MapUpdater = ({ mapCenter }) => {
  const map = useMap();
  useEffect(() => {
    if (mapCenter && mapCenter.length === 2) {
      map.setView(mapCenter, 9);
    }
  }, [mapCenter, map]);
  return null;
};

const MapTilerLayerComponent = () => {
  const map = useMap();

  useEffect(() => {
    const mtLayer = new MaptilerLayer({
      apiKey: 'zqJA9kfFpP2bX0hmViWr',
      style: 'basic-v2',
    });

    mtLayer.addTo(map);

    return () => {
      map.removeLayer(mtLayer);
    };
  }, [map]);

  return null;
};

function LeafletClusterMap({ pets, mapCenter, userLocation, mapRef }) {
  const getIconBySpecies = (species) => {
    if (species === 1) return dogIcon;
    if (species === 2) return catIcon;
    return defaultIcon;
  };

  return (
    <div ref={mapRef}>
      <MapContainer style={{ height: '400px' }} center={mapCenter} zoom={7} scrollWheelZoom maxZoom={18}>
        <MapTilerLayerComponent />
        <MapUpdater mapCenter={mapCenter} />
        <UserLocationUpdater userLocation={userLocation} />
        {userLocation && (
          <Marker position={userLocation} key={`user-${userLocation[0]}-${userLocation[1]}`} icon={userPulseIcon}>
            <Popup offset={[0, 5]}>
              <div
                style={{
                  background: '#5B9BD5',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                  whiteSpace: 'nowrap',
                }}
              >
                Current Location
              </div>
            </Popup>
          </Marker>
        )}

        <MarkerClusterGroup
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={150}
          spiderfyOnMaxZoom={false}
          showCoverageOnHover={false}
        >
          {pets.map((pet) =>
            pet.latitude && pet.longitude ? (
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
            ) : null,
          )}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default LeafletClusterMap;
