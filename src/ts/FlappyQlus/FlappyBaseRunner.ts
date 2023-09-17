import type { BaseClass } from "./FlappyBaseClass";
import { Time } from "./Time";

export class BaseRunner {
    private _objects: BaseClass[] = [];
    private _ctx: CanvasRenderingContext2D;

    private constructor(ctx: CanvasRenderingContext2D) {
        this._ctx = ctx;
    }
    
    public static tryCreate(ctx: CanvasRenderingContext2D | null | undefined) {
        if (ctx) {
            return new BaseRunner(ctx);
        }
        return null;
    }

    private loop() {
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
        requestAnimationFrame(Time.beforeNewFrame.bind(Time));
        for (let i = 0; i < this._objects.length; i++) {
            this._objects[i].update();
        }
    
        for (let i = 0; i < this._objects.length; i++) {
            this._objects[i].lateUpdate();
        }

        for (let i = 0; i < this._objects.length; i++) {
            this._objects[i].render(this._ctx);
        }
    
        requestAnimationFrame(this.loop.bind(this));
    }

    public init() {
        for (let i = 0; i < this._objects.length; i++) {
            this._objects[i].start();
        }
        this.loop();
    }

    public add(...objs: BaseClass[]) {
        this._objects.push(...objs);
    }

    public remove(...objs: BaseClass[]) {
        for (let i = 0; i < objs.length; i++) {
            const index = this._objects.indexOf(objs[i]);
            if (index > -1) {
                this._objects.splice(index, 1);
            }
        }
    }

}