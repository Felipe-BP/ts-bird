import Component from '../Component';

import Background from '../../assets/sprites/background-night.png';
import { ScreenController } from '../ScreenControl';
import type { TSBird } from '../TS-Bird';
import type { Base } from '../Base';
import { FrameRateUtil } from '../../utils/frame-rate.util';

export default class Canvas extends Component {
    private _ctx: CanvasRenderingContext2D | null;
    private screenController: ScreenController;

    constructor(bird: TSBird, base: Base) {
        super(
            `
                <canvas class="game-container"></canvas>
            `,
            '/_dist_/components/Canvas/index.css', // TODO resolve this path
        );
        this._ctx = this.elem<HTMLCanvasElement>().getContext('2d');
        this.screenController = new ScreenController(this._ctx, bird, base);
        this.setCanvasSize(288, 512);
        this.drawComponents();
    }

    private async drawComponents() {
        this.renderBackground();
        this.screenController.getControl()?.render();

        requestAnimationFrame(this.drawComponents.bind(this));
        FrameRateUtil.updateFrame();
    }

    private async renderBackground() {
        const { width, height } = this.elem<HTMLCanvasElement>();
        const background = new Image(width, height);
        background.src = Background;
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
