<template>

    <div class="wrapper">
        <UserInput
            id="user-input"
            autocomplete="off"
            placeholder="Character Name"
            :modelValue="proxyOrLocal.value"
            @update:modelValue="proxyOrLocal.value = $event"
            @focus="onUserInputFocus"
            @blur="onUserInputBlur"
            @keydown="searchControls"
            @click="setVisible"
        />
        <div v-show="isVisible" @blur="setInvisible" tabindex="-1" ref="resultsWrapper" class="results-wrapper">
            <ul class="results">
                <li
                    v-for="result in filteredResults"
                    ref="result"
                    :key="result.target"
                    class="result"
                    @mouseenter="hover($event.currentTarget as HTMLLIElement, result.target)"
                    @mouseleave="hover(null)"
                    @mousedown="hover($event.currentTarget as HTMLLIElement, result.target)"
                    @click="selectItem"
                >
                    <template v-for="highlightedPartialWord in getHighlightedPartialWords(result)">
                        <span v-if="(highlightedPartialWord instanceof HighlightedPartialWord)" class="highlighted">{{ highlightedPartialWord.partialWord }}</span>
                        <span v-else-if="highlightedPartialWord !== ''">{{ highlightedPartialWord }}</span>
                    </template>
                </li>
            </ul>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import fuzzysort from "fuzzysort";
import UserInput from '@/components/Inputs/UserInput.vue';
import { mod } from "@/ts/utils/utilityFuncs";
import { HighlightedPartialWord, type ISuggestionInputControls } from './SuggestionInputTypes';
// TODO: keyboard input breaks when input value is equal to "ku"
const props = withDefaults(defineProps<{ modelValue?: string, submitValue?: string, resultsData: string[], userControls?: ISuggestionInputControls}>(), {
    userControls: (): ISuggestionInputControls => {
        return {
            up: ["ArrowUp"],
            down: ["ArrowDown"],
            autocomplete: ["Tab"],
            submit: ["Enter"],
            cancel: ["Escape"]
        };
    }
});

const emit = defineEmits<{
    "update:modelValue": [payload: string | undefined]
    "update:submitValue": [payload: string]
}>();

const proxyOrLocal = computed(() => {
    if (props.modelValue === undefined) {
        return proxyLocalUserInputValue;
    } else {
        return proxyUserInputValue;
    }
})

const proxyUserInputValue = computed({
    get(): string | undefined {
        return props.modelValue;
    },
    set(value: string | undefined) {
        emit("update:modelValue", value);
    }
})

const localUserInputValue = ref<string>(props.modelValue ?? "");

const proxyLocalUserInputValue = computed({
    get(): string {
        return localUserInputValue.value;
    },
    set(value: string) {
        localUserInputValue.value = value;
    }
})

const resultsWrapper = ref<HTMLDivElement>();
const result = ref<HTMLLIElement[]>();
const isVisible = ref<boolean>(false);
const currentlyFocusedResult = ref<HTMLLIElement>();
const currentItem = ref<string>();

const filteredResults = computed(() => {
    if (proxyOrLocal.value.value === "" || proxyOrLocal.value.value === undefined) return [];
    const results = fuzzysort.go(proxyOrLocal.value.value, props.resultsData, { limit: 10 });
    return results;
})

watch(currentlyFocusedResult, (newVal, oldVal) => {
    if (oldVal !== undefined) {
        oldVal.classList.remove("focused");
    }
    if (newVal !== undefined) {
        newVal.classList.add("focused");
    }
})

function onUserInputFocus(e: FocusEvent) {
    setVisible();
}

function onUserInputBlur(e: FocusEvent) {
    if (e.relatedTarget === resultsWrapper.value) return;
    setInvisible();
}

function hover(elem: HTMLLIElement | null, item?: string) {
    currentItem.value = item;
    if (elem === null) {
        currentlyFocusedResult.value = undefined;
        return;
    }

    currentlyFocusedResult.value = elem;
}

function getHighlightedPartialWords(result: Fuzzysort.Result) {
    return fuzzysort.highlight(result, (m) => new HighlightedPartialWord(m))
}

function searchControls(e: KeyboardEvent) {
    setVisible();
    if (result.value === undefined) return;
    if (props.userControls.up.includes(e.key)) {
        e.preventDefault();
        moveHoverInDirection(-1);
    } else if (props.userControls.down.includes(e.key)) {
        e.preventDefault();
        moveHoverInDirection(1);
    } else if (props.userControls.submit.includes(e.key)) {
        selectItem();
    } else if (props.userControls.autocomplete.includes(e.key)) {
        if (currentItem.value === undefined) return;
        e.preventDefault();
        setInputValue(currentItem.value)
    } else if (props.userControls.cancel.includes(e.key)) {
        setInvisible();
    }
}

function selectItem() {
    if (currentItem.value === undefined) return;

    setInputValue(currentItem.value);
    emit("update:submitValue", currentItem.value);
    setInvisible();
}

function setInputValue(value: string) {
    if (currentItem.value === undefined) return;

    proxyOrLocal.value.value = value;
}

function moveHoverInDirection(direction: 1 | -1) {
    if (result.value === undefined) return;

    if (currentlyFocusedResult.value === undefined) {
        if (direction === 1) {
            hover(result.value[0], filteredResults.value[0].target);
            currentlyFocusedResult.value!.scrollIntoView({ block: "nearest" })
        } else {
            hover(result.value[result.value.length - 1], filteredResults.value[filteredResults.value.length - 1].target);
            currentlyFocusedResult.value!.scrollIntoView({ block: "nearest" })
        }
        return;
    }
    
    const idx = result.value.indexOf(currentlyFocusedResult.value);
    const newIdx = mod(idx + direction, result.value.length);
    hover(result.value[newIdx], filteredResults.value[newIdx].target);
    currentlyFocusedResult.value?.scrollIntoView({ block: "nearest" })
}

function setInvisible() {
    hover(null);
    isVisible.value = false;
}

function setVisible() {
    isVisible.value = true;
}

</script>

<style scoped>

    .wrapper {
        position: relative;
        display: inline-block;
    }

    #user-input {
        margin: 1px 0 1px 0;
    }

    .results-wrapper {
        position: absolute;
        border-radius: 3px;
        min-width: 100%;
        max-width: 200%;
        overflow-y: auto;
        background-color: var(--clr-background-mute);
    }

    .results {
        list-style: none;
    }

    .result {
        white-space: nowrap;
        cursor: pointer;
        min-height: 30px;
        display: flex;
        align-items: center;
        flex-direction: row;
    }

    .highlighted {
        color: var(--clr-accent-primary);
        font-weight: bold;
    }

    .focused {
        background-color: var(--clr-background-2);
        border-radius: 3px;
    }

</style>