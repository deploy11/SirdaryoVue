import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'animate.css'; // If you need animation

// Dynamic imports for Swiper and Toast
const SwiperComponent = () => import('swiper/vue').then(module => module.Swiper);
const SwiperSlideComponent = () => import('swiper/vue').then(module => module.SwiperSlide);
const Toast = () => import('vue-toastification').then(module => module.default);

// Import CSS for Swiper and Toast dynamically
import('swiper/swiper-bundle.css');
import('vue-toastification/dist/index.css');

// Import POSITION from vue-toastification
import { POSITION } from 'vue-toastification';

const app = createApp(App);

// Use plugins dynamically
app.use(router);
app.use(ElementPlus);
app.use(Toast, {
    position: POSITION.TOP_RIGHT, // Toast notifications position
    timeout: 3000, // Toast notifications duration
});

// Register global Swiper components with dynamic imports
app.component('MySwiper', SwiperComponent);
app.component('MySwiperSlide', SwiperSlideComponent);

app.mount('#app');
