<template>
    <Header />
    <div :class="{ 'transition-overflow': disableOverflow }">
        <router-view v-slot="{ Component, route }">
            <transition :name="route.meta.transition || 'none'" mode="out-in" @before-enter="onBeforeEnter" @before-leave="onBeforeLeave" @after-enter="onAfterEnter" @after-leave="onAfterLeave">
                <div :key="route.name?.toString()">
                    <component :is="Component" />
                </div>
            </transition>
        </router-view>
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/BasicHeader.vue'
import { ref } from 'vue';

const disableOverflow = ref<boolean>(false);

function onBeforeEnter() {
    disableOverflow.value = false;
}

function onAfterEnter() {
    disableOverflow.value = false;
}

function onBeforeLeave() {
    disableOverflow.value = true;
}

function onAfterLeave() {
    disableOverflow.value = true;
}

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.dash-enter-active {
    animation: dashing-right-in .5s ease;
}

.dash-leave-active {
    animation: dashing-right-out .5s ease-in;
}


@keyframes dashing-right-in {
    0% {
        transform: translate(-100vw);

    }

    65% {
        transform: translate(100px);
    }

    100% {
        transform: translate(0);
    }
}

@keyframes dashing-right-out {
    0% {
        transform: translate(0);
    }
    100% {
        transform: translate(100vw);
        
    }
}




.transition-overflow {
    overflow: hidden;
}

</style>
