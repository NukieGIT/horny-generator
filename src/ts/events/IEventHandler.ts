import type EventArgs from "./EventArgs";

export default interface IEventHandler<T extends EventArgs> {
    (source: any, args: T): void
}
