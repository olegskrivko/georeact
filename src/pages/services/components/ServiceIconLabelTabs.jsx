import { useState } from 'react';

import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ShareIcon from '@mui/icons-material/Share';
import { Box, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';

import TabLocations from './TabLocations';
import TabReviews from './TabReviews';
import TabSocials from './TabSocials';

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const TabPanel = ({ children, value, index, ...other }) => {
  const { id, 'aria-controls': ariaControls } = a11yProps(index);

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={id}
      aria-labelledby={`simple-tab-${index}`}
      aria-controls={ariaControls}
      {...other}
    >
      {value === index && <Box sx={{ padding: '1rem 0' }}>{children}</Box>}
    </Box>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function ServiceIconLabelTabs({ service, mapRef, onPanToLocation }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ margin: '0rem !important', padding: '0rem !important' }}>
      <Box style={{ margin: '1rem 0' }}>
        <Tabs value={value} centered onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
          <Tab icon={<MapsHomeWorkIcon />} label="Locations" sx={{ fontSize: '0.7rem' }} {...a11yProps(0)} />
          <Tab icon={<ShareIcon />} label="Social Media" sx={{ fontSize: '0.7rem' }} {...a11yProps(1)} />
          <Tab icon={<ReviewsIcon />} label="Reviews" sx={{ fontSize: '0.7rem' }} {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <TabLocations service={service} mapRef={mapRef} onPanToLocation={onPanToLocation} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabSocials service={service} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabReviews service={service} />
      </TabPanel>
    </Box>
  );
}

export default ServiceIconLabelTabs;
