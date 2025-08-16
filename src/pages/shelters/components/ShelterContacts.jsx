import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import { Box, Card, IconButton, Link as MuiLink, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function ShelterContacts({ shelter, onLocationClick }) {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const cardTextSecondary = theme.palette.text.secondary;
  return (
    <Card
      sx={{
        p: { xs: 1, sm: 2 },
        borderRadius: 3,
        background: cardBg,
        color: cardText,
        boxShadow: 3,
      }}
    >
      {/* Address */}
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
          <LocationOnIcon />
        </IconButton>
        <Box>
          {/* <Typography variant="body2" color="primary" fontWeight={600}>
            Address:{' '}
          </Typography> */}
          <MuiLink onClick={onLocationClick} sx={{ cursor: 'pointer', color: cardTextSecondary }} underline="none">
            {shelter.full_address}
          </MuiLink>
        </Box>
      </Box>

      {/* Website */}
      <Box display="flex" alignItems="center" gap={2} mt={2}>
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
          <PublicIcon />
        </IconButton>
        <Box>
          {/* <Typography variant="body2" color="primary" fontWeight={600}>
            Website:{' '}
          </Typography> */}
          {shelter.website_url ? (
            <MuiLink
              href={shelter.website_url}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{ color: cardTextSecondary }}
            >
              {shelter.website_url}
            </MuiLink>
          ) : (
            <Typography variant="body2" sx={{ color: cardTextSecondary }}>
              No website
            </Typography>
          )}
        </Box>
      </Box>

      {/* Phone */}
      <Box display="flex" alignItems="center" gap={2} mt={2}>
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
          <PhoneIcon />
        </IconButton>
        <Box>
          {/* <Typography variant="body2" color="primary" fontWeight={600}>
            Phone:{' '}
          </Typography> */}
          {shelter.full_phone_number ? (
            <Typography variant="body2">
              <MuiLink
                href={`tel:${shelter.full_phone_number}`}
                underline="none"
                sx={{ color: cardTextSecondary, cursor: 'pointer' }}
              >
                {shelter.full_phone_number}
              </MuiLink>
            </Typography>
          ) : (
            <Typography variant="body2">No phone</Typography>
          )}
        </Box>
      </Box>

      {/* Email */}
      <Box display="flex" alignItems="center" gap={2} mt={2}>
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
          <EmailIcon />
        </IconButton>
        <Box>
          {/* <Typography variant="body2" color="primary" fontWeight={600}>
            Email:{' '}
          </Typography> */}
          {shelter.email ? (
            <Typography variant="body1">
              <MuiLink
                href={`mailto:${shelter.email}`}
                underline="none"
                sx={{ color: cardTextSecondary, cursor: 'pointer' }}
              >
                {shelter.email}
              </MuiLink>
            </Typography>
          ) : (
            <Typography variant="body1" color="textSecondary">
              Email not provided
            </Typography>
          )}
        </Box>
      </Box>
    </Card>
  );
}

export default ShelterContacts;
