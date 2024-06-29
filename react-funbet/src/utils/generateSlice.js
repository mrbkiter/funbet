import generateLoaderReducer from 'utils/generateLoaderReducer';

// reducers is one of REQUEST, SUCCESS, FAILURE
const initReducer = {
  REQUEST: () => {},
  SUCCESS: () => {},
  FAILURE: () => {},
};

const createAction = (action) => {
  const actionCreator = (payload) => ({
    type: action,
    payload,
  });

  actionCreator.type = action;

  return actionCreator;
};

const defaultAction = {
  REQUEST: createAction(''),
  SUCCESS: createAction(''),
  FAILURE: createAction(''),
};

export const createSlice = ({ name = '', reducers = initReducer }) => {
  const actions = { ...defaultAction };
  const reducerParams = {};

  Object.keys(reducers).forEach((key) => {
    const actionType = `${name.toUpperCase()}_${key.toUpperCase()}`;
    const generateAction = createAction(actionType);
    actions[key] = generateAction;
    reducerParams[key] = generateAction.type;
  });

  const reducer = generateLoaderReducer(reducerParams);

  return {
    actions,
    reducer,
  };
};

export default createSlice;
