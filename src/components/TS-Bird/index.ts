import { ObjectUtil } from '../../utils/object.util';
import { FrameRateUtil } from '../../utils/frame-rate.util';

import type { ObjectState } from '../../interfaces/object-state.interface';
import type { RenderedComponent } from '../../interfaces/rendered-component.interface';

import BlueBirdUp from '../../assets/sprites/bluebird-upflap.png';
import BlueBirdMid from '../../assets/sprites/bluebird-midflap.png';
import BlueBirdDown from '../../assets/sprites/bluebird-downflap.png';

type BirdState =
    | Record<string, never>
    | (ObjectState & { birdFlapStates: Array<string> });
export class TSBird implements RenderedComponent {
    private static DEFAULT_STATE: Readonly<BirdState> = {
        image: null,
        sourceX: 0,
        sourceY: 0,
        sourceW: 34,
        sourceH: 24,
        destX: 40,
        destY: 90,
        destW: 34,
        destH: 24,
        birdFlapStates: [BlueBirdMid, BlueBirdDown, BlueBirdUp],
    };
    private _state: BirdState = {};
    private gravity = 0.25;
    private velocity = 1;

    constructor() {
        this.resetState();
    }

    get state(): Readonly<BirdState> {
        return this._state;
    }

    resetState(): void {
        ObjectUtil.copyTo(
            this._state as Record<string, never>,
            TSBird.DEFAULT_STATE as Record<string, never>,
        );
        this.velocity = 1;
    }

    async render(ctx: CanvasRenderingContext2D | null): Promise<void> {
        if (this.state.image) {
            this._state.image = await this.getBirdFlapImage();
            return this.drawOnCanvas(ctx);
        }

        const birdImage = new Image();
        birdImage.src = BlueBirdMid;
        new Promise((resolve) => {
            birdImage.onload = () => {
                this._state.image = birdImage;
                resolve(this.drawOnCanvas(ctx));
            };
        });
    }

    async getBirdFlapImage(): Promise<HTMLImageElement> {
        const birdImage = new Image();
        birdImage.src = this.defineFlapImage();
        return new Promise((resolve) => {
            birdImage.onload = () => resolve(birdImage);
        });
    }

    defineFlapImage(): string {
        const updateInterval = 10;
        const passedInterval = FrameRateUtil.frame % updateInterval === 0;

        if (passedInterval) {
            const index =
                FrameRateUtil.frame % this.state.birdFlapStates.length;
            return this.state.birdFlapStates[index];
        }

        return (this.state.image as HTMLImageElement).src;
    }

    drawOnCanvas(ctx: CanvasRenderingContext2D | null): void {
        return ctx?.drawImage(
            this.state.image as CanvasImageSource,
            this.state.sourceX,
            this.state.sourceY,
            this.state.sourceW,
            this.state.sourceH,
            this.state.destX,
            this.state.destY, // TODO get way to get from canvas height
            this.state.destW,
            this.state.destH,
        );
    }

    jump(): void {
        this.velocity -= 4.5;
    }

    update(): void {
        this.velocity += this.gravity;

        this._state.destY += this.velocity;
    }
}
