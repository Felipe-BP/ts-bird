export default abstract class Component {
    private _elem: Node | undefined;
    constructor(elem: Node, stylePath?: string) {
        this._elem = elem;
        if (stylePath) {
            this.applyStyle(stylePath);
        }
    }
    elem<T extends Node>(): T {
        return this._elem as T;
    }
    applyStyle(stylePath: string): void {
        const [head] = document.getElementsByTagName('HEAD');
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = stylePath;
        head.appendChild(link);
    }
}
