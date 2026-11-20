import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent, IgcRowIslandComponent } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';
import { IgcGridEditEventArgs, IgcGridEditDoneEventArgs } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private hierarchicalGrid: IgcHierarchicalGridComponent
    private rowIsland: IgcRowIslandComponent
    private readonly eventLog: HTMLDivElement;
    private _bind: () => void;

    constructor() {
        var hierarchicalGrid = this.hierarchicalGrid = document.getElementById('hierarchicalGrid') as IgcHierarchicalGridComponent;
        this.eventLog = document.querySelector<HTMLDivElement>("#event-log")!;
        document.querySelector("#clear-log")!.addEventListener("click", () => this.eventLog.replaceChildren());
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

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
    }


    private logEvent(text: string, event?: CustomEvent<IgcGridEditEventArgs>): void {
        if (event && document.querySelector<HTMLInputElement>(`.editing-controls input[name="${event.type}"]`)?.checked) {
            event.detail.cancel = true;
            text += " (canceled)";
        }
        const message = document.createElement("p");
        message.textContent = text;
        this.eventLog.appendChild(message);
    }

    public webHierarchicalGridRowEditEnter(args: CustomEvent<IgcGridEditEventArgs>): void {
        this.logEvent(`Hierarchical Grid => 'rowEditEnter' with 'RowID':${args.detail.rowID}`, args);
    }

    public webHierarchicalGridRowEdit(args: CustomEvent<IgcGridEditEventArgs>): void {
        this.logEvent(`Hierarchical Grid => 'rowEdit'`, args);
    }

    public webHierarchicalGridRowEditDone(args: CustomEvent<IgcGridEditDoneEventArgs>): void {
        this.logEvent(`Hierarchical Grid => 'rowEditDone'`);
    }

    public webHierarchicalGridRowEditExit(args: CustomEvent<IgcGridEditDoneEventArgs>): void {
        this.logEvent(`Hierarchical Grid => 'rowEditExit'  << End of cycle >>`);
    }

    public webHierarchicalGridCellEditEnter(args: CustomEvent<IgcGridEditEventArgs>): void {
        this.logEvent(`Hierarchical Grid => 'cellEditEnter' with 'value':${args.detail.oldValue}`, args);
    }

    public webHierarchicalGridCellEdit(args: CustomEvent<IgcGridEditEventArgs>): void {
        this.logEvent(`Hierarchical Grid => 'cellEdit' with 'newValue':${args.detail.newValue}`, args);
    }

    public webHierarchicalGridCellEditExit(args: CustomEvent<IgcGridEditDoneEventArgs>): void {
        this.logEvent(`Hierarchical Grid => 'cellEditExit'`);
    }

    public webRowIslandGridRowEditEnter(args: CustomEvent<IgcGridEditEventArgs>): void {
        this.logEvent(`Row Island => 'rowEditEnter' with 'RowID':${args.detail.rowID}`, args);
    }

    public webRowIslandGridRowEdit(args: CustomEvent<IgcGridEditEventArgs>): void {
        this.logEvent(`Row Island => 'rowEdit'`, args);
    }

    public webRowIslandGridRowEditDone(args: CustomEvent<IgcGridEditDoneEventArgs>): void {
        this.logEvent(`Row Island => 'rowEditDone'`);
    }

    public webRowIslandGridRowEditExit(args: CustomEvent<IgcGridEditDoneEventArgs>): void {
        this.logEvent(`Row Island => 'rowEditExit'  << End of cycle >>`);
    }

    public webRowIslandGridCellEditEnter(args: CustomEvent<IgcGridEditEventArgs>): void {
        this.logEvent(`Row Island => 'cellEditEnter' with 'value':${args.detail.oldValue}`, args);
    }

    public webRowIslandGridCellEdit(args: CustomEvent<IgcGridEditEventArgs>): void {
        this.logEvent(`Row Island => 'cellEdit' with 'newValue':${args.detail.newValue}`, args);
    }

    public webRowIslandGridCellEditExit(args: CustomEvent<IgcGridEditDoneEventArgs>): void {
        this.logEvent(`Row Island => 'cellEditExit'`);
    }

}

new Sample();
