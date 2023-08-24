<script setup lang="ts">
import SuggestionInput from '@/components/Inputs/SuggestionInput/SuggestionInput.vue'
import { onMounted, ref } from 'vue'
import { v4 } from "uuid";
import { fetchCharacterCard, fetchCharacterData } from '@/ts/radziuScript/GenshinInfoAPI/RGenshin'
import {
    IGenshinCharacterInfoDefault,
    type ICharacterCardProps
} from '@/ts/radziuScript/GenshinInfoAPI/RGenshinCharacterInfoTypes'
import CharacterCard from '@/components/CharacterCard.vue'
import UserButton from '@/components/Inputs/UserButton.vue'

const data = ref<string[]>([])
const characterCardProps = ref<ICharacterCardProps>({
    characterData: IGenshinCharacterInfoDefault
})
onMounted(async () => {
    data.value = await fetch('https://genshin.jmp.blue/characters').then((res) => res.json())
    if (data.value === undefined) data.value = []
})
async function fetchCharacter(value: string) {
    if (value === undefined) return

    const char: string = value.toLowerCase()
    characterCardProps.value.characterData = await fetchCharacterData(char)

    const img: Blob = await fetchCharacterCard(char)
    characterCardProps.value.characterCard = URL.createObjectURL(img)
}
</script>

<template>
    <div>
        <form @submit.prevent>
            <SuggestionInput @update:submit-value="fetchCharacter($event)" :results-data="data!" />
            <UserButton @click="data.push(`test+${v4()}`)">
                Test
            </UserButton>
        </form>
        <CharacterCard v-bind="characterCardProps" />
    </div>
</template>

<style scoped></style>
