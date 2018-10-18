export const addMemberRequest = {
  userId: 2,
  teamId: 3,
  accounts: [
    {
      type: 'github_repo',
      name: 'github_repo',
      accountId: 4
    }
  ]
};

export const addMembeResponse = [
  {
    type: 'github_repo',
    name: 'github_repo',
    invited: true
  }
];
