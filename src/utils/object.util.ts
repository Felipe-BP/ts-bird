export abstract class ObjectUtil {
    /**
     * Caution, this is a **impure** function that copy values from object to other object. P.S: Copy onnly values, not reference
     * @param target object that will receive values
     * @param source object that values will be copied
     */
    static copyTo(
        target: Record<string, never>,
        source: Record<string, never>,
    ): void {
        Object.keys(source).forEach((key) => {
            target[key] = source[key];
        });
    }
}
