import type EventArgs from "./EventArgs";
import type EventDispatcher from "./EventDispatcher";
import type IEventHandler from "./IEventHandler";

export default class Event<T extends EventArgs> {
    private parent: EventDispatcher<T>;

    public constructor(parent: EventDispatcher<T>) {
        this.parent = parent;
    }

    public subscribe(handler: IEventHandler<T>) {
        this.parent.addHandler(handler);
    }

    public unsubscribe(handler: IEventHandler<T>) {
        this.parent.removeHandler(handler);
    }
}