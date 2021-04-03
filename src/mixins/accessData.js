const accessDataMixin = {
  methods: {
    getSavedData() {
      return JSON.parse(localStorage.getItem('personnalMomentsData'));
    },
    saveData(data) {
      localStorage.setItem('personnalMomentsData', JSON.stringify(data));
    },
  },
};

export default accessDataMixin;