import 'igniteui-webcomponents-grids/grids/combined';
import { IgcColumnComponent, IgcColumnPipeArgs, IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { EMPLOYEES_DATA } from './EmployeesData';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";



export class Sample {
    public get columnPipeArgs1(): IgcColumnPipeArgs {
        return {
            format: "long",
            timezone: "UTC+0"
        };
    }

    public get columnPipeArgs2(): IgcColumnPipeArgs {
        return {
            format: "mediumDate"
        };
    }

    public get columnPipeArgs3(): IgcColumnPipeArgs {
        return {
            format: "shortTime",
            timezone: "UTC+0"
        };
    }

    public get columnPipeArgs4(): IgcColumnPipeArgs {
        return {
            currencyCode: "",
            digitsInfo: "1.3-3"
        };
    }

    public get columnPipeArgs5(): IgcColumnPipeArgs {
        return {
            digitsInfo: '2.2-3'
        };
    }

    constructor() {
        var grid = document.getElementById('grid') as IgcTreeGridComponent;
        var column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = document.getElementById('column2') as IgcColumnComponent;
        var column3 = document.getElementById('column3') as IgcColumnComponent;
        var column4 = document.getElementById('column4') as IgcColumnComponent;
        var column5 = document.getElementById('column5') as IgcColumnComponent;

        grid.data = EMPLOYEES_DATA;
        column1.pipeArgs = this.columnPipeArgs1;
        column2.pipeArgs = this.columnPipeArgs2;
        column3.pipeArgs = this.columnPipeArgs3;
        column4.pipeArgs = this.columnPipeArgs4;
        column5.pipeArgs = this.columnPipeArgs5;
    }
}

export function initialize() {
  return new Sample();
}