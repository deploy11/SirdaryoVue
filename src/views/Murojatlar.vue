<template>
  <div class="container">
    <div class="header">
      <h1>Murojatlar</h1>
      <button class="cta-button" @click="goToAddPage">Murojat Yuborish</button>
    </div>
    <div v-if="isLoading" class="loading-container">
      <img
          src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700"
          alt="Loading..."
          class="loading-image"
          loading="lazy"
      />
    </div>
    <div v-else>
      <template v-if="murojatlar.length === 0">
        <div class="no-requests">
          <div class="no-requests-content">
            <img
                :src="require('@/assets/nodata.jpg')"
                alt="No Requests"
                class="no-requests-image"
                loading="lazy"
            />
            <div class="no-requests-text">Sizda Murojatlar Yo'q</div>
          </div>
          <button class="cta-button" @click="goToAddPage">Murojat Yuborish</button>
        </div>
      </template>
      <template v-else>
        <table class="styled-table">
          <thead>
          <tr>
            <th>#</th>
            <th>Ism Familiya Sharif</th>
            <th>Id Passpord</th>
            <th>Yashash Manzili</th>
            <th>MFY Nomi</th>
            <th>Ko`cha Nomi</th>
            <th>Tel Raqam</th>
            <th>Rasm yoki Video</th>
            <th>Ariza Tur</th>
            <th>Status</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(ariza, index) in murojatlar" :key="ariza.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ ariza.fish }}</td>
            <td>{{ ariza.idpassport }}</td>
            <td>{{ ariza.Yashashmanzili }}</td>
            <td>{{ ariza.mfynomi }}</td>
            <td>{{ ariza.kochanomi }}</td>
            <td>{{ ariza.telefonraqami }}</td>
            <td>{{ ariza.rasmvavidio }}</td>
            <td>{{ ariza.ariza_mazmuni }}</td>
            <td>{{ ariza.korish ? 'Ko`rib chiqildi' : 'Ko`rib chiqilmadi' }}</td>
          </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';

export default {
  name: 'MurojatlarPage',
  data() {
    return {
      murojatlar: [],
      email: null,
      isLoading: true,
    };
  },
  async created() {
    this.email = localStorage.getItem('email');
    const accessToken = localStorage.getItem('accessToken');
    const toast = useToast();

    if (!this.email || !accessToken) {
      toast.error('Siz tizimga kirmagansiz!');
      this.$router.push('/login');
      return;
    }

    try {
      const response = await fetch(`https://sirdarya777.pythonanywhere.com/api/?user=${encodeURIComponent(this.email)}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Xato: ${response.status} - ${errorText}`);
      }

      this.murojatlar = await response.json();
    } catch (error) {
      console.error('Xatolik:', error);
      this.$router.push('/error');
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    goToAddPage() {
      this.$router.push('/add');
    },
  },
};
</script>



<style scoped>
.container {
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 90vh;
}

.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 20px;
  border-radius: 10px;
  background: linear-gradient(145deg, #ffffff, #f2f2f2);
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1), -5px -5px 15px rgba(255, 255, 255, 0.7);
}

.header h1 {
  margin: 0;
  font-size: 2rem;
  color: #007a6b;
  font-weight: bold;
}

.cta-button {
  background-color: #ff5a5f;
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 1.2rem;
  padding: 0.75rem 2rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.cta-button:hover {
  background-color: #e14d5a;
  transform: translateY(-3px);
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px; /* Katta loading rasm o'lchami */
  margin-bottom: 20px; /* Footerga qapishib qolmaslik uchun margin */
}

.loading-image {
  width: 500px; /* Yuklanish rasm kengligi */
  height: auto;
}

.no-requests {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 700px; /* Bo'sh holatda katta maydon */
  text-align: center;
}

.no-requests-content {
  position: relative;
}

.no-requests-image {
  width: 300px; /* Rasm kengligi */
  height: auto;
  border-radius: 10px;
  animation: bounce 2s infinite;
}

.no-requests-text {
  font-size: 1.5rem;
  color: #007a6b;
  margin: 20px 0;
  animation: fadeInUp 2s ease-in-out;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.styled-table thead {
  background-color: #009879;
  color: #fff;
}

.styled-table th, .styled-table td {
  padding: 12px 15px;
  text-align: left;
}

.styled-table tbody tr {
  border-bottom: 1px solid #ddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

.styled-table th {
  background-color: #007a6b;
  color: #fff;
}

@media (max-width: 768px) {
  .container {
    width: 100%;
    padding: 10px;
  }

  .header {
    flex-direction: column;
  }

  .cta-button {
    margin-top: 10px;
  }

  .styled-table {
    border: 0;
  }

  .styled-table thead {
    display: none;
  }

  .styled-table tbody, .styled-table tr, .styled-table td {
    display: block;
    width: 100%;
  }

  .styled-table tr {
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    background-color: #fff;
  }

  .styled-table td {
    position: relative;
    border-bottom: 1px solid #ddd;
  }

  .styled-table td::before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    font-weight: bold;
    text-align: left;
  }
}
</style>


