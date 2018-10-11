const localStorage = {};

export default {
  setItem(key, value) {
    return Object.assign(localStorage, { [key]: value });
  },
  removeItem(key) {
   return delete localStorage[key]; //eslint-disable-line
  },
};
