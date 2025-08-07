import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';

import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Drawer,
  Grid,
  Pagination,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { LocationContext } from '../../../contexts/LocationContext';
import LeafletClusterMap from '../../../shared/maps/LeafletClusterMap';
import PetCard from '../components/PetCard';
import PetCardSkeleton from '../components/PetCardSkeleton';
import PetSidebar from '../components/PetSidebar';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PetsList = () => {
  const { location: contextLocation } = useContext(LocationContext);
  const mapRef = useRef(null);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [filters, setFilters] = useState({
    status: '',
    species: '',
    gender: '',
    size: '',
    pattern: '',
    date: '',
    search: '',
    color: '',
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userLocation, setUserLocation] = useState([56.946285, 24.105078]); // Latvia default
  const [mapCenter, setMapCenter] = useState([56.946285, 24.105078]); // Latvia default
  const location = useLocation();
  const navigate = useNavigate();

  console.log('contextLocation', contextLocation);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  useEffect(() => {
    const lat = contextLocation?.latitude ?? contextLocation?.lat;
    const lng = contextLocation?.longitude ?? contextLocation?.lng;

    if (lat != null && lng != null) {
      const coords = [lat, lng];
      setUserLocation(coords);
      setMapCenter(coords);
    }
  }, [contextLocation]);

  // useEffect(() => {
  //   const fetchLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           const { latitude, longitude } = position.coords;
  //           console.log('User granted geolocation:', latitude, longitude);
  //           setUserLocation([latitude, longitude]);
  //           setMapCenter([latitude, longitude]);
  //         },
  //         (error) => {
  //           console.warn('Geolocation error:', error);
  //           fetchIpLocation();
  //         },
  //       );
  //     } else {
  //       fetchIpLocation();
  //     }
  //   };

  //   const fetchIpLocation = async () => {
  //     try {
  //       const response = await fetch('https://ipapi.co/json/');
  //       if (!response.ok) throw new Error('Failed to fetch IP location');
  //       const data = await response.json();
  //       console.log('IP location data:', data);

  //       if (data.latitude && data.longitude) {
  //         setUserLocation([data.latitude, data.longitude]);
  //         setMapCenter([data.latitude, data.longitude]);
  //       } else {
  //         setUserLocation([56.946285, 24.105078]);
  //         setMapCenter([56.946285, 24.105078]);
  //       }
  //     } catch (error) {
  //       console.error('IP location error:', error);
  //       setUserLocation([56.946285, 24.105078]);
  //       setMapCenter([56.946285, 24.105078]);
  //     }
  //   };

  //   fetchLocation();
  // }, []);

  const handlePanToLocation = (lat, lng) => {
    console.log('lat, lng', lat, lng);
    setMapCenter([lat, lng]);
    // Scroll to map smoothly
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status') || '';
    const species = queryParams.get('species') || '';
    const gender = queryParams.get('gender') || '';
    const size = queryParams.get('size') || '';
    const pattern = queryParams.get('pattern') || '';
    const date = queryParams.get('date') || '';
    const search = queryParams.get('search') || '';
    const color = queryParams.get('color') || '';
    const page = parseInt(queryParams.get('page')) || 1;

    setFilters({ status, species, gender, size, pattern, date, search, color });
    setPagination((prev) => ({ ...prev, page }));

    fetchPets(queryParams.toString());
  }, [location.search]);

  const fetchPets = useCallback(async () => {
    if (!userLocation || userLocation.length !== 2) return;

    const [lat, lng] = userLocation;

    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams(location.search);
      queryParams.set('latitude', lat);
      queryParams.set('longitude', lng);
      const res = await fetch(`${API_BASE_URL}/api/pets/?${queryParams.toString()}`);
      // const locationQuery = `&latitude=${lat}&longitude=${lng}`;
      // const res = await fetch(`${API_BASE_URL}/api/pets/?${queryString}${locationQuery}`);

      if (!res.ok) throw new Error('Failed to fetch pets');

      const data = await res.json();

      setPets(data.results);
      setPagination((prev) => ({
        ...prev,
        totalPages: Math.ceil(data.count / 6),
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [location.search, userLocation]);

  // Refetch whenever userLocation or queryString changes
  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  const handlePaginationChange = (e, page) => {
    setPagination((prev) => ({ ...prev, page }));
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', page);
    navigate(`${window.location.pathname}?${queryParams.toString()}`, {
      replace: true,
    });
  };

  const handleResetFilters = () => {
    const queryParams = new URLSearchParams();
    queryParams.set('page', 1);
    setFilters({
      status: '',
      species: '',
      gender: '',
      size: '',
      pattern: '',
      date: '',
      search: '',
      color: '',
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
    navigate(`${window.location.pathname}?${queryParams.toString()}`, { replace: true });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
    const queryParams = new URLSearchParams();
    if (newFilters.status) queryParams.append('status', newFilters.status);
    if (newFilters.species) queryParams.append('species', newFilters.species);
    if (newFilters.gender) queryParams.append('gender', newFilters.gender);
    if (newFilters.size) queryParams.append('size', newFilters.size);
    if (newFilters.pattern) queryParams.append('pattern', newFilters.pattern);
    if (newFilters.date) queryParams.append('date', newFilters.date);
    if (newFilters.search) queryParams.append('search', newFilters.search);
    if (newFilters.color) queryParams.append('color', newFilters.color);
    queryParams.append('page', 1);
    navigate(`${window.location.pathname}?${queryParams.toString()}`, {
      replace: true,
    });
  };

  return (
    <Container maxWidth="lg" disableGutters>
      <Helmet>
        <title>Find Lost, Found & Seen Pets - PetHub</title>
        <meta
          name="description"
          content="Browse lost, found, and seen pets. Filter by species, gender, size, and more to help reunite pets with their families."
        />
        <meta name="keywords" content="pets, lost pets, found pets, seen pets, dogs, cats, animal rescue, PetHub" />
        <meta property="og:title" content="Find Lost, Found & Seen Pets - PetHub" />
        <meta
          property="og:description"
          content="Browse lost, found, and seen pets. Filter by species, gender, size, and more to help reunite pets with their families."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <Grid container spacing={3}>
        {!isMobile && (
          <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
            <PetSidebar
              filters={filters}
              setFilters={setFilters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </Grid>
        )}

        <Grid size={{ xs: 12, sm: 12, md: 9, lg: 9 }} md={isMobile ? 12 : 9}>
          <Box
            sx={{
              marginBottom: { xs: 'none', md: '1rem' },
              justifyContent: 'flex-end',
            }}
          >
            <LeafletClusterMap pets={pets} mapCenter={mapCenter} userLocation={userLocation} mapRef={mapRef} />
          </Box>
          <Box
            py={2}
            sx={{
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => setDrawerOpen(true)}
              startIcon={<FilterListIcon />}
            >
              Filter
            </Button>
          </Box>

          {/* Drawer for mobile */}
          <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <Box
              sx={{ width: 300, py: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }, px: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 } }}
            >
              <PetSidebar
                filters={filters}
                setFilters={setFilters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
              />
            </Box>
          </Drawer>

          {loading ? (
            <Grid container spacing={2}>
              {[...Array(6)].map((_, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={index}>
                  <PetCardSkeleton />
                </Grid>
              ))}
            </Grid>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Grid container spacing={2}>
              {Array.isArray(pets) && pets.length > 0 ? (
                pets.map((pet) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={pet.id}>
                    <PetCard
                      pet={pet}
                      filters={filters}
                      pagination={pagination}
                      onPanToLocation={handlePanToLocation}
                    />
                  </Grid>
                ))
              ) : (
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                  <Alert
                    severity="info"
                    variant="outlined"
                    sx={{
                      textAlign: 'center',
                      backgroundColor: '#f5faff',
                      borderColor: '#b6e0fe',
                      color: '#0b3d91',
                    }}
                  >
                    <Typography variant="h6">
                      There are currently no pets available that match your search criteria.
                    </Typography>
                    <Typography variant="body2">
                      Try adjusting your filters or check back later – new pets may be added soon.
                    </Typography>
                  </Alert>
                </Grid>
              )}
            </Grid>
          )}
          {/* Show pagination only when there are results */}
          {!error && pets && pets.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: '2rem' }}>
              <Pagination
                color="primary"
                page={pagination.page}
                count={pagination.totalPages}
                onChange={handlePaginationChange}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PetsList;
