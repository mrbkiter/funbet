const loaderInitialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  response: {},
};

export const initialAvatarState = {
  avatarDetail: {
    downloadUrl: '',
    uploadedFilename: '',
    id: '',
  },
  avatarDetailLoader: loaderInitialState,
};

const entityAvatarReducer =
  (entity) =>
  (state = initialAvatarState, action) => {
    const actionPrefix = `vincere/sc/${entity}`;

    switch (action.type) {
      case `${actionPrefix}/GET_AVATAR_REQUEST`:
        return {
          ...state,
          avatarDetailLoader: {
            ...state.avatarDetailLoader,
            isLoading: true,
          },
        };
      case `${actionPrefix}/GET_AVATAR_SUCCESS`:
        return {
          ...state,
          avatarDetail: action.payload,
          avatarDetailLoader: {
            ...state.avatarDetailLoader,
            isLoading: false,
            isSuccess: true,
          },
        };

      case `${actionPrefix}/GET_AVATAR_FAILURE`:
        return {
          ...state,
          avatarDetailLoader: {
            ...state.avatarDetailLoader,
            isLoading: false,
            isError: true,
          },
        };

      case `${actionPrefix}/UPDATE_AVATAR_REQUEST`:
        return {
          ...state,
          avatarDetailLoader: {
            ...state.avatarDetailLoader,
            isLoading: true,
          },
        };

      case `${actionPrefix}/UPDATE_AVATAR_SUCCESS`:
        return {
          ...state,
          avatarDetail: action.payload,
          avatarDetailLoader: {
            ...state.avatarDetailLoader,
            isLoading: false,
            isSuccess: true,
          },
        };

      case `${actionPrefix}/UPDATE_AVATAR_FAILURE`:
        return {
          ...state,
          avatarDetailLoader: {
            ...state.avatarDetailLoader,
            isLoading: false,
            isSuccess: false,
            isError: true,
          },
        };

      default:
        return state;
    }
  };

export default entityAvatarReducer;
