export const gamblersColumns = [
  { field: 'no', headerName: 'No', width: 50 },
  { field: 'name', headerName: 'Gambler', width: 250 },
  { field: 'remainingDebt', headerName: 'Remaining Debt', width: 150 },
  { field: 'remainingDebtOtherFee', headerName: 'Penalty Fee', width: 150 },
  { field: 'contribution', headerName: 'Contribution', width: 150 },
  {
    field: 'paidBonus',
    headerName: 'Bonus',
    sortable: true,
    width: 150,
  },
  { field: 'total', headerName: 'Bet Lost Total', width: 200 },
];

export const dataRowsConverted = (data) => {
  const dataSort = data.slice().sort((a, b) => {
    return b.remainingDebt - a.remainingDebt;
  });
  return dataSort.map((item, index) => {
    return {
      no: index + 1,
      id: item.userId,
      name: item.name,
      remainingDebt: item.remainingDebt,
      remainingDebtOtherFee: item.remainingDebtOtherFee,
      contribution: item.contribution,
      paidBonus: item.paidBonus,
      total: item.total,
    };
  });
};

export const filterTopContributor = (data) => {
  const dataSort = data.slice().sort((a, b) => {
    return b.remainingDebt - a.remainingDebt;
  });

  return dataSort.slice(0, 10).map((item) => ({
    label: item.name,
    value: item.remainingDebt,
  }));
};
