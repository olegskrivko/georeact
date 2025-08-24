import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// adjust path
import { Box, Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import Lottie from 'lottie-react';

import spinnerAnimation from '../../../assets/Animation-1749725645616.json';
import { LocationContext } from '../../../contexts/LocationContext';
import LeafletShelterDetailsMap from '../../../shared/maps/LeafletShelterDetailsMap';
import SectionLabel from '../components/SectionLabel';
import ShelterContacts from '../components/ShelterContacts';
import ShelterHeaderCard from '../components/ShelterHeaderCard';
import ShelterReportInfoCard from '../components/ShelterReportInfoCard';
import ShelterSocialMedia from '../components/ShelterSocialMedia';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ShelterDetailsPage() {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const { id } = useParams();
  const [shelter, setShelter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { location: contextLocation } = useContext(LocationContext);
  // ✅ don't hardcode Latvia here, wait for context first
  const [userLocation, setUserLocation] = useState(null);
  // const [userLocation, setUserLocation] = useState([56.946285, 24.105078]); // Latvia default
  // const [mapCenter, setMapCenter] = useState([56.946285, 24.105078]); // Latvia default

  useEffect(() => {
    const lat = contextLocation?.latitude ?? contextLocation?.lat;
    const lng = contextLocation?.longitude ?? contextLocation?.lng;

    if (lat != null && lng != null) {
      const coords = [lat, lng];
      setUserLocation(coords);
      // setMapCenter(coords);
    }
  }, [contextLocation]);

  // normalize lat/lng from context
  // useEffect(() => {
  //   const lat = contextLocation?.latitude ?? contextLocation?.lat;
  //   const lng = contextLocation?.longitude ?? contextLocation?.lng;

  //   if (lat != null && lng != null) {
  //     setUserLocation([lat, lng]);
  //   }
  // }, [contextLocation]);

  useEffect(() => {
    if (contextLocation?.latitude && contextLocation?.longitude) {
      setUserLocation([contextLocation.latitude, contextLocation.longitude]);
    }
  }, [contextLocation]);

  useEffect(() => {
    const fetchShelter = async () => {
      if (!id) return;
      const [lat, lng] = userLocation;

      try {
        setLoading(true);
        setError(null);

        const url = `${API_BASE_URL}/api/shelters/${id}/?latitude=${lat}&longitude=${lng}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch shelter');

        const data = await res.json();
        setShelter(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShelter();
  }, [id, userLocation]);
  // const fetchShelters = useCallback(async () => {
  //   if (!userLocation || userLocation.length !== 2) return;

  //   const [lat, lng] = userLocation;

  //   try {
  //     setLoading(true);
  //     setError(null);

  //     const queryParams = new URLSearchParams(location.search);
  //     queryParams.set('latitude', lat);
  //     queryParams.set('longitude', lng);
  //     const res = await fetch(`${API_BASE_URL}/api/shelters/${id}?${queryParams.toString()}`);

  //     if (!res.ok) throw new Error('Failed to fetch shelters');

  //     const data = await res.json();

  //     setShelter(data);
  //     // setPagination((prev) => ({
  //     //   ...prev,
  //     //   totalPages: Math.ceil(data.count / 6),
  //     // }));
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [id, userLocation]);
  // useEffect(() => {
  //   const fetchShelter = async () => {
  //     try {
  //       const response = await axios.get(`${API_BASE_URL}/api/shelters/${id}/?format=json`);
  //       setShelter(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching shelter:', error);
  //       setError('Failed to load shelter. Please try again later.');
  //       setLoading(false);
  //     }
  //   };

  //   if (id) {
  //     fetchShelter();
  //   }
  // }, [id]);
  // useEffect(() => {
  //   fetchShelters();
  // }, [fetchShelters]);
  const isStillLoading = loading || (!shelter && !error);

  if (isStillLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ width: 180, height: 180 }}>
          <Lottie animationData={spinnerAnimation} loop autoplay />
        </Box>
      </Box>
    );
  }

  const handleLocationClick = () => {
    const { latitude, longitude } = shelter;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank');
  };

  const lat = Number(shelter?.latitude);
  const lng = Number(shelter?.longitude);
  const hasValidCoords = !isNaN(lat) && !isNaN(lng);

  if (!hasValidCoords) {
    console.log('Shelter map not rendered due to invalid coords:', shelter?.latitude, shelter?.longitude);
  }

  return (
    <Container maxWidth="lg" disableGutters>
      {/* Card with Cover Image, Name, and Description side by side */}
      {shelter && <ShelterHeaderCard shelter={shelter} />}

      {/* Contacts Section */}
      <SectionLabel variant="subtitle1">Contacts</SectionLabel>
      <Grid container spacing={2} mb={2}>
        <Grid size={{ xs: 12 }}>
          {shelter && <ShelterContacts shelter={shelter} onLocationClick={handleLocationClick} />}
        </Grid>
      </Grid>
      {/* Map Section */}
      {hasValidCoords ? (
        <Box mt={4}>
          <SectionLabel variant="subtitle1">Location Map</SectionLabel>
          <LeafletShelterDetailsMap location={{ lat, lng }} userLocation={userLocation} />
        </Box>
      ) : (
        <Box mt={4}>
          <SectionLabel variant="subtitle1">Location Map</SectionLabel>
          <Typography color="text.secondary">No valid coordinates available for this shelter.</Typography>
        </Box>
      )}
      {/* Social Media Section */}
      <Box mt={4}>
        <SectionLabel variant="subtitle1">Social Media</SectionLabel>
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12 }}>{shelter && <ShelterSocialMedia socialMedia={shelter.social_media} />}</Grid>
        </Grid>
      </Box>
      {/* Report Info Section */}
      <Box mt={4}>
        <ShelterReportInfoCard />
      </Box>
    </Container>
  );
}

export default ShelterDetailsPage;
