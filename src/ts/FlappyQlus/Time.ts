class BaseTime {
    private _deltaTime: number = 1/60;
    
    public get deltaTime(): number {
        return this._deltaTime;
    }
    
    private _lastTime: number = performance.now();
    
    /**
     * newFrame
    */
   public beforeNewFrame(now: number) {
       this._deltaTime = Math.abs(now - this._lastTime) / 1000;
       this._lastTime = now;
    }
}

export abstract class Time {
    private static _time: BaseTime = new BaseTime();

    public static get deltaTime(): number {
        return this._time.deltaTime;
    }

    public static beforeNewFrame(now: number) {
        this._time.beforeNewFrame(now);
    }
}
