import { UPDATE_MESSAGE_RESOURCE, CLEAR_MESSAGE_RESOURCE } from './constants';

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_MESSAGE_RESOURCE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case CLEAR_MESSAGE_RESOURCE:
    default:
      return state;
  }
};
