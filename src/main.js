import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'animate.css'; // If you need animation

// Import Toast and CSS directly (no need for dynamic import here)
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// Import Swiper components
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

// Create Vue app instance
const app = createApp(App);

// Use plugins
app.use(router);
app.use(ElementPlus);
app.use(Toast, {
    position: POSITION.TOP_RIGHT, // Toast notifications position
    timeout: 3000, // Toast notifications duration
});

// Register global Swiper components
app.component('MySwiper', Swiper);
app.component('MySwiperSlide', SwiperSlide);

// Mount the app
app.mount('#app');
