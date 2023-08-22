<template>
    <div id="heroCardInfo">
        <Transition name="slide-from-right" mode="out-in">
            <img id="heroCardImg" :src="characterCard" v-if="show">
        </Transition>
        <button @click="show = !show">Działaj</button>
        <ul>
            <li>
                Name: {{ characterData.name }}
            </li>
            <li>
                Description: {{ characterData.description }}
            </li>
            <li>
                Gender: {{ characterData.gender }}
            </li>
            <li>
                Rarity: <span :class="{ 'rarity-5': characterData.rarity === 5, 'rarity-4': characterData.rarity === 4 }">{{ getCharacterStars }} </span>
            </li>
            <li>
                Weapon: {{ characterData.weapon }}
            </li>
            <li>
                Vision Element: <span :class="getVisionColorClass"> {{ characterData.vision }} </span>
            </li>
            <li>
                Nation: {{ characterData.nation }}
            </li>
            <li>
                Constellation: {{ characterData.constellation }}
            </li>
            <li>
                Affiliation: {{ characterData.affiliation }}
            </li>
            <li>
                Birthday: {{ characterData.birthday }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { ICharacterCardProps } from '@/ts/radziuScript/GenshinInfoAPI/RGenshinCharacterInfoTypes';
import { computed, ref } from 'vue';

const props = defineProps<ICharacterCardProps>();

const show = ref<boolean>(true);

const getCharacterStars = computed(() => {
    return "★".repeat(props.characterData.rarity);
});

const getVisionColorClass = computed(() => ({
    "pyro": props.characterData.vision == "Pyro",
    "hydro": props.characterData.vision == "Hydro",
    "electro": props.characterData.vision == "Electro",
    "anemo": props.characterData.vision == "Anemo",
    "cryo": props.characterData.vision == "Cryo",
    "geo": props.characterData.vision == "Geo",
    "dendro": props.characterData.vision == "Dendro",
}));

</script>

<style scoped>

.slide-from-right-enter-active,
.slide-from-right-leave-active {
    transition: all 0.5s ease;
}

.slide-from-right-enter,
.slide-from-right-leave-to {
    transform: translateX(45%);
    opacity: 0;
}


.rarity-4 {
    color: rgb(139, 62, 202);
}

.rarity-5 {
    color: gold;
}

#heroCardImg {
    height: auto;
    width: 50%;
    object-fit: cover;
    border-radius: 10px 0 0 10px;
}

#heroCardInfo {
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 45%;
    background-color: var(--clr-background-2);
    border-radius: 10px;
    box-shadow: 0 0 10px #000;
}

.pyro {
    color: red;
}

.hydro {
    color: blue;
}

.electro {
    color: purple;
}

.anemo {
    color: rgb(3, 252, 136);
}

.cryo {
    color: cyan;
}

.geo {
    color: orange;
}

.dendro {
    color: lime;
}
</style>