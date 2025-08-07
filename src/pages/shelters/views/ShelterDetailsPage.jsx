import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import Lottie from 'lottie-react';

import spinnerAnimation from '../../../assets/Animation-1749725645616.json';
import LeafletShelterDetailsMap from '../../../shared/maps/LeafletShelterDetailsMap';
import SectionLabel from '../components/SectionLabel';
import ShelterContacts from '../components/ShelterContacts';
import ShelterHeaderCard from '../components/ShelterHeaderCard';
import ShelterSocialMedia from '../components/ShelterSocialMedia';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ShelterDetailsPage() {
  const { id } = useParams();
  const [shelter, setShelter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchShelter = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/shelters/${id}/?format=json`);
        setShelter(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shelter:', error);
        setError('Failed to load shelter. Please try again later.');
        setLoading(false);
      }
    };

    if (id) {
      fetchShelter();
    }
  }, [id]);

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
          <LeafletShelterDetailsMap location={{ lat, lng }} />
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
    </Container>
  );
}

export default ShelterDetailsPage;
