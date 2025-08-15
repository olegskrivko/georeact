import React from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
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
import { useTheme } from '@mui/material/styles';
import moment from 'moment';

const TabNotes = ({ pet }) => {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  return (
    <Card
      sx={{
        p: { xs: 1, sm: 2 },
        borderRadius: 3,

        background: cardBg,
        color: cardText,
      }}
    >
      {/* <CardContent style={{ paddingBottom: '1rem' }}> */}

      {/* </CardContent> */}
      {/* <CardContent style={{ paddingBottom: '1rem' }}> */}
      {/* <Box>
        <Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              style={{
                backgroundColor: '#00b3a4',
                color: '#fff',
                pointerEvents: 'none',
              }}
            >
              <TaskAltIcon />
            </IconButton>{' '}
            {pet.final_status_display}
          </Box>
        </Typography>
      </Box> */}
      <Box>
        {pet.notes ? (
          <Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton
                sx={{
                  pointerEvents: 'none',
                  color: 'primary.main',
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.2)',
                  },
                }}
              >
                <TextSnippetIcon />
              </IconButton>
              {pet.notes}
            </Box>
          </Typography>
        ) : (
          <Typography color="textSecondary">
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton
                sx={{
                  pointerEvents: 'none',
                  color: 'primary.main',
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.2)',
                  },
                }}
              >
                <TextSnippetIcon />
              </IconButton>
              No notes available.
            </Box>
          </Typography>
        )}
      </Box>
      {/* </CardContent> */}
    </Card>
  );
};

export default TabNotes;
