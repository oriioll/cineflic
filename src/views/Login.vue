<script setup lang="ts">
import { supabaseLogin } from '@/services/supabase'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const isLoading = ref(false)
const email = ref('')
const password = ref('')
const error = ref(false)
const errorMsg = ref('')
const handleLogin = async () => {
    try {
        isLoading.value = true
        await supabaseLogin(email.value, password.value)
        error.value = false
        router.push('/home')
    } catch (e) {
        isLoading.value = false
        error.value = true
        errorMsg.value = "Correo o contraseña incorrectos"
    }
}

</script>

<template>
    <main>
        <section class="titles">
            <h1>Bienvenido de nuevo</h1>
            <p class="subtitle">Inicia sesión para acceder a tu colección</p>
        </section>
        <form @submit.prevent="handleLogin">
            <article class="formPart">
                <label for="email">Correo electrónico</label>
                <input type="text" placeholder="tu@correo.com" v-model="email" />
            </article>

            <article class="formPart">
                <label for="password">Contraseña</label>
                <input type="password" placeholder="Mínimo 8 caracteres" v-model="password" />
            </article>
            <button v-if="!isLoading" type="submit">Iniciar sesión</button>
            <button v-else type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                        opacity=".5" />
                    <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                        <animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite"
                            to="360 12 12" type="rotate" />
                    </path>
                </svg>
            </button>
            <span v-if="error" class="errorMsg">{{ errorMsg }}</span>
            <p>¿No tienes cuenta? <a href="/register" class="registerLink">Regístrate</a></p>
        </form>
    </main>

</template>

<style scoped>
h1 {
    color: var(--silver-light);
}

.titles {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: .25rem;
}

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

form {
    background-color: var(--bg-card);
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 2rem 1rem;
    gap: 2rem;
    max-width: 500px;
    width: 100%;
    border-radius: 8px;
}

.formPart {
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

label {
    font-family: 'Onest', sans-serif;
    color: var(--silver-light);
    font-size: var(--step-1);
    font-weight: bold;
    text-decoration: none;
}

input {
    width: 100%;
    max-width: 420px;
    color: var(--silver-light);
    font-family: 'Onest', sans-serif;
    font-size: var(--step-0);
    outline: none;
    border: solid 2px var(--silver-main);
    border-radius: 6px;
    padding: .5rem;
    transition: all .3s ease;
}

input:hover {
    filter: brightness(1.1);
}

input:active,
input:focus {
    border: solid 2px var(--accent-special);
}

.input:focus-within {
    border: 2px solid var(--accent-special);
}

button {
    width: 100%;
    max-width: 420px;
    background-color: var(--accent-special);
    border-radius: 6px;
    padding: .5rem;
    border: none;
    font-family: 'Onest', sans-serif;
    color: var(--silver-light);
    font-size: var(--step-0);
    font-weight: bold;
    text-decoration: none;
    letter-spacing: -0.02em;
    cursor: pointer;
    transition: all .3s ease;
}

button:hover {
    opacity: .8;
}

.registerLink {
    color: var(--silver-main);
    font-family: 'Onest', sans-serif;
    font-weight: bold;
}

.errorMsg {
    font-family: 'Onest', sans-serif;
    color: var(--error);
    font-weight: bold;
    font-size: var(--step-0);
}
</style>
