<template>
  <div class="auth-container">
    <div class="signup-container">
      <h1>Signup</h1>
      <form @submit.prevent="signup" class="signup-form">
        <div class="form-group">
          <label for="username">Foydalanuvchi Nomi:</label>
          <input
              type="text"
              id="username"
              v-model="username"
              class="form-control"
              :class="{ 'invalid': usernameError }"
              @blur="validateUsername"
              required
          />
          <p v-if="usernameError" class="error-message">{{ usernameError }}</p>
        </div>

        <div class="form-group">
          <label for="email">Elektron Pochta:</label>
          <input
              type="email"
              id="email"
              v-model="email"
              class="form-control"
              :class="{ 'invalid': emailError }"
              @blur="validateEmail"
              required
          />
          <p v-if="emailError" class="error-message">{{ emailError }}</p>
        </div>

        <div class="form-group">
          <label for="password">Parol:</label>
          <input
              type="password"
              id="password"
              v-model="password"
              class="form-control"
              :class="{ 'invalid': passwordError }"
              @blur="validatePassword"
              required
          />
          <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
        </div>

        <button type="submit" class="btn">Signup</button>
      </form>
      <p class="login-link">
        Sizda akaunt bormi? <router-link to="/login">Tizimga kirish</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';

export default {
  name: 'SignupForm',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      usernameError: '',
      emailError: '',
      passwordError: '',
    };
  },
  methods: {
    validateUsername() {
      this.usernameError = this.username.trim() === '' ? 'Username ni kiritish kerak' : '';
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailPattern.test(this.email) ? 'bu elektron pochta emas' : '';
    },
    validatePassword() {
      this.passwordError = this.password.length < 8 ? 'Parol 8 bergidan kam bo`lmasligi kerak' : '';
    },
    async signup() {
      this.validateUsername();
      this.validateEmail();
      this.validatePassword();

      if (this.usernameError || this.emailError || this.passwordError) {
        return; // Stop submission if there are validation errors
      }

      const toast = useToast();
      try {
        const response = await fetch('https://sirdaryoapi.pythonanywhere.com/api/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
          }),
        });

        if (response.ok) {
          toast.success('Signup successful!');
          this.$router.push('/login');
        } else {
          const data = await response.json();
          toast.error(`Signup failed: ${data.message}`);
        }
      } catch (error) {
        toast.error('An error occurred during signup.');
      }
    },
  },
};
</script>

<style scoped>
.signup-container {
  width: 400px;
  margin: 50px auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 700;
}

.signup-form {
  width: 100%;
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #008000; /* To'q yashil chegara */
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 1rem;
  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.form-control:focus {
  border-color: #0056b3;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}

.form-control.invalid {
  border-color: #dc3545; /* Red border for invalid input */
  animation: shake 0.5s; /* Vibrating effect */
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin: 0.5rem 0;
}

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(0); }
  75% { transform: translateX(5px); }
  100% { transform: translateX(0); }
}

.btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  color: #fff;
  background-color: #007bff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;
}

.btn:hover {
  background-color: #0056b3;
}

.login-link {
  margin-top: 1rem;
  text-align: center;
}

.login-link a {
  color: #007bff;
  text-decoration: none;
}

.auth-container {
  min-height: calc(90vh - 90px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
