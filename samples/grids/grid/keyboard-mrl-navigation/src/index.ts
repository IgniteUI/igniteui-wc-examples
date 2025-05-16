import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule, WebColumnLayoutDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent, IgcColumnLayoutComponent } from 'igniteui-webcomponents-grids/grids';
import { CompanyDataItem, CompanyData } from './CompanyData';
import { IgcGridKeydownEventArgs } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid: IgcGridComponent
    private companyInfo: IgcColumnLayoutComponent
    private sales: IgcColumnLayoutComponent
    private marketPotentialInfo: IgcColumnLayoutComponent
    private assets: IgcColumnLayoutComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        this.webGridMRLCustomNavigationEvent = this.webGridMRLCustomNavigationEvent.bind(this);
        var companyInfo = this.companyInfo = document.getElementById('CompanyInfo') as IgcColumnLayoutComponent;
        var sales = this.sales = document.getElementById('Sales') as IgcColumnLayoutComponent;
        var marketPotentialInfo = this.marketPotentialInfo = document.getElementById('MarketPotentialInfo') as IgcColumnLayoutComponent;
        var assets = this.assets = document.getElementById('Assets') as IgcColumnLayoutComponent;

        this._bind = () => {
            grid.data = this.companyData;
            grid.addEventListener("gridKeydown", this.webGridMRLCustomNavigationEvent);
        }
        this._bind();

    }

    private _companyData: CompanyData = null;
    public get companyData(): CompanyData {
        if (this._companyData == null)
        {
            this._companyData = new CompanyData();
        }
        return this._companyData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebGridDescriptionModule.register(context);
            WebColumnLayoutDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webGridMRLCustomNavigationEvent(args: CustomEvent<IgcGridKeydownEventArgs>): void {
        const target = args.detail.target;
        const grid: IgcGridComponent = this.grid;
        if ((args.detail.event as any).key.toLowerCase() === 'enter') {
           args.detail.event.preventDefault();
           args.detail.cancel = true;
           const rowIndex = target.row.index === undefined ? target.index : target.row.index;
           (grid as any).navigateTo((args.detail.event as any).shiftKey ? rowIndex - 1 : rowIndex + 1, target.column.visibleIndex,
                (obj: any) => {
                   obj.target.activate();
               });
        }
    }

}

new Sample();
