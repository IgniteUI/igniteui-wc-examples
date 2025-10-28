import 'igniteui-webcomponents-grids/grids/combined';
import {
  IgcHierarchicalGridComponent,
  IgcColumnComponent,
  IgcPinningConfig,
  ColumnPinningPosition,
  IgcGridCreatedEventArgs,
} from 'igniteui-webcomponents-grids/grids';
import HierarchicalCustomersData from './HierarchicalCustomersData.json';
import 'igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents, IgcButtonComponent } from 'igniteui-webcomponents';

defineAllComponents();

import './index.css';

export class Sample {
  private grid: IgcHierarchicalGridComponent;
  private pinLeftBtn: IgcButtonComponent | null = null;
  private pinRightBtn: IgcButtonComponent | null = null;
  private unpinBtn: IgcButtonComponent | null = null;

  constructor() {
    this.grid = document.getElementById('grid') as IgcHierarchicalGridComponent;
    this.pinLeftBtn = document.getElementById('pinLeft') as unknown as IgcButtonComponent;
    this.pinRightBtn = document.getElementById('pinRight') as unknown as IgcButtonComponent;
    this.unpinBtn = document.getElementById('unpin') as unknown as IgcButtonComponent;

    const pinningConfig = {} as IgcPinningConfig;
    pinningConfig.columns = ColumnPinningPosition.End;

    this.grid.data = this.hierarchicalCustomersData;
    this.grid.pinning = pinningConfig;

    const companyCol = document.getElementById('colCompany') as IgcColumnComponent | null;
    if (companyCol) {
      companyCol.pinningPosition = ColumnPinningPosition.Start;
      companyCol.pinned = true;
    }
    const contactNameCol = document.getElementById('colContactName') as IgcColumnComponent | null;
    if (contactNameCol) {
      contactNameCol.pinned = true;
    }

    const ordersIslandEl = document.getElementById('ordersIsland') as any;
    ordersIslandEl?.addEventListener('gridCreated', (ev: CustomEvent<IgcGridCreatedEventArgs>) => {
      const ctx = ev.detail;
      const childGrid = ctx.grid;
      childGrid.pinning = pinningConfig;
      const orderDateCol = document.getElementById('colOrderDate') as IgcColumnComponent | null;
      if (orderDateCol) {
        orderDateCol.pinningPosition = ColumnPinningPosition.Start;
        orderDateCol.pinned = true;
      }
      const shipNameCol = document.getElementById('colShipName') as IgcColumnComponent | null;
      if (shipNameCol) shipNameCol.pinned = true;
      const shipViaCol = document.getElementById('colShipVia') as IgcColumnComponent | null;
      if (shipViaCol) shipViaCol.pinned = true;
    });

    this.pinLeftBtn?.addEventListener('click', this.handlePinLeft);
    this.pinRightBtn?.addEventListener('click', this.handlePinRight);
    this.unpinBtn?.addEventListener('click', this.handleUnpin);
  }

  private _hierarchicalCustomersData: any[] = HierarchicalCustomersData as any[];
  public get hierarchicalCustomersData(): any[] {
    return this._hierarchicalCustomersData;
  }

  private handlePinLeft = () => {
    this.grid.selectedColumns().forEach((col: IgcColumnComponent) => {
      col.pinningPosition = ColumnPinningPosition.Start;
      col.pinned = true;
    });
  };

  private handlePinRight = () => {
    this.grid.selectedColumns().forEach((col: IgcColumnComponent) => {
      col.pinningPosition = ColumnPinningPosition.End;
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
