import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import { RolesDocument } from '../../components/RolesDocument';

chai.use(chaiEnzyme());

const rolesDocuments = [
  {
    id: 1,
    title: 'Macbeth',
    access: 'regular',
    content: 'Adventure, Reality',
    userID: 5
  },
  {
    id: 2,
    title: 'Lowry',
    access: 'regular',
    content: 'Abracado',
    userID: 6
  }
];
const searchedRoleDocuments = [
  {
    id: 7,
    title: 'Lord of the Rings',
    access: 'regular',
    content: 'Adventure, Reality',
    userID: 5
  },
  {
    id: 2,
    title: 'Lowry',
    access: 'regular',
    content: 'Abracado',
    userID: 6
  }

];

const wrapper = mount(<RolesDocument
  rolesDocument={{ documents: rolesDocuments, metaData: { pages: 1, pageSize: 2, currentPage: 2 } }}
  searchedRoleDocuments={searchedRoleDocuments}
  DocumentAction={{ getAllRolesDocuments: () => 1, searchRoleDocuments: () => 1 }}
/>);
const action = wrapper.instance();

describe('Test RoleDocument component', () => {
  it('component should exist', () => {
    expect(wrapper).to.be.present();
  });
  it('Should load all roles documents', () => {
    expect(action.state.rolesDocument.documents.length).to.equal(2);
  });

  it('Should render the first document title', () => {
    expect(wrapper.render().html().includes('Macbeth')).to.be.true;
  });

  it('Should render the second document title', () => {
    expect(wrapper.render().html().includes('Lowry'));
  });

  it('Should update documents list when component receive props', () => {
    rolesDocuments.push({
      id: 3,
      title: 'Macbeth three',
      access: 'admin',
      content: 'Adventure, Reality three',
      userID: 5
    });
    action.componentWillReceiveProps({ rolesDocument: rolesDocuments });

    expect(action.state.rolesDocument.length).to.equal(3);
  });

  it('Should get next documents when user click on next pagination button', () => {
    const getDocs = sinon.spy(wrapper.instance().props.DocumentAction, 'getAllRolesDocuments');
    action.handlePageChange(2);
    expect(getDocs.calledOnce).to.be.true;
  });

  it('Should set search state to be true when user searches for document', () => {
    const searchDoc = sinon.spy(wrapper.instance().props.DocumentAction, 'searchRoleDocuments');
    action.searchDocuments({ target: { value: 'some query' } });
    expect(searchDoc.calledOnce).to.be.true;
  });
});
