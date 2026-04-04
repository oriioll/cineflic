<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import MovieItem from '@/components/MovieItem.vue';
import { getPopulars } from '@/services/tmdb.ts'
import { ref, onMounted } from 'vue'
import type { Movie } from '@/types/tmbdTypes.ts'
import { getSpanishWrittenMonth } from '@/helpers/helpers.ts'

const popularMovies = ref<Movie[]>([])

onMounted(async () => {
    try {
        const data = await getPopulars()
        popularMovies.value = data.results
    } catch (e) {
        console.log(e)
        popularMovies.value = [
            { title: "No se pueden cargar las peliculas" }
        ]
    }
})

const date = new Date()
const year = date.getFullYear()
const month = date.getMonth()
const normalizedMonth = getSpanishWrittenMonth(month + 1)

</script>

<template>
    <Navbar />
    <main>
        <div class="top">
            <h1>Populares - {{ normalizedMonth + ' ' + year }}</h1>
            <article>
                <p>filter</p>
            </article>
        </div>
        <section class="movieGrid">
            <MovieItem v-for="movie in popularMovies" :key="movie.id" :movie="movie" />
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

.movieGrid {
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
</style>
