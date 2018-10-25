import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from '../../../../modules/Teams/components/Dropdown';

const sampleProps = {
  data: {
    type: '',
    label: ''
  }
};

const getShallow = (props) => shallow(<Dropdown {...sampleProps} {...props} />);
describe('Testing InviteForm', () => {
  describe('the components rendered', () => {
    it('should match snapshots', () => {
      const shallowObj = getShallow();
      expect(shallowObj)
        .toMatchSnapshot();
    });

    it('should render an image with src="/resources/images/github.svg" when type = "github_repo"', () => {
      const props = {
        data: {
          type: 'github_repo',
          label: 'label'
        }
      };
      const shallowObj = getShallow(props);
      expect(shallowObj
        .find('img[src="/resources/images/github.svg"]')
        .length)
        .toBeGreaterThanOrEqual(1);
    });

    it('should render an image with src="/resources/images/slack.png" when type = "slack_channel"', () => {
      const props = {
        data: {
          type: 'slack_channel',
          label: 'label'
        }
      };
      const shallowObj = getShallow(props);
      expect(shallowObj
        .find('img[src="/resources/images/slack.png"]')
        .length)
        .toBeGreaterThanOrEqual(1);
    });

    it('should render an image with src="/resources/images/pt.png" when type is not  "slack_channel" or "github_repo"', () => {
      const props = {
        data: {
          type: 'unknown',
          label: 'label'
        }
      };
      const shallowObj = getShallow(props);
      expect(shallowObj
        .find('img[src="/resources/images/pt.png"]')
        .length)
        .toBeGreaterThanOrEqual(1);
    });
  });
});
