import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule, WebColumnLayoutDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent, IgcColumnLayoutComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { CompanyDataItem, CompanyData } from './CompanyData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

export class Sample {

    private grid: IgcGridComponent
    private companyInfo: IgcColumnLayoutComponent
    private company: IgcColumnComponent
    private country: IgcColumnComponent
    private city: IgcColumnComponent
    private address: IgcColumnComponent
    private sales: IgcColumnLayoutComponent
    private lifetimeSales: IgcColumnComponent
    private quarterly: IgcColumnComponent
    private yearly: IgcColumnComponent
    private marketPotentialInfo: IgcColumnLayoutComponent
    private marketPotential: IgcColumnComponent
    private assets: IgcColumnLayoutComponent
    private assetsCash: IgcColumnComponent
    private accountsReceivable: IgcColumnComponent
    private assetsBooks: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        this.webGridMRLCustomNavigationEvent = this.webGridMRLCustomNavigationEvent.bind(this);
        var companyInfo = this.companyInfo = document.getElementById('CompanyInfo') as IgcColumnLayoutComponent;
        var company = this.company = document.getElementById('Company') as IgcColumnComponent;
        var country = this.country = document.getElementById('Country') as IgcColumnComponent;
        var city = this.city = document.getElementById('City') as IgcColumnComponent;
        var address = this.address = document.getElementById('Address') as IgcColumnComponent;
        var sales = this.sales = document.getElementById('Sales') as IgcColumnLayoutComponent;
        var lifetimeSales = this.lifetimeSales = document.getElementById('LifetimeSales') as IgcColumnComponent;
        var quarterly = this.quarterly = document.getElementById('Quarterly') as IgcColumnComponent;
        var yearly = this.yearly = document.getElementById('Yearly') as IgcColumnComponent;
        var marketPotentialInfo = this.marketPotentialInfo = document.getElementById('MarketPotentialInfo') as IgcColumnLayoutComponent;
        var marketPotential = this.marketPotential = document.getElementById('MarketPotential') as IgcColumnComponent;
        var assets = this.assets = document.getElementById('Assets') as IgcColumnLayoutComponent;
        var assetsCash = this.assetsCash = document.getElementById('AssetsCash') as IgcColumnComponent;
        var accountsReceivable = this.accountsReceivable = document.getElementById('AccountsReceivable') as IgcColumnComponent;
        var assetsBooks = this.assetsBooks = document.getElementById('AssetsBooks') as IgcColumnComponent;

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

    public webGridMRLCustomNavigationEvent(args: any): void {
        const target = args.detail.target;
        const grid = document.getElementsByTagName("igc-grid")[0] as any;
        if (args.detail.event.key.toLowerCase() === 'enter') {
           args.detail.event.preventDefault();
           args.detail.cancel = true;
           const rowIndex = target.row.index === undefined ? target.index : target.row.index;
           grid.navigateTo(args.detail.event.shiftKey ? rowIndex - 1 : rowIndex + 1, target.column.visibleIndex,
                (obj: any) => {
                   obj.target.activate();
               });
        }
    }

}

new Sample();
