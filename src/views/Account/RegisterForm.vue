<template>
  <div
    class="d-flex flex-column align-items-center justify-content-center vh-100"
  >
    <h1>Login</h1>

    <div v-if="hasError" class="text-danger">
      {{ errorMessage }}
    </div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-0"
        label="name:"
        label-for="input-1"
      >
        <b-form-input
          id="input-0"
          v-model="form.name"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-1" label="Username:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.username"
          type="text"
          required
        ></b-form-input>
        <div
          class="alert alert-danger"
          role="alert"
          v-if="warning.username !== undefined"
        >
          {{ warning.username }}
        </div>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-3"
        label="Confirm Password:"
        label-for="input-3"
        v-if="formType == 'register'"
      >
        <b-form-input
          id="input-3"
          v-model="form.password_confirmation"
          type="password"
          required
        ></b-form-input>
        <div
          class="alert alert-danger"
          role="alert"
          v-if="warning.confirmPassword !== undefined"
        >
          {{ warning.confirmPassword }}
        </div>
      </b-form-group>

      <b-form-group id="input-group-4">
        <b-form-checkbox v-model="form.remember">remember me</b-form-checkbox>
      </b-form-group>
      <div v-if="this.formType === 'login'" class="mb-2">
        <a role="button" class="pe-auto" @click="formType = 'register'"
          >Register</a
        >
      </div>
      <div v-else class="mb-2">
        Have account ?
        <a role="button" class="pe-auto" @click="formType = 'login'">Login</a>
      </div>
      <b-button type="submit" variant="primary" class="w-50">
        <b-spinner
          v-if="submitLoading == true"
          small
          label="Loading..."
        ></b-spinner>
        <p v-else class="m-0">Submit</p>
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { authService } from "@/services/authService";
export default {
  name:"RegisterForm",
  data() {
    return {
      apiUrl: process.env.VUE_APP_PUBLIC_API_URL,
      submitLoading: false,
      formType: "login",
      form: {
        name: "",
        username: "",
        password: "",
        password_confirmation: "",
        remember: false,
      },
      warning: {
        username: undefined,
        confirmPassword: undefined,
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
      if (this.formType === "login") {
        this.submitLoading = true;

        var action = new authService(this.$dataService);
        action
          .login(this.form)
          .then((data) => {
            localStorage.setItem("userData", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            this.$emit("loggedIn", true);
          })
          .catch((error) => {
            this.form.username="";
            this.form.password="";
            this.errorMessage = error.payload.message;
            this.hasError = true;
          })
          .finally(() => {
            this.submitLoading = false;
          });
      } else {
        this.submitLoading = true;
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.form),
        };

        fetch(`${this.apiUrl}/api/v1/auth/register`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            this.submitLoading = false;
            if (data.result === "success") {
              alert(data.result);
              location.reload();
            }
            // alert("harap isi seluruh form");
            this.warning.username = data.username;
            this.warning.confirmPassword = data.password;
          });
      }
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
