import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { NwindDataItem, NwindDataItem_LocationsItem, NwindData } from './NwindData';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents, IgcButtonComponent, IgcInputComponent, IgcSwitchComponent } from 'igniteui-webcomponents';
defineAllComponents();
export class Sample {
    private grid: IgcGridComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        this.webGridClipboardOperationsColumnInit = this.webGridClipboardOperationsColumnInit.bind(this);

        this._bind = () => {
            grid.data = this.nwindData;
            grid.addEventListener("columnInit", this.webGridClipboardOperationsColumnInit);

            var copyBehaviorSwitch = document.getElementById("copy") as IgcSwitchComponent;
            copyBehaviorSwitch.addEventListener("igcChange", (ev: CustomEvent) => {
                grid.clipboardOptions.enabled = ev.detail;
            });

            var copyHeaderSwitch = document.getElementById("headerCopy") as IgcSwitchComponent;
            copyHeaderSwitch.addEventListener("igcChange", (ev: CustomEvent) => {
                grid.clipboardOptions.copyHeaders = ev.detail;
            });

            var formatterSwitch = document.getElementById("formatterCopy") as IgcSwitchComponent;
            formatterSwitch.addEventListener("igcChange", (ev: CustomEvent) => {
                grid.clipboardOptions.copyHeaders = ev.detail;
            });

            var selectionClearBtn = document.getElementById("selectionClear") as IgcButtonComponent;
            selectionClearBtn.addEventListener('click', (ev: any) => {
                grid.cellSelection = 'none';
                grid.cellSelection = 'multiple';
            });

            var input = document.getElementById("input") as IgcInputComponent;
            input.addEventListener("igcChange", (ev: CustomEvent) => {
                grid.clipboardOptions.separator = ev.detail;
            });
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

    public webGridClipboardOperationsColumnInit(args: any): void {
        let column = args.detail;
        column.formatter = (e: any) => { return "** " + e + " **" };
        column.header = "🎉" + column.field;
    }

}

new Sample();
