export interface RenderedComponent {
    update: () => void;
    render: (ctx: CanvasRenderingContext2D | null) => void;
}
