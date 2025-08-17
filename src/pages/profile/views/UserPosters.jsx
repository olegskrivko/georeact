// // // import React, { useEffect, useState } from 'react';
// // // import {
// // //   Alert,
// // //   CircularProgress,
// // //   Container,
// // //   Paper,
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableContainer,
// // //   TableHead,
// // //   TableRow,
// // //   Typography,
// // // } from '@mui/material';
// // // import axios from 'axios';
// // // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// // // const PostersList = () => {
// // //   const [posters, setPosters] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const fetchPosters = async () => {
// // //     try {
// // //       const response = await axios.get(`${API_BASE_URL}/api/pets/my-posters/`);
// // //       setPosters(response.data);
// // //       setLoading(false);
// // //     } catch (error) {
// // //       console.error(error);
// // //       setError('Failed to load posters.');
// // //       setLoading(false);
// // //     }
// // //   };
// // //   useEffect(() => {
// // //     fetchPosters();
// // //   }, []);
// // //   return (
// // //     <Container sx={{ mt: 4 }}>
// // //       <Typography variant="h4" gutterBottom>
// // //         My Posters
// // //       </Typography>
// // //       {loading && <CircularProgress />}
// // //       {error && <Alert severity="error">{error}</Alert>}
// // //       {!loading && !error && (
// // //         <TableContainer component={Paper}>
// // //           <Table>
// // //             <TableHead>
// // //               <TableRow>
// // //                 <TableCell>
// // //                   <strong>Name</strong>
// // //                 </TableCell>
// // //                 <TableCell>
// // //                   <strong>Pet ID</strong>
// // //                 </TableCell>
// // //                 <TableCell>
// // //                   <strong>Scans</strong>
// // //                 </TableCell>
// // //                 <TableCell>
// // //                   <strong>Latitude</strong>
// // //                 </TableCell>
// // //                 <TableCell>
// // //                   <strong>Longitude</strong>
// // //                 </TableCell>
// // //                 <TableCell>
// // //                   <strong>Created At</strong>
// // //                 </TableCell>
// // //               </TableRow>
// // //             </TableHead>
// // //             <TableBody>
// // //               {posters.map((poster) => (
// // //                 <TableRow key={poster.id}>
// // //                   <TableCell>{poster.name}</TableCell>
// // //                   <TableCell>{poster.pet}</TableCell>
// // //                   <TableCell>{poster.scans}</TableCell>
// // //                   <TableCell>
// // //                     {poster.has_location && poster.latitude != null ? poster.latitude.toFixed(5) : '-'}
// // //                   </TableCell>
// // //                   <TableCell>
// // //                     {poster.has_location && poster.longitude != null ? poster.longitude.toFixed(5) : '-'}
// // //                   </TableCell>
// // //                   <TableCell>{new Date(poster.created_at).toLocaleString()}</TableCell>
// // //                 </TableRow>
// // //               ))}
// // //             </TableBody>
// // //           </Table>
// // //         </TableContainer>
// // //       )}
// // //     </Container>
// // //   );
// // // };
// // // export default PostersList;
// // import React, { useEffect, useState } from 'react';
// // import {
// //   Alert,
// //   CircularProgress,
// //   Container,
// //   Paper,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Typography,
// // } from '@mui/material';
// // import axios from 'axios';
// // import LeafletPostersMap from '../../../shared/maps/LeafletPostersMap';
// // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// // const PostersList = () => {
// //   const [centerCoords, setCenterCoords] = useState([56.946285, 24.105078]);
// //   const [posters, setPosters] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const fetchUserPosters = async () => {
// //     const accessToken = localStorage.getItem('access_token');
// //     if (!accessToken) {
// //       setError('You must be logged in to view your posters.');
// //       setLoading(false);
// //       return;
// //     }
// //     try {
// //       const response = await axios.get(`${API_BASE_URL}/api/pets/my-posters/`, {
// //         headers: {
// //           Authorization: `Bearer ${accessToken}`,
// //         },
// //       });
// //       setPosters(response.data);
// //       setLoading(false);
// //     } catch (error) {
// //       console.error(error);
// //       setError('Failed to load posters.');
// //       setLoading(false);
// //     }
// //   };
// //   useEffect(() => {
// //     fetchUserPosters();
// //   }, []);
// //   return (
// //     <Container sx={{ mt: 4 }}>
// //       <Typography
// //         component="h1"
// //         align="center"
// //         sx={{
// //           fontWeight: 800,
// //           fontSize: {
// //             xs: '1.5rem',
// //             sm: '2rem',
// //             md: '2.5rem',
// //             lg: '2.5rem',
// //           },
// //           mb: 5,
// //           background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
// //           WebkitBackgroundClip: 'text',
// //           WebkitTextFillColor: 'transparent',
// //         }}
// //       >
// //         My Posters
// //       </Typography>
// //       {loading && <CircularProgress />}
// //       {error && <Alert severity="error">{error}</Alert>}
// //       {!loading && !error && (
// //         //  <Paper sx={{ mt: 3, px: 2, borderTop: '4px solid #8041a6', boxShadow: 2, position: 'relative' }}></Paper>
// //         <TableContainer
// //           component={Paper}
// //           sx={{ mt: 3, px: 2, borderTop: '4px solid #00b5ad', boxShadow: 2, position: 'relative' }}
// //         >
// //           <Table>
// //             <TableHead>
// //               <TableRow>
// //                 <TableCell>
// //                   <strong>Name</strong>
// //                 </TableCell>
// //                 <TableCell>
// //                   <strong>Pet ID</strong>
// //                 </TableCell>
// //                 <TableCell>
// //                   <strong>Scans</strong>
// //                 </TableCell>
// //                 <TableCell>
// //                   <strong>Latitude</strong>
// //                 </TableCell>
// //                 <TableCell>
// //                   <strong>Longitude</strong>
// //                 </TableCell>
// //                 <TableCell>
// //                   <strong>Created At</strong>
// //                 </TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {posters.map((poster) => (
// //                 <TableRow key={poster.id}>
// //                   <TableCell>{poster.name}</TableCell>
// //                   <TableCell>{poster.pet}</TableCell>
// //                   <TableCell>{poster.scans}</TableCell>
// //                   <TableCell>
// //                     {poster.has_location && poster.latitude != null ? poster.latitude.toFixed(5) : '-'}
// //                   </TableCell>
// //                   <TableCell>
// //                     {poster.has_location && poster.longitude != null ? poster.longitude.toFixed(5) : '-'}
// //                   </TableCell>
// //                   <TableCell>{new Date(poster.created_at).toLocaleString()}</TableCell>
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       )}
// //       <LeafletPostersMap posters={posters} centerCoords={centerCoords} />
// //     </Container>
// //   );
// // };
// // export default PostersList;
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   Box,
//   CircularProgress,
//   Container,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from '@mui/material';
// import axios from 'axios';
// import LeafletPostersMap from '../../../shared/maps/LeafletPostersMap';
// import StatsCard from '../components/StatsCard';
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const PostersList = () => {
//   const [centerCoords, setCenterCoords] = useState([56.946285, 24.105078]);
//   const [posters, setPosters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   // For statistics
//   const [totalPosters, setTotalPosters] = useState(0);
//   const [postersCountByPet, setPostersCountByPet] = useState({});
//   const fetchUserPosters = async () => {
//     const accessToken = localStorage.getItem('access_token');
//     if (!accessToken) {
//       setError('You must be logged in to view your posters.');
//       setLoading(false);
//       return;
//     }
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/pets/my-posters/`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       const postersData = response.data;
//       setPosters(postersData);
//       setLoading(false);
//       // Calculate statistics
//       setTotalPosters(postersData.length);
//       // Count posters per pet
//       const countByPet = postersData.reduce((acc, poster) => {
//         const petId = poster.pet;
//         acc[petId] = (acc[petId] || 0) + 1;
//         return acc;
//       }, {});
//       setPostersCountByPet(countByPet);
//     } catch (error) {
//       console.error(error);
//       setError('Failed to load posters.');
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchUserPosters();
//   }, []);
//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography
//         component="h1"
//         align="center"
//         sx={{
//           fontWeight: 800,
//           fontSize: {
//             xs: '1.5rem',
//             sm: '2rem',
//             md: '2.5rem',
//             lg: '2.5rem',
//           },
//           mb: 5,
//           background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
//           WebkitBackgroundClip: 'text',
//           WebkitTextFillColor: 'transparent',
//         }}
//       >
//         My Posters
//       </Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {!loading && !error && (
//         <>
//           {/* Posters Table */}
//           <TableContainer
//             component={Paper}
//             sx={{ mt: 3, px: 2, borderTop: '4px solid #00b5ad', boxShadow: 2, position: 'relative' }}
//           >
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>
//                     <strong>Name</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Pet ID</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Scans</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Latitude</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Longitude</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Created At</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {posters.map((poster) => (
//                   <TableRow key={poster.id}>
//                     <TableCell>{poster.name}</TableCell>
//                     <TableCell>{poster.pet}</TableCell>
//                     <TableCell>{poster.scans}</TableCell>
//                     <TableCell>
//                       {poster.has_location && poster.latitude != null ? poster.latitude.toFixed(5) : '-'}
//                     </TableCell>
//                     <TableCell>
//                       {poster.has_location && poster.longitude != null ? poster.longitude.toFixed(5) : '-'}
//                     </TableCell>
//                     <TableCell>{new Date(poster.created_at).toLocaleString()}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           {/* Add padding before map */}
//           <Box sx={{ mt: 6 }}>
//             <LeafletPostersMap posters={posters} centerCoords={centerCoords} />
//           </Box>
//           {/* Statistics Section */}
//           {!loading && !error && (
//             <>
//               <StatsCard totalPosters={totalPosters} postersCountByPet={postersCountByPet} />
//               {/* ...rest of your code */}
//             </>
//           )}
//         </>
//       )}
//     </Container>
//   );
// };
// export default PostersList;
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

import { LocationContext } from '../../../contexts/LocationContext';
import LeafletPostersMap from '../../../shared/maps/LeafletPostersMap';
import SectionLabel from '../components/SectionLabel';
import StatsCard from '../components/StatsCard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PostersList = () => {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const { location: contextLocation } = useContext(LocationContext);
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState([56.946285, 24.105078]); // Latvia default
  const [mapCenter, setMapCenter] = useState([56.946285, 24.105078]); // Latvia default
  const [posters, setPosters] = useState([]);
  const [pets, setPets] = useState([]); // <-- new state for pets
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For statistics
  const [totalPosters, setTotalPosters] = useState(0);
  const [postersCountByPet, setPostersCountByPet] = useState({});

  useEffect(() => {
    const lat = contextLocation?.latitude ?? contextLocation?.lat;
    const lng = contextLocation?.longitude ?? contextLocation?.lng;

    if (lat != null && lng != null) {
      const coords = [lat, lng];
      setUserLocation(coords);
      setMapCenter(coords);
    }
  }, [contextLocation]);
  // Fetch posters
  const fetchUserPosters = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setError('You must be logged in to view your posters.');
      setLoading(false);
      return;
    }

    try {
      const postersResponse = await axios.get(`${API_BASE_URL}/api/pets/my-posters/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const postersData = postersResponse.data;
      setPosters(postersData);

      // Calculate statistics
      setTotalPosters(postersData.length);
      console.log('postersData', postersData);
      // Count posters per pet
      const countByPet = postersData.reduce((acc, poster) => {
        const petId = poster.pet;
        acc[petId] = (acc[petId] || 0) + 1;
        return acc;
      }, {});
      setPostersCountByPet(countByPet);
    } catch (error) {
      console.error(error);
      setError('Failed to load posters.');
    }
  };
  // Delete handler
  const handleDeletePoster = async (posterId) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setError('You must be logged in to delete posters.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this poster?')) return;

    try {
      // Optimistic UI update
      setPosters((prev) => prev.filter((p) => p.id !== posterId));

      await axios.delete(`${API_BASE_URL}/api/pets/posters/${posterId}/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      // Refetch from server to stay in sync
      await fetchUserPosters();
    } catch (err) {
      console.error(err);
      setError('Failed to delete poster.');
      // Rollback if error
      await fetchUserPosters();
    }
  };
  // const handleDeletePoster = async (posterId) => {
  //   const accessToken = localStorage.getItem('access_token');
  //   if (!accessToken) {
  //     setError('You must be logged in to delete posters.');
  //     return;
  //   }

  //   if (!window.confirm('Are you sure you want to delete this poster?')) return;

  //   try {
  //     await axios.delete(`${API_BASE_URL}/api/pets/posters/${posterId}/`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     // Refetch posters from server instead of just removing locally
  //     await fetchUserPosters();
  //   } catch (err) {
  //     console.error(err);
  //     setError('Failed to delete poster.');
  //   }
  // };

  // const handleDeletePoster = async (posterId) => {
  //   const accessToken = localStorage.getItem('access_token');
  //   if (!accessToken) {
  //     setError('You must be logged in to delete posters.');
  //     return;
  //   }

  //   if (!window.confirm('Are you sure you want to delete this poster?')) return;

  //   try {
  //     await axios.delete(`${API_BASE_URL}/api/pets/posters/${posterId}/`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     // Remove from local state
  //     setPosters((prev) => prev.filter((p) => p.id !== posterId));
  //   } catch (err) {
  //     console.error(err);
  //     setError('Failed to delete poster.');
  //   }
  // };

  // Fetch pets
  const fetchUserPets = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setError('You must be logged in to view your pets.');
      setLoading(false);
      return;
    }

    try {
      const petsResponse = await axios.get(`${API_BASE_URL}/api/accounts/user-pets/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setPets(petsResponse.data);
    } catch (error) {
      console.error(error);
      setError('Failed to load user pets.');
    }
  };

  // Combined fetch on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchUserPosters(), fetchUserPets()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" disableGutters>
      <Box sx={{ my: { xs: 2, sm: 2, md: 3, lg: 4, xl: 4 } }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 5,
            mt: { xs: 4, sm: 3, md: 2, lg: 1 },
            color: theme.palette.text.secondary,
          }}
        >
          My Posters
        </Typography>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && (
          <>
            {/* Map with posters and pets */}
            <Box sx={{ my: 6 }}>
              {/* Pass both posters and pets as props */}
              <LeafletPostersMap
                posters={posters}
                pets={pets}
                mapCenter={mapCenter}
                isLoading={loading}
                userLocation={userLocation}
                mapRef={mapRef}
              />
            </Box>
            {/* Contacts Section */}
            <SectionLabel variant="subtitle1">Posters Statistics</SectionLabel>
            {/* <Grid container spacing={2} mb={2}>
              <Grid size={{ xs: 12 }}>
               
                <StatsCard totalPosters={totalPosters} postersCountByPet={postersCountByPet} />
              </Grid>
            </Grid> */}
            {/* Posters Table */}
            <TableContainer
              component={Paper}
              sx={{
                mt: 3,
                px: 2,
                borderTop: '4px solid #00b5ad',
                boxShadow: 2,
                position: 'relative',
                background: cardBg,
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Pet ID</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Scans</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Latitude</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Longitude</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Created At</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Actions</strong>
                    </TableCell>{' '}
                    {/* New column */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {posters.map((poster) => (
                    <TableRow key={poster.id}>
                      <TableCell>{poster.name}</TableCell>
                      <TableCell>{poster.pet}</TableCell>
                      <TableCell>{poster.scans}</TableCell>
                      <TableCell>
                        {poster.has_location && poster.latitude != null ? poster.latitude.toFixed(5) : '-'}
                      </TableCell>
                      <TableCell>
                        {poster.has_location && poster.longitude != null ? poster.longitude.toFixed(5) : '-'}
                      </TableCell>
                      <TableCell>{new Date(poster.created_at).toLocaleString()}</TableCell>
                      <TableCell>
                        <button
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#d32f2f',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleDeletePoster(poster.id)}
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Box mt={4} display="flex" justifyContent="space-between" alignItems="center" textAlign="center">
              <Link
                to="/user-profile"
                style={{
                  color: '#00b5ad',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                }}
              >
                <ArrowBackIcon fontSize="small" />
                Back
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PostersList;
