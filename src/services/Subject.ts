type SubscribeFunc<T extends unknown> = (value: T) => void;

export class Subject<T extends unknown> {
    private _observers: Array<SubscribeFunc<T>> = [];

    subscribe(fn: SubscribeFunc<T>): void {
        this._observers.push(fn);
    }

    unsubscribe(fn: SubscribeFunc<T>): void {
        this._observers = this._observers.filter((func) => func !== fn);
    }

    next(value: T): void {
        this._observers.forEach((fn) => fn.call(this, value));
    }
}
