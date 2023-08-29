<template>
    <input
        type="color"
        class="input"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
</template>

<script setup lang="ts">
defineProps<{
    modelValue?: string
}>()

defineEmits<{
    'update:modelValue': [payload: string]
}>()
</script>

<style scoped>
.input {
    min-width: 70px;
    height: 50px;
    padding: 5px;
    font-size: 18px;
    margin: var(--space-xs);
    background-color: var(--clr-background-soft);
    border: 1px solid var(--clr-background-1);
    outline: none;
    transition: border-color 0.1s ease-in-out, border-radius 0.1s ease-in-out,
        background-color 0.1s ease-in-out;
}

.input:hover,
.input:focus-visible {
    background-color: var(--clr-background-mute);
}

.input:hover {
    cursor: pointer;
}

.input:disabled {
    color: var(--clr-text-disabled);
    background-color: var(--clr-background-mute);
}

.input:not(:disabled):focus,
.input:not(:disabled):active {
    border-color: var(--clr-background-3);
    border-radius: 3px;
}
</style>
