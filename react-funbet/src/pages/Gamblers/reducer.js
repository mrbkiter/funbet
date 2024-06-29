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

export const getAllGamblersSlice = createSlice(
  generateSliceTemplate('funbet/getAllGamblers', extraReducer),
);

export const getUserAccountSlice = createSlice(
  generateSliceTemplate('funbet/getUserAccount', extraReducer),
);

export default combineReducers({
  getAllGamblers: getAllGamblersSlice.reducer,
  getUserAccount: getUserAccountSlice.reducer,
});
