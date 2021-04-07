const personnalCommentsMixin = {
  methods: {
    getPersonnalComments(momentId) {
      const data = this.getSavedData();

      return data.comments.filter((comment) => comment.momentId === momentId);
    },
  },
};

export default personnalCommentsMixin;