<template>
  <v-card elevation=10>
    <v-card-title>Sign in</v-card-title>
    <v-container>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="email"
          :rules="emailRules"
          prepend-icon="mdi-email"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
            v-model="password"
            prepend-icon="mdi-lock"
            :rules="passwordRules"
            label="Password"
            hint="At least 8 characters"
          ></v-text-field>
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary">Sign in</v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    name: 'SignInForm',
    data: () => ({
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid in the correct format',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 8 || 'Password must be at least 8 characters',
      ]
    }),
  }
</script>