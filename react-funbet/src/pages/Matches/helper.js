import React from 'react';
import AwesomeIcon from 'components/AwesomeIcon';
import { SelectTeam } from './components/SelectTeam';
import isNumber from 'lodash/isNumber';
export const matchesColumns = [
  // { field: 'id', headerName: 'ID', width: 70 },
  { field: 'no', headerName: 'No', width: 50 },
  { field: 'teamName1', headerName: 'Home', width: 130 },
  { field: 'betScore', headerName: 'Best Score', width: 130 },
  { field: 'betScore2', headerName: 'Match Result', width: 130 },
  { field: 'teamName2', headerName: 'Away', width: 130 },
  {
    field: 'startTime',
    headerName: 'Kickoff Time',
    sortable: true,
    width: 150,
  },
  {
    field: 'betMoney',
    headerName: 'Bet Money',
    type: 'number',
    width: 90,
  },
  {
    field: 'selectedTeamName',
    headerName: 'Selected Team',
    sortable: false,
    width: 160,
    // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: 'betStatus',
    headerName: 'Bet Result',
    sortable: true,
    width: 180,
    renderCell: (params) => iconName(params.value),
  },
  {
    field: 'chooseTeam',
    headerName: 'Choose Team',
    sortable: true,
    width: 300,
    renderCell: (params) => <SelectTeam {...params.value} />,
  },
];

const iconName = (props) => {
  const { status, selectedTeamId } = props;
  let icon = '';
  let color = '';
  let otherStatus = '';
  switch (status) {
    case 'WIN':
      icon = 'fas fa-smile-wink';
      color = 'rgb(16, 157, 16)';
      break;
    case 'DRAW':
      icon = 'fas fa-meh';
      color = 'rgb(241, 168, 33)';
      break;
    case 'LOSE':
      icon = 'fas fa-sad-tear';
      color = 'rgb(255, 86, 48)';
      break;
    default:
      icon = isNumber(selectedTeamId) ? 'fas fa-smile' : 'fas fa-grimace';
      color = isNumber(selectedTeamId) ? 'rgb(15, 112, 184)' : 'rgb(0, 0, 0)';
      otherStatus = isNumber(selectedTeamId) ? 'SELECTED' : 'NOT SELECTED';
      break;
  }
  return (
    <div style={{ display: 'inline-flex' }}>
      <AwesomeIcon
        size={32}
        color={color}
        iconName={icon}
        style={{ marginTop: 8, marginRight: 8 }}
      />{' '}
      {status || otherStatus}
    </div>
  );
};

export const dataRowsConverted = (data) => {
  return data.map((item, index) => {
    return {
      no: index + 1,
      id: item.id,
      teamName1: item.teamName1,
      betScore: `${item.betScore1} - ${item.betScore2}`,
      betScore2: `${item.score1} - ${item.score2}`,
      teamName2: item.teamName2,
      startTime: item.startTime,
      betMoney: item.betMoney,
      selectedTeamName: item.selectedTeamName,
      betStatus: {
        status: item.betStatus,
        selectedTeamId: item.selectedTeamId,
      },
      chooseTeam: {
        selectedTeamId: item.selectedTeamId,
        valueHome: item.teamId1,
        labelHome: item.teamName1,
        valueAway: item.teamId2,
        labelAway: item.teamName2,
      },
    };
  });
};

export const betStatusAnalysis = (data, status) => {
  return data.filter((item) => item.betStatus === status).length;
};
