import React, { useReducer } from 'react';

export const withGenerateProvider = (InputComponent, GenerateProvider) => {
  const OuputComponent = React.forwardRef((props, ref) => {
    return (
      <GenerateProvider>
        <InputComponent {...props} ref={ref} />
      </GenerateProvider>
    );
  });

  OuputComponent.displayName = `withProvider(${InputComponent.displayName})`;
  return OuputComponent;
};

export default ({ reducer, initState }) => {
  const Context = React.createContext(initState);

  const Provider = (props) => {
    const value = useReducer(reducer, initState);
    return <Context.Provider value={value} {...props} />;
  };

  const withProvider = (InputComponent) =>
    withGenerateProvider(InputComponent, Provider);

  return { Context, Provider, withProvider };
};
