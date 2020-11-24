import Component from '../Component';
import BackgroundDay from '../../assets/sprites/background-day.png';

export default class Canvas extends Component {
    private _ctx: CanvasRenderingContext2D | null;
    constructor() {
        super(
            document.createElement('canvas'),
            '/_dist_/components/Canvas/index.css', // TODO resolve this path
        );
        this._ctx = this.elem<HTMLCanvasElement>().getContext('2d');
        const background = new Image(288, 512);
        background.src = BackgroundDay;
        this._ctx?.drawImage(background, 0, 0, 288, 512, 0, 0, 288, 512);
    }
}
