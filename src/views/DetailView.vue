<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue';
import { getMovieById } from '@/services/tmdb';
import { getMovieVideoById } from '@/services/tmdb';
import type { DetailedMovie } from '@/types/tmbdTypes';
import { checkTrailerAvailable } from '@/helpers/helpers';
const route = useRoute()
const movieId = route.params.id
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w200'
const BACKDROP_URL = 'https://image.tmdb.org/t/p/w1280'
const movie = ref<DetailedMovie | null>(null)
const trailerUrl = ref<string | null>(null)
let normalizedDate = ref('')
const videoIsAvailable = ref(false)
const error = ref(false)
onMounted(async () => {
    try {
        //getting movie
        const data = await getMovieById(Number(movieId))
        movie.value = data
        normalizedDate.value = movie.value?.release_date?.slice(0, 7) ?? ''
        //get video
        const videoObject = await getMovieVideoById(Number(movieId))
        if (videoObject) {
            trailerUrl.value = videoObject.video
            videoIsAvailable.value = await checkTrailerAvailable(videoObject.key)
        }
    } catch (e) {
        console.log(e)
        error.value = true
    }
})

const round1 = (num?: number) => num == null ? null : Math.round(num * 10) / 10;

</script>

<template>
    <Navbar />
    <main v-if="error">
        <h1>No se puede cargar la pelicula</h1>
    </main>
    <main v-else-if="movie"
        :style="{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.70) 0%, #0a0a0a 80%), url(${BACKDROP_URL + movie.backdrop_path})` }">
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
                <p v-if="movie.genres && movie.genres[1]">{{ movie.genres[1]?.name }}</p>
            </article>
            <p class="resume">{{ movie.overview }}</p>
        </section>
        <section v-if="videoIsAvailable" class="video">
            <iframe v-if="trailerUrl" :src="trailerUrl" allowfullscreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                frameborder="0" @error="trailerUrl = null" />
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
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    min-height: 91vh;
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

.video {
    width: 30%;
    align-self: center;
}

iframe {
    width: 100%;
    aspect-ratio: 16/9;
    border: none;
    border-radius: 12px;
}

@media (max-width: 1200px) {
    main {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 3rem;
    }

    .video {
        width: 60%;
    }
}

@media (max-width: 900px) {
    .video {
        width: 80%;
    }
}

@media (max-width: 700px) {
    .video {
        width: 100%;
    }
}
</style>
