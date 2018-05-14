import axios from 'axios';

const instance = axios.create();

instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

instance.interceptors.request.use(config => {
  config.headers['x-teams-user-token'] = localStorage.getItem('aTeamsToken');
  return config;
});

export default instance;
