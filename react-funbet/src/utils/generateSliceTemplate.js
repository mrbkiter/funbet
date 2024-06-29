export const initialState = {
  data: null,
  loaders: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
};

export const generateSliceTemplate = (name, extraReducers) => {
  return {
    name,
    initialState,
    reducers: {
      getRequest(state) {
        return {
          ...state,
          loaders: {
            ...state.loaders,
            isLoading: true,
          },
        };
      },
      getSuccess(state, action) {
        return {
          ...state,
          loaders: {
            ...state.loaders,
            isLoading: false,
            isSuccess: true,
            isError: false,
          },
          data: action.payload,
        };
      },
      getFailure(state) {
        return {
          ...state,
          loaders: {
            ...state.loaders,
            isLoading: false,
            isSuccess: false,
            isError: true,
          },
        };
      },
      ...extraReducers,
    },
  };
};

export default generateSliceTemplate;
