const personnalCommentsMixin = {
  methods: {
    getPersonnalComments() {
      const data = this.getSavedData();

      return data.comments.filter((comment) => comment.momentId === this.momentId);
    },
  },
};

export default personnalCommentsMixin;