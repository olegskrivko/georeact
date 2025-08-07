import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material';

const ParagraphNav = ({ paragraphs, onJump }) => (
  <List>
    {paragraphs?.map((paragraph, index) => (
      <ListItem key={paragraph.slug || index} disablePadding>
        <ListItemButton onClick={() => onJump(index)}>
          <ListItemIcon>
            <TipsAndUpdatesIcon color="primary" />
          </ListItemIcon>
          <Typography variant="body1" sx={{ color: 'blue', marginLeft: '-1rem' }}>
            {paragraph.step_title}
          </Typography>
        </ListItemButton>
      </ListItem>
    ))}
  </List>
);

export default ParagraphNav;
