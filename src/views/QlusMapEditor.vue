<template>
    <main>
        <div ref="canvasContainer" class="canvas-container"
            :style="{ width: `${CANVAS_SIZE.x}px`, height: `${CANVAS_SIZE.y}px` }">
            <canvas :width="CANVAS_SIZE.x" :height="CANVAS_SIZE.y" ref="canvasGrid" />
            <canvas :width="CANVAS_SIZE.x" :height="CANVAS_SIZE.y" ref="canvasDrawable" @mousedown.left="startPaint"
                @mousemove="onMove" @mouseup.left="stopPaint" @mousedown.right="startClear" @mouseup.right="stopClear"
                @contextmenu.prevent />
        </div>
        <div class="toolbar">
            <input v-model="color" type="color">
            <UserButton title="copy canvas" @click="UwU">UwU</UserButton>
            <UserButton title="paste canvas" @click="loadData">TwT</UserButton>
            <UserButton title="clear canvas" @click="ClearCanvas">QwQ</UserButton>
            <UserButton title="randomise canvas" @click="RandomCanvas">OwO</UserButton>
        </div>
    </main>
</template>


<script setup lang="ts">
import UserButton from '@/components/Inputs/UserButton.vue';
import { onMounted, ref } from 'vue';
import Vector2D from '@/ts/utils/Vector2D';


// Variable
const color = ref<string>("#047fcc");

const CANVAS_SIZE = ref<Vector2D>(new Vector2D(550, 605));
const grid = 50;

const CELL_SIZE = Math.round(Math.min(CANVAS_SIZE.value.x, CANVAS_SIZE.value.y) / grid);

const canvasDrawable = ref<HTMLCanvasElement>();
const ctxDrawable = ref<CanvasRenderingContext2D | null>();



// Creating grid and variable relations to contexts of canvases
onMounted(() => {
    ctxDrawable.value = canvasDrawable.value?.getContext("2d");
    ctxGrid.value = canvasGrid.value?.getContext("2d");

    CreateGrid();
})


// Grid canvas and grid canvas context relations as variables
const canvasGrid = ref<HTMLCanvasElement>();
const ctxGrid = ref<CanvasRenderingContext2D | null>();


// FUNCTIONS

function centerMouseVector(mouseVector: Vector2D) {
    return new Vector2D(mouseVector.x - CELL_SIZE * 0.5, mouseVector.y - CELL_SIZE * 0.5)
}

function ClickCell(e: MouseEvent) {
    const clickVector: Vector2D = mouseToVector2d(e);
    const centeredClickVector: Vector2D = centerMouseVector(clickVector);

    DrawCell(SnapToGrid(centeredClickVector));
}


const noState: (e: MouseEvent) => void = (e: MouseEvent) => { };
const currentState = ref<(e: MouseEvent) => void>(noState);

function onMove(e: MouseEvent) {
    currentState.value(e)
}

function startPaint(e: MouseEvent) {
    currentState.value = ClickCell;
    ClickCell(e);
}

function stopPaint(e: MouseEvent) {
    currentState.value = currentState.value === ClickCell ? noState : currentState.value;
}

function startClear(e: MouseEvent) {
    currentState.value = clearCell;
    clearCell(e);
}

function stopClear(e: MouseEvent) {
    currentState.value = currentState.value === clearCell ? noState : currentState.value;
}


function mouseToVector2d(e: MouseEvent) {
    const rect = canvasDrawable.value?.getBoundingClientRect();
    let x = e.clientX - rect!.left;
    let y = e.clientY - rect!.top;
    const clickVector: Vector2D = new Vector2D(x, y);
    return clickVector;
}

