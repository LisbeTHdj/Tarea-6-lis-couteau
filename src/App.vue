<template>
  <ion-app>
    <!-- Menú lateral -->
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>🔧 Menú</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item router-link="/home" router-direction="root">Inicio</ion-item>
          <ion-item router-link="/gender" router-direction="forward">Predictor de Género</ion-item>
          <ion-item router-link="/age" router-direction="forward">Predictor de Edad</ion-item>
          <ion-item router-link="/universities" router-direction="forward">Universidades</ion-item>
          <ion-item router-link="/weather" router-direction="forward">Clima RD</ion-item>
          <ion-item router-link="/pokemon" router-direction="forward">Pokédex</ion-item>
          <ion-item router-link="/news" router-direction="forward">Noticias</ion-item>
          <ion-item router-link="/about" router-direction="forward">Acerca de</ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <!-- Contenido principal -->
    <ion-page id="main-content">
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title>🔧 Couteau</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Couteau</ion-title>
          </ion-toolbar>
        </ion-header>

        <!-- Vista por defecto de inicio con descripción -->
        <div class="home-container">
          <ion-card>
            <img
              alt="Caja de herramientas"
              src="https://cdn-icons-png.flaticon.com/512/1665/1665731.png"
            />
            <ion-card-header>
              <ion-card-title>🔧 Caja de Herramientas Digital</ion-card-title>
              <ion-card-subtitle>Tu aplicación todo en uno</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <p>Bienvenido a Couteau, tu caja de herramientas digital que incluye:</p>
              <ion-list>
                <ion-item router-link="/gender">
                  <ion-icon :icon="personOutline" slot="start" />
                  <ion-label>Predictor de Género</ion-label>
                </ion-item>
                <ion-item router-link="/age">
                  <ion-icon :icon="timeOutline" slot="start" />
                  <ion-label>Predictor de Edad</ion-label>
                </ion-item>
                <ion-item router-link="/universities">
                  <ion-icon :icon="schoolOutline" slot="start" />
                  <ion-label>Universidades</ion-label>
                </ion-item>
                <ion-item router-link="/weather">
                  <ion-icon :icon="cloudyOutline" slot="start" />
                  <ion-label>Clima RD</ion-label>
                </ion-item>
                <ion-item router-link="/pokemon">
                  <ion-icon :icon="gameControllerOutline" slot="start" />
                  <ion-label>Pokédex</ion-label>
                </ion-item>
                <ion-item router-link="/news">
                  <ion-icon :icon="newspaperOutline" slot="start" />
                  <ion-label>Noticias</ion-label>
                </ion-item>
              </ion-list>
            </ion-card-content>
          </ion-card>
        </div>
      </ion-content>
    </ion-page>

    <!-- Aquí se mostrarán las vistas de las rutas -->
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonRouterOutlet,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon,
  IonLabel,
} from '@ionic/vue';

import {
  personOutline,
  timeOutline,
  schoolOutline,
  cloudyOutline,
  gameControllerOutline,
  newspaperOutline,
} from 'ionicons/icons';
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