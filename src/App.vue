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
        color="secondary"
        to="/sign-up"
      >
        <span style="color: #4175A5">Sign up</span>
      </v-btn>
    </v-app-bar>

    <v-main class="main">
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

<style scoped>
.main {
  background-image:
    linear-gradient(to bottom right, rgba(255, 255, 255, 0.98), rgba(63, 63, 63, 0.6)),
    url('./assets/photos_background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
}
</style>
