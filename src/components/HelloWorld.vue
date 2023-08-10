<script setup lang="ts">
defineProps<{
    msg: string
}>()
</script>

<template>
    <h1>{{ msg }}</h1>
</template>

<style scoped>
h1 {
    color: red;
    padding: 0;
    margin: 0;
}
</style>
