
export const props = {
  clearUser: jest.fn(),
  searchUser: jest.fn(),
  addMember: jest.fn(),
  accounts: [
    {
      type: 'github_repo',
      name: 'github_repo',
      accountId: 4
    }
  ],
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
  accounts: [],
  searchUser: jest.fn(),
  addMember: jest.fn()
};
