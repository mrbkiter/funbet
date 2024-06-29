import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListItem } from '@mui/material';

// ----------------------------------------------------------------------

// const RouterLink = forwardRef(({ href, ...other }, ref) => <Link ref={ref} to={href} {...other} />);

function RenderListItem() {
  return (
    <div>
      <ListItem className="list-item" button>
        <NavLink
          exact
          to={''}
          className="list-group-item"
          activeclassName="selected"
        />
      </ListItem>
    </div>
  );
}

export default RenderListItem;
