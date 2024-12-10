import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcColumnComponent, IgcColumnPipeArgs } from 'igniteui-webcomponents-grids/grids';
import { InvoicesDataExtendedDates } from './InvoicesDataExtendedDates';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";



export class Sample {

    private grid: IgcGridComponent
    private column1: IgcColumnComponent
    private _columnPipeArgs1: IgcColumnPipeArgs | null = null;
    public get columnPipeArgs1(): IgcColumnPipeArgs {
        if (this._columnPipeArgs1 == null)
        {
            var columnPipeArgs1: IgcColumnPipeArgs = {} as IgcColumnPipeArgs;
            columnPipeArgs1.currencyCode = "";
            columnPipeArgs1.digitsInfo = "1.4-4";

            this._columnPipeArgs1 = columnPipeArgs1;
        }
        return this._columnPipeArgs1;
    }

    private column2: IgcColumnComponent
    private _columnPipeArgs2: IgcColumnPipeArgs | null = null;
    public get columnPipeArgs2(): IgcColumnPipeArgs {
        if (this._columnPipeArgs2 == null)
        {
            var columnPipeArgs2: IgcColumnPipeArgs = {} as IgcColumnPipeArgs;
            columnPipeArgs2.format = "long";
            columnPipeArgs2.timezone = "UTC+0";

            this._columnPipeArgs2 = columnPipeArgs2;
        }
        return this._columnPipeArgs2;
    }

    private column3: IgcColumnComponent
    private _columnPipeArgs3: IgcColumnPipeArgs | null = null;
    public get columnPipeArgs3(): IgcColumnPipeArgs {
        if (this._columnPipeArgs3 == null)
        {
            var columnPipeArgs3: IgcColumnPipeArgs = {} as IgcColumnPipeArgs;
            columnPipeArgs3.format = "mediumDate";

            this._columnPipeArgs3 = columnPipeArgs3;
        }
        return this._columnPipeArgs3;
    }

    private column4: IgcColumnComponent
    private _columnPipeArgs4: IgcColumnPipeArgs | null = null;
    public get columnPipeArgs4(): IgcColumnPipeArgs {
        if (this._columnPipeArgs4 == null)
        {
            var columnPipeArgs4: IgcColumnPipeArgs = {} as IgcColumnPipeArgs;
            columnPipeArgs4.format = "shortTime";
            columnPipeArgs4.timezone = "UTC+0";

            this._columnPipeArgs4 = columnPipeArgs4;
        }
        return this._columnPipeArgs4;
    }

    private column5: IgcColumnComponent
    private _columnPipeArgs5: IgcColumnPipeArgs | null = null;
    public get columnPipeArgs5(): IgcColumnPipeArgs {
        if (this._columnPipeArgs5 == null)
        {
            var columnPipeArgs5: IgcColumnPipeArgs = {} as IgcColumnPipeArgs;
            columnPipeArgs5.currencyCode = "";
            columnPipeArgs5.digitsInfo = "1.4-4";

            this._columnPipeArgs5 = columnPipeArgs5;
        }
        return this._columnPipeArgs5;
    }

    private column6: IgcColumnComponent
    private _columnPipeArgs6: IgcColumnPipeArgs | null = null;
    public get columnPipeArgs6(): IgcColumnPipeArgs {
        if (this._columnPipeArgs6 == null)
        {
            var columnPipeArgs6: IgcColumnPipeArgs = {} as IgcColumnPipeArgs;
            columnPipeArgs6.currencyCode = "";
            columnPipeArgs6.digitsInfo = "1.4-4";

            this._columnPipeArgs6 = columnPipeArgs6;
        }
        return this._columnPipeArgs6;
    }

    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;
        var column3 = this.column3 = document.getElementById('column3') as IgcColumnComponent;
        var column4 = this.column4 = document.getElementById('column4') as IgcColumnComponent;
        var column5 = this.column5 = document.getElementById('column5') as IgcColumnComponent;
        var column6 = this.column6 = document.getElementById('column6') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.invoicesDataExtendedDates;
            column1.pipeArgs = this.columnPipeArgs1;
            column2.pipeArgs = this.columnPipeArgs2;
            column3.pipeArgs = this.columnPipeArgs3;
            column4.pipeArgs = this.columnPipeArgs4;
            column5.pipeArgs = this.columnPipeArgs5;
            column6.pipeArgs = this.columnPipeArgs6;
        }
        this._bind();
    }

    private _invoicesDataExtendedDates: InvoicesDataExtendedDates = null;
    public get invoicesDataExtendedDates(): InvoicesDataExtendedDates {
        if (this._invoicesDataExtendedDates == null)
        {
            this._invoicesDataExtendedDates = new InvoicesDataExtendedDates();
        }
        return this._invoicesDataExtendedDates;
    }

}

new Sample();
