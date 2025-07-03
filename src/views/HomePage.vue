<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>🔧 Couteau - Tu caja de herramientas digital</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="home-container">
        <!-- Imagen de la caja de herramientas -->
        <ion-card>
          <img
            src="data:image/png;base64,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"
            alt="Caja de herramientas"
          />
          <ion-card-header>
            <ion-card-title>Bienvenido a Couteau</ion-card-title>
            <ion-card-subtitle>Aplicación todo en uno</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <p>Accede a nuestras herramientas digitales:</p>
            <ion-list>
              <ion-item router-link="/gender">
                <ion-label>🔹 Predictor de Género</ion-label>
              </ion-item>
              <ion-item router-link="/age">
                <ion-label>🧓 Predictor de Edad</ion-label>
              </ion-item>
              <ion-item router-link="/universities">
                <ion-label>🎓 Universidades por país</ion-label>
              </ion-item>
              <ion-item router-link="/weather">
                <ion-label>☁️ Clima en República Dominicana</ion-label>
              </ion-item>
              <ion-item router-link="/pokemon">
                <ion-label>⚡ Información Pokémon</ion-label>
              </ion-item>
              <ion-item router-link="/news">
                <ion-label>📰 Noticias desde WordPress</ion-label>
              </ion-item>
              <ion-item router-link="/about">
                <ion-label>🙋 Acerca de mí / Contrátame</ion-label>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/vue';
</script>

<style scoped>
.home-container {
  padding: 20px;
}

ion-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
