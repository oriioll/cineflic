<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { getPopulars, getRegionPopulars, getGenres, getMovieByQuery } from '@/services/tmdb.ts'
import { ref, onMounted, computed, watch } from 'vue'
import { getUserLanguage } from '@/helpers/helpers.ts';
import type { Genre, Movie } from '@/types/tmbdTypes';
import HomeSection from '@/components/HomeSection.vue';
import { useRoute } from 'vue-router'
import MovieItem from '@/components/MovieItem.vue'

let lang = ref('')
const genresArr = ref<Genre[]>([])
const popularMoviesArr = ref<Movie[]>([])
const localPopularMoviesArr = ref<Movie[]>([])

const route = useRoute()
const query = computed(() => route.query.movie as string || '')
const normalize = (str: string) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

const searchResults = ref<Movie[]>([])
const isSearching = computed(() => !!query.value)

watch(query, async (newQuery) => {
    if (newQuery.length > 2) {
        const data = await getMovieByQuery(newQuery)
        searchResults.value = data.results
    } else {
        searchResults.value = []
    }
})

onMounted(async () => {
    //API CALLING - GET POPULARS
    try {
        const data = await getPopulars()
        popularMoviesArr.value = data.results
    } catch (e) {
        console.log(e)
        popularMoviesArr.value = [
            { title: "No se pueden cargar las peliculas" }
        ]
    }

    //API CALLING - GET LOCAL POPULARS
    try {
        lang.value = getUserLanguage()
        const data = await getRegionPopulars(lang.value)
        localPopularMoviesArr.value = data.results
    } catch (e) {
        console.log(e)
        localPopularMoviesArr.value = [
            { title: "No se pueden cargar las peliculas" }
        ]
    }

    //API CALLING - GET GENRES
    try {
        const data = await getGenres()
        genresArr.value = data.genres
        genresArr.value.sort((a, b) => a.name.localeCompare(b.name))
    } catch (e) {
        console.log(e)
        genresArr.value = [
            { 'id': 0, 'name': 'Error al cargar los generos' }
        ]
    }
})
</script>

<template>
    <Navbar />
    <main v-if="!isSearching">
        <HomeSection :section-title="'Populares'" :item-array="popularMoviesArr" :link="'/popular'" :is-movie="true" />
        <HomeSection :section-title="`Populares - ${lang}`" :item-array="localPopularMoviesArr" :link="'/popular/local'"
            :is-movie="true" />
        <HomeSection :section-title="'Generos'" :item-array="genresArr" :link="'/generos'" :is-movie="false" />
    </main>
    <main v-else>
        <section class="movieGrid">
            <MovieItem v-for="movie in searchResults" :key="movie.id" :movie="movie" />
        </section>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
}

.movieGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
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
