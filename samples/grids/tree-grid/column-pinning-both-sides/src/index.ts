import 'igniteui-webcomponents-grids/grids/combined';
import {
  IgcTreeGridComponent,
  IgcColumnComponent,
  IgcPinningConfig,
  ColumnPinningPosition,
} from 'igniteui-webcomponents-grids/grids';
import { EmployeesFlatDetails } from './EmployeesFlatDetails';
import 'igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents, IgcButtonComponent } from 'igniteui-webcomponents';

defineAllComponents();

import './index.css';

export class Sample {
  private grid: IgcTreeGridComponent;
  private pinLeftBtn: IgcButtonComponent;
  private pinRightBtn: IgcButtonComponent;
  private unpinBtn: IgcButtonComponent;

  constructor() {
    this.grid = document.getElementById('grid') as IgcTreeGridComponent;
    this.pinLeftBtn = document.getElementById('pinLeft') as IgcButtonComponent;
    this.pinRightBtn = document.getElementById('pinRight') as IgcButtonComponent;
    this.unpinBtn = document.getElementById('unpin') as IgcButtonComponent;

    const pinningConfig = { columns: ColumnPinningPosition.End };

    this.grid.data = new EmployeesFlatDetails();
    this.grid.pinning = pinningConfig;

    const nameCol = document.getElementById('colName') as IgcColumnComponent;
    if (nameCol) {
      nameCol.pinningPosition = ColumnPinningPosition.Start;
      nameCol.pinned = true;
    }
    const titleCol = document.getElementById('colTitle') as IgcColumnComponent;
    if (titleCol) {
      titleCol.pinned = true;
    }

    this.pinLeftBtn?.addEventListener('click', this.handlePinLeft);
    this.pinRightBtn?.addEventListener('click', this.handlePinRight);
    this.unpinBtn?.addEventListener('click', this.handleUnpin);
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
