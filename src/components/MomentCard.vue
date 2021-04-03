<template>
  <v-card
    max-width="700"
    elevation="10"
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

    <router-link :to="'/moment/' + moment.id">
      <v-img
        :src="moment.media.large"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            />
          </v-row>
        </template>
      </v-img>
    </router-link>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn icon @click="likeMoment(moment.id)">
        <v-icon :color="heartColor">mdi-heart</v-icon>
      </v-btn>
      <span class="subheading mr-2">{{ totalLove }}</span>

      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <span class="subheading mr-2">{{ moment.emotions.attendance }}</span>

      <v-btn
        icon
        :color="commentsVisible || defaultCommentsVisible ? 'secondary' : ''"
        @click="commentsVisible = !commentsVisible"
      >
        <v-icon>mdi-comment</v-icon>
      </v-btn>
      <span class="subheading mr-2">{{ totalComments }}</span>
    </v-card-actions>

    <v-expand-transition>
      <v-card-actions v-if="defaultCommentsVisible || commentsVisible">
        <moment-comments
          :moment-id="moment.id"
          :comments-data="moment.comments"
          @new-personnal-comment="commentsCountByMe++"
        />
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
    },
    defaultCommentsVisible: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    heartColor() {
      return this.likedByMe ? 'red' : '';
    },
    totalLove() {
      let love = this.moment.emotions.love;

      if (this.likedByMe) love++

      return love;
    },
    totalComments() {
      let commentsCount = this.moment.comments_count || this.moment.comments.length;

      return commentsCount + this.commentsCountByMe;
    },
  },
  data() {
    return {
      commentsVisible: false,
      likedByMe: this.isMomentLiked(this.moment.id),
      commentsCountByMe: this.getPersonnalComments().length,
    }
  },
  methods: {
    likeMoment(momentId) {
      const personnalMomentsData = this.getSavedData();

      if (this.isMomentLiked(momentId)) {
        personnalMomentsData.liked = personnalMomentsData.liked.filter((id) => id !== momentId);
        this.likedByMe = false;
      } else {
        personnalMomentsData.liked.push(momentId);
        this.likedByMe = true;
      }

      this.saveData(personnalMomentsData);
    },
    isMomentLiked(momentId) {
      const personnalMomentsData = this.getSavedData();

      return personnalMomentsData.liked.includes(momentId);
    },
    getPersonnalComments() {
      const data = this.getSavedData();

      return data.comments.filter((comment) => comment.momentId === this.moment.id);
    },
    onClickOutside() {

    },
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