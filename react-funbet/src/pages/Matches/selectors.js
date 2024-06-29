import { createSelector } from 'reselect';

export const matchesReducerSelector = (state) => state.matchesReducer;

export const getAllMatchesSelector = createSelector(
  matchesReducerSelector,
  (matchesReducer) => {
    return matchesReducer.getAllMatches;
  },
);

export const getMatchesShortListSelector = createSelector(
  matchesReducerSelector,
  (matchesReducer) => {
    return matchesReducer.getMatchesShortList;
  },
);
