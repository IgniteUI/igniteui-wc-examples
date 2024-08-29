import { IgcGridCreatedEventArgs, IgcHierarchicalGridComponent, IgcPaginatorComponent, IgcRowIslandComponent } from 'igniteui-webcomponents-grids/grids';

import 'igniteui-webcomponents-grids/grids/combined';
import 'igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';
import { html } from 'lit-html';
import { RemotePagingService } from './RemoteService';

export class Sample {

    public data: any[] = [];
    public page = 0;
    private _perPage = 10;
    public pager: IgcPaginatorComponent;
    public hierarchicalGrid: IgcHierarchicalGridComponent;
    private remoteService: RemotePagingService = new RemotePagingService();
    
    public get perPage(): number {
        return this.pager?.perPage || 10;
    }
    public set perPage(val: number) {
        this._perPage = val;
        this.paginate(val);
    }

    private _totalRecordsCount: number;

    public get totalRecordsCount(): number {
    return this._totalRecordsCount;
    }

    public set totalRecordsCount(value: number) {
    this._totalRecordsCount = value;
    this.hierarchicalGrid.totalRecords = value;
    }

    constructor() {

        this.hierarchicalGrid = document.getElementById("hGrid") as IgcHierarchicalGridComponent;
        this.pager = document.getElementById('paginator') as IgcPaginatorComponent;
        const ordersRowIsland = document.getElementById("ordersRowIsland") as IgcRowIslandComponent;
        const orderDetailsRowIsland = document.getElementById("orderDetailsRowIsland") as IgcRowIslandComponent;

        ordersRowIsland.paginatorTemplate = this.webHierarchicalGridPaginatorTemplate;
        orderDetailsRowIsland.paginatorTemplate = this.webHierarchicalGridPaginatorTemplate;

        this.pager.addEventListener("perPageChange", ()=> {
            this.paginate(0);
        });
        this.pager.addEventListener("pageChange", ((args: CustomEvent<any>) => {
            this.paginate(args.detail);}) as EventListener);
        

        ordersRowIsland.addEventListener("gridCreated", (event: any) => {
            this.gridCreated(event, "Customers");
        });

        orderDetailsRowIsland.addEventListener("gridCreated", (event: any) => {
            this.gridCreated(event, "Orders");
        });

        window.addEventListener("load", () => {
            this.pager.totalRecords = this.totalRecordsCount;
            this.paginate(0);
         });

        this.hierarchicalGrid.data = this.data;

        this.hierarchicalGrid.isLoading = true;
        this.remoteService.getData({ parentID: null, rootLevel: true, key: "Customers" }, this.page, this._perPage).then((data: any) => {
            this.hierarchicalGrid.isLoading = false;
            this.hierarchicalGrid.data = data;
            this.hierarchicalGrid.markForCheck();
        });
        this.remoteService.getDataLength({ parentID: null, rootLevel: true, key: "Customers" }).then((length: number) => {
            if(length !== undefined) {
                this.totalRecordsCount = length;
                this.pager.totalRecords = this.totalRecordsCount;
            }
        });
    }

    public gridCreated(event: CustomEvent<IgcGridCreatedEventArgs>, _parentKey: string) {
        const context = event.detail;

        const dataState = {
            key: context.owner.childDataKey,
            parentID: context.parentID,
            parentKey: _parentKey,
            rootLevel: false
        };

        context.grid.isLoading = true;
        this.remoteService.getDataLength(dataState).then((length: number) => {
            if(length !== undefined) {
                this.pager.totalRecords = length;
            }
        
        this.remoteService.getData(dataState, this.page, this.perPage).then((data: any[]) => {
            context.grid.isLoading = false;
            context.grid.data = data;
            context.grid.markForCheck();
        });});
    }

    public paginate(page: number) {
        this.page = page;
        const skip = this.page * this.perPage;
        const top = this.perPage;
    
        this.remoteService.getData({ parentID: null, rootLevel: true, key: 'Customers' }, skip, top).then((data:any)=> {
          this.data = data; // Assign received data to this.data
          this.hierarchicalGrid.isLoading = false;
          this.hierarchicalGrid.markForCheck();// Update the UI after receiving data
        });
    }

    public webHierarchicalGridPaginatorTemplate = () => {
        return html`<igc-paginator id="islandPaginator" @perPage="{this.perPage}" @perPageChanged="{this.paginate(0)}" per-page="5">
        </igc-paginator>`
    }
}

new Sample();
