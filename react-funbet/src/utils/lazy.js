import React, { lazy, Suspense } from 'react';

const lazyFunc = (importFunc, fallback = null) => {
  const LazyComponent = lazy(importFunc);
  return React.forwardRef((props, ref) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} ref={ref} />
    </Suspense>
  ));
};

export default lazyFunc;
