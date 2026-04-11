<script setup lang="ts">
import { supabaseLogin } from '@/services/supabase'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref(false)
const errorMsg = ref('')
const handleLogin = async () => {
    try {
        await supabaseLogin(email.value, password.value)
        error.value = false
        router.push('/home')
    } catch (e) {
        error.value = true
        errorMsg.value = "Correo o contraseña incorrectos"
    }
}

const validateInputs = (email: string, password: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValidPassword = password.length >= 8
    if (emailRegex.test(email) && isValidPassword) {
        return true
    } else {
        return false
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
            <button type="submit">Iniciar sesión</button>
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
    width: 90%;
    border-radius: 12px;
}

.formPart {
    width: 90%;
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
    border-radius: 12px;
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
    width: 90%;
    max-width: 420px;
    background-color: var(--accent-special);
    border-radius: 12px;
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
