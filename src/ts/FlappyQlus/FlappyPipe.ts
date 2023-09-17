import type Vector2D from "../utils/Vector2D";
import { BaseClass } from "./FlappyBaseClass";

export class Pipe extends BaseClass {
    private _position: Vector2D;
    private _size: Vector2D;

    
    
    public get position(): Vector2D {
        return this._position;
    }
    public set position(v: Vector2D) {
        this._position = v;
    }


    public get size(): Vector2D {
        return this._size;
    }
    public set size(value: Vector2D) {
        this._size = value;
    }
    
    constructor(position: Vector2D, size: Vector2D) {
        super();
        this._position = position;
        this._size = size;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "green";
        ctx.fillRect(this._position.x, this._position.y, this._size.x, this._size.y);
    }


}