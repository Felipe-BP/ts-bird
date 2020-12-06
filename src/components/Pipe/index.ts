import { ObjectUtil } from '../../utils/object.util';
import { FrameRateUtil } from '../../utils/frame-rate.util';

import type { ObjectState } from '../../interfaces/object-state.interface';
import type { RenderedComponent } from '../../interfaces/rendered-component.interface';

import PipeImage from '../../assets/sprites/pipe-green.png';

type PipePosition = {
    x: number;
    y: number;
};

type PipeState =
    | Record<string, never>
    | (ObjectState & { offset: number; pipes?: Array<PipePosition> });

export class Pipe implements RenderedComponent {
    private static DEFAULT_STATE: Readonly<PipeState> = {
        image: null,
        sourceX: 0,
        sourceY: 0,
        sourceW: 52,
        sourceH: 320,
        destX: 340,
        destY: 0,
        destW: 52,
        destH: 320,
        offset: 100,
        pipes: [],
    };
    private _state: PipeState = Pipe.DEFAULT_STATE;

    constructor() {
        this.resetState();
    }

    private getRandom(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    resetState(): void {
        ObjectUtil.copyTo(
            this._state as Record<string, never>,
            Pipe.DEFAULT_STATE as Record<string, never>,
        );
        this._state.pipes = [];
    }

    get state(): Readonly<PipeState> {
        return this._state;
    }

    drawOnCanvas(ctx: CanvasRenderingContext2D | null): void {
        this.state.pipes?.forEach(({ x, y }) => {
            ctx?.save();
            ctx?.setTransform(1, 0, 0, 1, this.state.destW, this.state.destH);
            ctx?.rotate(Math.PI); // rotate pipe 180 degrees
            ctx?.drawImage(
                this.state.image as CanvasImageSource,
                this.state.sourceX,
                this.state.sourceY,
                this.state.sourceW,
                this.state.sourceH,
                -x,
                -y,
                this.state.destW,
                this.state.destH,
            );
            ctx?.restore();
            return ctx?.drawImage(
                this.state.image as CanvasImageSource,
                this.state.sourceX,
                this.state.sourceY,
                this.state.sourceW,
                this.state.sourceH,
                x,
                y + this.state.destH + this.state.offset,
                this.state.destW,
                this.state.destH,
            );
        });
    }

    update(): void {
        const passedInterval = FrameRateUtil.frame % 100 === 0;

        if (passedInterval) {
            this._state.destY = this.getRandom(-30, -250);
            this._state.pipes?.push({
                x: this.state.destX,
                y: this.state.destY,
            });
        }

        this._state.pipes?.forEach((pipe, index) => {
            pipe.x -= 2;
            if (pipe.x <= -this.state.destW) {
                this._state.pipes?.splice(index, 1);
            }
        });
    }

    render(ctx: CanvasRenderingContext2D | null): void {
        if (this.state.image) {
            return this.drawOnCanvas(ctx);
        }
        const baseImage = new Image();
        baseImage.src = PipeImage;
        new Promise((resolve) => {
            baseImage.onload = () => {
                this._state.image = baseImage;
                resolve(this.drawOnCanvas(ctx));
            };
        });
    }
}
