<template>
  <v-card
    max-height="1000"
    max-width="700"
  >
    <v-card-text>
      <v-row>
        <v-col cols=1>
          <div class="org-thumb">
            <v-img
              :src="moment.organization.avatar.thumb"
              max-height="40px"
              max-width="40px"
            />
          </div>
        </v-col>
        <v-col cols=11>
            <div class="moment-description">
              {{ moment.description}}
            </div>

            <div class="moment-author">
              by {{ moment.user.full_name}} {{ momentjs(moment.created_at).fromNow() }}
            </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-img
      :src="moment.media.large"
    >
    </v-img>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <span class="subheading mr-2">{{ moment.emotions.love }}</span>

      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <span class="subheading mr-2">{{ moment.emotions.attendance }}</span>

      <v-btn
        icon
        @click="commentsVisible = !commentsVisible"
      >
        <v-icon>mdi-comment</v-icon>
      </v-btn>
      <span class="subheading mr-2">{{ moment.comments_count }}</span>
    </v-card-actions>

    <v-expand-transition>
      <v-card-actions v-show="commentsVisible">
        <moment-comments :moment-id="moment.id" />
      </v-card-actions>
    </v-expand-transition>
  </v-card>
</template>

<script>
import MomentComments from './MomentComments.vue';

export default {
  name: 'MomentCard',
  components: {
    MomentComments,
  },
  props: {
    moment: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      commentsVisible: false
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.moment-description {
  font-size: 14px;
}

.moment-description:hover {
  color: rgb(150, 150, 150);
}

.moment-author {
  font-size: 12px;
  color: lightgray;
}

.org-thumb {
  justify-content: ;
}
</style>