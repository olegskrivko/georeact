import { Link } from 'react-router-dom';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

function ShelterReportInfoCard() {
  return (
    <Box my={4}>
      <Card elevation={2} sx={{ borderLeft: '6px solid #0288d1', backgroundColor: '#e1f5fe' }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <InfoOutlinedIcon color="info" />
            <Typography variant="body1">
              If you notice that any information about this shelter is incorrect or outdated, please{' '}
              <Link to="/contact" style={{ textDecoration: 'underline', color: '#0288d1' }}>
                contact us
              </Link>
              .
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ShelterReportInfoCard;
