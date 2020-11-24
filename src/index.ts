import DomRender from './utils/dom-render.util';
import Canvas from './components/Canvas';

const CanvasElem = new Canvas();

DomRender.render(CanvasElem.elem(), document.getElementById('app'));
