import { useEffect, useState } from 'react';

import { Box, Paper, Rating, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

import AnimalAvatar from '../../common/components/AnimalAvatar';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch {
    return '';
  }
};

const ServiceRatingDisplay = ({ serviceId, rating, reviewCount }) => {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/services/${serviceId}/reviews/`);
        setReviews(response.data);
      } catch (error) {
        setError('Failed to load reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [serviceId]);

  if (loading) return <Typography>Loading reviews...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box
      // my={4}
      sx={
        {
          //p: { xs: 1, sm: 2 },
          //borderRadius: 3,
          // background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
          // background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
          // transition: 'all 0.3s ease-in-out',
          // '&:hover': {
          //   background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
          // },
        }
      }
    >
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Typography variant="h6" fontWeight={600}>
          Reviews
        </Typography>
        <Rating value={rating || 0} readOnly precision={0.5} />
        <Typography variant="body2" color="text.secondary">
          {reviewCount || 0} reviews
        </Typography>
      </Box>

      {reviews?.length ? (
        reviews.map((review, idx) => (
          <Paper
            key={idx}
            elevation={1}
            sx={{
              // background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
              p: 2,
              mb: 2,
              background: cardBg,
              color: cardText,
              // background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
            }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={1}>
              <AnimalAvatar animal={review.user_avatar} username={review.user_name} />
              {/* <Avatar>{review.user_name?.charAt(0).toUpperCase() || '?'}</Avatar> */}
              <Box>
                <Box display="flex" alignItems="center" gap={2} mb={1}>
                  <Typography variant="subtitle2" fontWeight={500}>
                    {review.user_name}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {formatDate(review.created_at)}
                  </Typography>
                </Box>
                <Rating value={review.rating} readOnly size="small" precision={0.5} />
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {review.comment}
            </Typography>
          </Paper>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No reviews have been added yet. Be the first!
        </Typography>
      )}
    </Box>
  );
};

export default ServiceRatingDisplay;
