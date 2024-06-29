import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Header from 'layouts/dashboard/header';
import { Sidebar } from 'components/Sidebar';
import { useResponsive } from 'hooks/use-responsive';

export const HEADER = {
  H_MOBILE: 64,
  H_DESKTOP: 80,
  H_DESKTOP_OFFSET: 80 - 16,
};

export const NAV = {
  WIDTH: 280,
};
const SPACING = 8;

// eslint-disable-next-line react/prop-types
const Main = ({ children, sx, ...other }) => {
  const lgUp = useResponsive('up', 'lg');

  return (
    <Box
      component="main"
      className={`main-wrapper`}
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
};
export const MainWrapper = (props) => {
  const { children, className } = props;
  const [openNav, setOpenNav] = useState(false);
  const lgUp = useResponsive('up', 'lg');

  return (
    <div className={`react-app ${className || ''}`}>
      <Header onOpenNav={() => setOpenNav(true)} />
      <Sidebar openNav={openNav} onCloseNav={() => setOpenNav(false)} />
      <div className={`content-wrapper ${lgUp ? '' : 'mobile'}`}>
        <Main>{children}</Main>
      </div>
    </div>
  );
};

export const QuickViewWrapper = (props) => {
  const { children, className } = props;

  return (
    <QuickviewWrapper className={`${className} --is-quick-view-mode`}>
      {children}
    </QuickviewWrapper>
  );
};

const QuickviewWrapper = styled.div`
  background-color: var(--secondary-background);
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-direction: column;
  padding: 16px;
  flex: 1;
  justify-content: flex-start;
  &.--is-quick-view-mode {
    z-index: var(--zindex-entity-qv-activity) !important;
  }
`;

MainWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

QuickViewWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
