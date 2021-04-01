<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      dark
      height="50"
      elevation="3"
    >
      <v-spacer />
      <div class="pull-left">
        <router-link to="/">
          <v-img
            :src="require('@/assets/logo.png')"
            max-width="200"
            max-height="50"
          />
        </router-link>
      </div>
      <v-spacer />
      <div class="pull-right">
         <v-btn
          depressed
          tile
          text
          to="/login"
          light
        >
          Sign in
        </v-btn>
        <v-btn
          depressed
          tile
          color="#DBE6F1"
          to="/signup"
        >
          <span style="color: #4175A5">Sign up</span>
        </v-btn>
      </div>
      <v-spacer />
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
