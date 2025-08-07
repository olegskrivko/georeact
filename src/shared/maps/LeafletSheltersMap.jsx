// import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
// import { MapContainer, Marker, Popup, useMap } from 'react-leaflet';
// import MarkerClusterGroup from 'react-leaflet-cluster';
// import { Link } from 'react-router-dom';
// import '@maptiler/leaflet-maptilersdk';
// import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';
// import { Box, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Typography } from '@mui/material';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import locationIcon from '../../assets/map_icons/pet_house.png';
// const defaultIcon = new L.Icon({
//   iconUrl: locationIcon,
//   iconSize: new L.Point(40, 47),
// });
// const userPulseIcon = L.divIcon({
//   className: '',
//   html: `
//     <div class="user-location-wrapper">
//       <div class="user-location-core"></div>
//       <div class="user-location-pulse"></div>
//     </div>
//   `,
//   iconSize: [30, 30],
//   iconAnchor: [15, 15],
// });
// const createClusterCustomIcon = (cluster) => {
//   return new L.DivIcon({
//     html: `<span>${cluster.getChildCount()}</span>`,
//     className: 'custom-marker-cluster',
//     iconSize: L.point(33, 33, true),
//   });
// };
// const MapUpdater = ({ centerCoords }) => {
//   const map = useMap();
//   useEffect(() => {
//     if (centerCoords?.length === 2) {
//       map.setView(centerCoords, 9);
//     }
//   }, [centerCoords, map]);
//   return null;
// };
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
// function LeafletSheltersMap({ shelters, centerCoords }, ref) {
//   const [userLocation, setUserLocation] = useState(null);
//   const [mapInstance, setMapInstance] = useState(null);
//   // Expose panTo method to parent
//   useImperativeHandle(
//     ref,
//     () => ({
//       panTo: (lat, lng) => {
//         if (mapInstance) {
//           mapInstance.setView([lat, lng], 13, { animate: true });
//         }
//       },
//     }),
//     [mapInstance],
//   );
//   // Ensure shelters is always an array
//   const sheltersArray = Array.isArray(shelters) ? shelters : [];
//   console.log('Shelters data:', shelters);
//   console.log('Shelters array:', sheltersArray);
//   console.log(
//     'Shelters with coordinates:',
//     sheltersArray.filter((s) => s.latitude && s.longitude),
//   );
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setUserLocation([latitude, longitude]);
//       },
//       (err) => console.error('Location error:', err),
//     );
//   }, []);
//   return (
//     <Box>
//       <MapContainer
//         style={{ height: '500px', width: '100%' }}
//         center={[56.946285, 24.105078]} // Rīga center
//         zoom={3}
//         scrollWheelZoom
//         maxZoom={18}
//         minZoom={1}
//         whenCreated={setMapInstance}
//       >
//         <MapTilerLayer />
//         <MapUpdater centerCoords={centerCoords} />
//         <MarkerClusterGroup
//           iconCreateFunction={createClusterCustomIcon}
//           maxClusterRadius={150}
//           spiderfyOnMaxZoom={false}
//           showCoverageOnHover={false}
//         >
//           {sheltersArray.filter((shelter) => shelter.latitude && shelter.longitude).length > 0 ? (
//             sheltersArray.map((shelter) => {
//               console.log(
//                 'Creating marker for shelter:',
//                 shelter.operating_name,
//                 'at:',
//                 shelter.latitude,
//                 shelter.longitude,
//               );
//               return shelter.latitude && shelter.longitude ? (
//                 <Marker
//                   key={shelter.id}
//                   icon={defaultIcon}
//                   position={[parseFloat(shelter.latitude), parseFloat(shelter.longitude)]}
//                 >
//                   <Popup offset={[0, 5]}>
//                     <Link to={`/shelters/${shelter.id}`} style={{ textDecoration: 'none' }}>
//                       <Box
//                         style={{
//                           background: '#5B9BD5',
//                           color: 'white',
//                           padding: '6px 12px',
//                           borderRadius: '12px',
//                           fontSize: '14px',
//                           fontWeight: 500,
//                           boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
//                           whiteSpace: 'nowrap',
//                           textDecoration: 'none',
//                         }}
//                       >
//                         {shelter.operating_name}
//                       </Box>
//                     </Link>
//                   </Popup>
//                 </Marker>
//               ) : null;
//             })
//           ) : (
//             <Box
//               style={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 background: 'rgba(255, 255, 255, 0.9)',
//                 padding: '20px',
//                 borderRadius: '8px',
//                 textAlign: 'center',
//                 zIndex: 1000,
//               }}
//             >
//               <Typography component="p">No shelter locations available</Typography>
//               <Typography component="p" style={{ fontSize: '12px', color: '#666' }}>
//                 Contact shelters to add their coordinates
//               </Typography>
//             </Box>
//           )}
//         </MarkerClusterGroup>
//         {userLocation && (
//           <Marker position={userLocation} icon={userPulseIcon}>
//             <Popup offset={[0, 5]}>
//               <Box
//                 style={{
//                   background: '#5B9BD5',
//                   color: 'white',
//                   padding: '6px 12px',
//                   borderRadius: '12px',
//                   fontSize: '14px',
//                   fontWeight: 500,
//                   whiteSpace: 'nowrap',
//                 }}
//               >
//                 Your Location
//               </Box>
//             </Popup>
//           </Marker>
//         )}
//       </MapContainer>
//     </Box>
//   );
// }
// export default forwardRef(LeafletSheltersMap);
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Link } from 'react-router-dom';

