// import React from 'react';
// import AwesomeIcon from 'components/AwesomeIcon';
export const predictColumns = [
  { field: 'no', headerName: 'No', width: 50 },
  { field: 'name', headerName: 'Bonus Name', width: 250 },
  { field: 'noOfTeam', headerName: 'No of Teams', width: 130 },
  { field: 'endTimestamp', headerName: 'End time (ETC + 7)', width: 200 },
  { field: 'bonusAmount', headerName: 'Bonus Amount', width: 150 },
  {
    field: 'teams',
    headerName: 'Selected teams',
    sortable: true,
    width: 300,
  },
  {
    field: 'asnweredTeams',
    headerName: 'Answered Result',
    sortable: false,
    width: 150,
    // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    // renderCell: (params) => <SelectTeam {...params.value} />,
  },
  {
    field: 'predictionStatus',
    headerName: 'Preduct Status',
    width: 150,
  },
];
