<template>
  <div class="moment">
    <v-container>
      <v-row>
        <v-col cols=2 />
        <v-col
          xs=12
          md=8
          align=center
        >
          <moment-card
            v-if="moment"
            default-comments-visible
            :moment="moment"
            align="left"
          />
        </v-col>
        <v-col cols=2 />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MomentCard from '@/components/MomentCard.vue';

export default {
  name: 'Moment',
  components: {
    MomentCard,
  },
  data() {
    return {
      moment: null,
    }
  },
  async created() {
    try {
      const moment = await this.$http.get(`https://api.neverworkaday.com/moments/${this.$route.params.id}`);
      this.moment = moment.data;
    } catch (e) {
      this.$router.push({ name: '404' });
    }
  },
}
</script>
