const DomRender = {
    render(element: Node, targetElement: HTMLElement | null): void {
        targetElement?.appendChild(element);
    },
};

export default DomRender;
