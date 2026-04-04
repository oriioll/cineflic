<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
</script>

<template>
    <Navbar />
    <main>
        <h1>HOME VIEW</h1>
        <div class="todo">
            <pre>
        PASSOS ENVIAR QUERIES INPUT A HOME
        1. Event input al search bar

        2. Amb debounce enviar un router push 
        amb el valor del input, nomes si es mes 
        de 2 de length

        3. A home, definir un prop amb el que 
        envia el router

        4. Tindre boolean reactiu per comprovar
        amb si hi ha una query. Si no hi ha
        renderitzar populars, si hi ha, render
        query

        5. Tindre objecte reactiu de la query
        ja que canvia per event input i fer v-for
        pel resultat
    </pre>
            <pre>
        FIXES:
        1. Scroll mobil

        2. Card Movies render mobil 
        (fer imatge mes petita)

        3. Header Movil - Fer logo mes petit 
        i a la esquerra

        4. Scroll vertical movil a detail movie view 

        5. A movie detail view cambiar a movil 
        space around per center i gap

        6. Fix router Home page navbar
    </pre>
        </div>

    </main>

</template>

<style scoped>
.todo {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}

pre {
    padding: 1rem .5rem;
    font-family: 'Onest';
    font-weight: bold;
    border: 2px solid var(--silver-main);
    border-radius: 12px;
    width: 400px;
}
</style>
