import React, { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'layouts/dashboard';

export const IndexPage = lazy(() => import('pages/app'));
export const BlogPage = lazy(() => import('pages/blog'));
export const UserPage = lazy(() => import('pages/user'));
export const LoginPage = lazy(() => import('pages/login'));
export const ProductsPage = lazy(() => import('pages/products'));
export const Page404 = lazy(() => import('pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
