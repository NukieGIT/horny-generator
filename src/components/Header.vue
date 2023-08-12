<template>
    <header>
        <h1>Horny Generator</h1>
        <nav>
            <RouterLink :to="{ name: 'home' }">Home</RouterLink>
            <RouterLink :to="{ name: 'roman' }">Roman Converter</RouterLink>
            <RouterLink :to="{ name: 'RadziuScript development' }">RS playground</RouterLink>
            <!-- <RouterLink to="/radzio">Radzio hahahahhahahahaahaahahahahahahahahahahhaahhahahahahahahahhahahahahahahaaha</RouterLink>
            <RouterLink to="/nukie">NUKIŚ KUKIŚ UWU BAKA GIWL</RouterLink> -->
            <RouterLink :to="{ name: 'roman arabic numerals converter' }">Roman-Arabic Numerals Converter</RouterLink>
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