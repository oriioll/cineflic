<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

import type { Genre } from '@/types/tmbdTypes.ts'
const props = defineProps<{
    genre: Genre
}>()

const goToDetail = () => {
    router.push(`/generos/${props.genre.id}`)
}
</script>

<template>
    <article @click="goToDetail" role="article" :aria-label="`Género: ${genre.name}`">
        <h4>{{ genre.name }}</h4>
    </article>
</template>

<style scoped>
article {
    width: 100%;
    border: solid 2px var(--silver-main);
    border-radius: 6px;
    background-color: var(--bg-card);
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(99, 102, 241, 0.15);
    cursor: pointer;
    transition: all .2s ease;
}

article:hover {
    filter: brightness(1.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);
}

h4 {
    text-align: center;
}
</style>
