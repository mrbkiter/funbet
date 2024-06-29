import { combineReducers } from 'redux';
import matchesReducer from 'pages/Matches/reducer';
import gamblersReducer from 'pages/Gamblers/reducer';
import predictReducer from 'pages/Predict/reducer';

export const appReducer = combineReducers({
  matchesReducer,
  gamblersReducer,
  predictReducer,
});

export const rootReducer = (state, action) => {
  return action.type === 'RESET_APP'
    ? appReducer(undefined, action)
    : appReducer(state, action);
};
