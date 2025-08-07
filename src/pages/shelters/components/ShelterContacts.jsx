import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import { Box, Card, IconButton, Link as MuiLink, Typography } from '@mui/material';

function ShelterContacts({ shelter, onLocationClick }) {
  return (
    <Card
      sx={{
        p: { xs: 1, sm: 2 },
        borderRadius: 3,
        background: '#fff',
        boxShadow: 3,
      }}
    >
      {/* Address */}
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton sx={{ backgroundColor: '#00b3a4', color: '#f7f9fd', pointerEvents: 'none' }}>
          <LocationOnIcon />
        </IconButton>
        <Box>
          <Typography variant="body2" color="primary" fontWeight={600}>
            Address:{' '}
          </Typography>
          <MuiLink onClick={onLocationClick} sx={{ cursor: 'pointer', color: '#000' }} underline="none">
            {shelter.full_address}
          </MuiLink>
        </Box>
      </Box>

      {/* Website */}
      <Box display="flex" alignItems="center" gap={2} mt={2}>
        <IconButton sx={{ backgroundColor: '#00b3a4', color: '#f7f9fd', pointerEvents: 'none' }}>
          <PublicIcon />
        </IconButton>
        <Box>
          <Typography variant="body2" color="primary" fontWeight={600}>
            Website:{' '}
          </Typography>
          {shelter.website_url ? (
            <MuiLink href={shelter.website_url} target="_blank" rel="noopener noreferrer" underline="none" color="#000">
              {shelter.website_url}
            </MuiLink>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No website
            </Typography>
          )}
        </Box>
      </Box>

      {/* Phone */}
      <Box display="flex" alignItems="center" gap={2} mt={2}>
        <IconButton sx={{ backgroundColor: '#00b3a4', color: '#f7f9fd', pointerEvents: 'none' }}>
          <PhoneIcon />
        </IconButton>
        <Box>
          <Typography variant="body2" color="primary" fontWeight={600}>
            Phone:{' '}
          </Typography>
          {shelter.full_phone_number ? (
            <Typography variant="body2">
              <MuiLink
                href={`tel:${shelter.full_phone_number}`}
                underline="none"
                color="#000"
                sx={{ cursor: 'pointer' }}
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
        <IconButton sx={{ backgroundColor: '#00b3a4', color: '#f7f9fd', pointerEvents: 'none' }}>
          <EmailIcon />
        </IconButton>
        <Box>
          <Typography variant="body2" color="primary" fontWeight={600}>
            Email:{' '}
          </Typography>
          {shelter.email ? (
            <Typography variant="body1">
              <MuiLink href={`mailto:${shelter.email}`} underline="none" color="#000" sx={{ cursor: 'pointer' }}>
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
