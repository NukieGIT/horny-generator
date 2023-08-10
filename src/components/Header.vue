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