import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://andela-teams-core.herokuapp.com/v1/'
});

instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

instance.interceptors.request.use(config => {
  config.headers['x-teams-user-token'] = localStorage.getItem('aTeamsToken');
  return config;
});

export default instance;
