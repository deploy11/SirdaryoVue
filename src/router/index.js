import { createRouter, createWebHistory } from 'vue-router'; // Vue 3 uchun
import HomePage from '../views/Home.vue';
import LoginPage from '../views/Login.vue';
import SignupPage from '../views/Signup.vue';
import MurojatlarPage from '../views/Murojatlar.vue';
import MurojatAdd from '../views/MurojatAdd.vue'; // Yangi import


const routes = [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/signup', component: SignupPage },
    { path: '/murojatlar', component: MurojatlarPage },
    { path: '/add', component: MurojatAdd } // Yangi marshrut
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
