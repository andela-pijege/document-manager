import React from 'react';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import chai, { expect } from 'chai';
import { EditDocument } from '../../components/EditDocument';

global.CKEDITOR = { replace: () => { } };
global.CKEDITOR.instances = { content: { getData: () => 'some random content' } };
const documentAction = { updateUserDocument: () => Promise.resolve(1) };

chai.use(chaiEnzyme());
const wrapper = mount(<EditDocument DocumentAction={documentAction} />);
const action = wrapper.find('EditDocument').node;

describe('EditDocument component', () => {

  it('component should exist', () => {
    expect(wrapper).to.be.present();
  });

  it('Should change document title when user type the title', () => {
    const event = { target: { name: 'title', value: 'Some random title' } };
    action.onChange(event);
    expect(action.state.title).to.equal('Some random title');
  });

  it('Should update content state when user add document content', () => {
    const event = { target: { name: 'content', value: 'Some random content' } };
    action.onChange(event);
    expect(action.state.content).to.equal('Some random content');
  });

  it('Should update access state when user change document access type', () => {
    const event = { target: { name: 'access', value: 'private' } };
    action.onChange(event);
    expect(action.state.access).to.equal('private');
  });

  it('Should save document when form is submitted', () => {
    const editDocument = sinon.spy(wrapper.instance().props.DocumentAction, 'updateUserDocument');
    action.onSubmit({ preventDefault: () => 1 });
    expect(editDocument.calledOnce).to.be.true;
  });
});
