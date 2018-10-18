
export const props = {
  clearUser: jest.fn(),
  searchUser: jest.fn(),
  addMember: jest.fn(),
  users: [{
    role: 'admin',
    email: 'eze.kevin@andela.com',
    githubUsername: 'kenware'
  }],
  members: [{
    userId: 2,
    id: 2,
    role: 'admin',
    email: 'eze.kevin@andela.com',
    githubUsername: 'kenware'
  }]
};

export const emptyProps = {
  searchUser: jest.fn(),
  addMember: jest.fn()
};
