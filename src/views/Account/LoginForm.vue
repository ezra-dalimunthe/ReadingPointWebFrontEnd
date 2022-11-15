<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <h1>Login</h1>

    <div v-if="hasError" class="text-danger">
      {{ errorMessage }}
    </div>
    <b-form @submit="onSubmit" @reset="onReset" class="col-4">
      <b-form-group id="input-group-1" label="Email: " label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password: " label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4">
        <b-form-checkbox v-model="form.remember">remember me</b-form-checkbox>
      </b-form-group>
      <div class="mb-2 d-flex justify-content-arround">
     
     
      <b-button
        type="submit"
        variant="primary"
        class="w-auto"
        :disabled="submitLoading"
      >
        <b-spinner
          v-if="submitLoading == true"
          small
          label="Loading..."
        ></b-spinner>
        <p v-else class="m-0">Submit</p>
      </b-button> </div>
    </b-form>
  </div>
</template>

<script>
import { AuthService } from "@/services/AuthService";
export default {
  name: "LoginForm",
  data() {
    return {
      apiUrl: process.env.VUE_APP_PUBLIC_API_URL,
      submitLoading: false,
      formType: "login",
      form: {
        email: "",
        password: "",
        remember: false,
      },
      show: true,
      errorMessage: "",
      hasError: false,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.hasError = false;
      this.submitLoading = true;
      var action = new AuthService();
      action
        .login(this.form)
        .then((data) => {
          console.log("logged", data);
          this.$store.dispatch("ACTION_LOGIN", data).then(() => {
            this.$router.push({ name: "home" });
          });
        })
        .catch((error) => {
          this.form.email = "";
          this.form.password = "";
          if (error.status==401) {
            this.errorMessage = "Email or password incorrect!";
          } else {
            this.errorMessage = error;
            console.log(error);
          }

          this.hasError = true;
        })
        .finally(() => {
          this.submitLoading = false;
        });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.username = "";
      this.form.password = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
