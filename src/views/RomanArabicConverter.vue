<script setup lang="ts">
import { ref } from 'vue';
import { convert as conversionAPI } from "@/ts/romanConversionAPI/conversionAPI";
import { addingRomans, addedRomanNumbers } from "@/ts/romanConversionAPI/romanToArabicExtension";
const userNumber = ref<string>('');

function convert() {
    result.value = conversionAPI(userNumber.value.toUpperCase());
}

const result = ref<string>('');

//testest
const userLetter = ref<string>('');
const userAddedNumber = ref<number>(0);

function addNumber() {
    addingRomans(userLetter.value.toUpperCase(), userAddedNumber.value)
}

</script>

<template>
    <div class="container">
        <div class="split">
            <form @submit.prevent="convert" >
                <label for="number">Number:</label>
                <input type="text" autocomplete="off" id="number" v-model="userNumber"/><br>
                <button type="submit">Convert</button>
            </form>
            <br>
            <h3>Testing Grounds</h3>
            <form @submit.prevent="addNumber" >
                <label for="number">Letter:</label>
                <input type="text" id="number" v-model="userLetter"/><br>
        
                <label for="number">Number:</label>
                <input type="number" id="number" v-model="userAddedNumber"/><br>
                <button type="submit">Add</button>
            </form>
            <h1 v-if="result">result: {{ result }}</h1>
        
            <li v-for="added in addedRomanNumbers">
                {{ added[0] }} -> {{ added[1] }}
            </li>
        </div>
        <div class="split">
            <p>Converts Arabic numbers to Roman numerals and vice versa.</p>
        </div>
    </div>
</template>

<style scoped>

.container {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.split {
    margin: 0 var(--space-md);
    width: 50%;
}

@media screen and (max-width: 800px) {
    .container {
        flex-direction: column;
    }

    .split {
        margin: var(--space-md);
    }
}

</style>
