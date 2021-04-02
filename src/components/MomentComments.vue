<template>
  <v-container>
    <v-row
      v-for="comment in comments"
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
      >
        <template
          v-slot:append-outer
          v-if="newComment"
        >
          <v-icon>mdi-send</v-icon>
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
    }
  },
  data() {
    return {
      comments: [],
      newComment: '',
    }
  },
  async created() {
    const moment = await this.$http.get(`https://api.neverworkaday.com/moments/9e9dc66c`);
    // const comments = await this.$http.get(`https://api.neverworkaday.com/moments/${this.momentId}`);
    this.comments = moment.data.comments;
  }
}
</script>