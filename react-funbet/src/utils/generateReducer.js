import { snakeCase, camelCase } from 'lodash';

export function generateReducer(name, initialState) {
  const key = snakeCase(name).toUpperCase();

  return (state = initialState, action) => {
    const actionMatch = action.type.match(/^(.*)\/(.*)\/(.*)/);

    if (!actionMatch) {
      return state;
    }

    const [count, , reducerName, actionKey] = actionMatch;
    const reducerKey = snakeCase(reducerName).toUpperCase();

    if (!count || reducerKey !== key) {
      return state;
    }

    const [, actionName, stateName, type] =
      actionKey.match(/^([^_]+)_(.*)_(.*)/);

    const loadingState = camelCase(`loading_${actionName}${stateName}`); // Convert `STATE_NAME` to `loadingStateName`
    const { payload } = action;

    switch (type) {
      case 'SUCCESS':
        return {
          ...state,
          ...payload,
          [loadingState]: false,
        };

      case 'ERROR':
        return { ...state, [loadingState]: false };

      case 'REQUEST':
        return { ...state, [loadingState]: true };

      default:
        return state;
    }
  };
}
