import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import { useResponsive } from 'hooks/use-responsive';
import { account } from '_mock/account';
import Scrollbar from 'components/Scrollbar';
import { NAV } from './config-layout';
import { AwesomeIcon } from 'components/AwesomeIcon';
import { routes } from 'utils/routes';
import Logo from 'components/logo';
// import navConfig from './config-navigation';

const icon = (name) => <AwesomeIcon iconName={name} />;

export default function Nav({ openNav, onCloseNav }) {
  const upLg = useResponsive('up', 'lg');

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />
      <Box
        sx={{
          my: 3,
          mx: 2.5,
          py: 2,
          px: 2.5,
          display: 'flex',
          borderRadius: 1.5,
          alignItems: 'center',
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />

        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle2">{account.displayName}</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {account.role}
          </Typography>
        </Box>
      </Box>
      <NavLink
        exact
        to={routes.home}
        className="list-group-item"
        activeclassName="selected"
      >
        <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
          {icon('fas fa-analytics')}
        </Box>
        <Box component="span">dashboard </Box>
      </NavLink>
      <NavLink
        exact
        to={routes.user}
        className="list-group-item"
        activeclassName="selected"
      >
        <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
          {icon('fas fa-users')}
        </Box>
        <Box component="span">user </Box>
      </NavLink>
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

function NavItem({ item }) {
  return (
    <NavLink
      exact
      href={item.path}
      className="list-group-item"
      activeclassName="selected"
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>
      <Box component="span">{item.title} </Box>
    </NavLink>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
