import React from 'react';
import { mount } from 'enzyme';
import { browserHistory } from 'react-router';
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
  publicDocuments={publicDocuments}
  searchedPubliclDocuments={searchedPublicDocuments}
/>);

describe('Test PublicDocument component', () => {
  it('component should exist', () => {
    expect(wrapper).to.be.present();
  });
  it('renders <span> element with the required props', () => {
    const title = wrapper.find('.card-title');
    // expect(title.props().className).to.equal('card-title');
  });
});
