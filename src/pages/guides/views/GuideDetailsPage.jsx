import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, CircularProgress, Container, Typography } from '@mui/material';
import axios from 'axios';

import GuideHeader from '../components/GuideHeader';
import ParagraphNav from '../components/ParagraphNav';
import ParagraphSection from '../components/ParagraphSection';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const GuideDetailsPage = () => {
  const { slug } = useParams();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const paragraphRefs = useRef({});

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/guides/${slug}/`);
        setGuide(response.data);
      } catch (error) {
        console.error('Error fetching guide:', error);
        setError('Error fetching guide. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();
  }, [slug]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!guide) return null;

  const scrollToParagraph = (index) => {
    if (paragraphRefs.current[index]) {
      paragraphRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <Container maxWidth="lg" disableGutters>
      <GuideHeader title={guide.title} description={guide.description} createdAt={guide.created_at} />

      <ParagraphNav paragraphs={guide.paragraphs || []} onJump={scrollToParagraph} />

      <Box sx={{ mt: 4 }}>
        {guide.paragraphs?.length > 0 ? (
          guide.paragraphs.map((paragraph, index) => (
            <ParagraphSection
              key={index}
              paragraph={paragraph}
              index={index}
              refProp={(el) => (paragraphRefs.current[index] = el)}
            />
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
            This guide currently has no content.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default GuideDetailsPage;
