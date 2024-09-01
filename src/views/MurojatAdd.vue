<template>
  <div v-if="isAuthenticated" class="form-container">
    <form @submit.prevent="submitForm" class="form">
      <h2>Ariza Formasi</h2>

      <!-- Yashash Manzili Select -->
      <div class="input-field">
        <label for="yashashmanzili">Yashash Manzili</label>
        <select v-model="selectedYashashmanzili" @change="filterMFY" id="yashashmanzili" name="yashashmanzili">
          <option v-for="item in yashashmanzililar" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>

      <!-- MFY Select -->
      <div class="input-field">
        <label for="mfynomi">MFY nomi</label>
        <select v-model="selectedMFY" id="mfynomi" name="mfynomi">
          <option v-for="mfy in filteredMFYs" :key="mfy" :value="mfy">{{ mfy }}</option>
        </select>
      </div>

      <!-- Ariza Turi Select -->
      <div class="input-field">
        <label for="ariza_turi">Ariza Turi</label>
        <select v-model="selectedArizaTuri" id="ariza_turi" name="ariza_turi">
          <option v-for="turi in arizaTurlari" :key="turi.code" :value="turi.code">
            {{ turi.labelLotin }} ({{ turi.labelKril }})
          </option>
        </select>
      </div>

      <!-- Form Inputs -->
      <div class="input-row">
        <div class="input-field">
          <label for="fish">F.I.Sh</label>
          <input v-model="fish" type="text" id="fish" class="form-input" placeholder="F.I.Sh" required />
        </div>

        <div class="input-field">
          <label for="idpass">ID Passport</label>
          <input v-model="idpass" type="text" id="idpass" class="form-input" placeholder="ID Passport" required />
        </div>
      </div>

      <div class="input-row">
        <div class="input-field">
          <label for="telefonraqam">Telefon raqam</label>
          <input v-model="telefonraqam" type="text" id="telefonraqam" class="form-input" placeholder="Telefon raqam" required />
        </div>
        <div class="input-field">
          <label for="kochanomi">Ko`cha Nomi</label>
          <input v-model="kochanomi" type="text" id="kochanomi" class="form-input" placeholder="Ko`cha Nomi" required />
        </div>
      </div>

      <div class="input-row">
        <div class="input-field">
          <label for="rasmvavidio">Rasm va video</label>
          <input v-model="rasmvavidio" type="text" id="rasmvavidio" class="form-input" placeholder="Rasm va video" required />
        </div>
        <div class="input-field">
          <label for="matn">Matn</label>
          <textarea v-model="matn" id="matn" class="form-textarea" placeholder="Matn" required></textarea>
        </div>
      </div>

      <button type="submit" class="submit-button">Yuborish</button>
    </form>
  </div>

  <div v-else class="loading-container">
    <img src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700" alt="Loading..." class="loading-image">
  </div>
</template>


