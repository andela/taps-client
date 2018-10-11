import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import instance from '../src/config/axios';
import localStorage from './tests/__mocks__/mockLocalStorage';

configure({ adapter: new Adapter() });

const mock = new MockAdapter(instance);

global.shallow = shallow;
global.mount = mount;
global.mock = mock;
global.localStorage = localStorage;
global.M = {
    AutoInit: jest.fn(),
    Dropdown: {
        init: jest.fn()
    }
}
