import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { AthletesDataItem, AthletesData } from './AthletesData';
import { IgcRowSelectionEventArgs, IgcExporterOptionsBase } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid1: IgcGridComponent
    private _bind: () => void;

    constructor() {
        var grid1 = this.grid1 = document.getElementById('grid1') as IgcGridComponent;
        this.webGridToolbarExporting = this.webGridToolbarExporting.bind(this);

        this._bind = () => {
            grid1.data = this.athletesData;
            grid1.addEventListener("toolbarExporting", this.webGridToolbarExporting);
        }
        this._bind();

    }

    private _athletesData: AthletesData = null;
    public get athletesData(): AthletesData {
        if (this._athletesData == null)
        {
            this._athletesData = new AthletesData();
        }
        return this._athletesData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webGridToolbarExporting(evt:any): void {
        const args = evt.detail;
        const options: IgcExporterOptionsBase = args.options;

        options.fileName = `Report_${new Date().toDateString()}`;
        (args.exporter as any).columnExporting.subscribe((columnArgs: any) => {
                columnArgs.cancel = columnArgs.header === 'Athlete' || columnArgs.header === 'Country';
        });
    }

}

new Sample();
