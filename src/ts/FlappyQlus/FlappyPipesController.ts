import { random } from "lodash";
import Vector2D from "../utils/Vector2D";
import { getRandomArbitrary } from "../utils/utilityFuncs";
import { BaseClass } from "./FlappyBaseClass";
import { Pipe } from "./FlappyPipe";
import { Time } from "./Time";

export class PipeController extends BaseClass {
    private _startPosition: Vector2D;
    private _endPosition: Vector2D;
    private _pipe1: Pipe;
    private _pipe2: Pipe;
    private _speed: number;

    private _gap: number = 400;
    private _minY: number = 3;
    
    public get startPosition(): Vector2D {
        return this._startPosition;
    }
    public set startPosition(value: Vector2D) {
        this._startPosition = value;
    }
    public get endPosition(): Vector2D {
        return this._endPosition;
    }
    public set endPosition(value: Vector2D) {
        this._endPosition = value;
    }

    public get pipe1(): Pipe {
        return this._pipe1;
    }
    public set pipe1(value: Pipe) {
        this._pipe1 = value;
    }

    public get pipe2(): Pipe {
        return this._pipe2;
    }
    public set pipe2(value: Pipe) {
        this._pipe2 = value;
    }   
    public get speed(): number {
        return this._speed;
    }
    public set speed(v: number) {
        this._speed = v;
    }

    constructor(speed:number, startPosition: Vector2D, endPosition: Vector2D, size: Vector2D) {
        super();
        this._startPosition = startPosition;
        this._endPosition = endPosition;
        this._pipe1 = new Pipe(new Vector2D(0, 0), size);
        this._pipe2 = new Pipe(new Vector2D(0, 0), size);
        this._speed = speed;

        this.randomizePipeYPosition();
    }

    public update(): void {
        this.MovePipes();
        this.ResetPipes();   
    }

    public render(ctx: CanvasRenderingContext2D): void {
        this._pipe1.render(ctx);
        this._pipe2.render(ctx);
    }

    private MovePipes() {
        this._pipe1.position.x -= this._speed * Time.deltaTime;
        this._pipe2.position.x -= this._speed * Time.deltaTime;
    }

    private ResetPipes() {
        if (!(this._pipe1.position.x + this._pipe1.size.x < this._endPosition.x)) return;
     
        this.resetPipeXPosition();
        this.randomizePipeYPosition();
    }
    
    private randomizePipeYPosition() {
        const randomYPos: number = getRandomArbitrary(this._minY - this.pipe1.size.y, this._minY - this._gap);
        
        this._pipe1.position = new Vector2D(this.pipe1.position.x, randomYPos);
        this._pipe2.position = new Vector2D(this.pipe2.position.x, randomYPos + this._pipe2.size.y + this._gap);
    }

    private resetPipeXPosition() {
        this._pipe1.position = new Vector2D(this._startPosition.x, this._pipe1.position.y);
        this._pipe2.position = new Vector2D(this._startPosition.x, this._pipe2.position.y);

        this._gap = this._gap <= 70 ? 500 : this._gap - 10
    }

}