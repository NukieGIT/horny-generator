<template>
    <input
        type="text"
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
    color: var(--clr-text-1);
    width: 400px;
    padding: 10px 10px;
    font-size: 18px;
    margin: var(--space-xs);
    background-color: var(--clr-background-soft);
    border: 1px solid var(--clr-background-1);
    outline: none;
    transition: border-color 0.2s ease-in-out, border-radius 0.2s ease-in-out;
}

.input:focus,
.input:active {
    border-color: var(--clr-background-3);
    border-radius: 3px;
}
</style>
