import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import '@maptiler/leaflet-maptilersdk';
// MapTiler plugin
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';
import { Box, Typography, useMediaQuery } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import shelterIcon from '../../assets/map_icons/suitcase.png';

// Replace this with your icon if needed

// Icons for shelters
const defaultIcon = new L.Icon({
  iconUrl: shelterIcon,
  iconSize: new L.Point(40, 40),
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

// Function to create custom cluster icons
const createClusterCustomIcon = function (cluster) {
  return new L.DivIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: L.point(33, 33, true),
  });
};

// Component to update the map center and zoom level
const MapUpdater = ({ centerCoords }) => {
  const map = useMap();

  useEffect(() => {
    console.log('MapUpdater: centerCoords changed to:', centerCoords);
    if (centerCoords && centerCoords.length === 2) {
      // Add a small delay to ensure map is fully initialized
      const timer = setTimeout(() => {
        try {
          // Check if map is ready and has a container
          if (map && map._container && !map._removed) {
            console.log('MapUpdater: Setting view to', centerCoords);
            map.setView(centerCoords, 15, { animate: true });
          } else {
            console.log('MapUpdater: Map not ready, skipping update');
          }
        } catch (error) {
          console.error('MapUpdater: Error updating map view:', error);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [centerCoords, map]);

  return null;
};

// ✅ MapTiler Layer (uses official SDK)
const MapTilerLayerComponent = () => {
  const map = useMap();

  useEffect(() => {
    try {
      const mtLayer = new MaptilerLayer({
        apiKey: 'zqJA9kfFpP2bX0hmViWr',
        style: 'basic-v2', // You can change the style here if you like
      });

      // Wait for map to be ready before adding layer
      if (map && map._container) {
        mtLayer.addTo(map);
      }

      return () => {
        if (map && !map._removed) {
          map.removeLayer(mtLayer);
        }
      };
    } catch (error) {
      console.error('MapTilerLayerComponent: Error adding layer:', error);
    }
  }, [map]);

  return null;
};

function LeafletServiceDetailsMap({ shelters, centerCoords }) {
  const [userLocation, setUserLocation] = useState(null);

  // Debug centerCoords changes
  useEffect(() => {
    console.log('LeafletServiceDetailsMap: centerCoords changed to:', centerCoords);
  }, [centerCoords]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation([latitude, longitude]);
      },
      (err) => console.error('Location error:', err),
    );
  }, []);

  // Use centerCoords as initial center if provided, otherwise use default
  const initialCenter = centerCoords && centerCoords.length === 2 ? centerCoords : [56.946285, 24.105078];
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
        <MapContainer
          key={`map-${centerCoords ? centerCoords.join('-') : 'default'}`}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
          center={initialCenter} // Use centerCoords if provided
          scrollWheelZoom
          maxZoom={18} // Add maxZoom
          minZoom={3} // Optional, set a minZoom if needed
        >
          {/* MapTiler Layer */}
          <MapTilerLayerComponent />

          {/* Update map view if centerCoords are passed */}
          <MapUpdater centerCoords={centerCoords} />

          <MarkerClusterGroup
            iconCreateFunction={createClusterCustomIcon}
            maxClusterRadius={150}
            spiderfyOnMaxZoom={false}
            showCoverageOnHover={false}
          >
            {(shelters || []).map((shelter) =>
              shelter?.latitude && shelter?.longitude ? (
                <Marker
                  key={shelter.id}
                  icon={defaultIcon}
                  position={[parseFloat(shelter.latitude), parseFloat(shelter.longitude)]}
                >
                  <Popup offset={[0, 5]}>
                    <div
                      style={{
                        background: 'white',
                        color: '#333',
                        padding: '16px',
                        borderRadius: '16px',
                        fontSize: '14px',
                        fontWeight: 500,
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                        minWidth: '220px',
                      }}
                    >
                      {shelter.working_hours && (
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1, px: 1, color: '#1976d2' }}>
                            Working hours:
                          </Typography>

                          <Box component="ul" sx={{ listStyle: 'none', pl: 0, m: 0 }}>
                            {[
                              { id: 0, label: 'Monday' },
                              { id: 1, label: 'Tuesday' },
                              { id: 2, label: 'Wednesday' },
                              { id: 3, label: 'Thursday' },
                              { id: 4, label: 'Friday' },
                              { id: 5, label: 'Saturday' },
                              { id: 6, label: 'Sunday' },
                            ].map((day) => {
                              const entry = Array.isArray(shelter.working_hours)
                                ? shelter.working_hours.find((time) => time.day === day.id)
                                : null;
                              // const entry = shelter.working_hours.find((time) => time.day === day.id);
                              const isToday = new Date().getDay() === (day.id === 0 ? 1 : day.id + 1) % 7;

                              return (
                                <Box
                                  key={day.id}
                                  component="li"
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontFamily: 'monospace',
                                    fontSize: '0.875rem',
                                    fontWeight: isToday ? 700 : 400,
                                    color: isToday ? '#d32f2f' : 'text.secondary',
                                    backgroundColor: isToday ? '#fff3e0' : 'transparent',
                                    borderRadius: '6px',
                                    px: 1,
                                    py: 0.5,
                                    mb: 0.5,
                                  }}
                                >
                                  <span style={{ marginRight: '1rem' }}>{day.label}</span>
                                  <span>
                                    {entry && entry.from_hour && entry.to_hour
                                      ? `${entry.from_hour.slice(0, 5)} - ${entry.to_hour.slice(0, 5)}`
                                      : 'Closed'}
                                  </span>
                                </Box>
                              );
                            })}
                          </Box>
                        </Box>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ) : null,
            )}

            {userLocation && (
              <Marker position={userLocation} icon={userPulseIcon}>
                <Popup offset={[0, 5]}>
                  <div
                    style={{
                      background: '#5B9BD5',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Your Location
                  </div>
                </Popup>
              </Marker>
            )}
          </MarkerClusterGroup>
        </MapContainer>
      </Box>
    </div>
  );
}

export default LeafletServiceDetailsMap;
