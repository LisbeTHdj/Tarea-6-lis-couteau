<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>👤 Acerca de</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="about-container">
        <ion-card class="profile-card">
          <ion-card-content>
            <div class="profile-header">
              <div class="profile-image">
                <img src="@/assets/FotoLisbeth.jpg" alt="Tu Foto" width="150" height="150" />
              </div>
              <div class="profile-info">
                <h1>Lisbeth De Jesus Geronimo</h1>
                <p>Desarrolladora de Aplicaciones Móviles</p>
                <p>Estudiante del Instituto Tecnologico de las Americas - ITLA</p>
                <ion-chip color="primary">
                  <ion-label>Matrícula: 20230287</ion-label>
                </ion-chip>
              </div>
            </div>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-header>
            <ion-card-title>📱 Sobre esta App</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>
              <strong>Couteau</strong> es una aplicación desarrollada como proyecto académico que integra múltiples APIs
              para ofrecer una experiencia completa de herramientas útiles.
            </p>
            <p>
              Esta aplicación fue desarrollada utilizando <strong>Ionic Framework</strong> con <strong>Vue.js</strong> 
              y <strong>TypeScript</strong>, demostrando habilidades en desarrollo móvil multiplataforma.
            </p>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-header>
            <ion-card-title>🛠️ Tecnologías Utilizadas</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="tech-grid">
              <ion-chip color="primary">
                <ion-label>Ionic Framework</ion-label>
              </ion-chip>
              <ion-chip color="success">
                <ion-label>Vue.js 3</ion-label>
              </ion-chip>
              <ion-chip color="warning">
                <ion-label>TypeScript</ion-label>
              </ion-chip>
              <ion-chip color="secondary">
                <ion-label>Axios</ion-label>
              </ion-chip>
              <ion-chip color="tertiary">
                <ion-label>REST APIs</ion-label>
              </ion-chip>
              <ion-chip color="medium">
                <ion-label>Responsive Design</ion-label>
              </ion-chip>
            </div>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-header>
            <ion-card-title>📧 Contacto</ion-card-title>
            <ion-card-subtitle>¡Disponible para oportunidades laborales!</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item href="mailto:tu-email@ejemplo.com">
                <ion-icon :icon="mailOutline" slot="start"></ion-icon>
                <ion-label>20230287@itla.edu.do</ion-label>
              </ion-item>
          
              <ion-item href="http://linkedin.com/in/lisbeth-de-jesus-8837b7350" target="_blank">
                <ion-icon :icon="logoLinkedin" slot="start"></ion-icon>
                <ion-label>LinkedIn</ion-label>
              </ion-item>
              <ion-item href="https://github.com/LisbeTHdj" target="_blank">
                <ion-icon :icon="logoGithub" slot="start"></ion-icon>
                <ion-label>GitHub</ion-label>
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
  IonButtons,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { 
  mailOutline, 
  callOutline, 
  logoLinkedin, 
  logoGithub,
  codeSlashOutline,
  downloadOutline
} from 'ionicons/icons';
</script>

<style scoped>
.about-container {
  padding: 20px;
}

.profile-card {
  --background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.profile-image img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
}

.profile-info h1 {
  margin: 0 0 10px 0;
  font-size: 1.8rem;
}

.profile-info p {
  margin: 5px 0;
  opacity: 0.9;
}

.tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 600px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
}
</style>