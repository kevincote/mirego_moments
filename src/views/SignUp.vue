<template>
  <v-container>
      <v-row>
        <v-col
          xs=12
          md=4
          offset-md=4

          align=center
        >
          <sign-up-form />
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import SignUpForm from '@/components/SignUpForm.vue';

export default {
  name: 'SignUp',
  components: {
    SignUpForm,
  },
  data() {
    return {
    }
  },
}
</script>
