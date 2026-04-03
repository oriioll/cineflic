<script setup lang="ts">
import { useGetUserOrNull } from '@/composables/handleAuth';
const { user } = useGetUserOrNull()
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
                    <a v-if="user == null" class="login" href="/login">Inicia Sesion</a>
                    <a v-else class="profile" href="/perfil">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                            <path fill="currentColor" fill-rule="evenodd"
                                d="M12 4a8 8 0 0 0-6.96 11.947A4.99 4.99 0 0 1 9 14h6a4.99 4.99 0 0 1 3.96 1.947A8 8 0 0 0 12 4m7.943 14.076q.188-.245.36-.502A9.96 9.96 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.96 9.96 0 0 0 2.057 6.076l-.005.018l.355.413A9.98 9.98 0 0 0 12 22q.324 0 .644-.02a9.95 9.95 0 0 0 5.031-1.745a10 10 0 0 0 1.918-1.728l.355-.413zM12 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6"
                                clip-rule="evenodd" />
                        </svg>
                        <span>Perfil</span>
                    </a>
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

.login {
    background-color: var(--accent-special);
    border-radius: 12px;
    padding: .5rem;
}

li {
    display: flex;
    align-items: center;
}

li a.login:hover {
    transform: translateY(-2px);
    opacity: 1;
}

.profile {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .25rem;
    color: var(--silver-main);
}

.profile svg {
    color: var(--silver-main);
}
</style>
