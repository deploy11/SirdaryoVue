<template>
  <section id="section1" class="section-container">
    <div class="container">
      <div class="section-content">
        <div class="section-text">
          <h1>
            Sizning murojaatingiz tegishliligi bo'yicha quyidagi
            <span class="text-brandPrimary">tashkilotlarning mas'ul ijrochilari</span>
            tomonidan nazoratga olinadi va ko'rib chiqiladi:
          </h1>
        </div>
        <div class="section-image">
          <img src="https://new-syrdarya.vercel.app/assets/humans-BGbthBKT.svg" alt="Rasm 1">
        </div>
      </div>
    </div>
  </section>
  
  <section id="section2" class="section-container">
    <div class="container">
      <div class="section-content">
        <div class="section-image">
          <img src="https://new-syrdarya.vercel.app/assets/humans1-DQ3yax_T.png" alt="Rasm 2">
        </div>
        <div class="section-text">
          <h1>
            Tezroq murojatingizni yuboring va muammolaringizni hal qiling
          </h1>
          <button class="cta-button" @click="goToAddPage">Murojat Yuborish</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useRouter } from 'vue-router'; // Vue Router'dan useRouter import qilamiz

export default {
  name: 'CarouselSection',
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
.container {
  max-width: 1200px; /* Maksimal kenglik */
  margin: 0 auto; /* Markazlashtirish */
  padding: 0 1rem; /* Qo'shimcha bo'shliq */
}

.section-container {
  padding: 2rem;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
}

.section-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

.section-text {
  max-width: 600px;
  margin: 0 auto;
}

.section-image {
  max-width: 100%;
  margin: 0 auto;
}

.section-image img {
  width: 100%;
  max-width: 500px; /* Desktopda rasmni kengligini cheklash */
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.text-brandPrimary {
  color: #007bff; /* O'zingizga kerakli rang bilan almashtiring */
}

.cta-button {
  background-color: #007bff; /* O'zingizga kerakli rang bilan almashtiring */
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #0056b3; /* O'zingizga kerakli rang bilan almashtiring */
}

/* Responsive dizayn */
@media (min-width: 768px) {
  .section-content {
    flex-direction: row;
  }

  .section-text, .section-image {
    flex: 1;
  }

  .section-text {
    padding-right: 1rem;
  }

  .section-image {
    padding-left: 1rem;
  }
}

@media (max-width: 767px) {
  .section-content {
    flex-direction: column;
  }
}
</style>
