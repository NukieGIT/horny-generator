<script setup lang="ts"></script>

<template>
    <header>
        <h1>Horny Generator</h1>
        <nav>
            <RouterLink :to="{ name: 'home' }">home</RouterLink>
            <RouterLink :to="{ name: 'roman' }">roman converter</RouterLink>
            <RouterLink :to="{ name: 'RadziuScript development' }">
                genshin API playground
            </RouterLink>
            <!-- <RouterLink to="/radzio">Radzio hahahahhahahahaahaahahahahahahahahahahhaahhahahahahahahahhahahahahahahaaha</RouterLink>
            <RouterLink to="/nukie">NUKIŚ KUKIŚ UWU BAKA GIWL</RouterLink> -->
            <RouterLink :to="{ name: 'roman arabic numerals converter' }">
                roman-arabic numerals converter
            </RouterLink>
        </nav>
    </header>
</template>

<style scoped>
header {
    /* border-bottom: 1px solid white; */
    background-color: var(--clr-background);
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
}

nav {
    line-height: 1.6;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: var(--space-md);
}

a {
    color: var(--clr-text-2);
    text-transform: capitalize;
}

a:hover {
    text-decoration: underline;
    text-underline-offset: var(--space-xs);
}

a.router-link-active {
    color: var(--clr-accent-primary);
    text-decoration: underline;
    text-underline-offset: var(--space-xs);
}
</style>
