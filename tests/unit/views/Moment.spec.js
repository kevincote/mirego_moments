import Vuetify from 'vuetify';
import Component from '@/views/Moment.vue';

let wrapper;
const momentData = {
  data: {
    id: 'fakeid',
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
}

describe('Moment.vue', () => {
  context('when moment is found', () => {
    beforeEach(async() => {
      const mockGetFn = sinon.stub().resolves(momentData);

      wrapper = contextComponent({}, mockGetFn);
      await wrapper.vm.$nextTick();
    });

    it('should call the API with the moment id to retrieve the comments', () => {
      expect(wrapper.vm.$http.get).to.have.been.calledWith(process.env.VUE_APP_SINGLE_MOMENT_API + momentData.data.id);
    });

    it('should store the moment in the moment variable', () => {
      expect(wrapper.vm.moment).to.equal(momentData.data);
    });
  });

  context('when moment is not found', () => {
    it('should redirect to 404 page', async() => {
      const mockGetFn = sinon.stub().throws();

      wrapper = contextComponent({}, mockGetFn);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.$router.push).to.have.been.calledWith({ name: '404' });
    });
  });
});


function contextComponent(propsData, mockGetFn) {
  const localVue = createLocalVue();
  const vuetify = new Vuetify();

  return shallowMount(Component, {
    propsData: {
      ...propsData,
    },
    mocks: {
      $http: {
        get: mockGetFn,
      },
      $route: {
        params: { id: momentData.data.id }
      },
      $router : {
        push: sinon.stub(),
      },
    },
    localVue,
    vuetify,
  })
}