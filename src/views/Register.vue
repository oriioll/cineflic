<script setup lang="ts">
import { supabaseRegister } from '@/services/supabase'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const isLoading = ref(false)
const email = ref('')
const password = ref('')
const error = ref(false)
const errorMsg = ref('')


const handleRegister = async () => {
    isLoading.value = true
    if (validateInputs(email.value, password.value)) {
        try {
            await supabaseRegister(email.value, password.value)
            error.value = false
            router.push('/home')
        } catch (e: any) {
            error.value = true
            errorMsg.value = getSupabaseErrorMessage(e.message)
        }
    } else {
        error.value = true
        errorMsg.value = "Correo o contraseña no validos"
    }
    isLoading.value = false

}

/**
 * Validates if email and password are valid (email type field and 8min length pwd)
 * @param email The email input value
 * @param password The password input value
 * @returns true if inputs are valid, false if not
 */
const validateInputs = (email: string, password: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValidPassword = password.length >= 8
    if (emailRegex.test(email) && isValidPassword) {
        return true
    } else {
        return false
    }
}

/**
 * Gets the supabase register error message and translates it and trasnforms it to display it in UI
 * @param error The message ready to display
 */
const getSupabaseErrorMessage = (error: string) => {
    if (error.includes('already registered')) return 'Este correo ya tiene una cuenta'
    if (error.includes('Password should be')) return 'La contraseña debe tener mínimo 8 caracteres'
    if (error.includes('invalid format')) return 'El formato del correo no es válido'
    if (error.includes('rate limit')) return 'Demasiados intentos, espera un momento'
    return 'Ha ocurrido un error, inténtalo de nuevo'
}
</script>

<template>
    <main>
        <section class="titles">
            <h1>Crea tu cuenta</h1>
            <p class="subtitle">Empieza a guardar tus películas favoritas</p>
        </section>
        <form @submit.prevent="handleRegister">
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
            <p>¿Ya tienes cuenta? <a href="/login" class="registerLink">Inicia sesión</a></p>
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
    border-radius: 8px;
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
    width: 90%;
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
