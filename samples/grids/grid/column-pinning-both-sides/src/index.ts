import 'igniteui-webcomponents-grids/grids/combined';
import {
    IgcGridComponent,
    IgcColumnComponent,
    ColumnPinningPosition,
} from 'igniteui-webcomponents-grids/grids';
import { CustomersData } from './CustomersData';
import 'igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents, IgcButtonComponent } from 'igniteui-webcomponents';

defineAllComponents();

import './index.css';

export class Sample {
    private grid: IgcGridComponent;
    private pinLeftBtn: IgcButtonComponent;
    private pinRightBtn: IgcButtonComponent;
    private unpinBtn: IgcButtonComponent;

    constructor() {
        this.grid = document.getElementById('grid') as IgcGridComponent;
        this.pinLeftBtn = document.getElementById('pinLeft') as IgcButtonComponent;
        this.pinRightBtn = document.getElementById('pinRight') as IgcButtonComponent;
        this.unpinBtn = document.getElementById('unpin') as IgcButtonComponent;

        const pinningConfig = { columns: ColumnPinningPosition.End };

        this.grid.data = new CustomersData();
        this.grid.pinning = pinningConfig;

        const contactName = document.getElementById('colContactName') as IgcColumnComponent;
        if (contactName) {
            contactName.pinningPosition = ColumnPinningPosition.Start;
            contactName.pinned = true;
        }
        const contactTitle = document.getElementById('colContactTitle') as IgcColumnComponent;
        if (contactTitle) {
            contactTitle.pinningPosition = ColumnPinningPosition.End;
            contactTitle.pinned = true;
        }

        this.pinLeftBtn?.addEventListener('click', this.handlePinLeft);
        this.pinRightBtn?.addEventListener('click', this.handlePinRight);
        this.unpinBtn?.addEventListener('click', this.handleUnpin);
    }

    private handlePinLeft = () => {
        this.grid.selectedColumns().forEach((col: IgcColumnComponent) => {
            if (col.pinned) {
                col.unpin();
            }
            col.pin(undefined, ColumnPinningPosition.Start);
        });
    };

    private handlePinRight = () => {
        this.grid.selectedColumns().forEach((col: IgcColumnComponent) => {
            if (col.pinned) {
                col.unpin();
            }
            col.pin(undefined, ColumnPinningPosition.End);
        });
    };

    private handleUnpin = () => {
        this.grid.selectedColumns().forEach((col: IgcColumnComponent) => {
            col.unpin();
        });
    };
}

export function initialize() {
  return new Sample();
}