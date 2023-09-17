import type EventArgs from "./EventArgs";
import type IEventHandler from "./IEventHandler";
import Event from "./Event";

export default class EventDispatcher<T extends EventArgs> {
    private _handlers: IEventHandler<T>[] = [];
    private _event: Event<T>;

    constructor() {
        this._event = new Event(this);
    }

    public addHandler(handler: IEventHandler<T>) {
        this._handlers.push(handler);
    }

    public removeHandler(handler: IEventHandler<T>) {
        const index = this._handlers.indexOf(handler);
        if (index > -1) {
            this._handlers.splice(index, 1);
        }
    }

    public invoke(source: any, args: T) {
        for (let i = 0; i < this._handlers.length; i++) {
            this._handlers[i](source, args);
        }
    }

    public clearHandlers() {
        this._handlers = [];
    }

    public get event(): Event<T> {
        return this._event;
    }

}