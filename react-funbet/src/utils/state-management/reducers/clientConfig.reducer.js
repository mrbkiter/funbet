export const initialState = {
  isExpandOverview: false,
  isExpandActivity: true,
};

const clientConfigReducer =
  (entity) =>
  (state = initialState, action) => {
    const actionPrefix = `${entity.toUpperCase()}_CLIENT_CONFIG`;
    switch (action.type) {
      case `${actionPrefix}_CLIENT_CONFIG/TOGGLE_EXPAND_OVERVIEW`:
        return {
          ...state,
          isExpandOverview: action.payload,
        };
      case `${actionPrefix}_CLIENT_CONFIG/TOGGLE_EXPAND_ACTIVITY`:
        return {
          ...state,
          isExpandActivity: action.payload,
        };
      default:
        return state;
    }
  };

export default clientConfigReducer;
