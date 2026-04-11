<script setup lang="ts">
import CollectionErrorScreen from '@/components/CollectionErrorScreen.vue';
import { checkIfItsLogged } from '@/services/supabase';
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue';
import CollectionNavbar from '@/components/CollectionNavbar.vue';
const isLoggedIn = ref(false)

onMounted(async () => {
    isLoggedIn.value = await checkIfItsLogged()
})
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
