import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Drawer from '@mui/material/Drawer';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import avatarAccount from 'assets/images/avatar/avatar_25.jpg';
import useGamblers from 'pages/Gamblers/hooks/useGamblers';
import { navigate } from 'utils/navigate';
import { routes } from 'utils/routes';

export default function AccountPopover() {
  const [openDialogProfile, setOpenDialogProfile] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const { data, actions } = useGamblers();

  useEffect(() => {
    actions.getUserAccount();
  }, []);

  const handleOpen = (event) => {
    setOpenDialogProfile(event.currentTarget);
  };

  const handleClose = () => {
    setOpenDialogProfile(null);
  };

  const handleOpenDrawer = () => {
    handleClose();
    setOpenProfile(true);
  };
  return (
    <>
      {data && data.accountGambler && (
        <>
          <IconButton
            onClick={handleOpen}
            sx={{
              width: 40,
              height: 40,
              background: (theme) => alpha(theme.palette.grey[500], 0.08),
              ...(openDialogProfile && {
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              }),
            }}
          >
            <Avatar
              src={avatarAccount}
              alt={data.accountGambler.name}
              sx={{
                width: 36,
                height: 36,
                border: (theme) =>
                  `solid 2px ${theme.palette.background.default}`,
              }}
            >
              {data.accountGambler.name.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
          <Popover
            open={!!openDialogProfile}
            anchorEl={openDialogProfile}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                p: 0,
                mt: 1,
                ml: 0.75,
                width: 200,
              },
            }}
          >
            <Box sx={{ my: 1.5, px: 2 }}>
              <Typography variant="subtitle2" noWrap>
                {data.accountGambler.name}
              </Typography>
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <MenuItem onClick={() => navigate(routes.home)}>Home</MenuItem>
            <MenuItem onClick={handleOpenDrawer}>profile</MenuItem>
            <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

            <MenuItem
              disableRipple
              disableTouchRipple
              onClick={handleClose}
              sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
            >
              Logout
            </MenuItem>
          </Popover>
          <div>
            <Drawer
              anchor={'right'}
              open={openProfile}
              onClose={() => setOpenProfile(false)}
              width={400}
            >
              <Box
                sx={{
                  width: 400,
                  padding: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <Typography>Profile</Typography>
                <TextField
                  required
                  fullWidth
                  id="standard-required"
                  label="User Name"
                  defaultValue={data.accountGambler.name}
                  value={data.accountGambler.name}
                  variant="standard"
                  style={{ marginBottom: 20 }}
                />
                <TextField
                  fullWidth
                  id="standard-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                  style={{ marginBottom: 20 }}
                />
              </Box>
            </Drawer>
          </div>
        </>
      )}
    </>
  );
}
