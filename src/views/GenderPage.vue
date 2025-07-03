<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>👤 Predictor de Género</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="gender-container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Predice el Género</ion-card-title>
            <ion-card-subtitle>Ingresa un nombre para conocer el género probable</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="floating">Nombre</ion-label>
              <ion-input v-model="name" @keyup.enter="predictGender"></ion-input>
            </ion-item>
            <ion-button expand="block" @click="predictGender" :disabled="loading">
              <ion-icon :icon="searchOutline" slot="start"></ion-icon>
              {{ loading ? 'Prediciendo...' : 'Predecir Género' }}
            </ion-button>
          </ion-card-content>
        </ion-card>

        <ion-card v-if="result" :class="genderClass">
          <ion-card-header>
            <ion-card-title>{{ result.name }}</ion-card-title>
            <ion-card-subtitle>Género: {{ result.gender === 'male' ? 'Masculino' : 'Femenino' }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <div class="result-container">
              <div class="gender-icon">
                {{ result.gender === 'male' ? '👨' : '👩' }}
              </div>
              <p>Probabilidad: {{ Math.round(result.probability * 100) }}%</p>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';
import {
  IonButtons,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { searchOutline } from 'ionicons/icons';

const name = ref('');
const loading = ref(false);
const result = ref<any>(null);

const genderClass = computed(() => {
  if (!result.value) return '';
  return result.value.gender === 'male' ? 'male-card' : 'female-card';
});

const predictGender = async () => {
  if (!name.value.trim()) return;
  
  loading.value = true;
  try {
    const response = await axios.get(`https://api.genderize.io/?name=${name.value}`);
    result.value = response.data;
  } catch (error) {
    console.error('Error predicting gender:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.gender-container {
  padding: 20px;
}

.result-container {
  text-align: center;
}

.gender-icon {
  font-size: 4rem;
  margin: 20px 0;
}

.male-card {
  --background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-left: 4px solid #2196f3;
}

.female-card {
  --background: linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%);
  border-left: 4px solid #e91e63;
}
</style>