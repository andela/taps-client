import {
  CREATE_ADMIN_REQUEST_SUCCESS,
  CREATE_ADMIN_REQUEST_ERROR,
  CLEAR_REQUEST_STATE,
  CHECK_USER_REQUEST,
  FETCH_REQUESTS
} from '../actions/types';

const initialState = {
  request: null,
  success: false,
  error: '',
  hasRequest: null,
  loadedRequests: {
    requests: [],
    pagination: {}
  }
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

  case `${FETCH_REQUESTS}_SUCCESS`: {
    const { requests, meta } = action.payload;
    return {
      ...state,
      loadedRequests: {
        requests: requests,
        pagination: meta.pagination
      }
    };
  }
  case `${FETCH_REQUESTS}_ERROR`: {
    return {
      ...state,
      error: action.payload,
      success: false

    };
  }
  case FETCH_REQUESTS: {
    const { requests, meta } = action.payload;
    return {
      ...state,
      loadedRequests: {
        requests: requests,
        pagination: meta.pagination
      }
    };
  }


  default:
    return state;
  }
};

export default requestReducer;
