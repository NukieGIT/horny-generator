import { Pipe } from "./FlappyPipe";
import { BaseClass } from "./FlappyBaseClass";
import type { Player } from "./FlappyPlayer";

export class Points extends BaseClass{

    private _scoreCounter: number;
    private _crossedPipes: boolean = false;

    
    public get scoreCount() : number {
        return this._scoreCounter;
    }
    public set scoreCount(v : number) {
        this._scoreCounter = v;
    }
    public get crossedPipes() : boolean {
        return this._crossedPipes;
    }
    public set crossedPipes(v : boolean) {
        this._crossedPipes = v;
    }

    constructor() {
        super();
        this._scoreCounter = 0;
    }

    public addScore() {
        if (this._crossedPipes) this._scoreCounter++;
        this._crossedPipes = false;
    }
}