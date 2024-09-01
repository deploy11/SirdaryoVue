<template>
  <div class="stats-section" >
    <div class="header-top-star">Statistika</div>
    <div class="star-container">
      <div class="stat">
        <div class="stat-count" ref="count1">0</div>
        <div class="stat-label">Foydalanuvchilar</div>
      </div>
      <div class="stat">
        <div class="stat-count" ref="count2">0</div>
        <div class="stat-label">Murojaatlar</div>
      </div>
      <div class="stat">
        <div class="stat-count" ref="count3">0</div>
        <div class="stat-label">Bajarilgan</div>
      </div>
      <div class="stat">
        <div class="stat-count" ref="count4">0</div>
        <div class="stat-label">Bajarilmagan</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'StatsSection',
  setup() {
    const count1 = ref(null);
    const count2 = ref(null);
    const count3 = ref(null);
    const count4 = ref(null);
    const userCount = ref(0);
    const totalCount = ref(0);
    const korishTrueCount = ref(0);
    const korishFalseCount = ref(0);

    const animateStats = (element, endValue) => {
      gsap.to(element, {
        textContent: endValue,
        duration: 2,
        roundProps: 'textContent',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true
        }
      });
    };

    onMounted(async () => {
      try {
        const userResponse = await axios.get('https://sirdaryoapi.pythonanywhere.com/user-count/');
        if (userResponse.data && userResponse.data.user_count !== undefined) {
          userCount.value = userResponse.data.user_count;
        }

        const statsResponse = await axios.get('https://sirdarya777.pythonanywhere.com/api/sorov-statistics/');
        if (statsResponse.data) {
          totalCount.value = statsResponse.data.total_count;
          korishTrueCount.value = statsResponse.data.korish_true_count;
          korishFalseCount.value = statsResponse.data.korish_false_count;
        }
      } catch (error) {
        console.error('API ga murojaat qilishda xato:', error);
      }

      const stats = [
        { element: count1.value, value: userCount.value },
        { element: count2.value, value: totalCount.value },
        { element: count3.value, value: korishTrueCount.value },
        { element: count4.value, value: korishFalseCount.value }
      ];

      stats.forEach((stat) => {
        animateStats(stat.element, stat.value);
      });
    });

    return {
      count1,
      count2,
      count3,
      count4
    };
  }
};
</script>

<style scoped>
/* Stats Section Styles */
.stats-section {
  padding: 2rem;
  background-color: #f5f5f5;
  text-align: center;
  position: relative;
}

.header-top-star {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.star-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.stat {
  flex: 1;
  max-width: 200px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.stat-count {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
}

.stat-label {
  font-size: 1rem;
  color: #666;
}
</style>
