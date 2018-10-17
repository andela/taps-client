import instance from '../config/axios';

/**
 * @description method to make api requests
 * @function api
 * @param {string} url - the url
 * @param {string} method - http method
 * @param {object} obj - data to be sent
 * @returns {object} data - response
 */
const api = async (url, method, obj = {}) => {
  try {
    const response = await instance[method](url, obj);
    const { data } = response;
    if (data.errors) {
      throw (data.errors[0]);
    }
    return data;
  } catch (error) {
    if (typeof error === 'string') {
      throw (error);
    } else if (error.response) {
      throw (error.response.data);
    }
    throw ('problem connecting...');
  }
};

export default api;
