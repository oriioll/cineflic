<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import MovieItem from '@/components/MovieItem.vue';
import { useRoute } from 'vue-router'
import { getGenres, getMoviesByGenre } from '@/services/tmdb.ts'
import { ref, onMounted, computed } from 'vue'
import type { Movie } from '@/types/tmbdTypes.ts'
const route = useRoute()
const rawId = route.params.id
const genreMovies = ref<Movie[]>([])
const genreName = ref('')

onMounted(async () => {
    try {
        const genreId = Array.isArray(rawId) ? rawId[0] : rawId
        if (!genreId) {
            throw new Error('No se pueden cargar las peliculas')
        }
        const data = await getMoviesByGenre(genreId)
        genreMovies.value = data.results
        const genreNameData = await getGenres()
        const genreObject = genreNameData.genres.find((g: any) => g.id === Number(genreId))
        genreName.value = genreObject.name

    } catch (e) {
        console.log(e)
        genreMovies.value = [
            { title: "No se pueden cargar las peliculas" }
        ]
    }
})

const query = computed(() => route.query.movie as string || '')
const normalize = (str: string) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

//Filtered array, if there is a query, convert to lowercase and check if movie title includes the query.
//If there isn't a query, use the api returned array
const filtered = computed(() => {
    if (query.value) {
        return genreMovies.value.filter(movie =>
            normalize(movie.title ?? '').includes(normalize(query.value))
        )
    } else {
        return genreMovies.value
    }
})

</script>

<template>
    <Navbar />
    <main>
        <div class="top">
            <h1>{{ genreName }}</h1>
        </div>
        <section class="movieGrid">
            <MovieItem v-for="movie in filtered" :key="movie.id" :movie="movie" />
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

@media (max-width: 1000px) {
    main {
        padding: 1rem;
    }
}
</style>
