<template>

<div class="container">
    <div class="tabs">
        <slot :tabTitles="tabTitles">
            <div v-for="tab in tabs" @click="currentTab = tab.component" class="tab" :class="{ selected: tab.component === currentTab }">
                {{ tab.title }}
            </div>
        </slot>
    </div>
    <div class="view">
        <component :is="currentTab" />
    </div>
</div>

</template>

<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue';
import type { TabComponent } from '@/components/Tabs/TabsTypes';

const props = defineProps<{
    tabs: TabComponent[];
}>();

const tabTitles = computed(() => {
    return props.tabs.map(tab => tab.title);
})

const currentTab = shallowRef(props.tabs[0].component);

</script>

<style scoped>

.container {
    display: flex;
    flex-direction: column;
}

.view {
    background-color: var(--clr-background-mute);
}

.tabs {
    display: flex;
    flex-direction: row;
}

.tab {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--clr-background-soft);
    min-width: 120px;
    padding: 15px 20px;
}

.tab.selected {
    background-color: var(--clr-background-mute);
}

.tab:hover {
    background-color: var(--clr-background-1);
}

</style>