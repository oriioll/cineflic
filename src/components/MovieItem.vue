<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, type Ref, onMounted } from 'vue'
const router = useRouter()

import type { Movie } from '@/types/tmbdTypes.ts'
import { addMovieToStatus, checkIfItsLogged } from '@/services/supabase';
const props = defineProps<{
    movie: Movie
}>()
const normalizedDate = props.movie.release_date?.slice(0, 7)
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w200'

const round1 = (num?: number) => num == null ? null : Math.round(num * 10) / 10;
const roundedVote = round1(props.movie.vote_average)

const goToDetail = () => {
    router.push(`/movie/${props.movie.id}`)
}

const isLoggedIn = ref(false)
onMounted(async () => {
    isLoggedIn.value = await checkIfItsLogged()
})

const isFav = ref(false)
const isSeen = ref(false)
const toSee = ref(false)

const toggleFav = () => {
    if (!isFav.value) {
        try {
            addMovieToStatus('favoritos', props.movie.id!!)
        } catch (e: any) {
            console.log(e.message)
        }
    }
    isFav.value = !isFav.value
}
const toggleSeen = () => {
    if (!isSeen.value) {
        try {
            addMovieToStatus('vistas', props.movie.id!!)
        } catch (e: any) {
            console.log(e.message)
        }
    }
    isSeen.value = !isSeen.value
}
const toggleToSee = () => {
    if (!toSee.value) {
        try {
            addMovieToStatus('para-ver', props.movie.id!!)
        } catch (e: any) {
            console.log(e.message)
        }
    }
    toSee.value = !toSee.value
}
</script>

<template>
    <article @click="goToDetail">
        <img :src="IMG_BASE_URL + movie.poster_path" :alt="'Imagen de' + movie.title" loading="lazy">
        <h4>{{ movie.title }}</h4>
        <div class="bottom">
            <p>{{ normalizedDate }}</p>
            <p><strong>{{ roundedVote }}</strong>/10</p>
        </div>
        <div v-if="isLoggedIn" class="action">
            <button @click.stop="toggleFav">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                    <path :fill="isFav ? 'var(--silver-main)' : 'none'" stroke="var(--silver-main)"
                        stroke-linecap="round" stroke-linejoin="round" stroke-width="4"
                        d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.99 10.99 0 0 0 15 8" />
                </svg>
            </button>
            <button @click.stop="toggleToSee">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path :fill="toSee ? 'var(--silver-main)' : 'none'" stroke="var(--silver-main)" stroke-width="1.5"
                        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m3.5 12c-.3.5-.9.6-1.4.4l-2.6-1.5c-.3-.2-.5-.5-.5-.9V7c0-.6.4-1 1-1s1 .4 1 1v4.4l2.1 1.2c.5.3.6.9.4 1.4" />
                </svg>
            </button>
            <button @click.stop="toggleSeen">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path :fill="isSeen ? 'var(--silver-main)' : 'none'" stroke="var(--silver-main)" stroke-width="1.5"
                        d="M11.474 17.306c3.013-3.224 5.922-5.411 9.576-8.508c1.094-.927 1.263-2.552.405-3.703c-.912-1.224-2.645-1.469-3.817-.496c-3.347 2.776-5.951 5.45-8.421 8.306c-.13.15-.195.225-.262.267a.52.52 0 0 1-.555.003c-.068-.041-.133-.115-.263-.262l-1.316-1.49a2.748 2.748 0 0 0-4.358.304a2.79 2.79 0 0 0 .253 3.406l2.064 2.29C6.323 19.135 7.095 19.992 8.022 20c.926.008 1.768-.892 3.452-2.694Z" />
                </svg>
            </button>
        </div>
    </article>
</template>

<style scoped>
article {
    width: 100%;
    border-radius: 6px;
    padding: 1rem;
    box-sizing: border-box;
    border: solid 2px var(--silver-main);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: .5rem;
    background-color: var(--bg-card);
    transition: all .2s ease-out;
    box-shadow: 0 4px 8px rgba(99, 102, 241, 0.15);
    cursor: pointer;
}

article:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);
}

article img {
    width: 80%;
    aspect-ratio: 2/3;
    object-fit: cover;
    border-radius: 6px;
    align-self: center;
}

h4 {
    font-size: var(--step-0);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.bottom {
    display: flex;
    justify-content: space-between;
    gap: .5rem;
}

.bottom p {
    font-size: .8rem;
}

button {
    font-family: 'Onest', sans-serif;
    font-weight: 600;
    border: none;
    padding: .25rem;
    border-radius: 6px;
    font-size: .9rem;
    color: var(--silver-light);
    background-color: var(--silver-dark);
    transition: all .3s ease;
}

button:hover {
    cursor: pointer;
    filter: brightness(1.2);
}

.action {
    display: flex;
    justify-content: space-around;
    gap: .25rem;
}

.action button {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: .25rem;
    display: flex;
    align-items: center;
}

@media (max-width: 800px) {
    article img {
        width: 80%;
        aspect-ratio: 2/3;
        object-fit: cover;
        border-radius: 8px;
        align-self: center;
    }
}

@media (max-width: 450px) {
    article img {
        width: 70%;
        aspect-ratio: 2/3;
        object-fit: cover;
        border-radius: 8px;
        align-self: center;
    }
}
</style>
