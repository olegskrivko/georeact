import React, { useEffect, useState } from 'react';

import { AccessTime, Email, Euro, LocationOn, Phone } from '@mui/icons-material';
import { Facebook, Instagram, Language, LinkedIn, Twitter, YouTube } from '@mui/icons-material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import moment from 'moment';

const TabLocations = ({ service, mapRef, onPanToLocation }) => {
  const [userCoords, setUserCoords] = useState(null);
  const [distances, setDistances] = useState([]);

  const handlePanToLocation = (lat, lng) => {
    console.log('TabMessages: handlePanToLocation called with lat:', lat, 'lng:', lng);
    console.log('TabMessages: Calling parent onPanToLocation with:', [lat, lng]);

    // Convert to numbers and call parent function
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    onPanToLocation(latNum, lngNum);

    // Scroll to the map after a short delay to ensure the map has updated
    setTimeout(() => {
      if (mapRef && mapRef.current) {
        mapRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserCoords({ latitude, longitude });

      if (service?.locations?.length) {
        const calculatedDistances = service.locations.map((loc) =>
          calculateDistance(latitude, longitude, loc.latitude, loc.longitude),
        );
        setDistances(calculatedDistances);
      }
    });
  }, [service]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2); // km
  };
  return (
    // <Card
    //   sx={{
    //     borderRadius: 3,
    //     background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
    //     cursor: 'pointer',
    //     transition: 'all 0.3s ease-in-out',
    //     '&:hover': {
    //       background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
    //     },
    //   }}
    // >
    <>
      {service.locations?.length > 0 ? (
        service.locations.map((location, index) => (
          <Card
            key={index}
            sx={{
              mt: { xs: 2, sm: 2, md: 2, lg: 2 },
              p: { xs: 1, sm: 2 },
              borderRadius: 3,
              background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={2} justifyContent="space-between">
              <Box display="flex" flexDirection="column" alignItems="flex-start" gap={2}>
                <Box sx={{ gap: 1 }} style={{ display: 'flex', alignItems: 'center', color: '#343a40' }}>
                  <Tooltip title="Show on map">
                    <span>
                      <IconButton
                        onClick={() => handlePanToLocation(location.latitude, location.longitude)}
                        sx={{ backgroundColor: '#00b3a4', color: '#fff' }}
                      >
                        <LocationOnIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Typography variant="body1">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${location.street}, ${location.city}`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#90caf9',
                        textDecoration: 'underline',
                        marginLeft: '0.3rem',
                      }}
                    >
                      {location.full_address}
                      {/* {location.city}, {location.street} */}
                    </a>
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                <ArrowOutwardIcon />
                {/* {distances.length > index && (
                  <Typography variant="body2" color="text.secondary">
                    {distances[index]} km
                  </Typography>
                )} */}
                {location.distance_km < 1 ? 'Within 1 km' : `${location.distance_km} km away`}
              </Box>
            </Box>
          </Card>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No locations available for this service.
        </Typography>
      )}

      {/* </Card> */}
    </>
  );
};

export default TabLocations;
