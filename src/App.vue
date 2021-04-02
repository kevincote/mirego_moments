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
      <router-view></router-view>
      <!-- <v-container>
        <v-row>
          <v-spacer />
            <v-col xs=12>
              <router-view></router-view>
            </v-col>
          <v-spacer />
        </v-row>
      </v-container> -->
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
