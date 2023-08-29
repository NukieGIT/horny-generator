<template>
    <form>
        <UserInput v-model="name" placeholder="Name" />
        <UserInput v-if="!character.isSpecialSurname" placeholder="Surname" />
        <UserInput v-model="surname" v-else placeholder="Surname" disabled />
    </form>
    <UserInput v-model="tries" type="number" placeholder="Tries Amount" />
    <UserButton @click="testRun">Chance Test</UserButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserInput from '../Inputs/UserInput.vue'
import UserButton from '../Inputs/UserButton.vue';
import { CharacterCreator } from '@/ts/AseriaRPG/characterCreator'
import { logData, runTest } from "@/ts/AseriaRPG/characterSurnamesTests/characterSurnamesTest";

const name = ref<string>('')
const surname = ref<string>('')

const character = ref<CharacterCreator>(new CharacterCreator())

if (character.value.isSpecialSurname) {
    surname.value = character.value.surname
}


const tries = ref<string>("1")
async function testRun() {
    const res = await runTest(parseInt(tries.value))
    logData(res);
}
    

</script>

<style scoped></style>
