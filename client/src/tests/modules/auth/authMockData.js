/* eslint-disable no-undef */

const props = {
  extraFormProps: {
    handleForm: jest.fn(),
    handleChange: jest.fn(),
    slackId: 'abndh234456',
    githubId: '234535'
  },

  googleButtonProps: {
    handleFailure: jest.fn(),
    handleSuccess: jest.fn()
  },
  containerProps: {
    auth: {
      auth: {}
    },
    history: {
      push: jest.fn()
    },
    signUp: jest.fn(),
    signIn: jest.fn()
  },

  containerPropsErrors: {
    auth: {
      auth: {
        errors: 'Not an andela email'
      }
    }
  },
  containerPropsMessage: {
    auth: {
      auth: {
        message: 'Login successful'
      }
    }
  },
  containerPropsData: {
    auth: {
      auth: {
        data: 'Login successful'
      }
    },
    history: {
      push: jest.fn()
    }
  }
};


const responses = {
  success: {
    profileObj: {
      givenName: 'victor',
      email: 'test@andela.com',
      googleId: '123456',
      imageUrl: 'http://wwww.photo.com'
    }
  },
  error: {
    profileObj: {
      givenName: 'victor',
      email: 'test@google.com',
      googleId: '123456',
      imageUrl: 'http://wwww.photo.com'
    }
  }
};

const expected = {
  notSuccessful: {
    showForm: true,
    data: null,
    slackId: '',
    githubId: ''
  },
  withMessage: {
    showForm: false,
    data: null,
    slackId: '',
    githubId: ''
  }
};


export {
  responses,
  props,
  expected
};
