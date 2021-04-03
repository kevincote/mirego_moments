<template>
  <div class="home">
    <v-container>
      <v-row justify="center">
        <div class="header">
          <div class="text-h3 moments-title">Moments</div>
          <div class="moments-description">Here is a list of all moments from all organizations. If this is too much for you, you can also see a list of all organizationsthat share moments.</div>
        </div>
      </v-row>
      <v-row>
        <v-col
          xs=12
          sm=6
          md=4
          v-for="moment in moments"
          :key="moment.id"
        >
          <div class="moment">
            <moment-card :moment="moment" />
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
  data() {
    return {
      moments: [],
      oldestData: undefined,
      bottom: false,
    }
  },
  created() {
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })

    this.fetchMoments();
  },
  methods: {
    async fetchMoments() {
      const url = this.buildUrl();

      const moments = await this.$http.get(url);
      this.moments = this.moments.concat(moments.data);

      this.oldestData = this.moments.slice(-1)[0].created_at;
    },
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;

      return bottomOfPage || pageHeight < visible;
    },
    buildUrl() {
      let url = process.env.VUE_APP_MOMENTS_API;

      if(this.oldestData !== undefined) {
        url = url + `?since=${encodeURI(this.oldestData)}`
      }

      return url;
    }
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        this.fetchMoments();
      }
    }
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
  font-weight: 700;
  padding-bottom: 20px;
}

.moments-description {
  color: rgb(65, 65, 65);
}
</style>
