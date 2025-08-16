import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import AddCommentIcon from '@mui/icons-material/AddComment';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, Card, Collapse, IconButton, Paper, Rating, TextField, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import { useAuth } from '../../../contexts/AuthContext';
import AnimalAvatar from '../../common/components/AnimalAvatar';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const RatingForm = ({ serviceId, onSuccess }) => {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleToggleExpand = () => setExpanded((prev) => !prev);

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      enqueueSnackbar('Please log in to submit a review.', {
        variant: 'warning',
      });
      return;
    }
    if (rating < 1 || !comment.trim()) {
      enqueueSnackbar('Please provide both a rating and a comment.', {
        variant: 'info',
      });
      return;
    }
    setSubmitting(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/services/${serviceId}/reviews/`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      enqueueSnackbar('Review submitted successfully!', {
        variant: 'success',
      });
      setRating(0);
      setComment('');
      onSuccess?.();
      setExpanded(false);
    } catch (err) {
      enqueueSnackbar('Failed to submit review.', { variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card
      sx={{
        p: { xs: 1, sm: 2 },
        borderRadius: 3,

        mt: 4,

        background: cardBg,
        color: cardText,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
        onClick={handleToggleExpand}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography color="textSecondary">
            <Box display="flex" alignItems="center">
              {user ? (
                <AnimalAvatar animal={user.avatar} username={user.username} />
              ) : (
                <IconButton color="primary" style={{ backgroundColor: '#f7f9fd' }}>
                  <AddCommentIcon />
                </IconButton>
              )}
              <Typography color="textSecondary" sx={{ pl: { xs: 1, sm: 2 } }}>
                Add Review
              </Typography>
            </Box>
          </Typography>
        </Box>
        <IconButton>{expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
      </Box>
      {user ? (
        <Collapse in={expanded}>
          <Box sx={{ pt: { xs: 1, sm: 2 } }}>
            <Rating
              name="user-rating"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              precision={0.5}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Your comment"
              fullWidth
              multiline
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ mb: 2 }}
            />
            {/* <Button
              startIcon={<SendIcon />}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={submitting || rating < 1 || !comment.trim()}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </Button> */}

            <Tooltip title="Submit Review">
              <IconButton
                disabled={submitting || rating < 1 || !comment.trim()}
                onClick={() => {
                  // If we have a selected file, pass it to parent
                  handleSubmit();
                }}
                sx={{
                  backgroundColor: '#00b3a4',

                  color: '#fff',
                  '&:hover': { backgroundColor: '#007c73' },
                }}
              >
                <SendIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Collapse>
      ) : (
        <Box p={2}>
          <Typography color="textSecondary">Please log in to add a review.</Typography>{' '}
          <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 500 }}>
            Log in
          </Link>
        </Box>
      )}
    </Card>
  );
};

export default RatingForm;
