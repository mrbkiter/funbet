/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import AwesomeIcon from 'components/AwesomeIcon';
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export default function Teams(props) {
  const { teams, teamsSelected } = props;
  const [value, setValue] = useState(teamsSelected || []);

  const handleChange = (event, item) => {
    if (event.target.checked) {
      setValue((val) => [...val, item.id]);
    } else {
      setValue((val) => val.filter((text) => text !== item.id));
    }
  };

  const disableCheckbox = (item) => {
    return (
      !!teamsSelected &&
      !value.includes(item.id) &&
      value.length === teamsSelected.length
    );
  };

  return (
    <Sheet variant="outlined" sx={{ p: 2, borderRadius: 'sm' }}>
      <div role="group" aria-labelledby="rank">
        <List
          orientation="horizontal"
          wrap
          sx={{
            '--List-gap': '8px',
            '--ListItem-radius': '20px',
            '--ListItem-minHeight': '32px',
            '--ListItem-gap': '4px',
          }}
        >
          {teams.map((item, index) => (
            <ListItem key={item.id}>
              {value.includes(item.id) && (
                <AwesomeIcon
                  size={16}
                  color="rgb(15, 112, 184)"
                  iconName="far fa-check"
                  style={{ zIndex: 10, pointerEvents: 'none' }}
                />
              )}

              <Checkbox
                size="sm"
                disabled={disableCheckbox(item)}
                disableIcon
                overlay
                label={item.name}
                checked={value.includes(item.id)}
                variant={value.includes(item.id) ? 'soft' : 'outlined'}
                onChange={(event) => handleChange(event, item)}
                slotProps={{
                  action: ({ checked }) => ({
                    sx: checked
                      ? {
                          border: '1px solid',
                          borderColor: 'primary.500',
                        }
                      : {},
                  }),
                }}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </Sheet>
  );
}
