import React, { useEffect } from 'react';
import DataTable from 'components/Table';
import Typography from '@mui/material/Typography';
import useMatches from 'pages/Matches/hooks/useMatches';
import { matchesColumns, dataRowsConverted } from 'pages/Matches/helper';

export default function ShortMatches() {
  const { data, actions } = useMatches();
  useEffect(() => {
    actions.getMatchesShortList();
  }, []);

  const tableConfig = {
    pagination: {
      paginationModel: { page: 0, pageSize: 20 },
    },
  };

  return (
    <div>
      <Typography variant="h4" style={{ marginBottom: 20 }}>
        Shortlist Matches
      </Typography>
      <DataTable
        columns={matchesColumns}
        dataRows={
          data && data.matchesShortList
            ? dataRowsConverted(data.matchesShortList)
            : []
        }
        tableConfig={tableConfig}
        style={{ height: 700, width: '100%' }}
      />
    </div>
  );
}
