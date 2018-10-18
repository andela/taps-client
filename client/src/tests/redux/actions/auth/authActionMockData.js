const data = {
  displayName: 'Testing',
  email: 'test.test@andela.com',
  googleId: '123456',
  photo: 'http://photo.com'
};

const response = {
  data: {
    userToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0YXBzLWNsaWVudC10ZXN0aW5nIiwiaWF0IjoxNTM5MTk2NzQ4LCJleHAiOjI3MDY4MDYzNDgsImF1ZCI6ImFuZGVsYS5jb20iLCJzdWIiOiJhbmRlbGFAZXhhbXBsZS5jb20iLCJlbWFpbCI6InRlc3QudGVzdEBhbmRlbGEuY29tIn0.KfCtjrxw2e-Jmntlc2Cjv0qn9A9ClzOhJJUz4VLIUZw',
    user: {
      id: '1',
      role: 'member'
    }
  }
};
const expiredToken = {
  data: {
    userToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0YXBzLWNsaWVudC10ZXN0aW5nIiwiaWF0IjoxNTM5MTk2NzQ4LCJleHAiOjExNjA1MDU1NDgsImF1ZCI6ImFuZGVsYS5jb20iLCJzdWIiOiJhbmRlbGFAZXhhbXBsZS5jb20iLCJlbWFpbCI6InRlc3QudGVzdEBnbWFpbC5jb20ifQ.D2B8J1nIYo-h0yz_GpYTabNVINEpF4SIXN5ifv32X4o',
    user: {
      id: '1',
      role: 'member'
    }
  }
};

const errorResponse = {
  errors: 'Andela emails only'
};

// Sourced from https://github.com/facebook/jest/issues/2098
class LocalStorage {
  store = {};
  setItem = (key, val) => {
    this.store[key] = val;
    return this.store;
  };
  getItem = key => this.store[key];
  removeItem = key => {
    Reflect.deleteProperty(this.store[key]);
  };
  clear = () => {
    this.store = {};
    return this.store;
  };
}


export {
  data,
  response,
  errorResponse,
  expiredToken,
  LocalStorage
};

