/* eslint-disable */
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import { AllUsers } from '../../components/AllUsers';

chai.use(chaiEnzyme());


const users = [{
  firstName: 'Abi',
  lastName: 'Charma',
  email: 'abicharma@gmail.com',
  roleId: 1,
},
{
  firstName: 'Leku',
  lastName: 'Akanda',
  email: 'lekuakanda@gmail.com',
  roleId: 2
}
];

const wrapper = mount(<AllUsers
  allUsers={{ users }}
  UserAction={{ getAllusers: () => 1, searchAllUsers: () => 1 }}
/>);
const action = wrapper.instance();

describe('AllUsers component', () => {
  it('component should exist', () => {
    expect(wrapper).to.be.present();
  });

  it('Should load all the users and add to state', () => {
    expect(action.state.allUsers.length).to.equal(2);
  });

  it('Should update users list when it changes', () => {
    users.push({
      firstName: 'Alex',
      lastName: 'Newman',
      email: 'newman@gmail',
      roleId: 1,
    });
    action.componentWillReceiveProps({ allUsers: { users, metaData: { pages: 2 } } });
    expect(action.state.allUsers.length).to.equal(3);
  });

  it('Should call the getAlluser props when user paginates', () => {
    const getUser = sinon.spy(wrapper.instance().props.UserAction, 'getAllusers');
    action.handlePageChange(1);
    expect(getUser.calledOnce).to.be.true;
  });
  
  it('Should set search state to be true when admin searches for users', () => {
    const searchUser = sinon.spy(wrapper.instance().props.UserAction, 'searchAllUsers');
    action.searchUser({ target: { value: 'qsss' } });
    expect(searchUser.calledOnce).to.be.true;
    expect(action.state.isSearching).to.be.true;
  });

  it('Should call the delete props when admin click on delete button', () => {
    action.deleteUser(1);
  });
});
