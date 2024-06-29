import React, { useEffect } from 'react';
import DataTable from 'components/Table';
import Typography from '@mui/material/Typography';
import useMatches from '../hooks/useMatches';
import { matchesColumns, dataRowsConverted } from '../helper';

export default function Matches() {
  const { data, actions } = useMatches();
  useEffect(() => {
    actions.getAllMatches();
  }, []);

  const tableConfig = {
    pagination: {
      paginationModel: { page: 0, pageSize: 20 },
    },
  };

  return (
    <div>
      <Typography variant="h4" style={{ marginBottom: 20 }}>
        All Matches
      </Typography>
      <DataTable
        columns={matchesColumns}
        dataRows={
          data && data.getAllMatches
            ? dataRowsConverted(data.getAllMatches)
            : []
        }
        tableConfig={tableConfig}
        style={{ height: 'calc(100vh - 180px)', width: '100%' }}
      />
    </div>
  );
}
