import React, { useMemo } from 'react';
// import { ThemeProvider as StyledProvider } from 'styled-components';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { extendTheme } from '@mui/joy/styles';
import { deepmerge } from '@mui/utils';
import { palette } from 'theme/palette';
import { shadows } from 'theme/shadows';
import { overrides } from 'theme/overrides';
import { typography } from 'theme/typography';
import { customShadows } from 'theme/custom-shadows';

const Provider = (props) => {
  const memoizedValue = useMemo(
    () => ({
      palette: palette(),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    [],
  );

  const theme = createTheme(memoizedValue, {
    typography: {
      fontFamily: 'Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif',
    },
    palette: {
      primary: {
        main: '#0f70b8',
      },
      negative: {
        main: '#E90000',
      },
    },
    props: {
      MuiTextField: {
        InputLabelProps: {
          shrink: true,
        },
      },
      MuiTooltip: {
        arrow: true,
      },
    },
    overrides: {
      MuiTooltip: {
        tooltip: {
          backgroundColor: '#000',
          fontSize: '1em',
          textAlign: 'center',
          borderRadius: 0,
        },
        arrow: {
          color: '#000',
        },
      },
    },
    zIndex: {
      tooltip: 15000,
    },
  });
  theme.components = overrides(theme);
  const allTheme = deepmerge(extendTheme, theme);

  return <ThemeProvider theme={allTheme} {...props} />;
};

export default Provider;
