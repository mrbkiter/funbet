import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import usePredicts from '../hooks/usePredicts';
import Teams from './Teams';

export default function Forecast() {
  const { data, actions } = usePredicts();
  useEffect(() => {
    actions.getAllTeams();
    actions.getAllPredicts();
  }, []);

  const [value, setValue] = useState(0);
  console.log(data);
  console.log('value', value);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Typography variant="h4" style={{ marginBottom: 20 }}>
        Forecast Sections
      </Typography>
      {data && data.getAllPredicts && (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="tabs prediction"
            >
              {data.getAllPredicts.map((item, index) => (
                <Tab
                  key={item.tournamentPredictionId}
                  label={item.name}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </Box>
          {data.getAllPredicts.map((item, index) => (
            <CustomTabPanel
              key={item.tournamentPredictionId}
              value={value}
              index={index}
            >
              {data && data.getAllTeams && (
                <Teams
                  teams={data.getAllTeams}
                  teamsSelected={item.selectedTeamIds}
                />
              )}
            </CustomTabPanel>
          ))}
        </Box>
      )}
    </div>
  );
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ padding: '16px 0' }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
