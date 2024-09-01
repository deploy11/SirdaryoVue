<template>
  <div class="auth-container">
    <div v-if="isLoading" class="loading-container">
      <img src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700" alt="Loading..." class="loading-image">
    </div>
    <div v-else class="login-container">
      <h1>Tizimga Kirish</h1>
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" :class="{'invalid': !isUsernameValid}" @blur="validateUsername" required class="form-control" />
          <span v-if="!isUsernameValid" class="error-text">Username is required</span>
        </div>

        <div class="form-group">
          <label for="password">Parol:</label>
          <input type="password" id="password" v-model="password" :class="{'invalid': !isPasswordValid}" @blur="validatePassword" required class="form-control" />
          <span v-if="!isPasswordValid" class="error-text">Password is required</span>
        </div>

        <button type="submit" class="btn" :disabled="!isFormValid">Kirish</button>
      </form>
      <p class="signup-link">
        Sizda akaunt yo`qmi? <router-link to="/signup">Akaunt yaratish</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import { jwtDecode } from 'jwt-decode';

export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      isLoading: false,
      isUsernameValid: true,
      isPasswordValid: true,
    };
  },
  computed: {
    isFormValid() {
      return this.isUsernameValid && this.isPasswordValid && this.username && this.password;
    }
  },
  methods: {
    validateUsername() {
      this.isUsernameValid = !!this.username;
    },
    validatePassword() {
      this.isPasswordValid = !!this.password;
    },
    async login() {
      const toast = useToast();
      this.isLoading = true;
      try {
        const response = await fetch('https://sirdaryoapi.pythonanywhere.com/api11/token/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }

        const data = await response.json();

        if (response.status === 200 || response.status === 201) {
          const decodedToken = jwtDecode(data.access);
          localStorage.setItem('accessToken', data.access);
          localStorage.setItem('refreshToken', data.refresh);
          localStorage.setItem('email', decodedToken.email);

          toast.success('Login successful!', {
            timeout: 5000,
          });

          // Redirect to /murojatlar
          this.$router.push('/murojatlar');
        } else if (response.status === 401 || response.status === 404) {
          toast.error('Invalid username or password.', {
            timeout: 5000,
          });
        } else {
          toast.error(`Login failed: ${data.message}`, {
            timeout: 5000,
          });
        }
      } catch (error) {
        toast.error(`An error occurred during login: ${error.message}`, {
          timeout: 5000,
        });
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>


<style scoped>
.auth-container {
  min-height: calc(90vh - 90px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.loading-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.loading-image {
  width: 500px;
  height: auto;
}

.login-container {
  width: 400px;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 700;
}

.login-form {
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
  border: 2px solid #008000;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 1rem;
  transition: border-color 0.3s ease-in-out;
}

.form-control:focus {
  border-color: #0056b3;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}

.form-control.invalid {
  border-color: #e74c3c;
  animation: shake 0.3s ease;
}

.error-text {
  color: #e74c3c;
  font-size: 0.875rem;
  position: absolute;
  bottom: -1.5rem;
  left: 0;
  width: 100%;
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

.signup-link {
  margin-top: 1rem;
  text-align: center;
}

.signup-link a {
  color: #007bff;
  text-decoration: none;
}

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(0); }
  75% { transform: translateX(5px); }
  100% { transform: translateX(0); }
}
</style>
