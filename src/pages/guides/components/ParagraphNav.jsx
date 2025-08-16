import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { IconButton, List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ParagraphNav = ({ paragraphs, onJump }) => {
  const theme = useTheme();
  const cardBg = theme.palette.custom.card.main;
  const cardText = theme.palette.custom.card.contrastText;
  const cardTextSecondary = theme.palette.text.secondary;

  return (
    <List>
      {paragraphs?.map((paragraph, index) => (
        <ListItem key={paragraph.slug || index} disablePadding>
          <ListItemButton onClick={() => onJump(index)}>
            <ListItemIcon>
              <IconButton
                size="small"
                sx={{
                  color: 'primary.main',
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.2)',
                  },
                }}
              >
                <TipsAndUpdatesIcon fontSize="small" />
              </IconButton>
            </ListItemIcon>
            <Typography
              variant="body1"
              sx={{
                color: cardText, // uses theme text color
                fontWeight: 500,
              }}
            >
              {paragraph.step_title}
            </Typography>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ParagraphNav;
