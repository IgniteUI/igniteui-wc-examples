import 'igniteui-webcomponents-grids/grids/combined';
import { IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesFlatData } from './EmployeesFlatData';
import { IgcGridEditEventArgs, IgcGridEditDoneEventArgs } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid: IgcTreeGridComponent
    private readonly eventLog: HTMLDivElement;
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcTreeGridComponent;
        this.eventLog = document.querySelector<HTMLDivElement>("#event-log")!;
        document.querySelector("#clear-log")!.addEventListener("click", () => this.eventLog.replaceChildren());
        this.webGridRowEditEnter = this.webGridRowEditEnter.bind(this);
        this.webGridRowEdit = this.webGridRowEdit.bind(this);
        this.webGridRowEditDone = this.webGridRowEditDone.bind(this);
        this.webGridRowEditExit = this.webGridRowEditExit.bind(this);
        this.webGridCellEditEnter = this.webGridCellEditEnter.bind(this);
        this.webGridCellEdit = this.webGridCellEdit.bind(this);
        this.webGridCellEditDone = this.webGridCellEditDone.bind(this);
        this.webGridCellEditExit = this.webGridCellEditExit.bind(this);

        this._bind = () => {
            grid.data = this.employeesFlatData;
            grid.addEventListener("rowEditEnter", this.webGridRowEditEnter);
            grid.addEventListener("rowEdit", this.webGridRowEdit);
            grid.addEventListener("rowEditDone", this.webGridRowEditDone);
            grid.addEventListener("rowEditExit", this.webGridRowEditExit);
            grid.addEventListener("cellEditEnter", this.webGridCellEditEnter);
            grid.addEventListener("cellEdit", this.webGridCellEdit);
            grid.addEventListener("cellEditDone", this.webGridCellEditDone);
            grid.addEventListener("cellEditExit", this.webGridCellEditExit);
        }
        this._bind();

    }

    private _employeesFlatData?: EmployeesFlatData;
    public get employeesFlatData(): EmployeesFlatData {
        if (this._employeesFlatData == null)
        {
            this._employeesFlatData = new EmployeesFlatData();
        }
        return this._employeesFlatData;
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

    public webGridRowEditEnter(args: CustomEvent<IgcGridEditEventArgs>): void {
        this.logEvent(`=> 'rowEditEnter' with 'RowID':${args.detail.rowID}`, args);
    }

    public webGridRowEdit(args: CustomEvent<IgcGridEditEventArgs>): void {
        this.logEvent(`=> 'rowEdit'`, args);
    }

    public webGridRowEditDone(args: CustomEvent<IgcGridEditDoneEventArgs>): void {
        this.logEvent(`=> 'rowEditDone'`);
    }

    public webGridRowEditExit(args: CustomEvent<IgcGridEditDoneEventArgs>): void {
        this.logEvent(`=> 'rowEditExit'  << End of cycle >>`);
    }

    public webGridCellEditEnter(args: CustomEvent<IgcGridEditEventArgs>): void {
        this.logEvent(`=> 'cellEditEnter' with 'value':${args.detail.oldValue}`, args);
    }

    public webGridCellEdit(args: CustomEvent<IgcGridEditEventArgs>): void {
        this.logEvent(`=> 'cellEdit' with 'newValue':${args.detail.newValue}`, args);
    }

    public webGridCellEditDone(args: CustomEvent<IgcGridEditDoneEventArgs>): void {
        this.logEvent(`=> 'cellEditDone'`);
    }

    public webGridCellEditExit(args: CustomEvent<IgcGridEditDoneEventArgs>): void {
        this.logEvent(`=> 'cellEditExit'`);
    }

}

new Sample();
