<template>
  <v-card elevation=10>
    <v-card-title>Sign up to share your moments!</v-card-title>
    <v-container>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="name"
          :rules="nameRules"
          prepend-icon="mdi-alphabetical"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          prepend-icon="mdi-email"
          label="Work E-mail"
          required
        ></v-text-field>

        <v-text-field
            v-model="password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            hint="At least 8 characters"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-file-input
            small-chips
            show-size
            label="Profile picture"
          ></v-file-input>
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary">Sign up!</v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid in the correct format',
      ],
      password: '',
      showPassword: false,
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 8 || 'Password must be at least 8 characters',
      ]
    }),

    methods: {
      reset () {
        this.$refs.form.reset()
      },
    },
  }
</script>