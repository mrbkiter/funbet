import { createSlice, combineReducers } from '@reduxjs/toolkit';
import generateSliceTemplate, {
  initialState,
} from 'utils/generateSliceTemplate';

const extraReducer = {
  resetData() {
    return {
      ...initialState,
    };
  },
};

export const getAllTeamsSlice = createSlice(
  generateSliceTemplate('funbet/getAllTeams', extraReducer),
);

export const getAllPredictsSlice = createSlice(
  generateSliceTemplate('funbet/getAllPredicts', extraReducer),
);

export default combineReducers({
  getAllTeams: getAllTeamsSlice.reducer,
  getAllPredicts: getAllPredictsSlice.reducer,
});
