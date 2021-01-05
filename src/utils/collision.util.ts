import { Subject } from '../services/Subject';

export enum CollisionEvents {
    BIRD_BASE = 'BIRD_BASE',
    BIRD_PIPE = 'BIRD_PIPE',
    BIRD_SCORE = 'BIRD_SCORE',
}

type CollisionFunction = () => boolean;

export abstract class CollisionUtil {
    private static _collisionMap = new Map<
        CollisionEvents,
        CollisionFunction
    >();
    public static _collision$ = new Subject<CollisionEvents>();

    static applyCollisionDetector(
        event: CollisionEvents,
        fn: CollisionFunction,
    ): void {
        if (!CollisionUtil._collisionMap.has(event)) {
            CollisionUtil._collisionMap.set(event, fn);
        }
    }

    static detectCollision(): void {
        for (const collision of CollisionUtil._collisionMap.entries()) {
            const [event, collisionFunc] = collision;
            if (collisionFunc()) {
                CollisionUtil._collision$.next(event);
            }
        }
    }
}
