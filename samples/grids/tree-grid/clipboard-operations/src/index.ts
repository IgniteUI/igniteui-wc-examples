import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebTreeGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesFlatDetailsItem, EmployeesFlatDetails } from './EmployeesFlatDetails';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents, IgcButtonComponent, IgcInputComponent, IgcSwitchComponent } from 'igniteui-webcomponents';
defineAllComponents();


export class Sample {

    private clipboardEnabledEditor: IgcPropertyEditorPropertyDescriptionComponent
    private clipboardHeadersEditor: IgcPropertyEditorPropertyDescriptionComponent
    private clipboardFormattersEditor: IgcPropertyEditorPropertyDescriptionComponent
    private treeGrid: IgcTreeGridComponent

    constructor() {
        var clipboardEnabledEditor = this.clipboardEnabledEditor = document.getElementById('ClipboardEnabledEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var clipboardHeadersEditor = this.clipboardHeadersEditor = document.getElementById('ClipboardHeadersEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var clipboardFormattersEditor = this.clipboardFormattersEditor = document.getElementById('ClipboardFormattersEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webGridClearSelection = this.webGridClearSelection.bind(this);
        var grid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        this.webGridClipboardOperationsColumnInit = this.webGridClipboardOperationsColumnInit.bind(this);

        grid.data = this.employeesFlatDetails;
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
            grid.clipboardOptions.copyFormatters = ev.detail;
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

    private _employeesFlatDetails: EmployeesFlatDetails = null;
    public get employeesFlatDetails(): EmployeesFlatDetails {
        if (this._employeesFlatDetails == null)
        {
            this._employeesFlatDetails = new EmployeesFlatDetails();
        }
        return this._employeesFlatDetails;
    }
    public webGridClearSelection(args: any): void {
        console.log("TODO" + args);
    	//TODO
    }

    public webGridClipboardOperationsColumnInit(args: any): void {
        let column = args.detail;
        column.formatter = (e: any) => { return "** " + e + " **" };
        column.header = "🎉" + column.field;
    }

}

new Sample();
