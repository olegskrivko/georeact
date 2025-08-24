import { Avatar, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import petIcon1 from '../../../assets/images/home/pet_icon_1.jpg';
import petIcon2 from '../../../assets/images/home/pet_icon_2.jpg';
import petIcon3 from '../../../assets/images/home/pet_icon_3.jpg';
import petIcon4 from '../../../assets/images/home/pet_icon_4.jpg';
import petIcon5 from '../../../assets/images/home/pet_icon_5.jpg';
import petIcon6 from '../../../assets/images/home/pet_icon_6.jpg';

const pets = [
  { src: petIcon1, x: '5%', y: '60%', size: 50 },
  { src: petIcon2, x: '18%', y: '35%', size: 66 },
  { src: petIcon3, x: '32%', y: '75%', size: 58 },
  { src: petIcon4, x: '52%', y: '25%', size: 74 },
  { src: petIcon5, x: '68%', y: '70%', size: 52 },
  { src: petIcon6, x: '85%', y: '50%', size: 68 },
];

const PetPath = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'relative',
        textAlign: 'center',
        // backgroundColor: '#ffffff',
        // background: theme.palette.custom.section,
        overflow: 'hidden',
      }}
    >
      {/* <Typography variant="h4" fontWeight={600} gutterBottom style={{ color: '#16477c' }}>
        Smart and convenient post management
      </Typography>
      <Typography
        variant="body1"
        sx={{
          maxWidth: '600px',
          margin: '0 auto',
          color: '#555',
        }}
      >
        Thanks to the convenient design and filters, searching among posts becomes simple and pleasant. Save posts to
        your profile so you can easily track their status at any time.
      </Typography> */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '300px',
          marginTop: '40px',
        }}
      >
        <svg
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
          style={{
            width: '100%',
            height: '200px',
            position: 'absolute',
            top: 20, // adjust for alignment with avatars
            left: 0,
            zIndex: 1,
          }}
        >
          <path
            d="
      M 0 30
      C 100 0, 150 60, 200 50
      S 300 90, 400 70
      S 550 110, 600 100
      S 750 140, 800 120
      S 950 180, 1000 190
    "
            fill="none"
            stroke="#ccc"
            strokeDasharray="10 10"
            strokeWidth="2"
          />
        </svg>
        {/* <svg
  viewBox="0 0 1000 200"
  preserveAspectRatio="none"
  style={{
    width: '100%',
    height: '200px',
    position: 'absolute',
    top: 20,
    left: 0,
    zIndex: 1,
  }}
>
  <defs>
    <linearGradient id="fadeLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="transparent" />
      <stop offset="10%" stopColor="#ccc" />
      <stop offset="90%" stopColor="#ccc" />
      <stop offset="100%" stopColor="transparent" />
    </linearGradient>
  </defs>

  <path
    d="
      M 0 30
      C 100 0, 150 60, 200 50
      S 300 90, 400 70
      S 550 110, 600 100
      S 750 140, 800 120
      S 950 180, 1000 190
    "
    fill="none"
    stroke="url(#fadeLine)"
    strokeDasharray="10 10"
    strokeWidth="2"
  />
</svg> */}

        {/* Pet Avatars with Custom Sizes */}
        {pets.map((pet, index) => (
          <Avatar
            key={index}
            src={pet.src}
            alt={`Pet ${index}`}
            sx={{
              position: 'absolute',
              width: pet.size,
              height: pet.size,
              border: '4px solid white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              objectFit: 'cover',
              left: pet.x,
              top: `calc(${pet.y} - ${pet.size / 1}px)`,
              zIndex: 2,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PetPath;
