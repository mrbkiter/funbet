import React from 'react';
import { AwesomeIcon } from 'components/AwesomeIcon';
import { routes } from 'utils/routes';

const icon = (name) => <AwesomeIcon iconName={name} />;

const navConfig = [
  {
    title: 'dashboard',
    path: routes.home,
    icon: icon('fas fa-analytics'),
  },
  {
    title: 'user',
    path: routes.user,
    icon: icon('fas fa-users'),
  },
  {
    title: 'product',
    path: routes.stastitic,
    icon: icon('fas fa-dice-d12'),
  },
  {
    title: 'blog',
    path: routes.match,
    icon: icon('fas fa-blog'),
  },
  {
    title: 'login',
    path: routes.team,
    icon: icon('fas fa-sign-in'),
  },
];

export default navConfig;
