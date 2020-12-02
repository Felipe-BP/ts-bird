import type { ObjectState } from '../../interfaces/object-state.interface';
import type { RenderedComponent } from '../../interfaces/rendered-component.interface';

import YellowBird from '../../assets/sprites/yellowbird-midflap.png';

export class TSBird implements RenderedComponent {
    DEFAULT_STATE: ObjectState = {
        image: null,
        sourceX: 0,
        sourceY: 0,
        sourceW: 34,
        sourceH: 24,
        destX: 50,
        destY: 50,
        destW: 34,
        destH: 24,
    };
    private _state: ObjectState = this.DEFAULT_STATE;
    private gravity = 0.25;
    private velocity = 1;

    get state(): ObjectState {
        return this._state;
    }

    render(ctx: CanvasRenderingContext2D | null): void {
        if (this.state.image) {
            return this.drawOnCanvas(ctx);
        }
        const birdImage = new Image();
        birdImage.src = YellowBird;
        new Promise((resolve) => {
            birdImage.onload = () => {
                this.state.image = birdImage;
                resolve(this.drawOnCanvas(ctx));
            };
        });
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

    update(): void {
        this.velocity += this.gravity;

        this.state.destY += this.velocity;
    }
}
