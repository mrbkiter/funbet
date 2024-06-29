import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Forecast from '../components/Forecast';
import DataTable from 'components/Table';
import { predictColumns } from '../helper';
import usePredicts from '../hooks/usePredicts';

export default function Predict() {
  const { data, actions } = usePredicts();

  useEffect(() => {
    actions.getAllPredicts();
  }, []);

  const tableConfig = {
    pagination: {
      paginationModel: { page: 0, pageSize: 20 },
    },
  };

  return (
    <div>
      <Forecast />
      <Typography variant="h5" style={{ marginTop: 20, marginBottom: 20 }}>
        Forecast List
      </Typography>
      {data && data.getAllPredicts && (
        <DataTable
          columns={predictColumns}
          dataRows={data.getAllPredicts}
          tableConfig={tableConfig}
          style={{ height: '350px', width: '100%' }}
        />
      )}
    </div>
  );
}
