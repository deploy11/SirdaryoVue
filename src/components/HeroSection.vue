<template>
  <section class="hero" ref="hero">
    <div class="hero-content" ref="heroContent">
      <img
          :src="require('@/assets/gerb.png')"
          alt="Sirdaryo Logo"
          class="logo"
          ref="logo"
      />
      <h1 class="title" ref="title">Sirdaryo Murojatlar Tizimiga xush kelibsiz</h1>
      <button
          class="cta-button"
          ref="ctaButton"
          @click="goToAddPage"
      >Murojat Yuborish</button>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { gsap } from 'gsap';

export default {
  name: 'HeroSection',
  setup() {
    const router = useRouter();
    const hero = ref(null);
    const heroContent = ref(null);
    const logo = ref(null);
    const title = ref(null);
    const ctaButton = ref(null);

    const goToAddPage = () => {
      router.push('/add');
    };

    onMounted(() => {

      gsap.fromTo(logo.value,
          { rotation: 0, opacity: 0 },
          { rotation: 360, opacity: 1, duration: 1.5, ease: 'elastic.out(1, 0.75)', delay: 1 }
      );

      gsap.fromTo(title.value,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.5, delay: 1.5 }
      );

      gsap.fromTo(ctaButton.value,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, delay: 1.2, ease: 'power2.out' }
      );
    });


    return {
      hero,
      heroContent,
      logo,
      title,
      ctaButton,
      goToAddPage,
    };
  },
};
</script>

<style scoped>
/* Hero Section Styles */
.hero {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://new-syrdarya.vercel.app/assets/tech3-DHr8x9l6.jpg') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  color: white;
  min-height: calc(90vh - 90px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 1rem; /* Add padding for better spacing */
  box-sizing: border-box;
}

.hero-content {
  max-width: 800px; /* Limit the width of content */
}

.logo {
  width: 250px; /* Adjusted size for better fit */
  height: auto; /* Maintain aspect ratio */
  margin-bottom: 1rem; /* Space below the logo */
}

.title {
  font-size: 2.5rem; /* Adjusted size for visibility */
  font-weight: 700;
  margin: 0.5rem 0; /* Spacing around the title */
}

.cta-button {
  background-color: #ff5a5f;
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 1.2rem;
  padding: 0.75rem 2rem;
  cursor: pointer;
  transition: 0.7s ;
}

.cta-button:hover {
  transform: translateY(-3px);
}
</style>
