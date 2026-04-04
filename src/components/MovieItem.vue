<script setup lang="ts">
import type { Movie } from '@/types/tmbdTypes.ts'
const props = defineProps<{
    movie: Movie
}>()
const normalizedDate = props.movie.release_date?.slice(0, 7)
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w200'

const round1 = (num?: number) => num == null ? null : Math.round(num * 10) / 10;
const roundedVote = round1(props.movie.vote_average)
</script>

<template>
    <article>
        <img :src="IMG_BASE_URL + movie.poster_path" :alt="'Imagen de' + movie.title">
        <h4>{{ movie.title }}</h4>
        <div class="bottom">
            <p>{{ normalizedDate }}</p>
            <p><strong>{{ roundedVote }}</strong>/10</p>
        </div>
        <button>
            Detalles
        </button>
    </article>
</template>

<style scoped>
article {
    border-radius: 12px;
    padding: 1rem;
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
    border-radius: 8px;
    align-self: center;
}

h4 {
    font-size: var(--step-0);
}

.bottom {
    display: flex;
    justify-content: space-between;
    gap: .5rem;
}

.bottom p {
    font-size: .8rem;
}
</style>
