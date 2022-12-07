import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { NwindDataItem, NwindDataItem_LocationsItem, NwindData } from './NwindData';
import { IgcRowSelectionEventArgs } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";


export class Sample {

    private grid: IgcGridComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        this.webGridCellEditEnter = this.webGridCellEditEnter.bind(this);
        this.webGridCellEditExit = this.webGridCellEditExit.bind(this);
        this.webGridCellEdit = this.webGridCellEdit.bind(this);
        this.webGridCellEditDone = this.webGridCellEditDone.bind(this);
        this.webGridRowEditEnter = this.webGridRowEditEnter.bind(this);
        this.webGridRowEdit = this.webGridRowEdit.bind(this);
        this.webGridRowEditDone = this.webGridRowEditDone.bind(this);
        this.webGridRowEditExit = this.webGridRowEditExit.bind(this);
        this.webGridRendered = this.webGridRendered.bind(this);

        this._bind = () => {
            grid.data = this.nwindData
            // MT incorrect way of adding event handlers
            // grid.cellEditEnter = this.webGridCellEditEnter
            // grid.cellEditExit = this.webGridCellEditExit
            // grid.cellEdit = this.webGridCellEdit
            // grid.cellEditDone = this.webGridCellEditDone
            // grid.rowEditEnter = this.webGridRowEditEnter
            // grid.rowEdit = this.webGridRowEdit
            // grid.rowEditDone = this.webGridRowEditDone
            // grid.rowEditExit = this.webGridRowEditExit
            // grid.rendered = this.webGridRendered
        }
        this._bind();

    }

    private _nwindData: NwindData = null;
    public get nwindData(): NwindData {
        if (this._nwindData == null)
        {
            this._nwindData = new NwindData();
        }
        return this._nwindData;
    }




    public webGridCellEditEnter(args: any): void {
        let container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = `=> 'cellEditEnter' with 'value':` + args.oldValue, args.cancel;
        container.appendChild(message);
    }


    public webGridCellEditExit(args: any): void {
        let container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = `=> 'cellEditExit'`;
        container.appendChild(message);
    }


    public webGridCellEdit(args: any): void {
        let container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = `=> 'cellEdit' with 'newValue':` + args.newValue, args.cancel;
        container.appendChild(message);
    }


    public webGridCellEditDone(args: any): void {
        let container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = `=> 'cellEditDone'`;
        container.appendChild(message);
    }


    public webGridRowEditEnter(args: any): void {
        let container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = `=> 'rowEditEnter' with 'RowID':` + args.rowID;
        container.appendChild(message);
    }


    public webGridRowEdit(args: any): void {
        let container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = `=> 'rowEdit'`;
        container.appendChild(message);
    }


    public webGridRowEditDone(args: any): void {
        let container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = `=> 'rowEditDone'`;
        container.appendChild(message);
    }


    public webGridRowEditExit(args: any): void {
        let container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = `=> 'rowEditExit'  << End of cycle >>`;
        container.appendChild(message);
    }


    public webGridRendered(args:any): void {
        const grid = document.getElementById("grid");
        grid.parentElement.style.display = "flex";
        const container = document.createElement("div");
        container.id = "container";
        container.style.height = "100vh";
        container.style.width = "100%";
        container.style.overflow = "auto";
        grid.parentElement.appendChild(container);
        const title = document.createElement("span");
        title.textContent = "Events execution sequence";
        container.appendChild(title);
    }

}

new Sample();