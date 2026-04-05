<script setup lang="ts">
import type { Movie, Genre } from '@/types/tmbdTypes.ts'
import MovieItem from '@/components/MovieItem.vue'
import GenreItem from '@/components/GenreItem.vue'
import { RouterLink } from 'vue-router'
const props = defineProps<{
    sectionTitle: string,
    itemArray: Movie[] | Genre[],
    link: string,
    isMovie: boolean
}>()
</script>

<template>
    <section>
        <div class="top">
            <h2>{{ sectionTitle }}</h2>
            <RouterLink :to="link">Ver todos</RouterLink>
        </div>
        <article v-if="isMovie" class="carroussel">
            <MovieItem v-for="item in (itemArray as Movie[])" :key="item.id" :movie="item" class="card" />
        </article>
        <article v-else class="carroussel">
            <GenreItem v-for="item in (itemArray as Genre[])" :key="item.id" :genre="item" class="card" />
        </article>
    </section>
</template>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.carroussel {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow-x: scroll;
    gap: 1.5rem;
    padding: 1rem .75rem;
}

.carroussel::-webkit-scrollbar {
    height: 10px;
}

.carroussel::-webkit-scrollbar-track {
    background: transparent;
}

.carroussel::-webkit-scrollbar-thumb {
    background: rgba(163, 163, 163, 0.2);
    border-radius: 4px;
    transition: all 0.3s ease;
}

.carroussel::-webkit-scrollbar-thumb:hover {
    background: rgba(163, 163, 163, 0.8);
}

.carroussel>* {
    flex-shrink: 0;
    width: 225px;
}

.top {
    padding: 1rem 0rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
}

.card {
    height: 100%;
}

a {
    color: var(--silver-light);
    font-weight: bold;
    font-size: var(--step-0);
    text-decoration: none;
}
</style>
