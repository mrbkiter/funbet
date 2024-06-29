import React, { Suspense, memo } from 'react';
import history from 'utils/history';
import { Route, Routes } from 'react-router-dom';
import { routes } from 'utils/routes';
import { MainWrapper } from 'components/MainWrapper';
import { lazyLoadPages } from 'utils/helper';

const AppView = lazyLoadPages(() => import('pages/HomePage'), 'AppView');
const Matches = lazyLoadPages(() => import('pages/Matches'), 'Matches');
const Gamblers = lazyLoadPages(() => import('pages/Gamblers'), 'Gamblers');
const Predict = lazyLoadPages(() => import('pages/Predict'), 'Predict');
const NotFound = lazyLoadPages(() => import('pages/NotFound'), 'NotFound');

const renderLoader = () => <>Loading...</>;

const Rout = () => {
  return (
    <Suspense fallback={renderLoader()}>
      <MainWrapper>
        <Routes history={history.location}>
          <Route path={routes.home} element={<AppView />} />
          <Route path={routes.gamblers} element={<Gamblers />} />
          <Route path={routes.match} element={<Matches />} />
          <Route path={routes.predict} element={<Predict />} />
          {/* put all pages upper NotFound */}
          <Route element={<NotFound />} />
        </Routes>
      </MainWrapper>
    </Suspense>
  );
};

export default memo(Rout);
