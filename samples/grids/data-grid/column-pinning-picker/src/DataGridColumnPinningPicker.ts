
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { DataGridSharedData } from './DataGridSharedData';
import { PinnedPositions } from 'igniteui-webcomponents-grids';
import { Button } from '@material/mwc-button';

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);

export class DataGridColumnPinningPicker {


    public data: any[];
    
    
        
    public grid: IgcDataGridComponent;
    public buttonLeft: Button;
    public buttonRight: Button;

    constructor() {
        
        this.onGridRef = this.onGridRef.bind(this);
        this.onPinLeft = this.onPinLeft.bind(this);
        this.onPinRight = this.onPinRight.bind(this);
        this.onUnPin = this.onUnPin.bind(this);

        this.data = DataGridSharedData.getEmployees();
    
        

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees();
        this.buttonLeft = document.getElementById('pinLeft') as Button;
        this.buttonRight = document.getElementById('pinRight') as Button;
        this.buttonLeft.disabled = true;
        this.buttonRight.disabled = true;

        document.getElementById('pinLeft').addEventListener('click', this.onPinLeft);
        document.getElementById('pinRight').addEventListener('click', this.onPinRight);
        document.getElementById('unpinColumns').addEventListener('click', this.onUnPin);

    }

    public onGridRef(grid: IgcDataGridComponent) {
        this.grid = grid;
    }

    onPinLeft () {
        this.buttonLeft.disabled = true;
        this.buttonRight.disabled = true;

        let idColumn = this.grid.actualColumns.item(0);
        let nameColumn = this.grid.actualColumns.item(1);

        this.grid.pinColumn(idColumn, PinnedPositions.Left);
        this.grid.pinColumn(nameColumn, PinnedPositions.Left);
    }

    onPinRight () {
        this.buttonLeft.disabled = true;
        this.buttonRight.disabled = true;

        let streetColumn = this.grid.actualColumns.item(5);
        let cityColumn = this.grid.actualColumns.item(6);
        let countryColumn = this.grid.actualColumns.item(7);
        this.grid.pinColumn(streetColumn, PinnedPositions.Right);
        this.grid.pinColumn(cityColumn, PinnedPositions.Right);
        this.grid.pinColumn(countryColumn, PinnedPositions.Right);
    }

    onUnPin () {
        this.buttonLeft.disabled = false;
        this.buttonRight.disabled = false;

        let idColumn = this.grid.actualColumns.item(0);
        let nameColumn = this.grid.actualColumns.item(1);
        this.grid.pinColumn(idColumn, PinnedPositions.None);
        this.grid.pinColumn(nameColumn, PinnedPositions.None);

        let streetColumn = this.grid.actualColumns.item(5);
        let cityColumn = this.grid.actualColumns.item(6);
        let countryColumn = this.grid.actualColumns.item(7);
        this.grid.pinColumn(streetColumn, PinnedPositions.None);
        this.grid.pinColumn(cityColumn, PinnedPositions.None);
        this.grid.pinColumn(countryColumn, PinnedPositions.None);
    }
}

let sample = new DataGridColumnPinningPicker();