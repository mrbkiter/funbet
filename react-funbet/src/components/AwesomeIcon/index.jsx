import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';

const AwesomeIcon = ({
  iconName,
  size = 18,
  color = 'var(--gray-color-heavy)',
  className,
  onClick,
  style,
  ...otherProps
}) => {
  return (
    <Wrapper
      {...otherProps}
      size={size}
      color={color}
      className={cn('awesome-icon', className)}
      onClick={onClick}
      style={style}
    >
      <i className={iconName} />
    </Wrapper>
  );
};

const Wrapper = styled.span`
  &.awesome-icon {
    font-size: ${(props) => props.size}px;
    color: ${(props) => props.color};
    display: flex;
    justify-content: center;
    align-items: center;

    &.icon-btn {
      cursor: pointer;
    }

    &.bold i {
      font-weight: 600;
    }
  }
`;

AwesomeIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

AwesomeIcon.displayName = 'AwesomeIcon';

export { AwesomeIcon };
export default AwesomeIcon;
