import { createSelector } from 'reselect';

const messageResourceSelector = (state) => state.messageResourceReducer;
export const selectGetMessageResource = createSelector(
  messageResourceSelector,
  (msgResource) => msgResource || null,
);

export default (state) => state.messageResourceReducer;
