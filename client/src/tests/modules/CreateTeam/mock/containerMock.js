export const over255Description = 'jbjbbkbnkejkkbjekbjkebjbnjbkbjbjljbjbblkbnjbnjbnbwnjnjnbjnjbnjbnjbnbjnbnbjnjbnjbnbjnbsjsbnjbnjbnjsnbjbnjnjbbjnjbbnjnbjsnjbnbjsnjbnbjbnjbsjnjbnjbnjbnsjbnnbbnbnbnbbnbnbnbenoeooernboboebnoonoeonoenneoneoeoeeoeeobooboboe jhghgghg hbgytt gytgygt 3yg3  gvw uygrhwn wu7tyt uttg th3t3nw kwhgi3';

export const state = {
  name: 'name',
  description: '',
  visibility: false,
  submitting: false,
  integrations: {
    github: []
  }
};

const props = {
  teams: {
    data: {
      data: ['aba', 'abc', 'abc', 'gers']
    }
  },
  createTeam: jest.fn(data => data),
  clearTeams: jest.fn(),
  history: {
    push: jest.fn()
  },
  isFetching: {
    isLoading: true
  },
  modalState: jest.fn()
};

export default props;
