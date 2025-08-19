// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useMediaQuery } from '@mui/material';
// import { Typography } from '@mui/material';
// import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
// import { useTheme } from '@mui/material/styles';
// import illustration from '../../../assets/images/support/cat_astronaut_cuate_blue.svg';
// const CallToActionBanner = () => {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//   const navigate = useNavigate();
//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexWrap: 'wrap',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         background: theme.palette.custom.section,
//         minHeight: '500px',
//         position: 'relative',
//       }}
//     >
//       <Container
//         component="main"
//         maxWidth="lg"
//         style={{
//           display: 'flex',
//           flexWrap: 'wrap',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//         }}
//         sx={{
//           py: 6,
//         }}
//       >
//         <div
//           style={{
//             flex: '1 1 400px',
//             maxWidth: '600px',
//             paddingRight: isSmallScreen ? '0' : '40px',
//             zIndex: 2,
//             textAlign: isSmallScreen ? 'center' : 'left',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: isSmallScreen ? 'center' : 'flex-start',
//           }}
//         >
//           <Typography
//             variant="h1"
//             // color="primary"
//             style={{
//               textAlign: isSmallScreen ? 'center' : 'left',
//               fontSize: isSmallScreen ? '1.75rem' : '2.5rem',
//               color: theme.palette.text.secondary,
//               fontWeight: 600,
//               fontFamily: "'Inter', sans-serif",
//               marginBottom: '1rem',
//             }}
//           >
//             Have you lost a pet?
//           </Typography>
//           <p
//             style={{
//               color: '#616f7d',
//               fontSize: '1.1rem',
//               lineHeight: '1.6',
//               marginBottom: '2rem',
//               fontFamily: "'Inter', sans-serif",
//             }}
//           >
//             Use our application to post a lost or found pet advertisement.
//           </p>
//           <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
//             <Button variant="contained" sx={{ borderRadius: 2 }} color="primary" onClick={() => navigate('/pets')}>
//               View Map
//             </Button>
//             <Button variant="outlined" sx={{ borderRadius: 2 }} color="primary" onClick={() => navigate('/add-pet')}>
//               Add
//             </Button>
//           </div>
//         </div>
//         <div
//           style={{
//             flex: '1 1 400px',
//             maxWidth: '500px',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <img
//             src={illustration}
//             alt="Illustration"
//             style={{
//               width: '100%',
//               maxWidth: '400px',
//               height: 'auto',
//             }}
//           />
//         </div>
//       </Container>
//     </div>
//   );
// };
// export default CallToActionBanner;
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CallToActionBanner = ({
  title = 'Have you lost a pet?',
  description = 'Use our application to post a lost or found pet advertisement.',
  imageSrc,
  imagePosition = 'right', // 'left' or 'right'
  mainButton = { text: 'View Map', path: '/pets', variant: 'contained' },
  optionButton, // optional
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const isImageLeft = imagePosition === 'left';

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        // background: theme.palette.custom?.section || theme.palette.background.paper,
        minHeight: 500,
        position: 'relative',
      }}
    >
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 6,
        }}
      >
        {isImageLeft && imageSrc && (
          <Box
            sx={{
              flex: '1 1 400px',
              maxWidth: 500,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: { xs: 4, sm: 0 },
            }}
          >
            <img src={imageSrc} alt="Illustration" style={{ width: '100%', maxWidth: 400, height: 'auto' }} />
          </Box>
        )}

        <Box
          sx={{
            flex: '1 1 400px',
            maxWidth: 600,
            pr: { sm: isSmallScreen ? 0 : 5 },
            zIndex: 2,
            textAlign: isSmallScreen ? 'center' : 'left',
            display: 'flex',
            flexDirection: 'column',
            alignItems: isSmallScreen ? 'center' : 'flex-start',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: isSmallScreen ? 'center' : 'left',
              fontSize: { xs: '1.75rem', sm: '2.5rem' },
              color: theme.palette.text.secondary,
              fontWeight: 600,
              mb: 2,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#616f7d',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              mb: 3,
            }}
          >
            {description}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant={mainButton.variant}
              color="primary"
              sx={{ borderRadius: 2 }}
              onClick={() => navigate(mainButton.path)}
            >
              {mainButton.text}
            </Button>

            {optionButton && (
              <Button
                variant={optionButton.variant}
                color="primary"
                sx={{ borderRadius: 2 }}
                onClick={() => navigate(optionButton.path)}
              >
                {optionButton.text}
              </Button>
            )}
          </Box>
        </Box>

        {!isImageLeft && imageSrc && (
          <Box
            sx={{
              flex: '1 1 400px',
              maxWidth: 500,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: { xs: 4, sm: 0 },
            }}
          >
            <img src={imageSrc} alt="Illustration" style={{ width: '100%', maxWidth: 400, height: 'auto' }} />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CallToActionBanner;
