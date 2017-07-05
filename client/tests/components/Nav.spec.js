import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import { Nav } from '../../components/Nav';

chai.use(chaiEnzyme());
const wrapper = shallow(<Nav />);
describe('Test Nav component', () => {
  it('component should exist', () => {
    expect(wrapper).to.be.present();
  });
  it('component should have one direct child', () => {
    expect(wrapper.children()).to.have.length(1);
  });
});
