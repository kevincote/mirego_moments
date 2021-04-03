<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      dark
      height="50"
      elevation="3"
    >
      <router-link to="/">
        <v-img
          :src="require('@/assets/logo.png')"
          max-width="200"
          max-height="50"
        />
      </router-link>

      <v-spacer></v-spacer>

      <v-btn
        depressed
        tile
        text
        to="/login"
        light
      >
        Log in
      </v-btn>
      <v-btn
        depressed
        tile
        color="#DBE6F1"
        to="/signup"
      >
        <span style="color: #4175A5">Sign up</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-fab-transition>
        <router-view></router-view>
      </v-fab-transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {};
  },
  created() {
    const data = this.getSavedData();

    if(data == null) {
      this.saveData({ liked: [], comments: [] });
    }
  }
};
</script>
