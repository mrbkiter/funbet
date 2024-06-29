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

export const getAllMatchesSlice = createSlice(
  generateSliceTemplate('funbet/getAllMatches', extraReducer),
);

export const getMatchesShortListSlice = createSlice(
  generateSliceTemplate('funbet/getMatchesShortList', extraReducer),
);

export default combineReducers({
  getAllMatches: getAllMatchesSlice.reducer,
  getMatchesShortList: getMatchesShortListSlice.reducer,
});
