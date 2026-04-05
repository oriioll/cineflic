<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGetUserOrNull } from '@/composables/handleAuth';
import { useRoute, useRouter } from 'vue-router'
import { debounce } from 'lodash'
const { user } = useGetUserOrNull()

const submenuOpened = ref(false)

/**
 * Toggles the submenuOpened reactive boolean variable
 */
const toggleSubmenu = () => {
    submenuOpened.value = submenuOpened.value ? false : true
}

const route = useRoute()
const router = useRouter()
const query = ref('')
const sendQuery = debounce(() => {
    router.push({ path: route.path, query: { movie: query.value } })
}, 500)
</script>

<template>
    <header>
        <a class="logo" href="/home">CineFlic</a>
        <div class="searcher">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" />
            </svg>
            <input v-model="query" @input="sendQuery" class="searcherInput" type="text"
                placeholder="Busca una pelicula...">
        </div>
        <nav class="right">
            <ul>
                <li>
                    <RouterLink to="/popular" class="head">Populares</RouterLink>
                </li>
                <li>
                    <RouterLink to="/generos" class="head">Generos</RouterLink>
                </li>
                <li>
                    <RouterLink to="/coleccion" class="head">Mi colección</RouterLink>
                </li>
                <li>
                    <RouterLink v-if="user == null" to="/login" class="login head">Inicia Sesion</RouterLink>
                    <RouterLink v-else to="/perfil" class="profile head">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                            <path fill="currentColor" fill-rule="evenodd"
                                d="M12 4a8 8 0 0 0-6.96 11.947A4.99 4.99 0 0 1 9 14h6a4.99 4.99 0 0 1 3.96 1.947A8 8 0 0 0 12 4m7.943 14.076q.188-.245.36-.502A9.96 9.96 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.96 9.96 0 0 0 2.057 6.076l-.005.018l.355.413A9.98 9.98 0 0 0 12 22q.324 0 .644-.02a9.95 9.95 0 0 0 5.031-1.745a10 10 0 0 0 1.918-1.728l.355-.413zM12 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6"
                                clip-rule="evenodd" />
                        </svg>
                        <span>Perfil</span>
                    </RouterLink>
                </li>
            </ul>
        </nav>
        <button class="toggle" @click="toggleSubmenu">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"
                    d="M20 7H4m16 5H4m16 5H4" />
            </svg>
        </button>
        <Transition name="dropdown">
            <nav v-if="submenuOpened" class="submenu">
                <ul>
                    <li>
                        <RouterLink v-if="user == null" to="/login" class="login option">Inicia Sesion</RouterLink>
                        <RouterLink v-else to="/perfil" class="profile option">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                                <path fill="currentColor" fill-rule="evenodd"
                                    d="M12 4a8 8 0 0 0-6.96 11.947A4.99 4.99 0 0 1 9 14h6a4.99 4.99 0 0 1 3.96 1.947A8 8 0 0 0 12 4m7.943 14.076q.188-.245.36-.502A9.96 9.96 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.96 9.96 0 0 0 2.057 6.076l-.005.018l.355.413A9.98 9.98 0 0 0 12 22q.324 0 .644-.02a9.95 9.95 0 0 0 5.031-1.745a10 10 0 0 0 1.918-1.728l.355-.413zM12 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6"
                                    clip-rule="evenodd" />
                            </svg>
                            <span>Perfil</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/popular" class="option">Populares</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/generos" class="option">Generos</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/coleccion" class="option">Mi colección</RouterLink>
                    </li>
                </ul>
            </nav>
        </Transition>
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
    box-sizing: border-box;
    position: relative;
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

.head {
    color: var(--silver-light);
    font-size: var(--step-0);
    font-weight: bold;
    text-decoration: none;
    letter-spacing: -0.02em;
    cursor: pointer;
    transition: all .3s ease;
}

.head:hover {
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

.toggle {
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.toggle svg {
    color: var(--silver-light);
    cursor: pointer;
    transition: all .3s ease;
}

.toggle svg:hover {
    opacity: .7;
}

.submenu {
    position: absolute;
    top: 55px;
    right: 10px;
    width: 160px;
    height: fit-content;
    display: flex;
    justify-content: flex-start;
    padding: 1rem;
    border-radius: 12px;
    background-color: var(--bg-card);
    box-shadow: rgba(136, 136, 136, 0.07) 0px 4px 10px, rgba(128, 128, 128, 0.02) 0px 6px;
}

.submenu ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.option {
    color: var(--silver-light);
    text-decoration: none;
    font-weight: bold;
    letter-spacing: -0.02em;
    cursor: pointer;
    transition: all .3s ease;
}

.option:hover {
    opacity: .75;
}

.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.25s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}

@media only screen and (max-width: 1055px) {
    .right {
        display: none;
    }

    header {
        padding: 1rem 1rem;
    }
}

@media only screen and (min-width: 1056px) {
    .toggle {
        display: none;
    }

    .submenu {
        display: none
    }
}
</style>
