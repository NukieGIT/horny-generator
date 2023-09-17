import type Vector2D from "../utils/Vector2D";
import { BaseClass } from "./FlappyBaseClass";

export class Text extends BaseClass {
    
    private _text : string;
    public get text() : string {
        return this._text;
    }
    public set text(v : string) {
        this._text = v;
    }
    
    private _font : string;
    public get font() : string {
        return this._font;
    }
    public set font(v : string) {
        this._font = v;
    }
    
    private _color : string;
    public get color() : string {
        return this._color;
    }
    public set color(v : string) {
        this._color = v;
    }
    
    private _position : Vector2D;
    public get position() : Vector2D {
        return this._position;
    }
    public set position(v : Vector2D) {
        this._position = v;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.font = this._font;
        ctx.fillStyle = this._color;
        ctx.fillText(this._text, this._position.x, this._position.y);
    }

    constructor(text: string, font: string, color: string, position: Vector2D) {
        super();
        this._text = text;
        this._font = font;
        this._color = color;
        this._position = position;
    }
}