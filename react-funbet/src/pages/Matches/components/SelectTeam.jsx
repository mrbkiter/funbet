import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import isNumber from 'lodash/isNumber';
// import useMatches from '../hooks/useMatches';

export const SelectTeam = (props) => {
  const { selectedTeamId, valueHome, labelHome, valueAway, labelAway } = props;
  // const { data, actions } = useMatches();
  // useEffect(() => {
  //   actions.getAllMatches();
  // }, []);

  return (
    <FormControl
      style={{ display: 'flex', width: '100%', alignItems: 'center' }}
    >
      <RadioGroup
        row
        aria-labelledby="demo-form-control-label-placement"
        name="position"
        defaultValue={selectedTeamId}
      >
        <FormControlLabel
          labelPlacement="start"
          value={valueHome}
          control={<Radio />}
          label={labelHome}
          style={{
            width: 120,
            marginRight: 10,
            marginLeft: 0,
            ...(!isNumber(selectedTeamId) && { color: 'red' }),
          }}
          onClick={() => {}}
        />
        <FormControlLabel
          labelPlacement="end"
          value={valueAway}
          control={<Radio />}
          label={labelAway}
          style={{
            width: 120,
            marginRight: 0,
            ...(!isNumber(selectedTeamId) && { color: 'red' }),
          }}
          onClick={() => {}}
        />
      </RadioGroup>
    </FormControl>
  );
};

SelectTeam.propTypes = {
  selectedTeamId: PropTypes.any,
  valueHome: PropTypes.any,
  labelHome: PropTypes.any,
  valueAway: PropTypes.any,
  labelAway: PropTypes.any,
};
