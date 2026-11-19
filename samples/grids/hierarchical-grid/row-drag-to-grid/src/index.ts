import 'igniteui-webcomponents-grids/grids/combined';
import type { IgcGridEmptyTemplateContext, IgcHierarchicalGridComponent } from 'igniteui-webcomponents-grids/grids';
import { defineComponents, IgcIconComponent, registerIconFromText } from 'igniteui-webcomponents';
import { html } from 'lit-html';

import 'igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcIconComponent);
registerIconFromText('drag_handle',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"/></svg>',
    'material');
registerIconFromText('remove',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 11h14v2H5z"/></svg>',
    'material');

export class Sample {
    constructor() {
        const grid = document.getElementById('grid') as IgcHierarchicalGridComponent;
        grid.dragIndicatorIconTemplate = this.dragIndicatorIconTemplate;

        grid.data = [
            { ID: 1, Artist: 'Nina Simone', Genre: 'Jazz', Albums: [{ Album: 'Little Girl Blue' }, { Album: 'Pastel Blues' }] },
            { ID: 2, Artist: 'David Bowie', Genre: 'Rock', Albums: [{ Album: 'Low' }, { Album: 'Heroes' }] },
            { ID: 3, Artist: 'Joni Mitchell', Genre: 'Folk', Albums: [{ Album: 'Blue' }, { Album: 'Hejira' }] },
        ];
        this.setupDeleteDropArea(grid, document.getElementById('dropArea')!);
    }

    public dragIndicatorIconTemplate = (_ctx: IgcGridEmptyTemplateContext) => {
        return html`<igc-icon name="drag_handle" collection="material" aria-hidden="true"></igc-icon>`;
    };

    private setupDeleteDropArea(grid: IgcHierarchicalGridComponent, dropArea: HTMLElement): void {
        const isOverDropArea = ({ clientX, clientY }: PointerEvent) => {
            const { left, right, top, bottom } = dropArea.getBoundingClientRect();
            return clientX >= left && clientX < right && clientY >= top && clientY < bottom;
        };
        let shouldDelete = false;
        let dragListener: AbortController | undefined;
        grid.addEventListener('rowDragStart', ({ detail }) => {
            dragListener?.abort();
            shouldDelete = false;
            dragListener = new AbortController();
            const { signal } = dragListener;
            window.addEventListener('pointermove', event => {
                const overDropArea = isOverDropArea(event);
                dropArea.classList.toggle('drag-over', overDropArea);
                const ghost: HTMLElement | null = detail.dragDirective.ghostElement;
                ghost?.querySelector('igc-icon[collection="material"]')
                    ?.setAttribute('name', overDropArea ? 'remove' : 'drag_handle');
            }, { capture: true, signal });
            window.addEventListener('pointerup', event => {
                shouldDelete = isOverDropArea(event);
            }, {
                capture: true, once: true, signal,
            });
        });

        grid.addEventListener('rowDragEnd', ({ detail }) => {
            dragListener?.abort();
            dropArea.classList.remove('drag-over');
            if (shouldDelete) {
                shouldDelete = false;
                grid.deleteRow(detail.dragData.key);
            }
        });
    }
}

new Sample();
