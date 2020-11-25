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

    get state(): ObjectState {
        return this._state;
    }

    render(ctx: CanvasRenderingContext2D | null): void {
        const birdImage = new Image();
        birdImage.src = YellowBird;
        new Promise((resolve) => {
            birdImage.onload = () => {
                resolve(
                    ctx?.drawImage(
                        birdImage,
                        this.state.sourceX,
                        this.state.sourceY,
                        this.state.sourceW,
                        this.state.sourceH,
                        this.state.destX,
                        this.state.destY,
                        this.state.destW,
                        this.state.destH,
                    ),
                );
            };
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    update(): void {}
}
