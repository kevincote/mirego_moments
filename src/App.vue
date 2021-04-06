<template>
  <v-app>
    <v-app-bar
      app
      color="blue-grey lighten-5"
      height="40"
      elevation="3"
    >
      <router-link to="/">
        <v-toolbar-title class="moments-appbar-title">
          Moments
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-btn
        small
        depressed
        tile
        text
        to="/login"
        light
      >
        Log in
      </v-btn>
      <v-btn
        small
        depressed
        tile
        color="accent"
        to="/sign-up"
      >
        <span style="color: white">Sign up</span>
      </v-btn>
    </v-app-bar>

    <v-main class="main">
      <router-view></router-view>
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

.moments-appbar-title {
  font-family: 'Permanent Marker', cursive;
  font-size: 23px;
}
</style>
