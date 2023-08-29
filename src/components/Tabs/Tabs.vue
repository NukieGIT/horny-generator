<template>
    <div class="container">
        <div class="tabs">
            <slot :methods="{ switchCurrentTab }" :currentTab="getCurrentTab">
                <div
                    v-for="tab in tabs"
                    :key="tab.uuid"
                    @click="switchCurrentTab(tab)"
                    class="tab"
                    :class="{ selected: tab.uuid === currentTab.uuid }"
                >
                    {{ tab.item.title }}
                </div>
            </slot>
        </div>
        <div class="view">
            <KeepAlive>
                <component :key="currentTab.uuid" :is="currentTab.item.component" />
            </KeepAlive>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import type { TabComponent } from '@/components/Tabs/TabsTypes'
import type { IUUIDItem } from '@/ts/utils/utilityFuncs'

const props = defineProps<{
    tabs: IUUIDItem<TabComponent>[]
}>()

function switchCurrentTab(tab: IUUIDItem<TabComponent>) {
    currentTab.value = tab
}

const currentTab = shallowRef(props.tabs[0])

const getCurrentTab = computed(() => {
    return currentTab.value
})
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
    cursor: pointer;
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
