import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from 'configs/Provider';
import Routes from 'components/Routes';

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
