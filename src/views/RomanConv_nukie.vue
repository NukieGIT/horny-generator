<script setup lang="ts">
import { computed, ref } from 'vue'
import { convert } from '@/ts/romanConversionAPI/arabicToRoman'

const userNumber = ref<string>('')
const getUserNumber = computed(() => userNumber.value.toUpperCase())

const result = ref<string>('')

function convertYourMother() {
    result.value = convert(parseInt(getUserNumber.value, 10))
}
</script>

<template>
    <h1>Nukie Roman Converter</h1>
    <p>Converts numbers to roman numerals and vice versa.</p>
    <form @submit.prevent="convertYourMother">
        <label for="number">Number:</label>
        <input type="text" autocomplete="off" id="number" v-model="userNumber" />
        <br />
        <button type="submit">Convert</button>
    </form>
    <h1 v-if="result">result: {{ result }}</h1>
</template>

<style scoped></style>
