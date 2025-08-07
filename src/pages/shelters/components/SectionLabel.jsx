import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const SectionLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
  letterSpacing: 0.5,
}));

export default SectionLabel;
