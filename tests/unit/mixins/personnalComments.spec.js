import personnalCommentsMixin from '@/mixins/personnalComments';

const fakeMomentId = 123;
const fakeData = {
  comments: [
    {
      momentId: fakeMomentId,
    },
    {
      momentId: 345,
    }
  ],
  liked: []
}

let wrapper;

describe('personnalCommentsMixin', () => {
  describe('getPersonnalComments', () => {
    beforeEach(() => {
      wrapper = contextComponent();
      wrapper.vm.getSavedData = sinon.stub().returns(fakeData);
      wrapper.vm.momentId = fakeMomentId;
    });

    it('should fetch the data and return the comments matching the actual momentId', () => {
      wrapper.vm.getPersonnalComments(fakeMomentId);

      expect(wrapper.vm.getSavedData).to.have.been.called;
    });

    it('should return the comments matching the actual momentId', () => {
      const expectedCommentsData = [{ momentId: fakeMomentId }];
      expect(wrapper.vm.getPersonnalComments(fakeMomentId)).to.deep.equal(expectedCommentsData);
    });
  });
});

function contextComponent() {
  return shallowMount({
    render() {},
    mixins: [personnalCommentsMixin],
  });
};