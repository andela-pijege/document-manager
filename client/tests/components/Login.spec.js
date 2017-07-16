import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import { Login } from '../../components/Login';

chai.use(chaiEnzyme());
const wrapper = mount(<Login />);
const action = wrapper.find('Login').node;

describe('Login Component', () => {

  it('component should exist', () => {
    expect(wrapper).to.be.present();
  });
  it('should change email when user types in an email address', () => {
    const event = { target: { name: 'email', value: 'ghost@ghost.com' } };
    action.onChange(event);
    expect(action.state.email).to.equal('ghost@ghost.com');
  });
  it('should change password when user types in a password', () => {
    const event = { target: { name: 'password', value: 'password' } };
    action.onChange(event);
    expect(action.state.password).to.equal('password');
  });
  it('Should login when form is submitted', () => {
    const login = sinon.spy(wrapper.instance().props.LoginAction, 'login');
    action.onSubmit({ preventDefault: () => 1 });
    expect(login.calledOnce).to.be.true;
  });
});
