<template>
  <v-container>
      <v-row>
        <v-col
          xs=12
          md=4
          offset-md=4
          align=center
        >
          <sign-in-form />
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import SignInForm from '@/components/SignInForm.vue';

export default {
  name: 'SignIn',
  components: {
    SignInForm,
  },
  data() {
    return {
    }
  },
}
</script>
