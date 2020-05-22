/// <reference types='jest' />

import * as React from 'react';
import { configure, shallow, mount, ReactWrapper, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import ListItems from '../components/ListItems';
import { IListItemsProps } from '../components/IListItemsProps';
import { IListItemsState } from '../components/IListItemsState';
import { SPServiceMock } from '../../../service/SPServiceMock';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

configure({ adapter: new Adapter() });

describe('testing ListItems react component', () => {
  let listItemsComponent: ReactWrapper<IListItemsProps, IListItemsState>;
  let SPServiceInstanceMock: SPServiceMock = new SPServiceMock();

  beforeEach(() => {
    listItemsComponent = mount(React.createElement(ListItems, {
      description: 'hey',
      listName: 'FAQ',
      SPServiceInstance: SPServiceInstanceMock
    }));
  });

  afterEach(() => {
    listItemsComponent.unmount();
  });

  test('should display list name as the title', () => {
    let webPartTitle = listItemsComponent.find('span').first().text();

    expect(webPartTitle).toBe(listItemsComponent.props().listName);
  });

  test('should display the correct number of list items', () => {
    listItemsComponent.update();
    let listItemsLength = listItemsComponent.find('li').length;

    expect(listItemsLength).toBe(3);
  });

  test('should call GetListItems() when listName property is updated', () => {
    const spy = jest.spyOn(SPServiceInstanceMock, 'GetListItems');
    listItemsComponent.setProps({ listName: 'Site Pages' });

    expect(spy).toHaveBeenCalledWith('Site Pages');

    spy.mockRestore();
  });

  test('should update newItemTitle state variable when TextField is updated', () => {
    let textField = listItemsComponent.find(TextField).first();
    textField.props().onChange(null, 'Test item');

    expect(listItemsComponent.state().newItemTitle).toBe('Test item');
  });

  test('should call AddListItems() when Add button is clicked', () => {
    const addListItemsSpy = jest.spyOn(SPServiceInstanceMock, 'AddListItems');

    const buttonElement = listItemsComponent.find(PrimaryButton).first();
    buttonElement.simulate('click');

    expect(addListItemsSpy).toHaveBeenCalled();
    addListItemsSpy.mockRestore();
  });

  test('should call AddListItems() with correct arguments', () => {
    const addListItemsSpy = jest.spyOn(SPServiceInstanceMock, 'AddListItems');

    listItemsComponent.setState({ newItemTitle: 'Testing' });
    const buttonElement = listItemsComponent.find(PrimaryButton).first();
    buttonElement.simulate('click');

    expect(addListItemsSpy).toHaveBeenCalledWith('FAQ', 'Testing');
    addListItemsSpy.mockRestore();
  });
});
