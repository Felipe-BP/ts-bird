export abstract class FrameRateUtil {
    public static frame: Readonly<number> = 0;

    static updateFrame(): void {
        console.log(FrameRateUtil.frame);
        FrameRateUtil.frame += 1;
    }
}
