<script setup lang="ts">
import CollectionErrorScreen from '@/components/CollectionErrorScreen.vue';
import { checkIfItsLogged, getUserMoviesWithStatus } from '@/services/supabase';
import { ref, onMounted, computed, watch } from 'vue'
import type { Movie } from '@/types/tmbdTypes';
import Navbar from '@/components/Navbar.vue';
import CollectionNavbar from '@/components/CollectionNavbar.vue';
import { useRoute } from 'vue-router'
import { getMovieById } from '@/services/tmdb';
import MovieItem from '@/components/MovieItem.vue';
const isLoggedIn = ref(false)
const route = useRoute()
const errorMsg = ref('')
const error = ref(false)
const movies = ref<Movie[]>([])
const moviesId = ref<number[]>([])

const section = computed(() => {
    return route.query.tab as string || 'favoritos'
})
onMounted(async () => {
    isLoggedIn.value = await checkIfItsLogged()
    await loadMovies(section.value)
})

watch(section, async (newTab) => {
    await loadMovies(newTab)
})

const loadMovies = async (section: string) => {
    try {
        error.value = false
        moviesId.value = await getUserMoviesWithStatus(section)
        await setMoviesWithId(moviesId.value)
        console.log(movies.value)
    } catch (e) {
        error.value = true
        errorMsg.value = 'No se han podido cargar la seccion ' + section
    }
}

/**
 * Sets the ref array movies to the result of mapping an id number array to get its movie using getMovieById
 */
const setMoviesWithId = async (idArr: number[]) => {
    console.log(idArr)
    movies.value = await Promise.all(
        idArr.map(id => getMovieById(id))
    )
}
</script>

<template>
    <Navbar />
    <main v-if="isLoggedIn">
        <CollectionNavbar />
        <div class="top">
            <h1>{{ section }}</h1>
            <article>
                <p>filter</p>
            </article>
        </div>
        <section v-if="!error && movies.length > 0" class="movieGrid">
            <MovieItem v-for="movie in movies" :key="movie.id" :movie="movie" />
        </section>
        <section v-else-if="!error && movies.length <= 0" class="noFilms">
            <h3>No tienes películas en {{ section }}</h3>
            <p>Explora el catálogo y añade las que más te gusten</p>
            <RouterLink to="/home" class="goHome">Explorar películas</RouterLink>
        </section>
        <section v-else>
            <p>{{ errorMsg }}</p>
        </section>
    </main>
    <CollectionErrorScreen v-else />
</template>

<style scoped>
h1 {
    text-transform: capitalize;
}

main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
}

.movieGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
}

.top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.goHome {
    color: var(--silver-light);
    font-size: var(--step-0);
    font-weight: bold;
    align-self: center;
    padding: 1rem;
}

.noFilms {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
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
