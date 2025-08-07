import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PublicIcon from '@mui/icons-material/Public';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Card, Grid, IconButton, Link as MuiLink, Typography } from '@mui/material';

const platformIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  x: XIcon,
  tiktok: MusicNoteIcon,
};

function ShelterSocialMedia({ socialMedia }) {
  if (!socialMedia || socialMedia.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No social profiles
      </Typography>
    );
  }

  return (
    <Card
      sx={{
        p: { xs: 1, sm: 2 },
        borderRadius: 3,
        background: '#fff',
        boxShadow: 3,
      }}
    >
      {socialMedia.map((profile, idx) => {
        const IconComponent = platformIcons[profile.platform.toLowerCase()] || PublicIcon;

        return (
          <Grid size={{ xs: 12 }} key={profile.id || idx}>
            <Box
              sx={{
                pb: idx === socialMedia.length - 1 ? 0 : 2,
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
      })}
    </Card>
  );
}

export default ShelterSocialMedia;
