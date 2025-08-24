import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import FilterListIcon from '@mui/icons-material/FilterList';
import { Alert, Box, Button, Container, Drawer, Grid, Pagination, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';

import { LocationContext } from '../../../contexts/LocationContext';
import LeafletSheltersMap from '../../../shared/maps/LeafletSheltersMap';
import ShelterCard from '../components/ShelterCard';
import ShelterCardSkeleton from '../components/ShelterCardSkeleton';
import Sidebar from '../components/ShelterSidebar';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SheltersPage = () => {
  const { location: contextLocation } = useContext(LocationContext);
  // const mapRef = useRef();
  const mapRef = useRef(null);
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mapCenter, setMapCenter] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [filters, setFilters] = useState({ category: '', size: '', search: '', animal_type_slug: '' });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  // const mapContainerRef = useRef();

  useEffect(() => {
    const lat = contextLocation?.latitude ?? contextLocation?.lat;
    const lng = contextLocation?.longitude ?? contextLocation?.lng;

    if (lat != null && lng != null) {
      const coords = [lat, lng];
      setUserLocation(coords);
      setMapCenter(coords);
    }
  }, [contextLocation]);

  // const handlePanToLocation = (lat, lng) => {
  //   setMapCenter([parseFloat(lat), parseFloat(lng)]);
  //   if (mapContainerRef.current) {
  //     mapContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  //   }
  // };

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
    const category = queryParams.get('category') || '';
    const size = queryParams.get('size') || '';
    const search = queryParams.get('search') || '';
    const animal_type_slug = queryParams.get('animal_type_slug') || '';
    const page = parseInt(queryParams.get('page')) || 1;

    setFilters({ category, size, search, animal_type_slug });
    setPagination({ page, totalPages: pagination.totalPages });
    fetchShelters({ category, size, search, page, animal_type_slug });

    // setPagination((prev) => ({ ...prev, page }));
    // fetchShelters(queryParams.toString());
  }, [location.search]);

  const fetchShelters = useCallback(async () => {
    if (!userLocation || userLocation.length !== 2) return;

    const [lat, lng] = userLocation;

    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams(location.search);
      queryParams.set('latitude', lat);
      queryParams.set('longitude', lng);
      const res = await fetch(`${API_BASE_URL}/api/shelters/?${queryParams.toString()}`);

      if (!res.ok) throw new Error('Failed to fetch shelters');

      const data = await res.json();

      setShelters(data.results);
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

  // useEffect(() => {
  //   const fetchShelters = async () => {
  //     try {
  //       const response = await axios.get(`${API_BASE_URL}/api/shelters/`);
  //       // Handle both paginated and non-paginated responses
  //       const sheltersData = response.data.results || response.data;
  //       setShelters(sheltersData);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching shelters:', error);
  //       setError('Failed to load shelters. Please try again later.');
  //       setLoading(false);
  //     }
  //   };

  //   fetchShelters();
  // }, []);

  // Refetch whenever userLocation or queryString changes
  useEffect(() => {
    fetchShelters();
  }, [fetchShelters]);

  // const fetchShelters = async ({ category, size, search, page, animal_type_slug }) => {
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     const queryParams = new URLSearchParams();
  //     if (category) queryParams.append('category', category);
  //     if (size) queryParams.append('size', size);
  //     if (search) queryParams.append('search', search);
  //     if (animal_type_slug) queryParams.append('animal_type_slug', animal_type_slug);
  //     queryParams.append('page', page);

  //     const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
  //     navigate(newUrl, { replace: true });

  //     const res = await fetch(`${API_BASE_URL}/api/shelters/?${queryParams}`);
  //     if (!res.ok) throw new Error('Failed to fetch shelters');

  //     const data = await res.json();
  //     console.log('shelters', shelters);
  //     setShelters(data.results);
  //     setPagination((prev) => ({
  //       ...prev,
  //       totalPages: Math.ceil(data.count / 8),
  //     }));
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handlePaginationChange = (e, page) => {
    setPagination((prev) => ({ ...prev, page }));
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', page);
    navigate(`${window.location.pathname}?${queryParams.toString()}`, {
      replace: true,
    });
  };

  const handleResetFilters = () => {
    // Start with only page param
    const queryParams = new URLSearchParams({ page: 1 });
    // Reset filters state
    setFilters({ category: '', size: '', search: '', animal_type_slug: '' });
    // Reset pagination state
    setPagination((prev) => ({ ...prev, page: 1 }));
    // Update URL
    navigate(`${window.location.pathname}?${queryParams.toString()}`, { replace: true });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
    const queryParams = new URLSearchParams();
    if (newFilters.category) queryParams.append('category', newFilters.category);
    if (newFilters.size) queryParams.append('size', newFilters.size);
    if (newFilters.search) queryParams.append('search', newFilters.search);
    if (newFilters.animal_type_slug) queryParams.append('animal_type_slug', newFilters.animal_type_slug);
    queryParams.append('page', 1);
    navigate(`${window.location.pathname}?${queryParams.toString()}`, { replace: true });
  };

  return (
    <Container maxWidth="lg" disableGutters>
      <Grid container spacing={3}>
        {/* Sidebar for desktop */}
        {!isMobile && (
          <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
            <Sidebar
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
            {/* <Box
            ref={mapContainerRef}
            sx={{
              marginBottom: { xs: 'none', md: '1rem' },
              justifyContent: 'flex-end',
            }}
          > */}
            <div ref={mapRef}>
              {/* Map */}
              <LeafletSheltersMap
                shelters={shelters}
                mapCenter={mapCenter}
                isLoading={loading}
                userLocation={userLocation}
                // ref={mapRef}
              />
            </div>
          </Box>
          {/* Filter button for mobile to show drawer */}
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
              sx={{
                width: 300,
                py: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
                px: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
              }}
            >
              <Sidebar
                filters={filters}
                setFilters={setFilters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
              />
            </Box>
          </Drawer>

          {/* Skeletons for Loading */}
          {loading ? (
            <Grid container spacing={2}>
              {[...Array(6)].map((_, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={index}>
                  <ShelterCardSkeleton />
                </Grid>
              ))}
            </Grid>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Grid container spacing={2}>
              {/* Shelter cards */}
              {Array.isArray(shelters) && shelters.length > 0 ? (
                shelters.map((shelter) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={shelter.id}>
                    <ShelterCard
                      shelter={shelter}
                      filters={filters}
                      pagination={pagination}
                      onPanToLocation={handlePanToLocation}
                    />
                  </Grid>
                ))
              ) : (
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                  {/* Shelters not found message */}
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
                      Currently no shelters available that match your search criteria.
                    </Typography>
                    <Typography variant="body2">
                      Try changing the filters or visit us later – new shelters may be added soon.
                    </Typography>
                  </Alert>
                </Grid>
              )}
            </Grid>
          )}

          {/* Show pagination only when there are results */}
          {!error && shelters && shelters.length > 0 && (
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

export default SheltersPage;
