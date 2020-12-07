import Component from '../Component';

import Background from '../../assets/sprites/background-night.png';
import { ScreenController } from '../ScreenControl';
import { FrameRateUtil } from '../../utils/frame-rate.util';

import type { TSBird } from '../TS-Bird';
import type { Base } from '../Base';
import type { Pipe } from '../Pipe';

enum KeyboardKey {
    SPACE = ' ',
    ARROWUP = 'ArrowUp',
}

export default class Canvas extends Component {
    private _ctx: CanvasRenderingContext2D | null;
    private screenController: ScreenController;

    constructor(bird: TSBird, base: Base, pipe: Pipe) {
        super(
            `
                <canvas class="game-container"></canvas>
            `,
            '/_dist_/components/Canvas/index.css', // TODO resolve this path
        );
        this._ctx = this.elem<HTMLCanvasElement>().getContext('2d');
        this.screenController = new ScreenController(
            this._ctx,
            bird,
            base,
            pipe,
        );
        this.bindCanvasClick();
        this.setCanvasSize(288, 512);
        this.drawComponents();
    }

    private bindCanvasClick() {
        this.elem<HTMLCanvasElement>().onclick = () =>
            this.screenController.getControl()?.click();

        window.onkeydown = (event: KeyboardEvent) => {
            switch (event.key) {
                case KeyboardKey.SPACE:
                    this.screenController.getControl()?.click();
                    break;
                case KeyboardKey.ARROWUP:
                    this.screenController.getControl()?.click();
                    break;
            }
        };
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
