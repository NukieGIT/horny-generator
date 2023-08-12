<script setup lang="ts">
import Header from './components/Header.vue';

</script>

<template>
    <Header />
    <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'none'" mode="out-in">
            <div :key="route.name?.toString()">
                <component :is="Component" />
            </div>
        </transition>
    </router-view>
</template>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

</style>
