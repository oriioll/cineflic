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
let normalizedDate = ref('')
onMounted(async () => {
    try {
        //getting movie
        const data = await getMovieById(Number(movieId))
        movie.value = data
        normalizedDate.value = movie.value?.release_date?.slice(0, 7) ?? ''
    } catch (e) {
        console.log(e)
        movie.value!!.title = 'No se puede cargar la pelicula '
    }
})

const round1 = (num?: number) => num == null ? null : Math.round(num * 10) / 10;

</script>

<template>
    <Navbar />
    <main v-if="movie"
        :style="{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, #0a0a0a 80%), url(${BACKDROP_URL + movie.backdrop_path})` }">
        <section class="info">
            <h1>{{ movie.title }}</h1>
            <article class="metadata">
                <p>{{ normalizedDate }}</p>
                <p>&bull;</p>
                <p><strong>{{ movie.runtime }}</strong> min</p>
                <p>&bull;</p>
                <p><strong>{{ round1(movie.vote_average) }}</strong>/10</p>
            </article>
            <article class="genre">
                <p v-if="movie.genres">{{ movie.genres[0]?.name }}</p>
                <p v-if="movie.genres">{{ movie.genres[1]?.name }}</p>
            </article>
            <p class="resume">{{ movie.overview }}</p>
        </section>

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
    justify-content: center;
    padding: 2rem;
    padding-left: 5rem;
    height: 91vh;
}

.info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
}

.metadata,
.genre {
    display: flex;
    gap: .5rem;
    padding-bottom: .25rem;
}

.metadata p {
    font-size: .9rem;
}

.genre p {
    border: solid 2px var(--silver-dark);
    padding: .5rem;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
}

h1 {
    color: var(--silver-light)
}

.resume {
    max-width: 600px;
}

@media (max-width: 1000px) {
    main {
        padding-left: 2rem;
    }

}
</style>
