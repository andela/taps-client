const host = window.location.hostname === 'localhost' ?
  'http://localhost:8000/v1' : 'https://andela-teams-core.herokuapp.com/v1/';

export default host;
