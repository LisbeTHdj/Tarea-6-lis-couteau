<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>⏰ Predictor de Edad</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="age-container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Predice la Edad</ion-card-title>
            <ion-card-subtitle>Ingresa un nombre para conocer la edad probable</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="floating">Nombre</ion-label>
              <ion-input v-model="name" @keyup.enter="predictAge"></ion-input>
            </ion-item>
            <ion-button expand="block" @click="predictAge" :disabled="loading">
              <ion-icon :icon="searchOutline" slot="start"></ion-icon>
              {{ loading ? 'Prediciendo...' : 'Predecir Edad' }}
            </ion-button>
          </ion-card-content>
        </ion-card>

        <ion-card v-if="result" :class="ageClass">
          <ion-card-header>
            <ion-card-title>{{ result.name }}</ion-card-title>
            <ion-card-subtitle>Edad estimada: {{ result.age }} años</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <div class="result-container">
              <div class="age-icon">
                {{ ageEmoji }}
              </div>
              <h3>{{ ageCategory }}</h3>
              <p>{{ ageDescription }}</p>
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

const ageCategory = computed(() => {
  if (!result.value) return '';
  const age = result.value.age;
  if (age < 18) return 'Joven';
  if (age < 65) return 'Adulto';
  return 'Anciano';
});

const ageEmoji = computed(() => {
  if (!result.value) return '';
  const age = result.value.age;
  if (age < 18) return '🧒';
  if (age < 65) return '👨‍💼';
  return '👴';
});

const ageDescription = computed(() => {
  if (!result.value) return '';
  const age = result.value.age;
  if (age < 18) return 'Persona joven, llena de energía y posibilidades';
  if (age < 65) return 'Persona adulta, en la plenitud de la vida';
  return 'Persona mayor, con mucha experiencia y sabiduría';
});

const ageClass = computed(() => {
  if (!result.value) return '';
  const age = result.value.age;
  if (age < 18) return 'young-card';
  if (age < 65) return 'adult-card';
  return 'senior-card';
});

const predictAge = async () => {
  if (!name.value.trim()) return;
  
  loading.value = true;
  try {
    const response = await axios.get(`https://api.agify.io/?name=${name.value}`);
    result.value = response.data;
  } catch (error) {
    console.error('Error predicting age:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.age-container {
  padding: 20px;
}

.result-container {
  text-align: center;
}

.age-icon {
  font-size: 4rem;
  margin: 20px 0;
}

.young-card {
  --background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
  border-left: 4px solid #4caf50;
}

.adult-card {
  --background: linear-gradient(135deg, #fff3e0 0%, #ffcc02 100%);
  border-left: 4px solid #ff9800;
}

.senior-card {
  --background: linear-gradient(135deg, #f3e5f5 0%, #ce93d8 100%);
  border-left: 4px solid #9c27b0;
}
</style>