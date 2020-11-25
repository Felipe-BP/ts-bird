import DomRender from '../../utils/dom-render.util';

export default abstract class Component {
    private _elem: Node | undefined;
    constructor(template: string, stylePath?: string) {
        this._elem = DomRender.createComponent(template);
        if (stylePath) {
            this.applyStyle(stylePath);
        }
    }
    elem<T extends Node>(): T {
        return this._elem as T;
    }
    applyStyle(stylePath: string): void {
        const [head] = document.getElementsByTagName('head');
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = stylePath;
        head.appendChild(link);
    }
}
