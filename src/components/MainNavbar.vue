<template>
  <header class="navbar">
    <div class="navbar-container">
      <img :src="require('@/assets/logo.png')" alt="Logo" class="logo" @click="goto"/>
      <nav class="nav-menu">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/murojatlar">Murojatlar</router-link></li>
          <li v-if="!isAuthenticated"><router-link to="/login">Login</router-link></li>
          <li v-if="!isAuthenticated"><router-link to="/signup">Signup</router-link></li>
          <li v-if="isAuthenticated" @click="logout">
            <span>Logout</span>
          </li>
        </ul>
      </nav>
      <div class="hamburger" :class="{ active: isMenuOpen }" @click="toggleMenu">
        <div class="bar bar1"></div>
        <div class="bar bar2"></div>
        <div class="bar bar3"></div>
      </div>
    </div>
  </header>

  <nav class="mobile-menu" :class="{ active: isMenuOpen }">
    <ul>
      <li><router-link to="/" @click="toggleMenu">Home</router-link></li>
      <li><router-link to="/murojatlar" @click="toggleMenu">Murojatlar</router-link></li>
      <li v-if="!isAuthenticated"><router-link to="/login" @click="toggleMenu">Login</router-link></li>
      <li v-if="!isAuthenticated"><router-link to="/signup" @click="toggleMenu">Signup</router-link></li>
      <li v-if="isAuthenticated" @click="logout">
        <span>Logout</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import '../styles/Navbar.css'
export default {
  name: 'MainNavbar',
  setup() {
    const isMenuOpen = ref(false);
    const isAuthenticated = ref(!!localStorage.getItem('accessToken'));
    const router = useRouter();

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };
    const goto = () =>{
      router.push('/');
    }

    const logout = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('email');
      isAuthenticated.value = false;
      router.push('/login');
    };

    // Update authentication status on route change
    onMounted(() => {
      router.beforeEach((to, from, next) => {
        // Check authentication status
        isAuthenticated.value = !!localStorage.getItem('accessToken');
        next();
      });
    });

    return {
      isMenuOpen,
      isAuthenticated,
      toggleMenu,
      logout,
      goto,
    };
  },
};
</script>

<style>
/* Add your styles here */
</style>


