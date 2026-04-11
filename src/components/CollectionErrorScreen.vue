<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
</script>

<template>
    <main class="goLogin">
        <article>
            <h1>Accede a tu colección</h1>
            <p>Guarda tus peliculas favoritas, lleva un registro de lo que has visto y crea una lista de pendientes.</p>
            <div class="loginLinks">
                <RouterLink to="/login">Iniciar sesión</RouterLink>
                <RouterLink to="/register">Crear cuenta</RouterLink>
            </div>
        </article>

    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    height: 100vh;
    max-height: 100dvh;
}

.goLogin article {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
}

.loginLinks {
    display: flex;
    align-self: center;
    gap: 2rem;
    padding: 2rem;
}

.loginLinks a {
    color: var(--silver-light);
    font-size: var(--step-0);
    padding: .75rem;
    border: solid 1px var(--silver-main);
    border-radius: 6px;
    background-color: var(--bg-card);
    text-decoration: none;
    font-weight: 600;
    transition: all .3s ease;
}

.loginLinks a:hover {
    opacity: .85;
}
</style>
