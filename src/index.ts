import DomRender from './utils/dom-render.util';
import Canvas from './components/Canvas';

import { Base } from './components/Base';
import { TSBird } from './components/TS-Bird';
import { Pipe } from './components/Pipe';

const base = new Base();
const pipe = new Pipe();
const bird = new TSBird();
const CanvasElem = new Canvas(bird, base, pipe);

DomRender.render(CanvasElem.elem(), document.getElementById('app'));
