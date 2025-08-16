import CloseIcon from '@mui/icons-material/Close';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PublicIcon from '@mui/icons-material/Public';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Card, Grid, IconButton, Link as MuiLink, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const platformIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  x: XIcon,
  tiktok: MusicNoteIcon,
};

function ShelterSocialMedia({ socialMedia }) {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const cardTextSecondary = theme.palette.text.secondary;
  if (!socialMedia || socialMedia.length === 0) {
    return (
      // <Typography variant="body2" color="text.secondary">
      //   No social profiles
      // </Typography>
      <Card
        sx={{
          p: { xs: 1, sm: 2 },
          borderRadius: 3,
          boxShadow: 3,
          background: cardBg,
          color: cardText,
        }}
      >
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              pb: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
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
              <CloseIcon />
            </IconButton>
            <Box>
              <Typography variant="body2" color="text.secondary">
                No social profiles
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        p: { xs: 1, sm: 2 },
        borderRadius: 3,
        boxShadow: 3,
        background: cardBg,
        color: cardText,
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
                sx={{
                  pointerEvents: 'none',
                  color: 'primary.main',
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.2)',
                  },
                }}
              >
                <IconComponent />
              </IconButton>
              <Box>
                {/* <Typography variant="body2" color="primary" fontWeight={600}>
                  {profile.platform}:{' '}
                </Typography> */}
                <MuiLink
                  href={profile.profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{ color: cardTextSecondary }}
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
