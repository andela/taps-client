const createTeamMock = {
  createTeamResponse: {
    data: {
      team: {
        containsYou: true,
        id: 2
      }
    }
  },
  createTeamErrResponse: {
    data: {
      errors: ['The name field is required.']
    }
  },
  emptyTeamName: {
    name: '',
    description: 'lagos cohort 32',
    private: 'private',
    integrations: {
      github: []
    }
  },
  teamInfoData: {
    name: 'ghoulie',
    description: 'lagos cohort 32',
    private: 'private',
    integrations: {
      github: []
    }
  },
  createTeamData: {
    name: 'ghoulie',
    description: 'lagos cohort 32',
    private: 'private'
  },
  createGithubData: {
    name: 'ghoulie',
    description: 'lagos cohort 32',
    private: 'private',
    integrations: {
      github: ['ah-ghoulie']
    }
  },
  githubResponse: {
    data: {
      created: true
    }
  },
  githubData: {
    name: 'ah-ghoulie',
    type: 'github_repo'
  },
  ptResponse: {
    data: {
      created: true
    }
  },
  ptData: {
    name: 'ah-ghoulie',
    type: 'pt_private_project'
  },
  createPtData: {
    name: 'ghoulie',
    description: 'lagos cohort 32',
    private: 'private',
    integrations: {
      pt: ['ah-ghoulie']
    }
  },

};

export default createTeamMock;
