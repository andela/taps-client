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
  teamResposne: {
    data: {
      team: {
        containsYou: true
      }
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
    type: 'pt_project'
  },
  createPtData: {
    name: 'ghoulie',
    description: 'lagos cohort 32',
    private: 'private',
    integrations: {
      pt: ['ah-ghoulie']
    }
  },
  slackData: {
    name: 'ghoulie-general',
    type: 'slack_private_channel'
  },
  createSlackData: {
    name: 'ghoulie',
    description: 'lagos cohort 32',
    private: 'private',
    integrations: {
      slack: ['ghoulie-general']
    }
  },
  slackResponse: {
    data: {
      created: true
    }
  },
  integrationData: {
    name: 'ghoulie',
    description: 'lagos cohort 32',
    private: 'private',
    integrations: {
      slack: ['ghoulie-general'],
      pt: ['ah-ghoulie'],
      github: ['ah-ghoulie']
    }
  }
};

export default createTeamMock;
