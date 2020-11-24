import Component from '../Component';
import BackgroundDay from '../../assets/sprites/background-day.png';

export default class Canvas extends Component {
    private _ctx: CanvasRenderingContext2D | null;
    constructor() {
        super(
            document.createElement('canvas'),
            '/_dist_/components/Canvas/index.css', // TODO resolve this path
        );
        this.setCanvasSize(288, 512);
        this._ctx = this.elem<HTMLCanvasElement>().getContext('2d');
        this.loadBackground();
    }
    private async loadBackground() {
        const { width, height } = this.elem<HTMLCanvasElement>();
        const background = new Image(width, height);
        background.src = BackgroundDay;
        return new Promise((resolve) => {
            background.onload = () => {
                resolve(
                    this._ctx?.drawImage(
                        background,
                        0,
                        0,
                        width,
                        height,
                        0,
                        0,
                        width,
                        height,
                    ),
                );
            };
        });
    }

    private setCanvasSize(width: number, height: number) {
        this.elem<HTMLCanvasElement>().width = width;
        this.elem<HTMLCanvasElement>().height = height;
    }
}
