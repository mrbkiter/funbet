import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';

export default function DataTable(props) {
  const {
    columns,
    dataRows,
    tableConfig,
    pageSizeOptions,
    checkboxSelection,
    style,
  } = props;
  const initialTableConfig = tableConfig || {
    pagination: {
      paginationModel: { page: 0, pageSize: 10 },
    },
  };
  const pageSize = pageSizeOptions || [10, 20];
  return (
    <div style={style || { height: 800, width: '100%' }}>
      <DataGrid
        checkboxSelection={!!checkboxSelection}
        rows={dataRows}
        columns={columns}
        initialState={initialTableConfig}
        pageSizeOptions={pageSize}
      />
    </div>
  );
}

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  dataRows: PropTypes.array.isRequired,
  tableConfig: PropTypes.object,
  pageSizeOptions: PropTypes.array,
  checkboxSelection: PropTypes.any,
  style: PropTypes.object,
};

// const DataTable = styled(Table)``;
