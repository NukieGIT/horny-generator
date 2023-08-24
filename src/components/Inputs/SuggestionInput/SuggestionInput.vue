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
        <div
            v-show="isVisible"
            @blur="setInvisible"
            tabindex="-1"
            ref="resultsWrapper"
            class="results-wrapper"
        >
            <ul class="results">
                <li
                    v-for="result in filteredResults"
                    ref="result"
                    :key="result.target"
                    :data-target="result.target"
                    class="result"
                    @mouseenter="hover($event.currentTarget as HTMLLIElement, result.target)"
                    @mouseleave="hover(null)"
                    @mousedown="hover($event.currentTarget as HTMLLIElement, result.target)"
                    @click="selectItem"
                >
                    <template
                        v-for="highlightedPartialWord in getHighlightedPartialWords(result)"
                        :key="highlightedPartialWord.uuid"
                    >
                        <span
                            v-if="highlightedPartialWord.item instanceof HighlightedPartialWord"
                            class="highlighted"
                        >
                            {{ highlightedPartialWord.item.partialWord }}
                        </span>
                        <span v-else-if="highlightedPartialWord.item !== ''">
                            {{ highlightedPartialWord.item }}
                        </span>
                    </template>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import fuzzysort from 'fuzzysort'
import UserInput from '@/components/Inputs/UserInput.vue'
import { mod, uuidWrap } from '@/ts/utils/utilityFuncs'
import { HighlightedPartialWord, type ISuggestionInputControls } from './SuggestionInputTypes'
import type { IUUIDItem } from '@/ts/utils/utilityFuncs'
// TODO: keyboard input breaks when input value is equal to "ku"
const props = withDefaults(
    defineProps<{
        modelValue?: string
        submitValue?: string
        resultsData: string[]
        userControls?: ISuggestionInputControls
    }>(),
    {
        userControls: (): ISuggestionInputControls => {
            return {
                up: ['ArrowUp'],
                down: ['ArrowDown'],
                autocomplete: ['Tab'],
                submit: ['Enter'],
                cancel: ['Escape']
            }
        }
    }
)

const emit = defineEmits<{
    'update:modelValue': [payload: string | undefined]
    'update:submitValue': [payload: string]
}>()

const proxyOrLocal = computed(() => {
    if (props.modelValue === undefined) {
        return proxyLocalUserInputValue
    } else {
        return proxyUserInputValue
    }
})

const proxyUserInputValue = computed({
    get(): string | undefined {
        return props.modelValue
    },
    set(value: string | undefined): void {
        emit('update:modelValue', value)
    }
})

const localUserInputValue = ref<string>(props.modelValue ?? '')

const proxyLocalUserInputValue = computed({
    get(): string {
        return localUserInputValue.value
    },
    set(value: string): void {
        localUserInputValue.value = value
    }
})

const resultsWrapper = ref<HTMLDivElement>()
const result = ref<HTMLLIElement[]>()
const isVisible = ref<boolean>(false)
const currentlyFocusedResult = ref<HTMLLIElement>()
const currentItem = ref<string>()

const filteredResults = computed((): Fuzzysort.Results => {
    const results = fuzzysort.go(proxyOrLocal.value.value ?? '', props.resultsData, { limit: 10 })
    return results
})

watch(currentlyFocusedResult, (newVal, oldVal) => {
    if (oldVal !== undefined) {
        oldVal.classList.remove('focused')
    }
    if (newVal !== undefined) {
        newVal.classList.add('focused')
    }
})

function onUserInputFocus(): void {
    setVisible()
}

function onUserInputBlur(e: FocusEvent): void {
    if (e.relatedTarget === resultsWrapper.value) return
    setInvisible()
}

function hover(elem: HTMLLIElement | null, item?: string): void {
    currentItem.value = item
    if (elem === null) {
        currentlyFocusedResult.value = undefined
        return
    }

    currentlyFocusedResult.value = elem
}

function getHighlightedPartialWords(
    result: Fuzzysort.Result
): IUUIDItem<string | HighlightedPartialWord>[] {
    const words = fuzzysort.highlight(result, (m) => new HighlightedPartialWord(m))
    if (words === null) return uuidWrap([])
    return uuidWrap(words)
}

function searchControls(e: KeyboardEvent): void {
    setVisible()
    if (result.value === undefined) return
    if (props.userControls.up.includes(e.key)) {
        e.preventDefault()
        moveHoverInDirection(-1)
    } else if (props.userControls.down.includes(e.key)) {
        e.preventDefault()
        moveHoverInDirection(1)
    } else if (props.userControls.submit.includes(e.key)) {
        selectItem()
    } else if (props.userControls.autocomplete.includes(e.key)) {
        if (currentItem.value === undefined) return
        e.preventDefault()
        setInputValue(currentItem.value)
    } else if (props.userControls.cancel.includes(e.key)) {
        setInvisible()
    }
}

function selectItem(): void {
    if (currentItem.value === undefined) return

    setInputValue(currentItem.value)
    emit('update:submitValue', currentItem.value)
    setInvisible()
}

function setInputValue(value: string): void {
    if (currentItem.value === undefined) return

    proxyOrLocal.value.value = value
}

function moveHoverInDirection(direction: 1 | -1): void {
    if (result.value === undefined) return

    if (currentlyFocusedResult.value === undefined) {
        if (direction === 1) {
            let resultElem: HTMLLIElement | undefined = findHoverElem(filteredResults.value[0].target)
            if (resultElem === undefined) return
            hover(resultElem, filteredResults.value[0].target)
            currentlyFocusedResult.value!.scrollIntoView({ block: 'nearest' })
        } else {
            let resultElem: HTMLLIElement | undefined = findHoverElem(
                filteredResults.value[filteredResults.value.length - 1].target
            )
            if (resultElem === undefined) return
            hover(resultElem, filteredResults.value[filteredResults.value.length - 1].target)
            currentlyFocusedResult.value!.scrollIntoView({ block: 'nearest' })
        }
        return
    }

    if (currentItem.value === undefined) return
    const filteredResultsTarget = filteredResults.value.map((result) => result.target)
    const idx = filteredResultsTarget.indexOf(currentItem.value)
    const newIdx = mod(idx + direction, filteredResults.value.length)
    let resultElem: HTMLLIElement | undefined = findHoverElem(filteredResults.value[newIdx].target)
    if (resultElem === undefined) return
    hover(resultElem, filteredResults.value[newIdx].target)
    currentlyFocusedResult.value?.scrollIntoView({ block: 'nearest' })
}

function findHoverElem(value: string): HTMLLIElement | undefined {
    if (result.value === undefined) return;
    let resultElem: HTMLLIElement | undefined
    for (const elem of result.value) {
        if (elem.dataset.target === value) {
            resultElem = elem
            break
        }
    }
    return resultElem
}

function setInvisible(): void {
    hover(null)
    isVisible.value = false
}

function setVisible(): void {
    isVisible.value = true
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
