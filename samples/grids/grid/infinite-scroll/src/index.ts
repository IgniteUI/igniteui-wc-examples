import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent, IgcColumnComponent, IgcForOfState } from 'igniteui-webcomponents-grids/grids';
import { NwindDataItem, NwindDataItem_LocationsItem, NwindData } from './NwindData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import { ModuleManager } from 'igniteui-webcomponents-core';
import { RemoteNwindService } from './NwindService';

ModuleManager.register(
    IgcPropertyEditorPanelModule
);

export class Sample {

    private grid: IgcGridComponent;
    public remoteData: any;
    private page = 1;
    private pageSize = 10;
    private totalPageCount = 0;
    private totalItems = 0;

    private iD: IgcColumnComponent
    private productName: IgcColumnComponent
    private quantityPerUnit: IgcColumnComponent
    private unitPrice: IgcColumnComponent
    private orderDate: IgcColumnComponent
    private discontinued: IgcColumnComponent
    private _bind: () => void;

    private remoteService = new RemoteNwindService();

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var iD = this.iD = document.getElementById('ID') as IgcColumnComponent;
        var productName = this.productName = document.getElementById('ProductName') as IgcColumnComponent;
        var quantityPerUnit = this.quantityPerUnit = document.getElementById('QuantityPerUnit') as IgcColumnComponent;
        var unitPrice = this.unitPrice = document.getElementById('UnitPrice') as IgcColumnComponent;
        var orderDate = this.orderDate = document.getElementById('OrderDate') as IgcColumnComponent;
        var discontinued = this.discontinued = document.getElementById('Discontinued') as IgcColumnComponent;

        this.grid.isLoading = true;
        // load 1 page of data with the size of a  data view and a half
        const dataViewSize = 480 / this.grid.rowHeight; // grid.height / grid.rowHeight;
        this.pageSize = Math.floor(dataViewSize * 1.5);
        this.remoteService.loadDataForPage(this.page, this.pageSize, (request) => {
            if (request.data) {
                this.grid.data = this.remoteService.getCachedData({ startIndex: 0, chunkSize: 10 });
                this.grid.totalItemCount = this.page * this.pageSize;
                this.totalItems = request.data['@odata.count'];
                this.totalPageCount = Math.ceil(this.totalItems / this.pageSize);
                this.grid.isLoading = false;
            }
        });

        this._bind = () => {
            this.grid.addEventListener('dataPreLoad', (e) => {
                this.handlePreLoad(e as CustomEvent<IgcForOfState>);
            });
        }
        this._bind();
    }

    private _nwindData: NwindData = null;
    public get nwindData(): NwindData {
        if (this._nwindData == null) {
            this._nwindData = new NwindData();
        }
        return this._nwindData;
    }

    public handlePreLoad(e: CustomEvent<IgcForOfState>) {
        const isLastChunk = this.grid.totalItemCount === e.detail.startIndex + e.detail.chunkSize;
        // when last chunk reached load another page of data
        if (isLastChunk) {
            if (this.totalPageCount === this.page) {
                this.grid.data = this.remoteService.getCachedData(e.detail);
                return;
            }
            this.page++;
            this.grid.isLoading = true;
            this.remoteService.loadDataForPage(this.page, this.pageSize, (request) => {
                if (request.data) {
                    this.grid.totalItemCount = Math.min(this.page * this.pageSize, this.totalItems);
                    this.grid.data = this.remoteService.getCachedData(e.detail);
                    this.grid.isLoading = false;
                }
            });
        } else {
            this.grid.data = this.remoteService.getCachedData(e.detail);
        }
    }

}

new Sample();
