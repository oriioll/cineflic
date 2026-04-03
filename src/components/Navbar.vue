<script setup lang="ts">
</script>

<template>
    <header>
        <a class="logo" href="/home">CineFlic</a>
        <div class="searcher">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" />
            </svg>
            <input class="searcherInput" type="text" placeholder="Busca una pelicula...">
        </div>
        <nav>
            <ul>
                <li>
                    <a href="/popular">Populares</a>
                </li>
                <li>
                    <a href="/generos">Generos</a>
                </li>
                <li>
                    <a href="/coleccion">Mi colección</a>
                </li>
                <li>
                    <a href="">Inicia Sesion</a>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
header {
    width: 100%;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
}

.logo {
    color: var(--silver-main);
    text-decoration: none;
    font-weight: bold;
    font-size: var(--step-2);
    letter-spacing: -0.02em;
    flex: 1;
    cursor: pointer;
}

nav {
    flex: 1;
    display: flex;
    justify-content: flex-end;
}

ul {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}

li {
    list-style-type: none;
}

li a {
    color: var(--silver-light);
    font-size: var(--step-0);
    text-transform: uppercase;
    font-weight: bold;
    text-decoration: none;
    letter-spacing: -0.02em;
    cursor: pointer;
    transition: all .3s ease;
}

li a:hover {
    opacity: .75;
}

.searcher {
    display: flex;
    justify-content: flex-start;
    gap: .75rem;
    border: solid 2px var(--silver-main);
    border-radius: 12px;
    padding: .5rem;
    width: 300px;
    transition: all .3s ease;
}

.searcher:hover {
    filter: brightness(1.1);
}

.searcher:active,
.searcher:focus {
    border: solid 2px var(--accent-special);
}

.searcher:focus-within {
    border: 2px solid var(--accent-special);
}


.searcher svg {
    height: 25px;
    width: 25px;
    color: var(--accent-special);
}

.searcherInput {
    width: 100%;
    max-width: 300px;
    border: none;
    outline: none;
    background: transparent;
    font-family: 'Onest';
    color: var(--silver-light);
    font-size: var(--step-0);
}
</style>
