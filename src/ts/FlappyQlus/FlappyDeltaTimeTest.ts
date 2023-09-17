import Vector2D from "../utils/Vector2D";
import { BaseClass } from "./FlappyBaseClass";
import { type Text } from "./FlappyText";
import { Time } from "./Time";

export class DeltaTimeTest extends BaseClass {
    private _text;

    constructor(text: Text) {
        super();
        this._text = text;
    }

    public update(): void {
        this._text.text = `FPS: ${Math.round(1 / Time.deltaTime)} DeltaTime: ${Time.deltaTime}`;
    }

}