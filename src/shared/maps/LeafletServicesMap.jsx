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

import locationIcon from '../../assets/map_icons/suitcase.png';

// Icons
const defaultIcon = new L.Icon({
  iconUrl: locationIcon,
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
//     return () => map.removeLayer(mtLayer);
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

function LeafletServicesMap({ services, mapCenter, isLoading, userLocation, mapRef }) {
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
        {/* <MapTilerLayer /> */}
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
          {!isLoading && (!services || services.length === 0) ? (
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
              <Typography component="p">No services to display</Typography>
              <Typography component="p" fontSize="12px" color="#666">
                Try changing the filters or come back later.
              </Typography>
            </Box>
          ) : (
            services?.flatMap((service) =>
              (service.locations || [])
                .filter((loc) => loc.latitude && loc.longitude)
                .map((loc) => (
                  <Marker
                    key={`service-${service.id}-loc-${loc.id}`}
                    icon={defaultIcon}
                    position={[parseFloat(loc.latitude), parseFloat(loc.longitude)]}
                  >
                    <Popup offset={[0, 5]}>
                      <Link to={`/services/${service.id}`} style={{ textDecoration: 'none' }}>
                        <Box
                          sx={{
                            width: '180px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                            borderRadius: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.85)',
                            p: 1,
                            overflow: 'hidden',
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={service?.service_image_1 || ImgPlaceholder}
                            alt={service.operating_name}
                            sx={{
                              width: '100%',
                              height: '140px',
                              borderRadius: 2,

                              objectFit: 'cover',
                              mb: 1,
                            }}
                          />
                          <Typography
                            variant="subtitle1"
                            sx={{
                              color: '#244A72',
                              fontWeight: 600,
                              fontSize: '0.7rem',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                            title={service.operating_name}
                          >
                            {service.operating_name}
                          </Typography>
                        </Box>
                      </Link>
                    </Popup>
                  </Marker>
                )),
            )
          )}
        </MarkerClusterGroup>
      </MapContainer>
    </Box>
  );
}

export default LeafletServicesMap;