function SnapToGrid(vector2d: Vector2D) {
    const snappedVector: Vector2D = new Vector2D(0, 0);
    snappedVector.x = Math.round(vector2d.x / CELL_SIZE) * CELL_SIZE;
    snappedVector.y = Math.round(vector2d.y / CELL_SIZE) * CELL_SIZE;

    // let flag1 = false;
    // let flag2 = false;

    // const tick = performance.now();
    // for (let i = 0; i < snaps.length; i++) {

    //     const xCheck = Math.abs(vector2d.x - snaps[i]) < CELL_SIZE;
    //     const yCheck = Math.abs(vector2d.y - snaps[i]) < CELL_SIZE;

    //     if (xCheck) {
    //         flag1 = true;
    //         vector2d.x = snaps[i];
    //     }

    //     if (yCheck) {
    //         flag2 = true;
    //         vector2d.y = snaps[i];
    //     }

    //     if (flag1 && flag2) {
    //         break;
    //     }
    // }
    // const tock = performance.now();
    // console.log(`Time old: ${tock - tick}ms`);

    return snappedVector;
}

function DrawCell(vector2d: Vector2D) {
    ctxDrawable.value!.beginPath();
    ctxDrawable.value!.fillStyle = color.value;
    ctxDrawable.value!.rect(vector2d.x, vector2d.y, CELL_SIZE, CELL_SIZE);
    ctxDrawable.value!.fill();
}

function clearCell(e: MouseEvent) {
    const clickVector: Vector2D = mouseToVector2d(e);
    const centeredClickVector: Vector2D = centerMouseVector(clickVector);

    const snappedVector: Vector2D = SnapToGrid(centeredClickVector);

    ctxDrawable.value?.clearRect(snappedVector.x, snappedVector.y, CELL_SIZE, CELL_SIZE);
}

function CreateGrid() {
    if (ctxGrid.value === null || ctxGrid.value === undefined) return;

    const gridtik = performance.now();

    ctxGrid.value.beginPath();
    ctxGrid.value.strokeStyle = '#202020';
    for (let x = CELL_SIZE; x <= CANVAS_SIZE.value.x; x += CELL_SIZE) {
        for (let y = CELL_SIZE; y <= CANVAS_SIZE.value.y; y += CELL_SIZE) {
            ctxGrid.value.moveTo(x, 0);
            ctxGrid.value.lineTo(x, CANVAS_SIZE.value.y);
            ctxGrid.value.moveTo(0, y);
            ctxGrid.value.lineTo(CANVAS_SIZE.value.x, y);
        }
    }
    ctxGrid.value.stroke();

    const gridtok = performance.now();
    console.log(`grid tiktok: ${gridtok - gridtik}ms`);
}

function UwU() {
    console.log("omg daddy me wove you so much uwuwuwuw");

    const canvasData = canvasDrawable.value?.toDataURL();
    
    navigator.clipboard.writeText(canvasData ?? "");
}

async function loadData() {
    const data = await navigator.clipboard.readText();
    const img = new Image();
    img.onload = () => {
        ctxDrawable.value?.drawImage(img, 0, 0);
    }
    img.src = data;
}

function RandomCanvas() {

    for (let i = 0; i < 10; i++) {
        const randomVector = new Vector2D(Math.floor(Math.random() * CANVAS_SIZE.value.x), Math.floor(Math.random() * CANVAS_SIZE.value.y));

        color.value = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        DrawCell(SnapToGrid(randomVector));
        
    }

    // for (let i = 0; i < CANVAS_SIZE.value.x; i++) {
    //     for (let j = 0; j < CANVAS_SIZE.value.y; j++) {
    //         const randomPixel = Math.random() > 0.9;
    //         if (!randomPixel) continue;
    
    //         color.value = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    //         DrawCell(SnapToGrid(new Vector2D(i * CELL_SIZE, j * CELL_SIZE)));
    //     }
    // }
}

function ClearCanvas() {
    console.log("I cry T^T");
    ctxDrawable.value?.clearRect(0, 0, CANVAS_SIZE.value.x, CANVAS_SIZE.value.y);
}

</script>

<style scoped>
main {
    padding: var(--space-md);
    display: flex;
    flex-direction: row;
}

canvas {
    border: 1px solid var(--clr-accent-primary);
    position: absolute;
}

.canvas-container {
    position: relative;
}

.toolbar {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--clr-background-mute);
    min-width: 400px;
}

.tabs-test {
    min-width: 100%;
}

.active {
    color: var(--clr-accent-secondary);
}
</style>