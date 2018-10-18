import {
  CREATE_ADMIN_REQUEST_SUCCESS,
  CREATE_ADMIN_REQUEST_ERROR,
  CLEAR_REQUEST_STATE,
  CHECK_USER_REQUEST
} from '../actions/types';

const initialState = {
  request: null,
  success: false,
  error: '',
  hasRequest: null
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
  case CREATE_ADMIN_REQUEST_SUCCESS:
    return {
      ...state,
      success: true,
      request: action.payload,
      hasRequest: true
    };
  case CREATE_ADMIN_REQUEST_ERROR:
    return {
      ...state,
      error: action.payload,
      success: false,
      hasRequest: false
    };
  case CLEAR_REQUEST_STATE:
    return {
      ...state,
      request: null,
      success: false,
      error: ''
    };
  case CHECK_USER_REQUEST:
    return {
      ...state,
      hasRequest: action.payload.length > 0
    };
  default:
    return state;
  }
};

export default requestReducer;
