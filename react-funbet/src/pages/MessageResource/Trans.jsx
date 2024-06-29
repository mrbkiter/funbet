import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import keys from 'lodash/keys';

const Trans = ({ t, clicks, ...otherProps }) => {
  const ref = useRef();

  useLayoutEffect(() => {
    keys(clicks).map((clickKey) => {
      const node = ref.current.querySelector(clickKey);
      if (node) {
        node.addEventListener('click', clicks[clickKey], { passive: false });
      }
      return null;
    });

    return () => {
      keys(clicks).map((clickKey) => {
        const node = ref.current.querySelector(clickKey);
        if (node) {
          node.removeEventListener('click', clicks[clickKey]);
        }
        return null;
      });
    };
  }, [clicks]);
  return (
    <span dangerouslySetInnerHTML={{ __html: t }} {...otherProps} ref={ref} />
  );
};
Trans.propTypes = {
  t: PropTypes.string,
  clicks: PropTypes.object,
};

export default Trans;
