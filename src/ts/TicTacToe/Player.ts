import { v4 as uuidv4 } from "uuid";
import type { Color } from "./Color";

export class Player {
    
    private _name : string;
    public get name() : string {
        return this._name;
    }
    public set name(v : string) {
        this._name = v;
    }

    private _shape : string;
    public get shape() : string {
        return this._shape;
    }
    public set shape(v : string) {
        this._shape = v;
    }

    private _color : Color;
    public get color() : Color {
        return this._color;
    }
    public set color(v : Color) {
        this._color = v;
    }

    private _uuid: string;
    public get uuid(): string {
        return this._uuid;
    }

    constructor(name: string, shape: string, color: Color) {
        this._name = name;
        this._shape = shape;
        this._color = color;
        this._uuid = uuidv4();
    }

}