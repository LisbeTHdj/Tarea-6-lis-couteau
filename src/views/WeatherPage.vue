<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>🌤️ Clima RD</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="weather-container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Clima en República Dominicana</ion-card-title>
            <ion-card-subtitle>{{ currentDate }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-button expand="block" @click="getWeather" :disabled="loading">
              <ion-icon :icon="refreshOutline" slot="start"></ion-icon>
              {{ loading ? 'Actualizando...' : 'Actualizar Clima' }}
            </ion-button>
          </ion-card-content>
        </ion-card>

        <ion-card v-if="weather" class="weather-card">
          <ion-card-header>
            <ion-card-title>{{ weather.name }}</ion-card-title>
            <ion-card-subtitle>{{ weather.weather[0].description }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <div class="weather-info">
              <div class="temperature">
                <span class="temp-value">{{ Math.round(weather.main.temp) }}°C</span>
                <div class="weather-icon">
                  {{ getWeatherEmoji(weather.weather[0].main) }}
                </div>
              </div>
              <div class="weather-details">
                <ion-item>
                  <ion-label>
                    <h3>Sensación térmica</h3>
                    <p>{{ Math.round(weather.main.feels_like) }}°C</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <h3>Humedad</h3>
                    <p>{{ weather.main.humidity }}%</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <h3>Presión</h3>
                    <p>{{ weather.main.pressure }} hPa</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <h3>Viento</h3>
                    <p>{ weather.wind.speed } m/s</p>
                  </ion-label>
                </ion-item>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
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
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { refreshOutline } from 'ionicons/icons';

const loading = ref(false);
const weather = ref<any>(null);
const currentDate = ref(new Date().toLocaleDateString('es-DO'));

// Necesitarás obtener una API key gratuita de OpenWeatherMap
const API_KEY = 'TU_API_KEY_AQUI';

const getWeather = async () => {
  loading.value = true;
  try {
    // Coordenadas de Santo Domingo
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=18.4861&lon=-69.9312&appid=${API_KEY}&units=metric&lang=es`
    );
    weather.value = response.data;
  } catch (error) {
    console.error('Error getting weather:', error);
    // Datos de ejemplo si no tienes API key
    weather.value = {
      name: 'Santo Domingo',
      weather: [{ main: 'Sunny', description: 'soleado' }],
      main: {
        temp: 28,
        feels_like: 32,
        humidity: 65,
        pressure: 1013
      },
      wind: { speed: 3.5 }
    };
  } finally {
    loading.value = false;
  }
};

const getWeatherEmoji = (weather: string) => {
  const weatherEmojis: { [key: string]: string } = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Sunny': '☀️'
  };
  return weatherEmojis[weather] || '🌤️';
};

onMounted(() => {
  getWeather();
});
</script>

<style scoped>
.weather-container {
  padding: 20px;
}

.weather-card {
  --background: linear-gradient(135deg, #87CEEB 0%, #87CEFA 100%);
}

.weather-info {
  text-align: center;
}

.temperature {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.temp-value {
  font-size: 3rem;
  font-weight: bold;
  margin-right: 20px;
}

.weather-icon {
  font-size: 3rem;
}

.weather-details {
  margin-top: 20px;
}
</style>