<script>
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      yashashmanzililar: [],
      arizaTurlari: [
        { code: 'sud_mas', labelLotin: 'Sud masalalari', labelKril: 'Суд масалалари' },
        { code: 'ichki_ishlar', labelLotin: 'Ichki ishlar faoliyati', labelKril: 'Ички ишлар фаолияти' },
        { code: 'prokuratura', labelLotin: 'Prokuratura faoliyati', labelKril: 'Прокуратура фаолияти' },
        { code: 'aliment', labelLotin: 'Aliment masalasi', labelKril: 'Алимент масаласи' },
        { code: 'sud_ijrosi', labelLotin: 'Sud ijrosi', labelKril: 'Суд ижроси' },
        { code: 'sogliq', labelLotin: 'Sogʻliqni saqlash', labelKril: 'Соғлиқни сақлаш' },
        { code: 'pensiya', labelLotin: 'Pensiya va nafaqa', labelKril: 'Пенсия ва нафақа' },
        { code: 'maktab', labelLotin: 'Maktab taʼlimi', labelKril: 'Мактаб таълими' },
        { code: 'uy_joy', labelLotin: 'Uy-joy, yer bilan taʼm', labelKril: 'Ўй-жой, ер билан таъм' },
        { code: 'ish', labelLotin: 'Ish bilan taʼminlash', labelKril: 'Иш билан таъминлаш' },
        { code: 'afv', labelLotin: 'Afv etish masalasi', labelKril: 'Афв этиш масаласи' },
        { code: 'oliy_talim', labelLotin: 'Oliy taʼlim masalalari', labelKril: 'Олий таълим масалалари' },
        { code: 'kredit', labelLotin: 'Kredit olish', labelKril: 'Кредит олиш' },
        { code: 'bank', labelLotin: 'Bank-moliya masalalari', labelKril: 'Банк-молия масалалари' },
        { code: 'kommunal', labelLotin: 'Gaz, elektr, suv, issiqlik taʼminoti', labelKril: 'Газ, электр, сув, иссиқлик таъминоти' },
        { code: 'kommunal_to\'lov', labelLotin: 'Kommunal toʻlovlarni hisoblash', labelKril: 'Коммунал тўловларни ҳисоблаш' },
        { code: 'yol_qurilishi', labelLotin: 'Yoʻl qurilishi', labelKril: 'Йўл қурилиши' },
        { code: 'soliq', labelLotin: 'Soliq toʻlovlari', labelKril: 'Солиқ тўловлари' },
        { code: 'transport', labelLotin: 'Transport masalalari', labelKril: 'Транспорт масалалари' },
        { code: 'qurilish', labelLotin: 'Qurilish sohasidagi masalalar', labelKril: 'Қурилиш соҳасидаги масалалар' },
        { code: 'tadbirkorlik', labelLotin: 'Tadbirkorlik huquqlarini buzilishi', labelKril: 'Тадбиркорлик ҳуқуқларини бузилиши' },
        { code: 'sanat', labelLotin: 'Sanʼat, maʼrifat va madaniyat masalalari', labelKril: 'Санʼат, маърифат ва маданият масалалари' },
        { code: 'dori', labelLotin: 'Dori-darmon narx-navolari', labelKril: 'Дори-дармон нарх-наволари' },
        { code: 'birinchi_ehtiyoj', labelLotin: 'Birinchi ehtiyoj mollari narx-navolari', labelKril: 'Биринчи эҳтиёж моллари нарх-наволари' },
        { code: 'davlat_xizmati', labelLotin: 'Davlat xizmati faoliyati', labelKril: 'Давлат хизмати фаолияти' },
        { code: 'moddiy_yordam', labelLotin: 'Moddiy yordam olish', labelKril: 'Моддий ёрдам олиш' },
        { code: 'boshqa', labelLotin: 'Boshqa masalalar', labelKril: 'Бошқа масалалар' }
      ],
      selectedYashashmanzili: '',
      selectedMFY: '',
      selectedArizaTuri: '',
      fish: '',
      idpass: '',
      telefonraqam: '',
      kochanomi: '',
      rasmvavidio: '',
      matn: '',
      filteredMFYs: [],
      localMfy: {},
      isAuthenticated: false,
    };
  },
  async mounted() {
    try {
      this.isAuthenticated = !!localStorage.getItem('accessToken') && !!localStorage.getItem('email');
      if (!this.isAuthenticated) {
        const toast = useToast();
        toast.error('Siz tizimga kirganingizdan keyin bu sahifani ko\'rishingiz mumkin.');
        this.$router.push('/login');
        return;
      }

      const response = await fetch('https://sirdaryoapi.pythonanywhere.com/api/mfy/');
      if (!response.ok) throw new Error('Failed to fetch MFY data');
      const data = await response.json();
      this.yashashmanzililar = [...new Set(data.map(item => item.Yashashmazili))];
      this.localMfy = data.reduce((acc, item) => {
        acc[item.Yashashmazili] = acc[item.Yashashmazili] || [];
        acc[item.Yashashmazili].push(item.Mfy);
        return acc;
      }, {});
    } catch (error) {
      console.error('Error fetching MFY data:', error);
    }
  },
  methods: {
    filterMFY() {
      this.filteredMFYs = this.localMfy[this.selectedYashashmanzili] || [];
      this.selectedMFY = '';
    },
    async submitForm() {
      const toast = useToast();

      if (!localStorage.getItem('accessToken') || !localStorage.getItem('email')) {
        toast.error('Siz tizimga kirmagansiz!');
        this.$router.push('/login');
        return;
      }

      const arizaTuriKril = this.arizaTurlari.find(turi => turi.code === this.selectedArizaTuri)?.labelKril;

      try {
        const response = await fetch('https://sirdarya777.pythonanywhere.com/api/', {
          method: 'POST',
          body: JSON.stringify({
            fish: this.fish,
            idpassport: this.idpass,
            Yashashmanzili: this.selectedYashashmanzili,
            mfynomi: this.selectedMFY,
            kochanomi: this.kochanomi,
            telefonraqami: this.telefonraqam,
            rasmvavidio: this.rasmvavidio,
            ariza_mazmuni: arizaTuriKril,
            matn: this.matn,
            user: localStorage.getItem('email'),
          }),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });

        if (response.ok) {
          toast.success('Ariza muvaffaqiyatli yuborildi!');
          this.resetForm(); // Clear the form after successful submission
        } else {
          throw new Error('Ariza yuborishda xato yuz berdi.');
        }
      } catch (error) {
        toast.error('Tarmoq xatosi: ' + error.message);
      }
    },
    resetForm() {
      this.selectedYashashmanzili = '';
      this.selectedMFY = '';
      this.selectedArizaTuri = '';
      this.fish = '';
      this.idpass = '';
      this.telefonraqam = '';
      this.kochanomi = '';
      this.rasmvavidio = '';
      this.matn = '';
      this.filteredMFYs = [];
    }
  }
};
</script>


