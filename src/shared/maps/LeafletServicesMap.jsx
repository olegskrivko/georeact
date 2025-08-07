import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import '@maptiler/leaflet-maptilersdk';
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import locationIcon from '../../assets/map_icons/suitcase.png';

const defaultIcon = new L.Icon({
  iconUrl: locationIcon,
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

const MapUpdater = ({ mapCenter }) => {
  const map = useMap();
  useEffect(() => {
    if (mapCenter?.length === 2) {
      map.setView(mapCenter, 9);
    }
  }, [mapCenter, map]);
  return null;
};

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

function LeafletServicesMap({ services, mapCenter, userLocation, mapRef }) {
  console.log('locationservices', services);

  return (
    <div ref={mapRef}>
      <MapContainer
        style={{ height: '500px', width: '100%' }}
        center={[56.946285, 24.105078]}
        zoom={9}
        scrollWheelZoom
        maxZoom={18}
      >
        <MapTilerLayer />
        <MapUpdater mapCenter={mapCenter} />
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
        <MarkerClusterGroup
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={150}
          spiderfyOnMaxZoom={false}
          showCoverageOnHover={false}
        >
          {services?.flatMap((service) =>
            (service.locations || [])
              .filter((loc) => loc.latitude && loc.longitude)
              .map((loc) => (
                <Marker
                  key={`service-${service.id}-loc-${loc.id}`}
                  icon={defaultIcon}
                  position={[parseFloat(loc.latitude), parseFloat(loc.longitude)]}
                >
                  <Popup offset={[0, 5]}>
                    <a href={`/services/${service.id}`} style={{ textDecoration: 'none' }}>
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
                          textDecoration: 'none',
                        }}
                      >
                        {service.operating_name}
                      </div>
                    </a>
                  </Popup>
                </Marker>
              )),
          )}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default LeafletServicesMap;
