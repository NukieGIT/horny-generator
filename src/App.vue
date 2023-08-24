<script setup lang="ts">
import Header from '@/components/BasicHeader.vue'
</script>

<template>
    <Header />
    <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'none'" mode="out-in">
            <div :key="route.name?.toString()">
                <Suspense>
                    <component :is="Component" />
                    <template #fallback>
                        <h1>loading...</h1>
                    </template>
                </Suspense>
            </div>
        </transition>
    </router-view>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* #wrapper {
        perspective: 300px;
        perspective-origin: 50% 50%;
    } */
</style>
