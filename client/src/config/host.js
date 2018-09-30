const host = window.location.hostname === 'localhost' ?
  'http://localhost:8000/v1' : 'https://ghoulies-taps-server.herokuapp.com/v1/';

export default host;
