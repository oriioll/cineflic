<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue';
import { getMovieById } from '@/services/tmdb';
import type { DetailedMovie } from '@/types/tmbdTypes';
const route = useRoute()
const movieId = route.params.id
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w200'
const BACKDROP_URL = 'https://image.tmdb.org/t/p/w1280'
const movie = ref<DetailedMovie | null>(null)
onMounted(async () => {
    try {
        const data = await getMovieById(Number(movieId))
        movie.value = data
    } catch (e) {
        console.log(e)
        movie.value!!.title = 'No se puede cargar la pelicula '
    }
})


</script>

<template>
    <Navbar />
    <main v-if="movie"
        :style="{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, #0a0a0a 80%), url(${BACKDROP_URL + movie.backdrop_path})` }">
        <h1>{{ movie.title }}</h1>
        <p>{{ movie.overview }}</p>
    </main>
    <main v-else>
        <h1>Pelicula no disponible</h1>
    </main>
</template>

<style scoped>
main {
    background-image: linear-gradient(to bottom, transparent, var(--bg)),
        url('...');
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
}
</style>
