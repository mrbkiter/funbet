import { createSelector } from 'reselect';

export const predictReducerSelector = (state) => state.predictReducer;

export const getAllTeamsSelector = createSelector(
  predictReducerSelector,
  (predictReducer) => {
    return predictReducer.getAllTeams;
  },
);

export const getAllPredictsSelector = createSelector(
  predictReducerSelector,
  (predictReducer) => {
    return predictReducer.getAllPredicts;
  },
);
