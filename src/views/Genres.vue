<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { getGenres } from '@/services/tmdb.ts'
import { ref, onMounted } from 'vue'
import type { Genre } from '@/types/tmbdTypes.ts'
import GenreItem from '@/components/GenreItem.vue';

const genres = ref<Genre[]>([])

onMounted(async () => {
    try {
        const data = await getGenres()
        genres.value = data.genres
        genres.value.sort((a, b) => a.name.localeCompare(b.name))
    } catch (e) {
        console.log(e)
        genres.value = [
            { 'id': 0, 'name': 'Error al cargar los generos' }
        ]
    }
})

</script>

<template>
    <Navbar />
    <main>
        <div class="top">
            <h1>Generos</h1>
            <article>
                <p>filter</p>
            </article>
        </div>
        <section class="genreGrid">
            <GenreItem v-for="genre in genres" :key="genre.id" :genre="genre" />
        </section>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
}

.genreGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
}

.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

@media (max-width: 700px) {
    .genreGrid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }

}
</style>
