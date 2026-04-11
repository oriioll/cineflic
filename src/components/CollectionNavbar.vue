<script setup lang="ts">
import { ref, onMounted } from 'vue'

</script>

<template>
    <nav>
        <RouterLink to="/coleccion?tab=favoritos">Favoritos</RouterLink>
        <RouterLink to="/coleccion?tab=para-ver">Para ver</RouterLink>
        <RouterLink to="/coleccion?tab=vistas">Vistas</RouterLink>
    </nav>
</template>

<style scoped>
nav {
    display: flex;
    gap: 2rem;
}

a {
    border: solid 1px var(--silver-main);
    padding: .75rem;
    font-weight: bold;
    color: var(--silver-main);
    background-color: var(--bg-card);
    border-radius: 6px;
    text-decoration: none;
    transition: all .3s ease
}

a:hover {
    opacity: .8;
}
</style>
