import { IS_LOADING } from '../actions/types';

const networkRequestReducer = (state = { isLoading: false }, action) => {
  switch (action.type) {
  case IS_LOADING:
    return {
      ...state,
      isLoading: action.payload
    };
  default:
    return state;
  }
};

export default networkRequestReducer;
