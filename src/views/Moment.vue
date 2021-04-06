<template>
  <div class="moment">
    <v-container>
      <v-row>
        <v-col
          xs=12
          md=8
          offset-md=2
          align=center
        >
          <moment-card
            v-if="moment"
            default-comments-visible
            :moment="moment"
            align="left"
            v-click-outside="onClickOutside"
          />
        </v-col>
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
  methods: {
    onClickOutside() {
      this.$router.push({ name: 'Home' });
    }
  }
}
</script>
