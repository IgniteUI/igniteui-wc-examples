import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { NwindDataItem, NwindDataItem_LocationsItem, NwindData } from './NwindData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents, registerIconFromText } from 'igniteui-webcomponents';
import "./index.css";
defineAllComponents();

export class Sample {
    private grid: IgcGridComponent;
    public contextmenu = false;
    public contextmenuX = 0;
    public contextmenuY = 0;
    public clickedCell: any = null;
    public copiedData: any;
    public multiCellSelection: { data: any[] } = { data: [] };
    public multiCellArgs: any;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        
        grid.data = this.nwindData;
        this.rightClick = this.rightClick.bind(this);
        this.copySelectedData = this.copySelectedData.bind(this);
        this.copySelectedRowData = this.copySelectedRowData.bind(this);
        this.copySelectedCellData = this.copySelectedCellData.bind(this);
        document.getElementById('copySingleCell').addEventListener("click", this.copySelectedCellData);
        document.getElementById('copyRow').addEventListener("click", this.copySelectedRowData);
        document.getElementById('copyMultiCells').addEventListener("click", this.copySelectedData);
        grid.addEventListener("contextMenu", this.rightClick);
        const icon = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M180-81q-24 0-42-18t-18-42v-603h60v603h474v60H180Zm120-120q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440v-560H300v560Zm0 0v-560 560Z"/></svg>`;
        registerIconFromText("content_copy", icon);
    }

    private _nwindData: NwindData = null;
    public get nwindData(): NwindData {
        if (this._nwindData == null)
        {
            this._nwindData = new NwindData();
        }
        return this._nwindData;
    }

    public rightClick(event: any) {
        const eventArgs = event.detail;
        eventArgs.event.preventDefault();
        this.multiCellArgs = {};
        if (this.multiCellSelection) {
          const node = eventArgs.cell.selectionNode;
          const isCellWithinRange = this.grid.getSelectedRanges().some((range) => {
            if (
              node.column >= range.columnStart &&
              node.column <= range.columnEnd &&
              node.row >= range.rowStart &&
              node.row <= range.rowEnd
            ) {
              return true;
            }
            return false;
          });
          if (isCellWithinRange) {
            this.multiCellArgs = { data: this.multiCellSelection.data };
          }
        }
        this.contextmenuX = eventArgs.event.clientX;
        this.contextmenuY = eventArgs.event.clientY;
        this.clickedCell = eventArgs.cell;
        this.toggleContextMenu();
      }

      public toggleContextMenu() {
        this.contextmenu = !this.contextmenu;
        const menu = document.getElementById('menu');
        if (this.contextmenu) {
            menu.style.left = this.contextmenuX + "px";
            menu.style.top = this.contextmenuY + "px";
            menu.style.display = "";
        } else {
            menu.style.display = "none";
        }
      }

      public copySelectedRowData() {
        const selectedData = this.grid.getRowData(this.clickedCell.id.rowID);
        this.copyData(selectedData);
        const selectedDataArea = document.getElementById('selectedArea');
        selectedDataArea.innerText = JSON.stringify(selectedData);
        this.toggleContextMenu();
    }

    public copySelectedCellData() {
        const selectedData = this.clickedCell.value;
        this.copyData(selectedData);
        const selectedDataArea = document.getElementById('selectedArea');
        selectedDataArea.innerText = JSON.stringify(selectedData);
        this.toggleContextMenu();
    }

      
    public copySelectedData() {
        const selectedData = this.grid.getSelectedData();
        this.copyData(selectedData);
        const selectedDataArea = document.getElementById('selectedArea');
        selectedDataArea.innerText = JSON.stringify(selectedData);
        
        this.toggleContextMenu();
    }

    private copyData(data: any[]) {
        const tempElement = document.createElement('input');
        document.body.appendChild(tempElement);
        tempElement.setAttribute('id', 'temp_id');
        (document.getElementById('temp_id') as HTMLInputElement).value = JSON.stringify(data);
        tempElement.select();
        document.execCommand('copy');
        document.body.removeChild(tempElement);
    }
}

new Sample();
