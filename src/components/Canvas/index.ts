import Component from '../Component';

import BackgroundDay from '../../assets/sprites/background-day.png';
import type { RenderedComponent } from '../../interfaces/rendered-component.interface';

export default class Canvas extends Component {
    private _ctx: CanvasRenderingContext2D | null;
    private components: RenderedComponent[];

    constructor(...needToDraw: RenderedComponent[]) {
        super(
            `
                <canvas class="game-container"></canvas>
            `,
            '/_dist_/components/Canvas/index.css', // TODO resolve this path
        );
        this.components = needToDraw;
        this.setCanvasSize(288, 512); // TODO provide with css variables
        this._ctx = this.elem<HTMLCanvasElement>().getContext('2d');
        this.renderBackground();
        this.drawComponents();
    }

    private async drawComponents() {
        this.components.forEach((component) => component.render(this._ctx));

        requestAnimationFrame(this.drawComponents.bind(this));
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
