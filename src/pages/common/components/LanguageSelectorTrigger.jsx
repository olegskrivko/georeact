import { useState } from 'react';

import LanguageIcon from '@mui/icons-material/Language';
import { IconButton, Tooltip } from '@mui/material';

import LanguageSelectorModal from './LanguageSelectorModal';

const LanguageSelectorTrigger = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title="Change Language">
        <IconButton onClick={() => setOpen(true)} size="small">
          <LanguageIcon fontSize="small" style={{ color: '#00b3a4' }} />
        </IconButton>
      </Tooltip>
      <LanguageSelectorModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default LanguageSelectorTrigger;
