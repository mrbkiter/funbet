import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { bgGradient } from 'theme/css';
import Iconify from 'components/iconify';
import { useResponsive } from 'hooks/use-responsive';

export default function LoginView() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => {};
  const lgUp = useResponsive('up', 'lg');

  const renderForm = (
    <>
      <Stack spacing={3}>
        {/* <TextField
          required
          id="standard-required"
          label="User Name"
          // defaultValue={data.accountGambler.name}
          // value={data.accountGambler.name}
          variant="standard"
          style={{ marginBottom: 20 }}
        /> */}
        <TextField
          required
          variant="standard"
          name="name"
          label="Display Name"
        />
        <TextField required variant="standard" name="name" label="User Name" />

        <TextField
          required
          variant="standard"
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        // color="inherit"
        onClick={handleClick}
        style={{ marginTop: 50 }}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '',
        }),
        height: '100vh',
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: lgUp ? 1 : 'calc(100% - 80px)',
            maxWidth: lgUp ? 420 : '100%',
          }}
        >
          <Typography variant="h4">Update Profile</Typography>
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`//`}
            </Typography>
          </Divider>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