import '@maptiler/leaflet-maptilersdk';
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';
import { Box, Typography } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import locationIcon from '../../assets/map_icons/pet_house.png';

// Shelter icon
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

// Layer provider
const MapTilerLayer = () => {
  const map = useMap();
  useEffect(() => {
    const mtLayer = new MaptilerLayer({
      apiKey: 'zqJA9kfFpP2bX0hmViWr',
      style: 'basic-v2',
    });
    mtLayer.addTo(map);
    return () => map.removeLayer(mtLayer);
  }, [map]);
  return null;
};

// Center update hook
const MapUpdater = ({ centerCoords }) => {
  const map = useMap();
  useEffect(() => {
    if (centerCoords?.length === 2) {
      map.setView(centerCoords, 9);
    }
  }, [centerCoords, map]);
  return null;
};

// Main map component
function LeafletSheltersMap({ shelters, centerCoords, userLocation }, ref) {
  const [mapInstance, setMapInstance] = useState(null);

  useImperativeHandle(
    ref,
    () => ({
      panTo: (lat, lng) => {
        if (mapInstance) {
          mapInstance.setView([lat, lng], 13, { animate: true });
        }
      },
    }),
    [mapInstance],
  );

  const sheltersArray = Array.isArray(shelters) ? shelters : [];

  return (
    <MapContainer
      style={{ height: '500px', width: '100%' }}
      center={[56.946285, 24.105078]} // default to Rīga
      zoom={3}
      scrollWheelZoom
      maxZoom={18}
      minZoom={1}
      whenCreated={setMapInstance}
    >
      <MapTilerLayer />
      <MapUpdater centerCoords={centerCoords} />

      <MarkerClusterGroup
        iconCreateFunction={createClusterCustomIcon}
        maxClusterRadius={150}
        spiderfyOnMaxZoom={false}
        showCoverageOnHover={false}
      >
        {sheltersArray.length > 0 ? (
          sheltersArray
            .filter((shelter) => shelter.latitude && shelter.longitude)
            .map((shelter) => (
              <Marker
                key={shelter.id}
                icon={defaultIcon}
                position={[parseFloat(shelter.latitude), parseFloat(shelter.longitude)]}
              >
                <Popup offset={[0, 5]}>
                  <Link to={`/shelters/${shelter.id}`} style={{ textDecoration: 'none' }}>
                    <Box
                      sx={{
                        background: '#5B9BD5',
                        color: 'white',
                        p: '6px 12px',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: 500,
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {shelter.operating_name}
                    </Box>
                  </Link>
                </Popup>
              </Marker>
            ))
        ) : (
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
            <Typography component="p">No shelter locations available</Typography>
            <Typography component="p" fontSize="12px" color="#666">
              Contact shelters to add their coordinates
            </Typography>
          </Box>
        )}
      </MarkerClusterGroup>

      {userLocation && (
        <Marker position={userLocation} icon={userPulseIcon}>
          <Popup offset={[0, 5]}>
            <Box
              sx={{
                background: '#5B9BD5',
                color: 'white',
                p: '6px 12px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}
            >
              Your Location
            </Box>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default forwardRef(LeafletSheltersMap);
