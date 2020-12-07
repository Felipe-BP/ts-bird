import { CollisionEvents, CollisionUtil } from '../../utils/collision.util';
import type { Base } from '../Base';
import type { Pipe } from '../Pipe';
import type { TSBird } from '../TS-Bird';

export enum Screens {
    START = 'START',
    GAME = 'GAME',
}

abstract class GameController {
    protected screenController: ScreenController;

    constructor(screenController: ScreenController) {
        this.screenController = screenController;

        CollisionUtil.applyCollisionDetector(CollisionEvents.BIRD_BASE, () => {
            const birdBase =
                this.screenController.bird.state.destY +
                this.screenController.bird.state.destH;

            return birdBase >= 512 - this.screenController.base.state.destH;
        });

        CollisionUtil.applyCollisionDetector(CollisionEvents.BIRD_PIPE, () => {
            const birdX = this.screenController.bird.state.destX;
            const birdHead = this.screenController.bird.state.destY;
            const birdBase = birdHead + this.screenController.bird.state.destH;

            let collision = false;
            if (this.screenController.pipe.state.pipes) {
                for (const pipe of this.screenController.pipe.state.pipes) {
                    const pipeHeadY =
                        pipe.y + this.screenController.pipe.state.destH;

                    const pipeBaseY =
                        pipeHeadY + this.screenController.pipe.state.offset;

                    if (
                        birdX >= pipe.x &&
                        birdX <= pipe.x + this.screenController.pipe.state.destW
                    ) {
                        if (birdHead <= pipeHeadY || birdBase >= pipeBaseY) {
                            collision = true;
                            break;
                        }
                    }
                }
            }

            return collision;
        });
    }

    abstract click(): void;
    abstract update(): void;
    abstract render(): void;
}

export class ScreenController {
    private _currentScreen = Screens.START;
    private gameStateMap = new Map<Screens, GameController>();
    public _ctx: Readonly<CanvasRenderingContext2D | null>;
    public base: Readonly<Base>;
    public bird: Readonly<TSBird>;
    public pipe: Readonly<Pipe>;

    constructor(
        context: CanvasRenderingContext2D | null,
        bird: TSBird,
        base: Base,
        pipe: Pipe,
    ) {
        for (const screen of Object.values(Screens)) {
            this.gameStateMap.set(screen, this.factoryGameController(screen));
        }
        this._ctx = context;
        this.bird = bird;
        this.base = base;
        this.pipe = pipe;
    }

    private factoryGameController(screen: Screens): GameController {
        let gameController: GameController | null = null;

        switch (screen) {
            case Screens.START:
                gameController = new StartScreen(this);
                break;
            case Screens.GAME:
                gameController = new GameScreen(this);
                break;
            default:
                gameController = new StartScreen(this);
        }

        return gameController;
    }

    get currentScreen(): Screens {
        return this._currentScreen;
    }

    getControl(): GameController | undefined {
        return this.gameStateMap?.get(this.currentScreen);
    }

    changeScreen(screen: Screens): void {
        this._currentScreen = screen;
    }
}

export class StartScreen extends GameController {
    constructor(screenController: ScreenController) {
        super(screenController);
    }

    click(): void {
        this.screenController.changeScreen(Screens.GAME);
    }

    update(): void {
        this.screenController.base.update();
    }

    render(): void {
        this.update();
        this.screenController.bird.render(this.screenController._ctx);
        this.screenController.base.render(this.screenController._ctx);
    }
}

export class GameScreen extends GameController {
    constructor(screenController: ScreenController) {
        super(screenController);

        CollisionUtil._collision$.subscribe(() => {
            this.screenController.bird.resetState();
            this.screenController.pipe.resetState();
            this.screenController.changeScreen(Screens.START);
        });
    }

    click(): void {
        this.screenController.bird.jump();
    }

    update(): void {
        this.screenController.pipe.update();
        this.screenController.base.update();
        this.screenController.bird.update();
    }

    render(): void {
        CollisionUtil.detectCollision();
        this.update();
        this.screenController.bird.render(this.screenController._ctx);
        this.screenController.pipe.render(this.screenController._ctx);
        this.screenController.base.render(this.screenController._ctx);
    }
}
