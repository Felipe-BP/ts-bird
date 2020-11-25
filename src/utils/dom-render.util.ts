const DomRender = {
    render(element: Node, targetElement: HTMLElement | null): void {
        targetElement?.appendChild(element);
    },
    createComponent(template: string): Node | undefined {
        const elem = document.createElement('template');
        elem.innerHTML = template.trim();
        return elem.content.firstChild as Node | undefined;
    },
};

export default DomRender;
