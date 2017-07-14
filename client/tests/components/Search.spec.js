import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import Search from '../../components/Search';

chai.use(chaiEnzyme());
const wrapper = shallow(<Search />);
describe('Test Search component', () => {
  it('component should exist', () => {
    expect(wrapper).to.be.present();
  });
//   it('component should have one direct child', () => {
//     expect(wrapper.children()).to.have.length(1);
//   });
});
