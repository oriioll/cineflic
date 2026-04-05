<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import MovieItem from '@/components/MovieItem.vue';
import { useRoute } from 'vue-router'
import { getGenres, getMoviesByGenre } from '@/services/tmdb.ts'
import { ref, onMounted } from 'vue'
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

</script>

<template>
    <Navbar />
    <main>
        <div class="top">
            <h1>{{ genreName }}</h1>
            <article>
                <p>filter</p>
            </article>
        </div>
        <section class="movieGrid">
            <MovieItem v-for="movie in genreMovies" :key="movie.id" :movie="movie" />
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

@media (max-width: 700px) {
    .movieGrid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }

}
</style>
