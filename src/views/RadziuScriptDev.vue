<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RSystem } from '@/ts/radziuScript/RSystem';

const test = ref<HTMLDivElement>();



const system: RSystem = new RSystem();

function Open() {
    system.Website.OpenWebsite()
}

function Close() {
    system.Website.CloseWebsite()
}




</script>

<template>
    <div ref="test">
        <h1>RadziuScriptDev</h1>
        <button id="open" @click="Open">Open</button>
        <button id="Close" @click="Close">Close</button>
    </div>
</template>

<style scoped></style>