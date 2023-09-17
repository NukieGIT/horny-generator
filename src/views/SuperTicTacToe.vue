<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import { BoardModel } from '@/ts/TicTacToe/BoardModel';
import { GameSettings } from '@/ts/TicTacToe/GameSettings';
import { MapNode } from '@/ts/TicTacToe/MapNode';
import { Player } from '@/ts/TicTacToe/Player';
import { CompareByValueMap } from '@/ts/utils/CompareByValueMap';
import Vector2D from '@/ts/utils/Vector2D';

const player1 = new Player('Player 1', 'X', "rgb(255, 0, 0)");
const player2 = new Player('Player 2', 'O', "rgb(0, 0, 255)");

const players = [player1, player2];

const settings = new GameSettings(new Vector2D(3, 3), players, 3);

const boardModel = new BoardModel(settings);

</script>

<style scoped>

div {
    background-color: var(--clr-background-mute);
    width: 50vh;
    height: 50vh;
}

</style>