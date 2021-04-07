import accessDataMixin from '@/mixins/accessData';

const savedData = { item1: 'my mock' };
const jsonSavedData = JSON.stringify(savedData);

let wrapper;

describe('accessDataMixin', () => {
  beforeEach(() => {
    wrapper = contextComponent();
  });

  describe('getSavedData', () => {
    beforeEach(() => {
      localStorage.setItem('personnalMomentsData', jsonSavedData);
    });

    it('should get and parse the item personnalMomentsData in localStorage', () => {
      expect(wrapper.vm.getSavedData()).to.deep.equal(savedData);
    });
  });

  describe('saveData', () => {
    it('should save data in the personnalMomentsData item in localStorage', () => {
      wrapper.vm.saveData(savedData);

      const storedDataInLocalStorage = localStorage.getItem('personnalMomentsData');
      expect(storedDataInLocalStorage).to.eq(jsonSavedData);
    });
  });
});

function contextComponent() {
  return shallowMount({
    render() {},
    mixins: [accessDataMixin],
  });
};