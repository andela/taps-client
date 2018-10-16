import {
  CREATE_ADMIN_REQUEST_SUCCESS,
  CREATE_ADMIN_REQUEST_ERROR,
  CLEAR_REQUEST_STATE 
} from '../actions/types';

const initialState = {
  request: null,
  success: false,
  error: ''
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
  case CREATE_ADMIN_REQUEST_SUCCESS:
    return {
      ...state,
      success: true,
      request: action.payload
    };
  case CREATE_ADMIN_REQUEST_ERROR:
    return {
      ...state,
      error: action.payload,
      success: false
    };
  case CLEAR_REQUEST_STATE:
    return {
      ...state,
      error: '',
      request: null,
      success: false
    };
  default:
    return state;
  }
};

export default requestReducer;
