import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils';
import UIAvatar from '../src/components/UIAvatar.vue';

describe('UIAvatar.vue', () => {
  describe('when given an image', () => {
    it('shows the image', () => {
      const wrapper = shallowMount(UIAvatar, {
        propsData: {
          label: 'Guy Fieri',
          image: 'guy.jpg',
        },
      });

      console.log(wrapper.attributes('style'));
      expect(wrapper.attributes('style')).toContain('background-image: url("guy.jpg");');
    });
  });

  describe('when not given an image', () => {
    it('shows the icon', () => {
      const wrapper = shallowMount(UIAvatar, {
        propsData: {
          label: 'Guy Fieri',
        },
      });

      const initialsWrapper = wrapper.find({ ref: 'initials' });

      expect(wrapper.attributes('style')).not.toContain('background-image');
      expect(initialsWrapper.isVisible()).toBe(true);
    });
  });

  describe('when not given an image and given a label', () => {
    it('shows a maximum of 2 letters in the center of the avatar', () => {
      const wrapper = shallowMount(UIAvatar, {
        propsData: {
          label: 'Guy Fieri',
        },
      });

      const initialsWrapper = wrapper.find({ ref: 'initials' });

      expect(wrapper.attributes('style')).not.toContain('background-image');
      expect(initialsWrapper.isVisible()).toBe(true);
      expect(initialsWrapper.text()).toEqual('GF');
    });
  });

  describe('when given a label', () => {
    it('set the tooltip to the label', () => {
      const wrapper = shallowMount(UIAvatar, {
        propsData: {
          label: 'Guy Fieri',
        },
      });

      const tooltipWrapper = wrapper.find({ ref: 'tooltip' });

      wrapper.setData({ showTooltip: true });

      expect(tooltipWrapper.isVisible()).toBe(true);
      expect(tooltipWrapper.text()).toEqual(wrapper.vm.label);
    });
  });

  describe('when given a status', () => {
    it('for "default" state should have no indicator circle', () => {
      const wrapper = shallowMount(UIAvatar, {
        propsData: {
          label: 'Guy Fieri',
        },
      });

      const statusWrapper = wrapper.find({ ref: 'status' });

      expect(statusWrapper.exists()).toBe(false);
    });

    it('sets the correct class for the indicator circle', () => {
      const statuses = ['online', 'available', 'dnd'];

      statuses.forEach((status) => {
        const wrapper = shallowMount(UIAvatar, {
          propsData: {
            status,
            label: 'Guy Fieri',
          },
        });

        const statusWrapper = wrapper.find({ ref: 'status' });

        expect(statusWrapper.exists()).toBe(true);
        expect(statusWrapper.isVisible()).toBe(true);
        expect(statusWrapper.classes(status)).toBe(true);
      });
    })
  });

  describe('computed properties', () => {
    describe('initials', () => {
      it('returns the first two letters of the label if it is a single word', () => {
        const wrapper = shallowMount(UIAvatar, {
          propsData: {
            label: 'Guy',
          },
        });

        expect(wrapper.vm.initials).toEqual('GU');
      });

      it('returns the first letter of the first two words if label is a multi-word string', () => {
        const wrapper = shallowMount(UIAvatar, {
          propsData: {
            label: 'Guy Fieri',
          },
        });

        expect(wrapper.vm.initials).toEqual('GF');

        wrapper.setProps({ label: 'Guy Fieri is cool' });

        expect(wrapper.vm.initials).toEqual('GF');
      });
    });
  });
});
