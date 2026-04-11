<script setup lang="ts">
import CollectionErrorScreen from '@/components/CollectionErrorScreen.vue';
import { checkIfItsLogged } from '@/services/supabase';
import { ref, onMounted, computed, watch } from 'vue'
import Navbar from '@/components/Navbar.vue';
import CollectionNavbar from '@/components/CollectionNavbar.vue';
import { useRoute } from 'vue-router'
const isLoggedIn = ref(false)
const route = useRoute()

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
    switch (section) {
        case 'favoritos':
            break;
        case 'para-ver':
            break;
        case 'vistas':
            break;
        default:
            break;
    }
}
</script>

<template>
    <Navbar />
    <main v-if="isLoggedIn">
        <CollectionNavbar />

    </main>
    <CollectionErrorScreen v-else />
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
}
</style>
