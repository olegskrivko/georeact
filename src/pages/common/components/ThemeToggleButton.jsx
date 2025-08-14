// In NavBar.jsx
// Example toggle button in Navbar
import React from 'react';

import { Brightness4, Brightness7 } from '@mui/icons-material';
import { IconButton, Tooltip, Typography } from '@mui/material';

import { useThemeContext } from '../../../contexts/ThemeContext';

const ThemeToggle = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Tooltip title="Change Theme">
      <IconButton onClick={toggleTheme} color="inherit" size="small">
        {mode === 'dark' ? (
          <Brightness7 style={{ color: '#00b3a4' }} fontSize="small" />
        ) : (
          <Brightness4 style={{ color: '#00b3a4' }} fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
//   <Tooltip title="Change Location">
//         <IconButton onClick={handleOpen} size="small">
//           <RoomIcon style={{ color: '#DAFF84' }} fontSize="small" />
//         </IconButton>
//       </Tooltip>
