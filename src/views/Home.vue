<template>
  <div>
    <!-- Hero Section -->
    <HeroSection />

    <!-- Carousel Section -->
    <CarouselSection />

    <!-- Stats Section -->
    <StatsSection />
  </div>
</template>

<script>
import HeroSection from '../components/HeroSection.vue';
import CarouselSection from '../components/CarouselSection.vue';
import StatsSection from '../components/StatsSection.vue';

export default {
  name: 'HomePage',
  components: {
    HeroSection,
    CarouselSection,
    StatsSection
  }
};
</script>

