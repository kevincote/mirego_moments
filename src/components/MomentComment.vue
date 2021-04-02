<template>
  <v-container>
    <v-row>
      <v-col cols=1>
        <div class="user-thumb">
          <v-img :src="avatar" />
        </div>
      </v-col>
      <v-col cols=11>
        <div class="comment-author">
          {{ author }}
        </div>

        <div class="comment">
          {{ comment }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'MomentComment',
  components: {
  },
  props: {
    author: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
    }
  },
}
</script>

<style scope>
.comment-author {
  font-size: 12px;
  font-weight: 600;
}

.comment {
  font-size: 15px;
}
</style>