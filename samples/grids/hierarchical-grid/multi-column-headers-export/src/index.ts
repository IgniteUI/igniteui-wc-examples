import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent, IgcGridToolbarExporterComponent } from 'igniteui-webcomponents-grids/grids';
import MultiColumnsExportData from './MultiColumnsExportData.json';
import { IgcExporterEventArgs } from 'igniteui-webcomponents-grids/grids';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";



export class Sample {

    private hierarchicalGrid1: IgcHierarchicalGridComponent
    private hGridToolbarExporter: IgcGridToolbarExporterComponent
    private _bind: () => void;

    constructor() {
        var hierarchicalGrid1 = this.hierarchicalGrid1 = document.getElementById('hierarchicalGrid1') as IgcHierarchicalGridComponent;
        var hGridToolbarExporter = this.hGridToolbarExporter = document.getElementById('hGridToolbarExporter') as IgcGridToolbarExporterComponent;
        this.webHierarchicalGridExportMultiColumnHeaders = this.webHierarchicalGridExportMultiColumnHeaders.bind(this);

        this._bind = () => {
            hierarchicalGrid1.data = this.multiColumnsExportData;
            hGridToolbarExporter.addEventListener("exportStarted", this.webHierarchicalGridExportMultiColumnHeaders);
        }
        this._bind();
    }

    private _multiColumnsExportData: any[] = MultiColumnsExportData;
    public get multiColumnsExportData(): any[] {
        return this._multiColumnsExportData;
    }

    public webHierarchicalGridExportMultiColumnHeaders(args: CustomEvent<IgcExporterEventArgs>): void {
        if (args.detail.options) {
            args.detail.options.ignoreMultiColumnHeaders = false;
        }
    }

}

new Sample();
