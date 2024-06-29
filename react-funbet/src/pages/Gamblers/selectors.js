import { createSelector } from 'reselect';

export const gamblersReducerSelector = (state) => state.gamblersReducer;

export const getAllGamblersSelector = createSelector(
  gamblersReducerSelector,
  (gamblersReducer) => {
    return gamblersReducer.getAllGamblers;
  },
);

export const getAccountGamblerSelector = createSelector(
  gamblersReducerSelector,
  (gamblersReducer) => {
    return gamblersReducer.getUserAccount;
  },
);
