<template>
    <main>
        <h1>Flappy Qlus</h1>
        <div>
            <canvas ref="canvas" :width="CANVAS_SIZE.x" :height="CANVAS_SIZE.y" @click="player.jump"></canvas>
        </div>
    </main>
</template>

<script setup lang="ts">
import Vector2D from '@/ts/utils/Vector2D';
import { getRandomArbitrary } from "@/ts/utils/utilityFuncs";
import { onMounted, ref } from 'vue';

import { Points } from '@/ts/FlappyQlus/FlappyPoints';
import { Text } from "@/ts/FlappyQlus/FlappyText";
import { Time } from '@/ts/FlappyQlus/Time';
import { BaseRunner } from '@/ts/FlappyQlus/FlappyBaseRunner';
import { PipeController } from '@/ts/FlappyQlus/FlappyPipesController';
import { Player } from '@/ts/FlappyQlus/FlappyPlayer';
import { DeltaTimeTest } from '@/ts/FlappyQlus/FlappyDeltaTimeTest';
import { Pipe } from '@/ts/FlappyQlus/FlappyPipe';
import type EventArgs from '@/ts/events/EventArgs';
import type IEventHandler from '@/ts/events/IEventHandler';


const CANVAS_SIZE = ref<Vector2D>(new Vector2D(1000, 700));

const canvas = ref<HTMLCanvasElement>();
const ctx = ref<CanvasRenderingContext2D | null>();

const flappyPipesController = new PipeController(600, new Vector2D(CANVAS_SIZE.value.x, 0), new Vector2D(0, 0), new Vector2D(100, CANVAS_SIZE.value.y));

const player = new Player(new Vector2D(300, 100), 4.5, 10, flappyPipesController);
const text = new Text("Hello World", "20px Arial", "white", new Vector2D(50, 50))
const deltaTimeTest = new DeltaTimeTest(text)

player.onCollisionEnterWithPipes.subscribe((_, __) => {
    if (!confirm("bai")) {
        window.location.reload();
        return;
    }
    window.location.href = "https://bitly.com/98K8eH";
})

onMounted(() => {
    // if (canvas.value === undefined) return
    canvas.value?.focus();
    ctx.value = canvas.value?.getContext("2d")!;

    const flappyRunner = BaseRunner.tryCreate(ctx.value)
    if (flappyRunner === null) throw new Error("Failed to create flappy runner");

    flappyRunner.add(player, deltaTimeTest, text, flappyPipesController);

    flappyRunner.init();
});



const flappyPointerCounterUwu: Points = new Points();

console.log(flappyPointerCounterUwu.scoreCount);

</script>

<style scoped>
main {
    border: 1px solid var(--clr-accent-primary);
    /* width: 50%;
    height: 80vh; */

    text-align: center;
    padding: var(--space-sm);
}

main>div {
    margin: var(--space-sm);

    display: flex;
    justify-content: center;
    align-items: center;
}

canvas {
    background-color: var(--clr-background-mute);
    border: 1px solid var(--clr-accent-primary);

}
</style>