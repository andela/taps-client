
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

export const teams = [
  {
    team: {
      name: 'First team',
      private: true,
      favorite: true,
      progress: 15
    }
  }
];

export const data = {
  user: {
    email: 'eze.kevin@andela.com',
    githubUsername: 'kevinostro',
    id: 1,
    photo: 'ttps://images.pexels.com/photos/573294/pexels-photo-573294.jpeg?cs=srgb&dl=art-back-view-black-573294.jpg&fm=jpg',
    role: 'admin',
    slackId: 'kevinostro',
    displayName: 'kevinostro',
    createdAt: '12/03/2018'
  }
};
