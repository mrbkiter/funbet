import React, { useEffect } from 'react';
import DataTable from 'components/Table';
import Typography from '@mui/material/Typography';
import useGamblers from '../hooks/useGamblers';
import { gamblersColumns, dataRowsConverted } from '../helper';

export default function Gamblers() {
  const { data, actions } = useGamblers();
  useEffect(() => {
    actions.getAllGamblers();
  }, []);
  const tableConfig = {
    pagination: {
      paginationModel: { page: 0, pageSize: 50 },
    },
  };

  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h4" style={{ marginBottom: 20 }}>
        All Gamblers
      </Typography>
      <DataTable
        columns={gamblersColumns}
        dataRows={
          data && data.allGamblers
            ? dataRowsConverted(data.allGamblers.reports)
            : []
        }
        tableConfig={tableConfig}
        style={{ height: 'calc(100vh - 180px)', width: '100%' }}
      />
    </div>
  );
}
