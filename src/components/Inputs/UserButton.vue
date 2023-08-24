<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<script setup lang="ts"></script>

<style scoped>
.button {
    color: var(--clr-text-1);
    min-width: 50px;
    padding: 10px 10px;
    font-size: 18px;
    margin: var(--space-xs);
    background-color: var(--clr-background-soft);
    border: 1px solid var(--clr-background-1);
    outline: none;
    transition: border-color 0.1s ease-in-out, border-radius 0.1s ease-in-out,
        background-color 0.1s ease-in-out;
}

.button:hover {
    background-color: var(--clr-background-mute);
}

.button:active {
    border-color: var(--clr-background-3);
    border-radius: 3px;
}
</style>
