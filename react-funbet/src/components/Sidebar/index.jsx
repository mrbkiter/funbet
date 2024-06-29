import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import { alpha } from '@mui/material/styles';
import { routes } from 'utils/routes';
import { NavLink } from 'react-router-dom';
// import { i18n } from 'utils/lib/i18n';
import { AwesomeIcon } from 'components/AwesomeIcon';
import Scrollbar from 'components/Scrollbar';
import avatarAccount from 'assets/images/avatar/avatar_25.jpg';
import useGamblers from 'pages/Gamblers/hooks/useGamblers';

const icon = (name) => <AwesomeIcon iconName={name} />;

const RouterLink = (props) => {
  return (
    <NavLink
      {...props}
      exact="true"
      to={props.href}
      className="list-group-item"
      activeclassName="selected"
    />
  );
};

RouterLink.propTypes = {
  href: PropTypes.string.isRequired,
};

function RenderListItem({ icons, translationKey, link }) {
  return (
    <ListItemButton
      component={RouterLink}
      href={link}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {icons}
      </Box>

      <Box component="span">{translationKey} </Box>
    </ListItemButton>
  );
}

export function Sidebar() {
  const { data, actions } = useGamblers();

  useEffect(() => {
    actions.getUserAccount();
  }, []);
  return (
    <Drawer
      className="sidebar"
      variant="permanent"
      PaperProps={{
        sx: {
          width: 280,
        },
      }}
    >
      <Box
        sx={{
          height: 1,
          position: 'fixed',
          width: 280,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <Scrollbar
          sx={{
            height: 1,
          }}
          className="scrollbar-menu"
        >
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
            <Avatar src={avatarAccount} alt="Account" />
            <Box sx={{ ml: 2 }}>
              {data && data.accountGambler && (
                <Typography variant="subtitle2">
                  {data.accountGambler.name}
                </Typography>
              )}
            </Box>
          </Box>
          <Stack
            component="nav"
            spacing={0.5}
            sx={{ px: 2 }}
            style={{ position: 'relative' }}
          >
            <RenderListItem
              icons={icon('fas fa-analytics')}
              translationKey={'Dashboard Funbet'}
              link={routes.home}
            />

            <RenderListItem
              icons={icon('fas fa-dice-d12')}
              translationKey="Matches"
              link={routes.match}
            />
            <RenderListItem
              icons={icon('fas fa-users-crown')}
              translationKey="Gamblers"
              link={routes.gamblers}
            />
            <RenderListItem
              icons={icon('fas fa-users-crown')}
              translationKey="Forecast"
              link={routes.predict}
            />
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
        </Scrollbar>
      </Box>
    </Drawer>
  );
}

RenderListItem.propTypes = {
  icons: PropTypes.node.isRequired,
  translationKey: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
