import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { store } from 'configs/createStore';
import ThemeProvider from 'components/ThemeProvider';

const AppProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.any,
};

export default AppProvider;
