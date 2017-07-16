import React from 'react';
import { mount } from 'enzyme';
import { browserHistory } from 'react-router';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import { Dashboard } from '../../components/Dashboard';

chai.use(chaiEnzyme());

const user = {
  id: 2,
  firstName: 'Simi',
  lastName: 'Ijege',
  email: 'simi.ijege@gmail.com',
  roleID: 2
};

const documents = [
  {
    id: 1,
    title: 'Macbeth',
    access: 'public',
    content: 'Adventure, Reality',
    userID: 5
  },
  {
    id: 2,
    title: 'Lowry',
    access: 'public',
    content: 'Abracado',
    userID: 6
  }
];

const mockRouter = sinon.spy();

sinon.stub(browserHistory, 'push', (url) => {
  mockRouter(url);
});


const searchedPersonalDocuments = [
  {
    id: 7,
    title: 'Lord of the Rings',
    access: 'public',
    content: 'Adventure, Reality',
    userID: 5
  },
  {
    id: 2,
    title: 'Lowry',
    access: 'public',
    content: 'Abracado',
    userID: 6
  }

];


const mockDeleteUserAccount = sinon.spy();

const wrapper = mount(<Dashboard
  user={user}
  documents={documents}
  searchedPersonalDocuments={searchedPersonalDocuments}
  deleteUserAccount={mockDeleteUserAccount}
/>);

describe('Test Dashboard component', () => {
  it('component should exist', () => {
    expect(wrapper).to.be.present();
  });

  it('renders <span> element with the required props', () => {
    const title = wrapper.find('.card-title');

    expect(title.props().className).to.equal('card-title');
    expect(title.props().children).to.equal('Simi');
  });

  it('renders <div> element with the required props', () => {
    const emailWrapper = wrapper.find('.card-content');

    expect(emailWrapper.props().className).to.equal('card-content');
    expect(emailWrapper.props().children.type).to.equal('p');
    expect(emailWrapper.props().children.props.children).to.equal('simi.ijege@gmail.com');
  });

  it('renders <div> element with the required props', () => {
    const emailWrapper = wrapper.find('.card-content');

    expect(emailWrapper.props().className).to.equal('card-content');
    expect(emailWrapper.props().children.type).to.equal('p');
    expect(emailWrapper.props().children.props.children).to.equal('simi.ijege@gmail.com');
  });

  it('calls deleteAccount when delete account button is clicked', () => {
    const deleteAccountSpy = sinon.spy(wrapper.instance(), 'deleteAccount');
    const deleteBtn = wrapper.find('.delete-btn');

    deleteBtn.simulate('click');
    expect(deleteAccountSpy.calledOnce).to.be.true;
    expect(deleteAccountSpy.calledWith(user.id)).to.be.true;
  });

  it('calls updateUser when edit account button is clicked', () => {
    const updateAccountSpy = sinon.spy(wrapper.instance(), 'updateUser');
    const updateBtn = wrapper.find('.update-btn');

    updateBtn.simulate('click');
    expect(updateAccountSpy.calledOnce).to.be.true;
    expect(updateAccountSpy.calledWith()).to.be.true;
  });

  it('calls createDocument when create document button is clicked', () => {
    const createDocumentSpy = sinon.spy(wrapper.instance(), 'createDocument');
    const createDocumentBtn = wrapper.find('.create-btn');

    createDocumentBtn.simulate('click');
    expect(createDocumentSpy.calledOnce).to.be.true;
    expect(createDocumentSpy.calledWith()).to.be.true;
  });
});
