import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Sidebar } from 'components/Sidebar';
import Header from 'layouts/dashboard/header';

export const MainWrapper = (props) => {
  const { children, className } = props;

  return (
    <div className={`react-app ${className || ''}`}>
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <div className="main-content">{children}</div>
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
