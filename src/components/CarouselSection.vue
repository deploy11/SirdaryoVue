<template>
  <section id="carusel" class="carousel-container">
    <MySwiper
        class="mySwiper"
        pagination
        navigation
        autoplay
        loop
        @slideChange="onSlideChange"
    >
      <!-- Slaydlar -->
      <MySwiperSlide ref="slide1">
        <div class="carousel-content">
          <div class="carousel-text" ref="carouselText1">
            <h1>
              Sizning murojaatingiz tegishliligi bo'yicha quyidagi
              <span class="text-highlight">tashkilotlarning mas'ul ijrochilari</span>
              tomonidan nazoratga olinadi va ko'rib chiqiladi:
            </h1>
          </div>
          <div class="carousel-image">
            <img :src="require('@/assets/carusel1.svg')" alt="Rasm 1">
          </div>
        </div>
      </MySwiperSlide>
      <MySwiperSlide ref="slide2">
        <div class="carousel-content">
          <div class="carousel-text" ref="carouselText2">
            <h1>
              Tezroq murojatingizni yuboring va muammolaringizni hal qiling
            </h1>
            <button class="cta-button" @click="goToAddPage">Murojat Yuborish</button>
          </div>
          <div class="carousel-image">
            <img :src="require('@/assets/carusel2.png')" alt="Rasm 2">
          </div>
        </div>
      </MySwiperSlide>
    </MySwiper>
  </section>
</template>

<script>
import { useRouter } from 'vue-router'; // Vue Router'dan useRouter import qilamiz
import { Swiper as SwiperComponent, SwiperSlide as SwiperSlideComponent } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
  name: 'CarouselSection',
  components: {
    MySwiper: SwiperComponent,
    MySwiperSlide: SwiperSlideComponent
  },
  setup() {
    const router = useRouter(); // Vue Router'ni olish

    const goToAddPage = () => {
      router.push('/murojatlar'); // '/murojatlar' yo'nalishga o'tish
    };

    return {
      goToAddPage
    };
  }
};
</script>

<style scoped>
/* Carousel Styles */
.carousel-container {
  margin: 2rem auto;
  padding: 1rem;
  max-width: 1200px;
  position: relative;
  background-color: #f8f9fa; /* Light background for contrast */
}

.mySwiper {
  width: 100%;
  height: 600px;
  border-radius: 15px;
  overflow: hidden;
  background-color: #ffffff; /* White background for slides */
}

.carousel-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.carousel-text {
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  color: #333; /* Dark text color for readability */
}

.carousel-image img {
  max-width: 100%;
  height: auto;
  border-radius: 15px;
}

.cta-button {
  background-color: #007bff; /* Blue color for the button */
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 1.2rem;
  padding: 0.75rem 2rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.cta-button:hover {
  background-color: #0056b3; /* Darker blue for hover effect */
  transform: translateY(-2px); /* Slight lift on hover */
}

.text-highlight {
  color: #007bff; /* Blue color for highlighted text */
  font-weight: bold; /* Bold for emphasis */
}
</style>
