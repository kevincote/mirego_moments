import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

import Component from '@/components/MomentCard.vue';
import MomentComments from '@/components/MomentComments.vue';
import moment from 'moment';

const fakeMomentId = 'theFakeMomentId';
const fakeMoment = {
  id: fakeMomentId,
  description: 'a simple moment',
  created_at: "2021-01-01",
  user: { full_name: 'Test Guy' },
  emotions: {
    love: 1,
    attendance: 0,
  },
  organization: {
    avatar: {
      thumb: 'fakeUrl',
    }
  },
  media: {
    large: 'fakeUrl',
  },
  comments_count: 10,
}

let localStorageData = { liked: [], comments: [] };

describe('MomentCard.vue', () => {
  let wrapper;

  context('initially', () => {
    beforeEach(() => {
      wrapper = contextComponent({ moment: fakeMoment });
    });

    it('should display the date in the "ago" format', () => {
      const authorDiv = wrapper.find('.moment-author');

      const expectedAuthorText = `by ${fakeMoment.user.full_name} ${moment(fakeMoment.created_at).fromNow()}`
      expect(authorDiv.text()).to.eq(expectedAuthorText);
    })

    it('should hide the comments section', () => {
      const commentsComponent = wrapper.findComponent(MomentComments);

      expect(commentsComponent.isVisible()).to.eq(false);
    });

    it('when clicking on the comment icon it should open the comments section of the card', async() => {
      wrapper.find('.v-icon.mdi-comment').trigger('click');

      await wrapper.vm.$nextTick();

      const commentsComponent = wrapper.findComponent(MomentComments);
      expect(commentsComponent.isVisible()).to.eq(true);
    });
  });

  describe('likeMoment', () => {
    const momentId = 'myFakeMomentId';

    beforeEach(() => {
      wrapper = contextComponent({ moment: fakeMoment });
      wrapper.vm.saveData = sinon.stub();
    });

    context('when the moment is not already liked', () => {
      beforeEach(() => {
        localStorageData = { liked: [], comments: [] }
        wrapper.vm.likeMoment(momentId);
      });

      it('should update the likedByMe variable', () => {
        expect(wrapper.vm.likedByMe).to.eq(true);
      });

      it('should call saveData to save in localStorage with the correct value', () => {
        const expectedData = { liked: [momentId], comments: [] }

        expect(wrapper.vm.saveData).to.have.been.calledWith(expectedData);
      });
    });

    context('when the moment is already liked', () => {
      beforeEach(() => {
        localStorageData = { liked: [momentId], comments: [] }
        wrapper.vm.likeMoment(momentId);
      });

      it('should update the likedByMe variable', () => {
        expect(wrapper.vm.likedByMe).to.eq(false);
      });

      it('should call saveData to save in localStorage with the correct value', () => {
        const expectedData = { liked: [], comments: [] }

        expect(wrapper.vm.saveData).to.have.been.calledWith(expectedData);
      });
    });
  });

  describe('isMomentLiked', () => {
    const momentId = 'fakeMomentId';

    beforeEach(() => {
      wrapper = contextComponent({ moment: fakeMoment });
    });

    context('when moment is liked', () => {
      it('should return false', () => {
        localStorageData = { liked: [momentId], comments: [] };

        expect(wrapper.vm.isMomentLiked(momentId)).to.eq(true);
      });
    });

    context('when moment is not liked', () => {
      it('should return true', () => {
        localStorageData = { liked: [], comments: [] };

        expect(wrapper.vm.isMomentLiked(momentId)).to.eq(false);
      });
    });
  });

  describe('getPersonnalComments', () => {
    it('should return the saved comments from the localStorage', () => {
      wrapper = contextComponent({ moment: fakeMoment });
      const expectedComment = { momentId: fakeMomentId };
      const commentsInStorage = [expectedComment, { momentId: 'anotherMomentCommentId' }];
      localStorageData = { liked: [], comments: commentsInStorage };

      const comments = wrapper.vm.getPersonnalComments();

      expect(comments).to.deep.equal([expectedComment]);
    });
  });

  describe('heartColor', () => {
    beforeEach(() => {
      wrapper = contextComponent({ moment: fakeMoment });
    });

    context('when liked', () => {
      it('should be red', () => {
        wrapper.setData({ likedByMe: true });

        expect(wrapper.vm.heartColor).to.eq('red');
      });
    });

    context('when not liked', () => {
      it('should be default', () => {
        wrapper.setData({ likedByMe: false });

        expect(wrapper.vm.heartColor).to.eq('');
      });
    });
  });

  describe('totalLove', () => {
    it('should return the total emotions from backend and localStorage', () => {
      wrapper = contextComponent({ moment: fakeMoment });
      wrapper.setData({ likedByMe: true });

      expect(wrapper.vm.totalLove).to.eq(2);
    });
  });

  describe('totalComments', () => {
    it('should return the total comments from backend and localStorage', () => {
      wrapper = contextComponent({ moment: fakeMoment });
      wrapper.setData({ commentsCountByMe: 2 });

      expect(wrapper.vm.totalComments).to.eq(12);
    });
  });
})


function contextComponent(propsData) {
  const localVue = createLocalVue();
  const vuetify = new Vuetify();
  localVue.use(VueRouter)
  const router = new VueRouter()

  return mount(Component, {
    propsData: {
      ...propsData,
    },
    mocks: {
      momentjs: moment,
      getSavedData() {
        return localStorageData;
      },
    },
    stubs: {
      'moment-comments': { template: '<div class="moment-comments" />' },
      transition: false,
    },
    localVue,
    vuetify,
    router,
  })
}