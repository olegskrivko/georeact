import CloseIcon from '@mui/icons-material/Close';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PublicIcon from '@mui/icons-material/Public';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Card, Grid, IconButton, Stack, Typography } from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const TabNotes = ({ service }) => {
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
        // background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
        // transition: 'all 0.3s ease-in-out',
        // '&:hover': {
        //   background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
        // },
      }}
    >
      <Stack spacing={2}>
        {service.social_media && service.social_media.length > 0 ? (
          service.social_media.map((profile, idx) => {
            let IconComponent;
            switch (profile.platform.toLowerCase()) {
              case 'facebook':
                IconComponent = FacebookIcon;
                break;
              case 'instagram':
                IconComponent = InstagramIcon;
                break;
              case 'linkedin':
                IconComponent = LinkedInIcon;
                break;
              case 'youtube':
                IconComponent = YouTubeIcon;
                break;
              case 'x':
                IconComponent = XIcon;
                break;
              case 'tiktok':
                IconComponent = MusicNoteIcon;
                break;
              default:
                IconComponent = PublicIcon;
            }
            return (
              <Grid size={{ xs: 12 }} key={profile.id || idx}>
                <Box
                  variant="outlined"
                  sx={{
                    pb: idx === service.social_media.length - 1 ? 0 : 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <IconButton
                    style={{
                      backgroundColor: '#00b3a4',
                      color: '#f7f9fd',
                      pointerEvents: 'none',
                    }}
                  >
                    <IconComponent />
                  </IconButton>

                  <Box>
                    <Typography variant="body2" color="primary" fontWeight={600}>
                      {profile.platform}:{' '}
                    </Typography>
                    <MuiLink
                      href={profile.profile_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      color="#000"
                    >
                      {profile.profile_url}
                    </MuiLink>
                  </Box>
                </Box>
              </Grid>
            );
          })
        ) : (
          <Grid size={{ xs: 12 }} key="no-social-profiles">
            <Typography color="textSecondary">
              <Box display="flex" alignItems="center" gap={2}>
                <IconButton
                  style={{
                    backgroundColor: '#00b3a4',
                    color: '#fff',
                    pointerEvents: 'none',
                  }}
                >
                  <CloseIcon />
                </IconButton>{' '}
                No social profiles.
              </Box>
            </Typography>
          </Grid>
        )}
      </Stack>
    </Card>
  );
};

export default TabNotes;
