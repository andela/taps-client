export const addMemberRequest = {
  userId: 2,
  teamId: 3,
  teamName: 'team',
  accounts: [
    {
      type: 'github_repo',
      name: 'github_repo',
      accountId: 4
    }
  ]
};

export const addMemberResponse =
  {
    type: 'github_repo',
    name: 'github_repo',
    invited: true,
    response: {
      data: {
        response: {
          invitedUser: {
            ok: true
          }
        }
      }
    }
  };

export const response =
  {
    type: 'github_repo',
    name: 'github_repo',
    invited: true,
    data: {
      response: {
        invitedUser: {
          ok: true
        }
      }
    }
  };

export const expectedActions = [
  {
    name: "EZE",
    payload: true,
    type: "[auth]: check if user is logged in"
  },
  {
    payload: true,
    type: "[ui]: show preloader"
  },
  {
    payload: [
      {
        invited: true,
        name: "github_repo",
        type: "github_repo"
      },
      {
        invited: true,
        name: "team",
        type: "team"
      }
    ],
    type: "[users]: add member to a team"
  },
  {
    payload: false,
    type: "[ui]: show preloader"
  }
];
