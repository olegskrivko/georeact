import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

import { Box, Grid, Typography, Paper, Container } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Statistics = () => {
  const [startCount, setStartCount] = useState(false);
  const [stats, setStats] = useState({ lost: 0, found: 0, seen: 0 });

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
    onChange: (inView) => {
      if (inView) {
        setStartCount(true);
      }
    },
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/pets/status-counts/`);
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  const data = [
    {
      label: 'Total Lost Pets',
      value: stats.lost,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: <SearchIcon sx={{ fontSize: 40, color: 'white' }} />,
      description: 'Pets currently missing and in need of help'
    },
    {
      label: 'Total Found Pets',
      value: stats.found,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: <PetsIcon sx={{ fontSize: 40, color: 'white' }} />,
      description: 'Pets found and currently in foster care'
    },
    {
      label: 'Pets Sighted',
      value: stats.seen,
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: <VisibilityIcon sx={{ fontSize: 40, color: 'white' }} />,
      description: 'Pets reported in the community'
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box 
        sx={{ 
          my: 6,
          py: 4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 4,
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
          }
        }} 
        ref={ref}
      >
        <Typography 
          variant="h3" 
          sx={{ 
            textAlign: 'center', 
            color: 'white', 
            fontWeight: 700,
            mb: 1,
            position: 'relative',
            zIndex: 1
          }}
        >
          Statistics
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            textAlign: 'center', 
            color: 'rgba(255,255,255,0.8)', 
            mb: 4,
            position: 'relative',
            zIndex: 1
          }}
        >
          Making a difference in pet reunification
        </Typography>

        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {data.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={8}
                sx={{
                  height: '100%',
                  background: item.color,
                  borderRadius: 3,
                  p: 3,
                  textAlign: 'center',
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
                    '& .stat-icon': {
                      transform: 'scale(1.1)',
                    }
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255,255,255,0.1)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover::before': {
                    opacity: 1,
                  }
                }}
              >
                <Box 
                  className="stat-icon"
                  sx={{ 
                    mb: 2,
                    transition: 'transform 0.3s ease',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  {item.icon}
                </Box>
                
                <Typography 
                  variant="h2" 
                  sx={{ 
                    color: 'white', 
                    fontWeight: 700,
                    mb: 1,
                    fontSize: { xs: '2.5rem', sm: '3rem' }
                  }}
                >
                  {startCount ? <CountUp end={item.value} duration={2.5} /> : 0}
                </Typography>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'white', 
                    fontWeight: 600,
                    mb: 1
                  }}
                >
                  {item.label}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.4
                  }}
                >
                  {item.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Statistics;
