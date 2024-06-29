import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const Wrapper = styled.span`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .loading-button-loader {
    position: absolute;
  }
`;

const LoadingButton = ({ className, loading, disabled, ...otherProps }) => {
  return (
    <Wrapper className={className}>
      <Button disabled={disabled || loading} {...otherProps} />
      {loading && (
        <CircularProgress className="loading-button-loader" size="1.75em" />
      )}
    </Wrapper>
  );
};

LoadingButton.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default LoadingButton;
