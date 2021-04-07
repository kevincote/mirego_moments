<template>
  <v-container>
    <v-row
      v-for="comment in allComments"
      :key="comment.id"
    >
      <moment-comment
        :author="comment.user.full_name"
        :avatar="comment.user.avatar.thumb"
        :comment="comment.comment"
      />
    </v-row>
    <v-row>
      <v-text-field
        v-model="newComment"
        class="px-3"
        label="Add comment"
        @keyup.enter="saveComment"
      >
        <template
          v-slot:append-outer
          v-if="newComment"
        >
          <v-btn icon @click="saveComment">
            <v-icon color="primary">mdi-send</v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </v-row>
  </v-container>
</template>

<script>
import MomentComment from './MomentComment.vue';

export default {
  name: 'MomentComments',
  components: {
    MomentComment,
  },
  props: {
    momentId: {
      type: String,
      required: true,
    },
    commentsData: {
      type: Array,
      default: undefined,
    }
  },
  computed: {
    allComments() {
      return this.comments.concat(this.personnalComments);
    },
  },
  data() {
    return {
      comments: [],
      personnalComments: this.getPersonnalComments(),
      newComment: '',
    }
  },
  async created() {
    if (this.commentsData !== undefined) {
      this.comments = this.commentsData;
    } else {
      const moment = await this.$http.get(`https://api.neverworkaday.com/moments/${this.momentId}`);
      this.comments = moment.data.comments;
    }
  },
  methods: {
    saveComment() {
      if (!this.newComment) {
        return;
      }

      const randomId = Math.floor(Math.random() * 10000000) + 1;
      const commentToSave = { id: randomId, momentId: this.momentId, user: { full_name: "CustomUser", avatar: { thumb: "https://d3gp7tnflamxzc.cloudfront.net/production/users/avatar/_default/thumb_default.jpg" } }, comment: this.newComment }
      const data = this.getSavedData();
      data.comments.push(commentToSave);
      this.saveData(data);

      this.newComment = '';
      this.personnalComments.push(commentToSave);
      this.$emit('new-personnal-comment');
    },
  }
}
</script>
