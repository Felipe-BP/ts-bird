import type { ObjectState } from '../../interfaces/object-state.interface';
import type { RenderedComponent } from '../../interfaces/rendered-component.interface';

import BaseImage from '../../assets/sprites/base.png';

export class Base implements RenderedComponent {
    DEFAULT_STATE: ObjectState = {
        image: null,
        sourceX: 0,
        sourceY: 0,
        sourceW: 336,
        sourceH: 112,
        destX: 0,
        destY: 112,
        destW: 336,
        destH: 112,
    };
    private _state: ObjectState = this.DEFAULT_STATE;

    get state(): ObjectState {
        return this._state;
    }

    render(ctx: CanvasRenderingContext2D | null): void {
        if (this.state.image) {
            return this.drawOnCanvas(ctx);
        }
        const baseImage = new Image();
        baseImage.src = BaseImage;
        new Promise((resolve) => {
            baseImage.onload = () => {
                this.state.image = baseImage;
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
            512 - this.state.destY, // TODO get way to get from canvas height
            this.state.destW,
            this.state.destH,
        );
    }

    update(): void {
        const onShouldRepeat = 48;
        const moveValue = this.state.destX - 1;

        this.state.destX = moveValue % onShouldRepeat;
    }
}
