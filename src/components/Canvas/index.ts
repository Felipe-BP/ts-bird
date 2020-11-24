import Component from '../Component';

import BackgroundDay from '../../assets/sprites/background-day.png';
import YellowBird from '../../assets/sprites/yellowbird-midflap.png';
import Base from '../../assets/sprites/base.png';

export default class Canvas extends Component {
    private _ctx: CanvasRenderingContext2D | null;

    constructor() {
        super(
            document.createElement('canvas'),
            '/_dist_/components/Canvas/index.css', // TODO resolve this path
        );
        this.setCanvasSize(288, 512); // TODO provide with css variables
        this._ctx = this.elem<HTMLCanvasElement>().getContext('2d');
        // TODO extract within Components and recieve on constructor (render by frames -> requestAnimationFrame)
        this.renderBackground();
        this.renderBase();
        this.renderBird();
    }

    private async renderBird() {
        const birdImage = new Image();
        birdImage.src = YellowBird;
        return new Promise((resolve) => {
            birdImage.onload = () => {
                resolve(
                    this._ctx?.drawImage(
                        birdImage,
                        0,
                        0,
                        34,
                        24,
                        50,
                        50,
                        34,
                        24,
                    ),
                );
            };
        });
    }

    private async renderBase() {
        const { height: canvasHeight } = this.elem<HTMLCanvasElement>();
        const destY = canvasHeight - 112;
        const base = new Image();
        base.src = Base;
        return new Promise((resolve) => {
            base.onload = () => {
                resolve(
                    this._ctx?.drawImage(
                        base,
                        0,
                        0,
                        336,
                        112,
                        0,
                        destY,
                        336,
                        112,
                    ),
                );
            };
        });
    }

    private async renderBackground() {
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
