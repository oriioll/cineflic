<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue';
import { getMovieById } from '@/services/tmdb';
import { getMovieVideoById } from '@/services/tmdb';
import type { DetailedMovie } from '@/types/tmbdTypes';
import { checkTrailerAvailable } from '@/helpers/helpers';
import { addMovieToStatus, checkIfItsLogged, deleteMovieFromStatus, getMovieStatuses } from '@/services/supabase';

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


const isLoggedIn = ref(false)
onMounted(async () => {
    isLoggedIn.value = await checkIfItsLogged()
})

const isFav = ref(false)
const isSeen = ref(false)
const toSee = ref(false)

onMounted(async () => {
    const movieStatuses = await getMovieStatuses(Number(movieId))
    if (movieStatuses.includes('favoritos')) {
        isFav.value = true
    }
    if (movieStatuses.includes('vistas')) {
        isSeen.value = true
    }
    if (movieStatuses.includes('para-ver')) {
        toSee.value = true
    }
})
const toggleFav = async () => {
    if (!isFav.value) {
        try {
            await addMovieToStatus('favoritos', Number(movieId))
        } catch (e: any) {
            console.log(e.message)
        }
    } else {
        try {
            await deleteMovieFromStatus('favoritos', Number(movieId))
        } catch (e: any) {
            console.log(e.message)
        }
    }
    isFav.value = !isFav.value
}
const toggleSeen = async () => {
    if (!isSeen.value) {
        try {
            await addMovieToStatus('vistas', Number(movieId))
        } catch (e: any) {
            console.log(e.message)
        }
    } else {
        try {
            await deleteMovieFromStatus('vistas', Number(movieId))
        } catch (e: any) {
            console.log(e.message)
        }
    }
    isSeen.value = !isSeen.value
}
const toggleToSee = async () => {
    if (!toSee.value) {
        try {
            await addMovieToStatus('para-ver', Number(movieId))
        } catch (e: any) {
            console.log(e.message)
        }
    } else {
        try {
            await deleteMovieFromStatus('para-ver', Number(movieId))
        } catch (e: any) {
            console.log(e.message)
        }
    }
    toSee.value = !toSee.value
}
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
            <div v-if="isLoggedIn" class="action">
                <button @click.stop="toggleFav">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48">
                        <path :fill="isFav ? 'var(--silver-main)' : 'none'" stroke="var(--silver-main)"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="4"
                            d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.99 10.99 0 0 0 15 8" />
                    </svg>
                </button>
                <button @click.stop="toggleToSee">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                        <path :fill="toSee ? 'var(--silver-main)' : 'none'" stroke="var(--silver-main)"
                            stroke-width="1.5"
                            d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m3.5 12c-.3.5-.9.6-1.4.4l-2.6-1.5c-.3-.2-.5-.5-.5-.9V7c0-.6.4-1 1-1s1 .4 1 1v4.4l2.1 1.2c.5.3.6.9.4 1.4" />
                    </svg>
                </button>
                <button @click.stop="toggleSeen">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                        <path :fill="isSeen ? 'var(--silver-main)' : 'none'" stroke="var(--silver-main)"
                            stroke-width="1.5"
                            d="M11.474 17.306c3.013-3.224 5.922-5.411 9.576-8.508c1.094-.927 1.263-2.552.405-3.703c-.912-1.224-2.645-1.469-3.817-.496c-3.347 2.776-5.951 5.45-8.421 8.306c-.13.15-.195.225-.262.267a.52.52 0 0 1-.555.003c-.068-.041-.133-.115-.263-.262l-1.316-1.49a2.748 2.748 0 0 0-4.358.304a2.79 2.79 0 0 0 .253 3.406l2.064 2.29C6.323 19.135 7.095 19.992 8.022 20c.926.008 1.768-.892 3.452-2.694Z" />
                    </svg>
                </button>
            </div>
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
    border-radius: 6px;
}

.action {
    display: flex;
    justify-content: space-between;
    gap: .25rem;
    width: 200px;
}

.action button {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: .25rem;
    display: flex;
    align-items: center;
}

@media (max-width: 1200px) {
    main {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 3rem;
        padding: 1rem;
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
