import 'igniteui-webcomponents-grids/grids/combined';
import {
  IgcHierarchicalGridComponent,
  IgcColumnComponent,
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
  private pinLeftBtn: IgcButtonComponent;
  private pinRightBtn: IgcButtonComponent;
  private unpinBtn: IgcButtonComponent;

  constructor() {
    this.grid = document.getElementById('grid') as IgcHierarchicalGridComponent;
    this.pinLeftBtn = document.getElementById('pinLeft') as IgcButtonComponent;
    this.pinRightBtn = document.getElementById('pinRight') as IgcButtonComponent;
    this.unpinBtn = document.getElementById('unpin') as IgcButtonComponent;

    const pinningConfig = { columns: ColumnPinningPosition.End };

    this.grid.data = HierarchicalCustomersData;
    this.grid.pinning = pinningConfig;

    const companyCol = document.getElementById('colCompany') as IgcColumnComponent;
    if (companyCol) {
      companyCol.pinningPosition = ColumnPinningPosition.Start;
      companyCol.pinned = true;
    }
    const contactNameCol = document.getElementById('colContactName') as IgcColumnComponent;
    if (contactNameCol) {
      contactNameCol.pinned = true;
    }

    const ordersIslandEl = document.getElementById('ordersIsland') as any;
    ordersIslandEl?.addEventListener('gridCreated', (ev: CustomEvent<IgcGridCreatedEventArgs>) => {
      const ctx = ev.detail;
      const childGrid = ctx.grid;
      childGrid.pinning = pinningConfig;
      const orderDateCol = document.getElementById('colOrderDate') as IgcColumnComponent;
      if (orderDateCol) {
        orderDateCol.pinningPosition = ColumnPinningPosition.Start;
        orderDateCol.pinned = true;
      }
      const shipNameCol = document.getElementById('colShipName') as IgcColumnComponent;
      if (shipNameCol) shipNameCol.pinned = true;
      const shipViaCol = document.getElementById('colShipVia') as IgcColumnComponent;
      if (shipViaCol) shipViaCol.pinned = true;
    });

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

new Sample();
