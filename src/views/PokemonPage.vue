<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>🎮 Pokédex</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="pokemon-container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Buscar Pokémon</ion-card-title>
            <ion-card-subtitle>Ingresa el nombre de un Pokémon</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="floating">Nombre del Pokémon</ion-label>
              <ion-input v-model="pokemonName" @keyup.enter="searchPokemon" placeholder="ej: pikachu"></ion-input>
            </ion-item>
            <ion-button expand="block" @click="searchPokemon" :disabled="loading">
              <ion-icon :icon="searchOutline" slot="start"></ion-icon>
              {{ loading ? 'Buscando...' : 'Buscar Pokémon' }}
            </ion-button>
          </ion-card-content>
        </ion-card>

        <ion-card v-if="pokemon" class="pokemon-card">
          <ion-card-header>
            <ion-card-title>{{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}</ion-card-title>
            <ion-card-subtitle>#{{ pokemon.id }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <div class="pokemon-info">
              <div class="pokemon-image">
                <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
              </div>
              
              <div class="pokemon-stats">
                <ion-item>
                  <ion-label>
                    <h3>Experiencia Base</h3>
                    <p>{{ pokemon.base_experience }} XP</p>
                  </ion-label>
                </ion-item>
                
                <ion-item>
                  <ion-label>
                    <h3>Altura</h3>
                    <p>{{ pokemon.height / 10 }} m</p>
                  </ion-label>
                </ion-item>
                
                <ion-item>
                  <ion-label>
                    <h3>Peso</h3>
                    <p>{{ pokemon.weight / 10 }} kg</p>
                  </ion-label>
                </ion-item>
              </div>

              <div class="pokemon-abilities">
                <h3>Habilidades:</h3>
                <ion-chip v-for="ability in pokemon.abilities" :key="ability.ability.name">
                  {{ ability.ability.name }}
                </ion-chip>
              </div>

              <div class="pokemon-types">
                <h3>Tipos:</h3>
                <ion-chip v-for="type in pokemon.types" :key="type.type.name" :color="getTypeColor(type.type.name)">
                  {{ type.type.name }}
                </ion-chip>
              </div>

              <ion-button expand="block" @click="playCry" :disabled="!pokemon.cries">
                <ion-icon :icon="volumeHighOutline" slot="start"></ion-icon>
                Escuchar Sonido
              </ion-button>
            </div>
          </ion-card-content>
        </ion-card>

        <ion-card v-if="error" color="danger">
          <ion-card-content>
            <p>{{ error }}</p>
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
  IonChip,
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
import { searchOutline, volumeHighOutline } from 'ionicons/icons';

const pokemonName = ref('pikachu');
const loading = ref(false);
const pokemon = ref<any>(null);
const error = ref('');

const searchPokemon = async () => {
  if (!pokemonName.value.trim()) return;
  
  loading.value = true;
  error.value = '';
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.value.toLowerCase()}`);
    pokemon.value = response.data;
  } catch (err) {
    error.value = 'Pokémon no encontrado. Verifica el nombre e intenta nuevamente.';
    pokemon.value = null;
  } finally {
    loading.value = false;
  }
};

const getTypeColor = (type: string) => {
  const typeColors: { [key: string]: string } = {
    fire: 'danger',
    water: 'primary',
    grass: 'success',
    electric: 'warning',
    psychic: 'secondary',
    ice: 'light',
    dragon: 'dark',
    dark: 'dark',
    fairy: 'tertiary',
    fighting: 'danger',
    poison: 'secondary',
    ground: 'warning',
    flying: 'medium',
    bug: 'success',
    rock: 'medium',
    ghost: 'dark',
    steel: 'medium',
    normal: 'light'
  };
  return typeColors[type] || 'medium';
};

const playCry = () => {
  if (pokemon.value?.cries?.latest) {
    const audio = new Audio(pokemon.value.cries.latest);
    audio.play();
  }
};
</script>

<style scoped>
.pokemon-container {
  padding: 20px;
}

.pokemon-card {
  --background: linear-gradient(135deg, #fff9c4 0%, #f4f4f4 100%);
}

.pokemon-info {
  text-align: center;
}

.pokemon-image img {
  width: 200px;
  height: 200px;
  object-fit: contain;
}

.pokemon-stats {
  margin: 20px 0;
}

.pokemon-abilities, .pokemon-types {
  margin: 20px 0;
}

.pokemon-abilities h3, .pokemon-types h3 {
  margin-bottom: 10px;
}
</style>