<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import MovieItem from '@/components/MovieItem.vue';
import { getPopulars } from '@/services/tmdb.ts'
import { ref, onMounted, computed } from 'vue'
import type { Movie } from '@/types/tmbdTypes.ts'
import { useRoute } from 'vue-router'
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

const route = useRoute()
const query = computed(() => route.query.movie as string || '')
const normalize = (str: string) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

//Filtered array, if there is a query, convert to lowercase and check if movie title includes the query.
//If there isn't a query, use the api returned array
const filtered = computed(() => {
    if (query.value) {
        return popularMovies.value.filter(movie =>
            normalize(movie.title ?? '').includes(normalize(query.value))
        )
    } else {
        return popularMovies.value
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
        </div>
        <section class="movieGrid">
            <MovieItem v-for="movie in filtered" :key="movie.id" :movie="movie" />
        </section>
        <section v-if="filtered.length == 0">
            <h3>No se encontraron resultados</h3>
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

@media (max-width: 1000px) {
    main {
        padding: 1rem;
    }
}

@media (max-width: 700px) {
    .movieGrid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }
}
</style>
