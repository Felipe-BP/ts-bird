export abstract class FrameRateUtil {
    public static frame: Readonly<number> = 0;

    static updateFrame(): void {
        FrameRateUtil.frame += 1;
    }
}
