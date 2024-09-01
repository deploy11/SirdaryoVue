<template>
  <div id="app">
    <MainNavbar/>
    <router-view></router-view>
    <!-- Include Footer -->
    <Footer />
  </div>
</template>

<script>

import Footer from './components/Footer.vue';
import MainNavbar from "@/components/MainNavbar.vue";


export default {
  name: 'App',
  components: {
    Footer,
    MainNavbar
  },
};
</script>


<style>
/* General Styles */
body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
}
</style>
