import type { Base } from '../Base';
import type { TSBird } from '../TS-Bird';

export enum Screens {
    START = 'START',
    GAME = 'GAME',
    DIE = 'DIE',
}

abstract class GameController {
    protected screenController: ScreenController;

    constructor(screenController: ScreenController) {
        this.screenController = screenController;
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

    constructor(
        context: CanvasRenderingContext2D | null,
        bird: TSBird,
        base: Base,
    ) {
        for (const screen of Object.values(Screens)) {
            this.gameStateMap.set(screen, this.factoryGameController(screen));
        }
        this._ctx = context;
        this.bird = bird;
        this.base = base;
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
    }

    click(): void {
        this.screenController.bird.jump();
    }

    update(): void {
        this.screenController.base.update();
        this.screenController.bird.update();
    }

    render(): void {
        this.update();
        this.screenController.bird.render(this.screenController._ctx);
        this.screenController.base.render(this.screenController._ctx);
    }
}
