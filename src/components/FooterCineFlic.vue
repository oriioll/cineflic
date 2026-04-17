<script setup lang="ts">
</script>

<template>
    <footer>
        <RouterLink to="/home" class="logo">CineFlic</RouterLink>
        <a href="https://github.com/oriioll/cineflic" class="links" target="__blank">Repositorio GitHub</a>
        <a href="https://developer.themoviedb.org/docs/getting-started" class="links" target="_blank">TMDB API</a>
    </footer>
</template>

<style scoped>
footer {
    margin-top: 4rem;
    border-top: solid 1px var(--silver-main);
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
    width: 100%;
    height: 10vh;
    position: relative;
    bottom: 0;
}

.logo {
    color: var(--silver-main);
    text-decoration: none;
    font-weight: bold;
    font-size: var(--step-2);
    letter-spacing: -0.02em;
    cursor: pointer;
}

.links {
    color: var(--silver-light);
    font-weight: bold;
    font-size: var(--step-0);
    letter-spacing: -0.02em;
    cursor: pointer;
}
</style>
