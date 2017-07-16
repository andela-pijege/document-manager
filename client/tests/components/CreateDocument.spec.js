import React from 'react';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import chai, { expect } from 'chai';
import { CreateDocument } from '../../components/CreateDocument';


global.CKEDITOR = { replace: () => { } };
global.CKEDITOR.instances = { content: { getData: () => 'some random content' } };
const docAction = { createUserDocument: () => Promise.resolve(1) };

chai.use(chaiEnzyme());
const wrapper = mount(<CreateDocument DocumentAction={docAction} />);
const action = wrapper.find('CreateDocument').node;

describe('CreateDocument component', () => {

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
    const event = { target: { name: 'access', value: 'Public' } };
    action.onChange(event);
    expect(action.state.access).to.equal('Public');
  });

  it('Should submit document when form is submitted', () => {
    const createDoc = sinon.spy(wrapper.instance().props.DocumentAction, 'createUserDocument');
    action.onSubmit({ preventDefault: () => 1 });
    expect(createDoc.calledOnce).to.be.true;
  });
});
