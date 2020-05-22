/// <reference types='jest' />

import * as React from 'react';
import { shallow, configure, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

import Header, { IHeaderProps, IHeaderState } from '../components/Header';

describe('tests for Header component', () => {
  let headerComponent: ShallowWrapper<IHeaderProps, IHeaderState>;

  beforeEach(() => {
    headerComponent = shallow(<Header />);
  });

  afterEach(() => {
    headerComponent.unmount();
  });

  test('should match the existing snapshot', () => {
    expect(toJson(headerComponent)).toMatchSnapshot();
  });
});