<style scoped>
/* Form Container */
.form-container {
  max-width: 700px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 15px;
  background-color: #ffffff;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #e3e3e3;
}

/* Form Heading */
.form h2 {
  font-size: 32px;
  margin-bottom: 25px;
  text-align: center;
  color: #333;
  font-family: 'Roboto', sans-serif;
  letter-spacing: 1.5px;
  font-weight: bold;
}

/* Input Fields */
.input-field {
  margin-bottom: 25px;
}

.input-field label {
  display: block;
  font-size: 18px;
  margin-bottom: 8px;
  color: #555;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
}

.input-field select,
.input-field input,
.input-field textarea {
  width: 100%;
  padding: 14px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input-field select:focus,
.input-field input:focus,
.input-field textarea:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Textarea */
.form-textarea {
  height: 150px;
  resize: vertical;
}

/* Submit Button */
.submit-button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(45deg, #007bff, #0056b3);
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  font-family: 'Roboto', sans-serif;
}

.submit-button:hover {
  background: linear-gradient(45deg, #0056b3, #003d7a);
  box-shadow: 0 8px 15px rgba(0, 123, 255, 0.3);
}

/* Responsive Design */
@media (max-width: 700px) {
  .form-container {
    padding: 20px;
  }

  .form h2 {
    font-size: 28px;
  }

  .input-field {
    margin-bottom: 20px;
  }

  .form-input,
  .form-textarea {
    font-size: 15px;
    padding: 12px;
  }

  .submit-button {
    padding: 13px;
    font-size: 18px;
  }
}

/* Desktop Row Display */
@media (min-width: 700px) {
  .input-field {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .input-field label {
    width: 25%;
    text-align: right;
    padding-right: 15px;
  }

  .input-field select,
  .input-field input,
  .input-field textarea {
    width: 70%;
  }
}

</style>
