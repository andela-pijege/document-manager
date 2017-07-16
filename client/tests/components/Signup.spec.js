import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import { Signup } from '../../components/Signup';

chai.use(chaiEnzyme());
const wrapper = mount(<Signup />);
const action = wrapper.find('Signup').node;

describe('Signup Component', () => {

  it('component should exist', () => {
    expect(wrapper).to.be.present();
  });
  it('should change first name when user types in a valid firstName', () => {
    const event = { target: { name: 'firstName', value: 'precious' } };
    action.onChange(event);
    expect(action.state.firstName).to.equal('precious');
  });

  it('should change last name when user types in a valid lastName', () => {
    const event = { target: { name: 'lastName', value: 'gonzalez' } };
    action.onChange(event);
    expect(action.state.lastName).to.equal('gonzalez');
  });

  it('should change email when user types in a valid email', () => {
    const event = { target: { name: 'email', value: 'precious@precious.com' } };
    action.onChange(event);
    expect(action.state.email).to.equal('precious@precious.com');
  });

  it('should change password when user types in a valid password', () => {
    const event = { target: { name: 'password', value: 'password' } };
    action.onChange(event);
    expect(action.state.password).to.equal('password');
  });

  it('should change password when user confirms the password typed initially', () => {
    const event = { target: { name: 'confirmPassword', value: 'password' } };
    action.onChange(event);
    expect(action.state.confirmPassword).to.equal('password');
  });
  it('Should login when form is submitted', () => {
    const signup = sinon.spy(wrapper.instance().props.SignUpAction, 'createUser');
    action.onSubmit({ preventDefault: () => 1 });
    expect(signup.calledOnce).to.be.true;
  });
});
