import React from 'react';
import { shallow, mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import { Nav } from '../../components/Nav';

chai.use(chaiEnzyme());

describe('Test Nav component', () => {
  describe('When user is not logged in', () => {
    const wrapper = shallow(<Nav />);
    it('component should exist', () => {
      expect(wrapper).to.be.present();
    });
    it('component should have one direct child', () => {
      expect(wrapper.children()).to.have.length(1);
    });
    it('component should have one child with the class name brand-logo', () => {
      expect(wrapper).to.have.exactly(1).descendants('.brand-logo');
    });
  });

  describe('When user is logged in as regular user', () => {
    const wrapper = mount(<Nav user={{ roleId: 2 }} isAuthenticated={true} />);
    it('Should show users link', () => {
      expect(wrapper.render().html().includes('Public Document')).to.equal(true);
      expect(wrapper.render().html().includes('Role Document')).to.equal(true);
      expect(wrapper.render().html().includes('Dashboard')).to.equal(true);
    });

    it('Should not display admin link', () => {
      expect(wrapper.render().html().includes('View All Users')).to.equal(false);
    });
  });

  describe('When user is logged in as an admin', () => {
    const wrapper = mount(<Nav user={{ roleID: 1 }} isAuthenticated={true} />);
    it('Should show users link', () => {
      expect(wrapper.render().html().includes('Public Document')).to.equal(true);
      expect(wrapper.render().html().includes('Role Document')).to.equal(true);
      expect(wrapper.render().html().includes('Dashboard')).to.equal(true);
    });

    it('Should display admin link', () => {
      expect(wrapper.render().html().includes('View All Users')).to.equal(true);
    });
  });
});
