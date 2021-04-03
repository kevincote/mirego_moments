import Vuetify from 'vuetify';
import Component from '@/components/MomentComments.vue';

let wrapper;
const momentId = 'thisMomentId';
const momentData = {
  data: {
    comments: [
      {
        comment: "hello",
        user: {
          full_name: "Bob",
          avatar: {
            thumb: 'fakeurl'
          }
        }
      }
    ]
  }
}

let localStorageData = { liked: [], comments: [] };

describe('MomentComments.vue', () => {
  context('initially', () => {
    beforeEach(async() => {
      wrapper = contextComponent({ momentId: momentId });
      await wrapper.vm.$nextTick();
    });

    it('should call the API with the moment id to retrieve the comments', () => {
      expect(wrapper.vm.$http.get).to.have.been.calledWith(process.env.VUE_APP_SINGLE_MOMENT_API + momentId);
    });

    it('should store the comments in the comments variable', () => {
      expect(wrapper.vm.comments).to.eq(momentData.data.comments);
    });

    it('should show the send icon when writing a comment', async() => {
      wrapper.find('input').setValue("my comment");
      await wrapper.vm.$nextTick();

      const sendIcon = wrapper.find('.v-icon.mdi-send');
      expect(sendIcon.exists()).to.eq(true);
    });
  });

  describe('saveComment', () => {
    const myComment = 'Good day';
    const commentData = {
      id: 2,
      momentId: momentId,
      user: {
        full_name: "CustomUser",
        avatar: {
          thumb: "https://d3gp7tnflamxzc.cloudfront.net/production/users/avatar/_default/thumb_default.jpg"
        }
      },
      comment: myComment
    };

    beforeEach(async() => {
      localStorageData = { liked: [], comments: [] };
      Math.floor = sinon.stub().returns(1);
      wrapper = contextComponent({ momentId: momentId });
      wrapper.vm.saveData = sinon.stub();
      wrapper.setData({ newComment: myComment });
    });

    it('should call saveData with the correct values', async() => {
      const expectedSavedData = {
        liked: [],
        comments: [commentData],
      };

      wrapper.vm.saveComment();

      expect(wrapper.vm.saveData).to.have.been.calledWith(expectedSavedData);
    });

    it('should reset the newComment variable', () => {
      wrapper.vm.saveComment();

      expect(wrapper.vm.newComment).to.eq('');
    });

    it('should add the comment to the personnalComments variable', () => {
      wrapper.vm.saveComment();

      expect(wrapper.vm.personnalComments).to.deep.equal([commentData]);
    });

    it('should emit an event', () => {
      wrapper.vm.saveComment();

      expect(wrapper.emitted('new-personnal-comment')).to.deep.equal([[]]);
    });
  });

  describe('getPersonnalComments', () => {
    it('should return the saved comments from the localStorage', () => {
      wrapper = contextComponent({ momentId });
      const expectedComment = { momentId };
      const commentsInStorage = [expectedComment, { momentId: 'anotherMomentCommentId' }];
      localStorageData = { liked: [], comments: commentsInStorage };

      const comments = wrapper.vm.getPersonnalComments();

      expect(comments).to.deep.equal([expectedComment]);
    });
  });
})


function contextComponent(propsData) {
  const localVue = createLocalVue();
  const vuetify = new Vuetify();

  return mount(Component, {
    propsData: {
      ...propsData,
    },
    mocks: {
      $http: {
        get: sinon.stub().resolves(momentData),
      },
      getSavedData() {
        return localStorageData;
      }
    },
    localVue,
    vuetify,
  })
}