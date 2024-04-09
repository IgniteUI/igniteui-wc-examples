import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent, IgcRowIslandComponent } from 'igniteui-webcomponents-grids/grids';
import { SingersDataItem, SingersDataItem_ToursItem, SingersDataItem_AlbumsItem, SingersDataItem_AlbumsItem_SongsItem, SingersData } from './SingersData';
import { IgcRowSelectionEventArgs, IgcGridEditEventArgs, IgcGridEditDoneEventArgs } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private hierarchicalGrid: IgcHierarchicalGridComponent
    private rowIsland: IgcRowIslandComponent
    private _bind: () => void;

    constructor() {
        var hierarchicalGrid = this.hierarchicalGrid = document.getElementById('hierarchicalGrid') as IgcHierarchicalGridComponent;
        this.webHierarchicalGridRendered = this.webHierarchicalGridRendered.bind(this);
        this.webHierarchicalGridRowEditEnter = this.webHierarchicalGridRowEditEnter.bind(this);
        this.webHierarchicalGridRowEdit = this.webHierarchicalGridRowEdit.bind(this);
        this.webHierarchicalGridRowEditDone = this.webHierarchicalGridRowEditDone.bind(this);
        this.webHierarchicalGridRowEditExit = this.webHierarchicalGridRowEditExit.bind(this);
        this.webHierarchicalGridCellEditEnter = this.webHierarchicalGridCellEditEnter.bind(this);
        this.webHierarchicalGridCellEdit = this.webHierarchicalGridCellEdit.bind(this);
        this.webHierarchicalGridCellEditExit = this.webHierarchicalGridCellEditExit.bind(this);
        var rowIsland = this.rowIsland = document.getElementById('rowIsland') as IgcRowIslandComponent;
        this.webRowIslandGridRowEditEnter = this.webRowIslandGridRowEditEnter.bind(this);
        this.webRowIslandGridRowEdit = this.webRowIslandGridRowEdit.bind(this);
        this.webRowIslandGridRowEditDone = this.webRowIslandGridRowEditDone.bind(this);
        this.webRowIslandGridRowEditExit = this.webRowIslandGridRowEditExit.bind(this);
        this.webRowIslandGridCellEditEnter = this.webRowIslandGridCellEditEnter.bind(this);
        this.webRowIslandGridCellEdit = this.webRowIslandGridCellEdit.bind(this);
        this.webRowIslandGridCellEditExit = this.webRowIslandGridCellEditExit.bind(this);

        this._bind = () => {
            hierarchicalGrid.data = this.singersData;
            hierarchicalGrid.addEventListener("rendered", this.webHierarchicalGridRendered);
            hierarchicalGrid.addEventListener("rowEditEnter", this.webHierarchicalGridRowEditEnter);
            hierarchicalGrid.addEventListener("rowEdit", this.webHierarchicalGridRowEdit);
            hierarchicalGrid.addEventListener("rowEditDone", this.webHierarchicalGridRowEditDone);
            hierarchicalGrid.addEventListener("rowEditExit", this.webHierarchicalGridRowEditExit);
            hierarchicalGrid.addEventListener("cellEditEnter", this.webHierarchicalGridCellEditEnter);
            hierarchicalGrid.addEventListener("cellEdit", this.webHierarchicalGridCellEdit);
            hierarchicalGrid.addEventListener("cellEditExit", this.webHierarchicalGridCellEditExit);
            rowIsland.addEventListener("rowEditEnter", this.webRowIslandGridRowEditEnter);
            rowIsland.addEventListener("rowEdit", this.webRowIslandGridRowEdit);
            rowIsland.addEventListener("rowEditDone", this.webRowIslandGridRowEditDone);
            rowIsland.addEventListener("rowEditExit", this.webRowIslandGridRowEditExit);
            rowIsland.addEventListener("cellEditEnter", this.webRowIslandGridCellEditEnter);
            rowIsland.addEventListener("cellEdit", this.webRowIslandGridCellEdit);
            rowIsland.addEventListener("cellEditExit", this.webRowIslandGridCellEditExit);
        }
        this._bind();

    }

    private _singersData: SingersData = null;
    public get singersData(): SingersData {
        if (this._singersData == null)
        {
            this._singersData = new SingersData();
        }
        return this._singersData;
    }


    public webHierarchicalGridRendered(args:any): void {
        const hierarchicalGrid = document.getElementById("hierarchicalGrid");
        hierarchicalGrid.parentElement.style.display = "flex";
        const container = document.createElement("div");
        container.id = "container";
        container.style.height = "80vh";
        container.style.width = "100%";
        container.style.overflow = "auto";
        hierarchicalGrid.parentElement.appendChild(container);
        const title = document.createElement("span");
        title.textContent = "Events execution sequence:";
        container.appendChild(title);
    }

    public webHierarchicalGridRowEditEnter(args: CustomEvent<IgcGridEditEventArgs>): void {
        let container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = `Hierarchical Grid => 'rowEditEnter' with 'RowID':` + args.detail.rowID;
        container.appendChild(message);
    }

    public webHierarchicalGridRowEdit(args: CustomEvent<IgcGridEditEventArgs>): void {
        let container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = `Hierarchical Grid => 'rowEdit'`;
        container.appendChild(message);
    }

    public webHierarchicalGridRowEditDone(args: CustomEvent<IgcGridEditDoneEventArgs>): void {
        let container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = `Hierarchical Grid => 'rowEditDone'`;
        container.appendChild(message);
    }

    public webHierarchicalGridRowEditExit(args: CustomEvent<IgcGridEditDoneEventArgs>): void {
        let container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = `Hierarchical Grid => 'rowEditExit'  << End of cycle >>`;
        container.appendChild(message);
    }

    public webHierarchicalGridCellEditEnter(args: CustomEvent<IgcGridEditEventArgs>): void {
        let container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = `Hierarchical Grid => 'cellEditEnter' with 'value':` + args.detail.oldValue, args.detail.cancel;
        container.appendChild(message);
    }

    public webHierarchicalGridCellEdit(args: CustomEvent<IgcGridEditEventArgs>): void {
        let container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = `Hierarchical Grid => 'cellEdit' with 'newValue':` + args.detail.newValue, args.detail.cancel;
        container.appendChild(message);
    }

    public webHierarchicalGridCellEditExit(args: CustomEvent<IgcGridEditDoneEventArgs>): void {
        let container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = `Hierarchical Grid => 'cellEditExit'`;
        container.appendChild(message);
    }

    public webRowIslandGridRowEditEnter(args: CustomEvent<IgcGridEditEventArgs>): void {
        let container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = `Row Island => 'rowEditEnter' with 'RowID':` + args.detail.rowID;
        container.appendChild(message);
    }

    public webRowIslandGridRowEdit(args: CustomEvent<IgcGridEditEventArgs>): void {
        let container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = `Row Island => 'rowEdit'`;
        container.appendChild(message);
    }

    public webRowIslandGridRowEditDone(args: CustomEvent<IgcGridEditDoneEventArgs>): void {
        let container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = `Row Island => 'rowEditDone'`;
        container.appendChild(message);
    }

    public webRowIslandGridRowEditExit(args: CustomEvent<IgcGridEditDoneEventArgs>): void {
        let container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = `Row Island => 'rowEditExit'  << End of cycle >>`;
        container.appendChild(message);
    }

    public webRowIslandGridCellEditEnter(args: CustomEvent<IgcGridEditEventArgs>): void {
        let container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = `Row Island => 'cellEditEnter' with 'value':` + args.detail.oldValue, args.detail.cancel;
        container.appendChild(message);
    }

    public webRowIslandGridCellEdit(args: CustomEvent<IgcGridEditEventArgs>): void {
        let container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = `Row Island => 'cellEdit' with 'newValue':` + args.detail.newValue, args.detail.cancel;
        container.appendChild(message);
    }

    public webRowIslandGridCellEditExit(args: CustomEvent<IgcGridEditDoneEventArgs>): void {
        let container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = `Row Island => 'cellEditExit'`;
        container.appendChild(message);
    }

}

new Sample();
