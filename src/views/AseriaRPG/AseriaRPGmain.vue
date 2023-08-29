<template>
    <Tabs :tabs="tabs" v-slot="{ methods, currentTab }">
        <div
            v-for="(tab, i) in tabs"
            :key="tab.uuid"
            @click="methods.switchCurrentTab(tab)"
            class="tab"
            :class="{ selected: tab.uuid === currentTab.uuid }"
        >
            {{ getTabNameWithNum(tab, i) }}
        </div>
        <div class="new-tab" @click="test">+</div>
    </Tabs>
    uwu?
</template>

<script setup lang="ts">
import CharacterCreation from '@/components/AseriaRPG/CharacterCreation.vue'
import CharacterLoader from '@/components/AseriaRPG/CharacterLoader.vue'
import Tabs from '@/components/Tabs/Tabs.vue'
import { ref, shallowRef } from 'vue'
import RadziuScriptDev from '../RadziuScriptDev.vue'
import type { TabComponent } from '@/components/Tabs/TabsTypes'
import { uuidWrap, uuidWrapSingle, type IUUIDItem } from '@/ts/utils/utilityFuncs'

function getTabNameWithNum(tab: IUUIDItem<TabComponent>, tabIndex: number) {
    const indexes: number[] = [];
    let thisIndex: number = 0;

    for (let i = 0; i < tabs.value.length; i++) {
        const element = tabs.value[i];
        if (element.item.title === tab.item.title) {
            indexes.push(i);
        }
        if (element.uuid === tab.uuid) {
            thisIndex = i;
        }
    }

    if (indexes.length > 1) {
        console.log(indexes);
        
        return `${tab.item.title} (${indexes[0] + 1})`;
    }

    return tab.item.title;
}

const tabs = ref(
    uuidWrap<TabComponent>([
        {
            title: 'Character Creation',
            component: shallowRef(CharacterCreation)
        },
        {
            title: 'Character Loader',
            component: shallowRef(CharacterLoader)
        }
    ])
)

function test() {
    const tab = ref(
        uuidWrapSingle({
            title: 'RadziuScriptDev',
            component: shallowRef(RadziuScriptDev)
        })
    )
    tabs.value.push(tab.value)
}
</script>

<style scoped>
.tab {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--clr-background-soft);
    min-width: 120px;
    padding: 15px 20px;
}

.new-tab {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--clr-background-soft);
    min-width: 20px;
    padding: 15px 20px;
    border-left: 1px solid var(--clr-background-1);
}

.tab.selected {
    background-color: var(--clr-background-mute);
}

.new-tab:hover,
.tab:hover {
    background-color: var(--clr-background-1);
}
</style>
