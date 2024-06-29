export const initState = {
  loaders: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    response: {},
    request: {},
  },
  payload: undefined,
};

export default ({ REQUEST, FAILURE, SUCCESS, RESET }) => {
  return (state = initState, action) => {
    switch (action.type) {
      case REQUEST: {
        return {
          ...state,
          loaders: {
            ...state.loaders,
            isLoading: true,
            isSuccess: false,
            isError: false,
            response: {},
            request: action.request,
          },
        };
      }
      case FAILURE: {
        return {
          ...state,
          loaders: {
            ...state.loaders,
            isLoading: false,
            isSuccess: false,
            isError: true,
            response: action.response,
          },
          payload: action.payload,
        };
      }
      case SUCCESS: {
        return {
          ...state,
          loaders: {
            ...state.loaders,
            isLoading: false,
            isSuccess: true,
            isError: false,
            response: action.response,
          },
          payload: action.payload,
        };
      }
      case RESET: {
        return {
          ...initState,
        };
      }
      default:
        return state;
    }
  };
};
