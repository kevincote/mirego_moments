<template>
  <div class="home">
    <v-container>
      <v-row justify="center">
        <div class="header">
          <div class="moments-title">Moments</div>
          <div class="moments-description">Immortalize and share your best work memories.</div>
        </div>
      </v-row>
      <v-row>
        <v-col
          xs=12
          sm=6
          md=4
          v-for="(moment, i) in moments"
          :key="moment.id"
        >
          <div class="moment">
            <moment-card
              :moment="moment"
            />
            <div v-if="i == lastMomentIndex" v-intersect="triggerInfiniteScroll" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MomentCard from '@/components/MomentCard.vue';

export default {
  name: 'Home',
  components: {
    MomentCard,
  },
  computed: {
    lastMomentIndex() {
      return this.moments.length - 1;
    },
  },
  data() {
    return {
      moments: [],
      oldestData: undefined,
    }
  },
  created() {
    this.fetchMoments();
  },
  methods: {
    async fetchMoments() {
      const url = this.buildUrl();

      const moments = await this.$http.get(url);
      this.moments = this.moments.concat(moments.data);

      this.oldestData = this.moments.slice(-1)[0].created_at;
    },
    buildUrl() {
      let url = process.env.VUE_APP_MOMENTS_API;

      if(this.oldestData !== undefined) {
        url = url + `?since=${encodeURI(this.oldestData)}`
      }

      return url;
    },
    triggerInfiniteScroll(entries, observer, isIntersecting) {
      if (!isIntersecting) return;

      this.fetchMoments();
    },
  },
}
</script>

<style scoped>
.moment {
  margin-bottom: 10px;
}

.header {
  max-width: 700px;
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
}

.moments-title {
  font-family: 'Permanent Marker', cursive;
  font-size: 60px;
  padding-bottom: 20px;
}

.moments-description {
  color: rgb(65, 65, 65);
  font-family: 'Architects Daughter', cursive;
  font-size: 30px;
}
</style>
