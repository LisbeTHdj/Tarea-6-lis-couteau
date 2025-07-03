<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>🎓 Universidades</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="universities-container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Buscar Universidades</ion-card-title>
            <ion-card-subtitle>Ingresa el nombre de un país en inglés</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="floating">País (en inglés)</ion-label>
              <ion-input v-model="country" @keyup.enter="searchUniversities" placeholder="ej: Dominican Republic"></ion-input>
            </ion-item>
            <ion-button expand="block" @click="searchUniversities" :disabled="loading">
              <ion-icon :icon="searchOutline" slot="start"></ion-icon>
              {{ loading ? 'Buscando...' : 'Buscar Universidades' }}
            </ion-button>
          </ion-card-content>
        </ion-card>

        <ion-card v-for="university in universities" :key="university.name">
          <ion-card-header>
            <ion-card-title>{{ university.name }}</ion-card-title>
            <ion-card-subtitle>{{ university.country }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label>
                <h3>Dominio:</h3>
                <p>{{ university.domains.join(', ') }}</p>
              </ion-label>
            </ion-item>
            <ion-button fill="outline" @click="openWebsite(university.web_pages[0])">
              <ion-icon :icon="globeOutline" slot="start"></ion-icon>
              Visitar Sitio Web
            </ion-button>
          </ion-card-content>
        </ion-card>

        <ion-card v-if="universities.length === 0 && searched && !loading">
          <ion-card-content>
            <p>No se encontraron universidades para "{{ country }}"</p>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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
import { searchOutline, globeOutline } from 'ionicons/icons';

const country = ref('Dominican Republic');
const loading = ref(false);
const universities = ref<any[]>([]);
const searched = ref(false);

const searchUniversities = async () => {
  if (!country.value.trim()) return;
  
  loading.value = true;
  searched.value = true;
  try {
    const response = await axios.get(`http://universities.hipolabs.com/search?country=${country.value}`);
    universities.value = response.data;
  } catch (error) {
    console.error('Error searching universities:', error);
    universities.value = [];
  } finally {
    loading.value = false;
  }
};

const openWebsite = (url: string) => {
  window.open(url, '_blank');
};
</script>

<style scoped>
.universities-container {
  padding: 20px;
}
</style>