import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import { PublicDocument } from '../../components/PublicDocument';

chai.use(chaiEnzyme());

const publicDocuments = [
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
const searchedPublicDocuments = [
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

const wrapper = mount(<PublicDocument
  publicDocuments={{ documents: publicDocuments, metaData: { pages: 1, pageSize: 2, currentPage: 2 } }}
  searchedPublicDocuments={searchedPublicDocuments}
  DocumentAction={{ getAllPublicDocuments: () => 1, searchPublicDocuments: () => 1 }}
/>);
const action = wrapper.instance();

describe('Test PublicDocument component', () => {
  it('component should exist', () => {
    expect(wrapper).to.be.present();
  });
  it('Should load all public documents', () => {
    expect(action.state.publicDocuments.documents.length).to.equal(2);
  });

  it('Should render the first document title', () => {
    expect(wrapper.render().html().includes('Macbeth')).to.be.true;
  });

  it('Should render the second document title', () => {
    expect(wrapper.render().html().includes('public'));
  });

  it('Should update documents list when component receive props', () => {
    publicDocuments.push({
      id: 3,
      title: 'Macbeth three',
      access: 'public',
      content: 'Adventure, Reality three',
      userID: 5
    });
    action.componentWillReceiveProps({ publicDocuments });

    expect(action.state.publicDocuments.length).to.equal(3);
  });

  it('Should get next documents when user click on next pagination button', () => {
    const getDocs = sinon.spy(wrapper.instance().props.DocumentAction, 'getAllPublicDocuments');
    action.handlePageChange(2);
    expect(getDocs.calledOnce).to.be.true;
  });

  it('Should set search state to be true when user searches for document', () => {
    const searchDoc = sinon.spy(wrapper.instance().props.DocumentAction, 'searchPublicDocuments');
    action.searchDocuments({ target: { value: 'some query' } });
    expect(searchDoc.calledOnce).to.be.true;
  });
});
