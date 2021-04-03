import Vuetify from 'vuetify';
import Component from '@/views/Home.vue';

let wrapper;
const momentsData = { data: [{ fakeMomentData: 'the moments' }] }

describe('Home.vue', () => {
  beforeEach(async() => {
    wrapper = contextComponent();
    await wrapper.vm.$nextTick();
  });

  it('should call the API with the moment id to retrieve the comments', () => {
    expect(wrapper.vm.$http.get).to.have.been.calledWith(process.env.VUE_APP_MOMENTS_API);
  });

  it('should store the moments in the moments variable', () => {
    expect(wrapper.vm.moments).to.eq(momentsData.data);
  });
})


function contextComponent(propsData) {
  const localVue = createLocalVue();
  const vuetify = new Vuetify();

  return shallowMount(Component, {
    propsData: {
      ...propsData,
    },
    mocks: {
      $http: {
        get: sinon.stub().resolves(momentsData),
      }
    },
    localVue,
    vuetify,
  })
}