import { ObjectUtil } from '../../utils/object.util';

import type { ObjectState } from '../../interfaces/object-state.interface';
import type { RenderedComponent } from '../../interfaces/rendered-component.interface';

import Score0 from '../../assets/sprites/0.png';
import Score1 from '../../assets/sprites/1.png';
import Score2 from '../../assets/sprites/2.png';
import Score3 from '../../assets/sprites/3.png';
import Score4 from '../../assets/sprites/4.png';
import Score5 from '../../assets/sprites/5.png';
import Score6 from '../../assets/sprites/6.png';
import Score7 from '../../assets/sprites/7.png';
import Score8 from '../../assets/sprites/8.png';
import Score9 from '../../assets/sprites/9.png';

type ScoreState =
    | Record<string, never>
    | (ObjectState & {
          score: number;
          scoreImages: Array<string | CanvasImageSource>;
          scoreImages2Render: Array<string | CanvasImageSource>;
      });

export class GameScore implements RenderedComponent {
    private static DEFAULT_STATE: Readonly<ScoreState> = {
        image: null,
        sourceX: 0,
        sourceY: 0,
        sourceW: 24,
        sourceH: 36,
        destX: 144,
        destY: 20,
        destW: 24,
        destH: 36,
        score: 0,
        scoreImages: [
            Score0,
            Score1,
            Score2,
            Score3,
            Score4,
            Score5,
            Score6,
            Score7,
            Score8,
            Score9,
        ],
        scoreImages2Render: [],
    };
    private _state: ScoreState = {};

    constructor() {
        this.resetState();
    }

    get state(): Readonly<ScoreState> {
        return this._state;
    }

    resetState(): void {
        ObjectUtil.copyTo(
            this._state as Record<string, never>,
            GameScore.DEFAULT_STATE as Record<string, never>,
        );
    }

    async render(ctx: CanvasRenderingContext2D | null): Promise<void> {
        const scoreImages = this.parseScore2ScoreImages(); // TODO optimize to only execute on score change
        const imagesPromises = [];
        this._state.scoreImages2Render = [];

        for (const scoreImage of scoreImages) {
            const score = new Image();
            score.src = scoreImage as string;
            imagesPromises.push(
                new Promise((resolve) => {
                    score.onload = () => {
                        this._state.scoreImages2Render.push(score);
                        resolve(null);
                    };
                }),
            );
        }

        await Promise.all(imagesPromises);
        this.drawOnCanvas(ctx);
    }

    private parseScore2ScoreImages(): Array<string | CanvasImageSource> {
        const scoreStr = this.state.score.toString();
        return [...scoreStr].map(
            (scoreChar) =>
                this.state.scoreImages.find((_, idx) => idx === +scoreChar) ||
                scoreChar,
        );
    }

    drawOnCanvas(ctx: CanvasRenderingContext2D | null): void {
        const xAvgWidthScore = (this._state.scoreImages2Render.length * 24) / 2;
        this._state.destX = 144 - xAvgWidthScore;
        this._state.scoreImages2Render.forEach((scoreImage, index) => {
            const offset = index !== 0 ? index * 24 : 0;
            return ctx?.drawImage(
                scoreImage as CanvasImageSource,
                this.state.sourceX,
                this.state.sourceY,
                this.state.sourceW,
                this.state.sourceH,
                this.state.destX + offset,
                this.state.destY,
                this.state.destW,
                this.state.destH,
            );
        });
    }

    update(): void {
        this._state.score++;
        // TODO audio track scored
    }
}
