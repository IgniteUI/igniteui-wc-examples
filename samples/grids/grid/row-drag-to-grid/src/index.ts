import 'igniteui-webcomponents-grids/grids/combined';
import type { IgcGridComponent, IgcRowDragEndEventArgs } from 'igniteui-webcomponents-grids/grids';
import { html } from 'lit-html';

import 'igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';
import './index.css';

export class Sample {
    constructor() {
        const sourceGrid = document.getElementById('sourceGrid') as IgcGridComponent;
        const targetGrid = document.getElementById('targetGrid') as IgcGridComponent;

        sourceGrid.data = [
            { ID: 1, Company: 'Alfreds Futterkiste', City: 'Berlin' },
            { ID: 2, Company: 'Around the Horn', City: 'London' },
            { ID: 3, Company: 'Berglunds snabbkop', City: 'Lulea' },
            { ID: 4, Company: 'Bon app', City: 'Marseille' },
            { ID: 5, Company: 'Eastern Connection', City: 'London' },
        ];
        targetGrid.data = [];

        sourceGrid.dragIndicatorIconTemplate = () => html`
            <svg class="custom-drag-handle" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 9h14M5 15h14" fill="none" stroke="currentColor" stroke-width="2"/>
            </svg>
        `;

        sourceGrid.addEventListener('rowDragEnd', (event: CustomEvent<IgcRowDragEndEventArgs>) => {
            const { dragDirective, dragData } = event.detail;
            const ghost = dragDirective.ghostElement;
            if (!ghost) return;

            const { x, y } = ghost.getBoundingClientRect();
            const { left, right, top, bottom } = targetGrid.getBoundingClientRect();
            if (x >= left && x <= right && y >= top && y <= bottom) {
                targetGrid.addRow(dragData.data);
                sourceGrid.deleteRow(dragData.key);
            }
        });
    }
}

new Sample();
