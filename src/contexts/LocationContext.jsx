import React, { createContext, useEffect, useState } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState('Loading...');

  // On first load, try localStorage or GPS/IP fallback
  useEffect(() => {
    const reverseGeocode = async ({ lat, lng }) => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const data = await res.json();
        setCity(data.address?.city || data.address?.town || data.address?.village || 'Your area');
      } catch {
        setCity('Unknown');
      }
    };

    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setLocation(coords);
          reverseGeocode(coords);
          localStorage.setItem('userLocation', JSON.stringify(coords));
        },
        async () => {
          const res = await fetch('https://ipapi.co/json/');
          const data = await res.json();
          const coords = { lat: data.latitude, lng: data.longitude };
          setLocation(coords);
          setCity(data.city);
          localStorage.setItem('userLocation', JSON.stringify(coords));
        },
      );
    };

    const stored = localStorage.getItem('userLocation');
    if (stored) {
      const coords = JSON.parse(stored);
      setLocation(coords);
      reverseGeocode(coords);
    } else {
      fetchLocation();
    }
  }, []);

  // Update location manually
  const updateLocation = async (coords) => {
    setLocation(coords);
    localStorage.setItem('userLocation', JSON.stringify(coords));
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lng}&format=json`,
    );
    const data = await res.json();
    setCity(data.address?.city || data.address?.town || data.address?.village || 'Your area');
  };

  return <LocationContext.Provider value={{ location, city, updateLocation }}>{children}</LocationContext.Provider>;
};
