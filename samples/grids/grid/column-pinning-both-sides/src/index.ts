import 'igniteui-webcomponents-grids/grids/combined';
import {
    IgcGridComponent,
    IgcColumnComponent,
    IgcPinningConfig,
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
    private pinLeftBtn: IgcButtonComponent | null = null;
    private pinRightBtn: IgcButtonComponent | null = null;
    private unpinBtn: IgcButtonComponent | null = null;

    /* private _pinningConfig: IgcPinningConfig | null = null;
    public get pinningConfig(): IgcPinningConfig {
        return this._pinningConfig;
    } */

    constructor() {
        const grid = (this.grid = document.getElementById('grid') as IgcGridComponent);
        this.pinLeftBtn = document.getElementById('pinLeft') as unknown as IgcButtonComponent;
        this.pinRightBtn = document.getElementById('pinRight') as unknown as IgcButtonComponent;
        this.unpinBtn = document.getElementById('unpin') as unknown as IgcButtonComponent;

        const pinningConfig = {} as IgcPinningConfig;
        pinningConfig.columns = ColumnPinningPosition.End;

        grid.data = this.customersData;
        grid.pinning = pinningConfig;

        const contactName = document.getElementById('colContactName') as IgcColumnComponent | null;
        if (contactName) {
            (contactName as any).pinningPosition = ColumnPinningPosition.Start;
            contactName.pinned = true;
        }
        const contactTitle = document.getElementById('colContactTitle') as IgcColumnComponent | null;
        if (contactTitle) {
            (contactTitle as any).pinningPosition = ColumnPinningPosition.End;
            contactTitle.pinned = true;
        }

        this.pinLeftBtn?.addEventListener('click', this.handlePinLeft);
        this.pinRightBtn?.addEventListener('click', this.handlePinRight);
        this.unpinBtn?.addEventListener('click', this.handleUnpin);
    }

    private _customersData: CustomersData | null = null;
    public get customersData(): CustomersData {
        if (this._customersData == null) {
            this._customersData = new CustomersData();
        }
        return this._customersData;
    }

    private handlePinLeft = () => {
        this.grid.selectedColumns().forEach((col: IgcColumnComponent) => {
            (col as any).pinningPosition = ColumnPinningPosition.Start;
            col.pinned = true;
        });
    };

    private handlePinRight = () => {
        this.grid.selectedColumns().forEach((col: IgcColumnComponent) => {
            (col as any).pinningPosition = ColumnPinningPosition.End;
            col.pinned = true;
        });
    };

    private handleUnpin = () => {
        this.grid.selectedColumns().forEach((col: IgcColumnComponent) => {
            col.pinned = false;
        });
    };
}

new Sample();
