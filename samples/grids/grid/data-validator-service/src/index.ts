import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcGridComponent, IgcColumnComponent, IgcColumnPipeArgs } from 'igniteui-webcomponents-grids/grids';
import { EmployeesDataItem, EmployeesData } from './EmployeesData';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';

defineAllComponents();

import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule
);

export class Sample {

    private propertyEditor: IgcPropertyEditorPanelComponent
    private rowEditableEditor: IgcPropertyEditorPropertyDescriptionComponent
    private grid: IgcGridComponent
    private avatar: IgcColumnComponent
    private name: IgcColumnComponent
    private company: IgcColumnComponent
    private email: IgcColumnComponent
    private fax: IgcColumnComponent
    private createdOn: IgcColumnComponent
    private _columnPipeArgs1: IgcColumnPipeArgs | null = null;
    public get columnPipeArgs1(): IgcColumnPipeArgs {
        if (this._columnPipeArgs1 == null)
        {
            var columnPipeArgs1: IgcColumnPipeArgs = {} as IgcColumnPipeArgs;
            columnPipeArgs1.format = "longDate";

            this._columnPipeArgs1 = columnPipeArgs1;
        }
        return this._columnPipeArgs1;
    }

    private lastActivity: IgcColumnComponent
    private estimatedSales: IgcColumnComponent
    private dealsLost: IgcColumnComponent
    private dealsWon: IgcColumnComponent
    private dealsPending: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var propertyEditor = this.propertyEditor = document.getElementById('PropertyEditor') as IgcPropertyEditorPanelComponent;
        var rowEditableEditor = this.rowEditableEditor = document.getElementById('RowEditableEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var avatar = this.avatar = document.getElementById('Avatar') as IgcColumnComponent;
        var name = this.name = document.getElementById('Name') as IgcColumnComponent;
        var company = this.company = document.getElementById('Company') as IgcColumnComponent;
        var email = this.email = document.getElementById('Email') as IgcColumnComponent;
        var fax = this.fax = document.getElementById('Fax') as IgcColumnComponent;
        var createdOn = this.createdOn = document.getElementById('CreatedOn') as IgcColumnComponent;
        var lastActivity = this.lastActivity = document.getElementById('LastActivity') as IgcColumnComponent;
        var estimatedSales = this.estimatedSales = document.getElementById('EstimatedSales') as IgcColumnComponent;
        var dealsLost = this.dealsLost = document.getElementById('DealsLost') as IgcColumnComponent;
        var dealsWon = this.dealsWon = document.getElementById('DealsWon') as IgcColumnComponent;
        var dealsPending = this.dealsPending = document.getElementById('DealsPending') as IgcColumnComponent;

        this._bind = () => {
            propertyEditor.componentRenderer = this.renderer;
            propertyEditor.target = this.grid;
            grid.data = this.employeesData;
            avatar.bodyTemplate = this.webGridAvatarCellTemplate;
            createdOn.pipeArgs = this.columnPipeArgs1;
        }
        this._bind();
    }

    private _employeesData: EmployeesData = null;
    public get employeesData(): EmployeesData {
        if (this._employeesData == null)
        {
            this._employeesData = new EmployeesData();
        }
        return this._employeesData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            WebGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

        public webGridAvatarCellTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<div>
        <igc-avatar shape="circle" src="${ctx.cell.value}">
        </igc-avatar>
    </div>`;
    }

}

new Sample();
