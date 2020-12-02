import DomRender from './utils/dom-render.util';
import Canvas from './components/Canvas';

import { Base } from './components/Base';
import { TSBird } from './components/TS-Bird';

const base = new Base();
const bird = new TSBird();
const CanvasElem = new Canvas(bird, base);

DomRender.render(CanvasElem.elem(), document.getElementById('app'));
