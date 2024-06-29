import React from 'react';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { i18n } from 'utils/lib/i18n';

export default function NotFound() {
  return (
    <div className="notfound">
      <Typography className="text-center" type="h2">
        {i18n.t('general.notfound.title')}
      </Typography>
      <Typography className="text-center" style={{ marginTop: 20 }}>
        <NavLink to="/">{i18n.t('general.notfound.backHome')}</NavLink>
      </Typography>
    </div>
  );
}
