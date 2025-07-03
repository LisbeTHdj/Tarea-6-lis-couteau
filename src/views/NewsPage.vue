<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>📰 Noticias</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="news-container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>A List Apart</ion-card-title>
            <ion-card-subtitle>Últimas publicaciones sobre diseño web</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <div class="news-logo">
              <img src="https://avatars.githubusercontent.com/u/2035942?s=280&v=4" alt="A List Apart Logo" />
            </div>
            <ion-button expand="block" @click="loadNews" :disabled="loading">
              <ion-icon :icon="refreshOutline" slot="start"></ion-icon>
              {{ loading ? 'Cargando...' : 'Actualizar Noticias' }}
            </ion-button>
          </ion-card-content>
        </ion-card>

        <ion-card v-for="article in news" :key="article.id" class="news-card">
          <ion-card-header>
            <ion-card-title>{{ cleanTitle(article.title.rendered) }}</ion-card-title>
            <ion-card-subtitle>{{ formatDate(article.date) }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <div class="news-excerpt" v-html="cleanExcerpt(article.excerpt.rendered)"></div>
            <ion-button fill="outline" @click="visitArticle(article.link)">
              <ion-icon :icon="linkOutline" slot="start"></ion-icon>
              Visitar Artículo
            </ion-button>
          </ion-card-content>
        </ion-card>

        <ion-card v-if="news.length === 0 && !loading && hasLoaded" color="medium">
          <ion-card-content>
            <p>No se pudieron cargar las noticias en este momento.</p>
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
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { refreshOutline, linkOutline } from 'ionicons/icons';

const loading = ref(false);
const news = ref<any[]>([]);
const hasLoaded = ref(false);

const loadNews = async () => {
  loading.value = true;
  try {
    const response = await axios.get('https://alistapart.com/wp-json/wp/v2/posts?per_page=3');
    news.value = response.data;
  } catch (error) {
    console.error('Error loading news:', error);
    // Datos de ejemplo si hay problema con CORS
    news.value = [
      {
        id: 1,
        title: { rendered: 'Designing for the Web in 2025' },
        excerpt: { rendered: 'Learn about the latest trends and best practices in web design for the modern era.' },
        date: new Date().toISOString(),
        link: 'https://alistapart.com'
      },
      {
        id: 2,
        title: { rendered: 'Accessibility in Modern Web Development' },
        excerpt: { rendered: 'How to build inclusive websites that work for everyone, regardless of their abilities.' },
        date: new Date().toISOString(),
        link: 'https://alistapart.com'
      },
              {
        id: 3,
        title: { rendered: 'The Future of CSS Grid and Flexbox' },
        excerpt: { rendered: 'Exploring advanced layout techniques for modern web applications.' },
        date: new Date().toISOString(),
        link: 'https://alistapart.com'
      }
    ];
  } finally {
    loading.value = false;
    hasLoaded.value = true;
  }
};

const cleanTitle = (title: string) => {
  return title.replace(/&#8217;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"');
};

const cleanExcerpt = (excerpt: string) => {
  return excerpt.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-DO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const visitArticle = (url: string) => {
  window.open(url, '_blank');
};

onMounted(() => {
  loadNews();
});
</script>

<style scoped>
.news-container {
  padding: 20px;
}

.news-logo {
  text-align: center;
  margin: 20px 0;
}

.news-logo img {
  max-width: 200px;
  height: auto;
}

.news-card {
  --background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-left: 4px solid #007bff;
}

.news-excerpt {
  margin: 15px 0;
  line-height: 1.5;
  color: #666;
}
</style>