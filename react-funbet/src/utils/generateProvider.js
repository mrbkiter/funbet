import React from 'react';

export const withGenerateProvider = (WrappedComponent, Provider) => {
  return React.forwardRef((props, ref) => {
    return (
      <Provider {...props}>
        <WrappedComponent {...props} ref={ref} />
      </Provider>
    );
  });
};

export default ({ initValue = {}, contextValue }) => {
  const Context = React.createContext(initValue);

  const Provider = (props) => {
    const value = getCorrectValue(contextValue);
    return <Context.Provider value={value} {...props} />;
  };

  const withProvider = (WrappedComponent) =>
    withGenerateProvider(WrappedComponent, Provider);

  return { Context, Provider, withProvider };
};

const getCorrectValue = (value) => {
  let val = value;
  if (value instanceof Function) {
    val = value();
  }
  return val;
};
