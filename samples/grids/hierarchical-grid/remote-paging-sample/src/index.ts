import { IgcGridCreatedEventArgs, IgcHierarchicalGridComponent, IgcPaginatorComponent, IgcRowIslandComponent } from 'igniteui-webcomponents-grids/grids';
import 'igniteui-webcomponents-grids/grids/combined';
import 'igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';
import { html } from 'lit-html';
import { RemotePagingService } from './RemoteService';
import { CustomersWithPageResponseModel } from './CustomersWithPageResponseModel';


export class Sample {

    public data: any[] = [];
    public page: number = 0;
    public hierarchicalGrid: IgcHierarchicalGridComponent;
    private _bind: () => void;
    private _perPage = 15;
    public pager: IgcPaginatorComponent;
    private _totalRecordsCount: number;
    
    public get perPage(): number {
        return this.pager?.perPage || this._perPage;
    }

    public set perPage(val: number) {
        this._perPage = val;
    }
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

        this._bind = () => {
            window.addEventListener("load", () => {
                this.pager.perPage = this._perPage;
                this.loadCustomersData(this.page,this.perPage);
            });

            this.pager.addEventListener("perPageChange", ((args: CustomEvent<any>) => {
              this.perPage = args.detail;
              this.loadCustomersData(this.page, this.perPage);
            }) as EventListener);

            this.pager.addEventListener("pageChange", ((args: CustomEvent<any>) => {
              this.page = args.detail;
              this.loadCustomersData(this.page, this.perPage);
            }) as EventListener);

            ordersRowIsland.addEventListener("gridCreated", (event: any) => {
                this.gridCreated(event, "Customers");
            });
    
            orderDetailsRowIsland.addEventListener("gridCreated", (event: any) => {
                this.gridCreated(event, "Orders");
            });
        }
    
        this._bind();
    }

    public gridCreated(event: CustomEvent<IgcGridCreatedEventArgs>, parentKey: string) {
        const context = event.detail;
        const parentId: string = context.parentID;
        const childDataKey: string = context.owner.childDataKey;

        context.grid.isLoading = true;
        RemotePagingService.getHierarchyDataById(parentKey, parentId, childDataKey)
        .then((data: any) => {
          context.grid.data = data;
          context.grid.isLoading = false;
          context.grid.markForCheck();
        })
        .catch((error) => {
          console.error(error.message);
          context.grid.data = [];
          context.grid.isLoading = false;
          context.grid.markForCheck();
        });
    }

    public webHierarchicalGridPaginatorTemplate = () => {
        // Child level grids have LOCAL paging
        // They can be set to REMOTE if there are endpoints with paging for each hierarchy level data.
        return html `
        <igc-paginator 
            id="islandPaginator">
        </igc-paginator>`
    }

    private updateUI(): void {
        if (this.hierarchicalGrid && this.data) { // Check if grid and data are available
            this.hierarchicalGrid.data = this.data;
        }
    }

    private loadCustomersData(pageIndex?: number, pageSize?: number): void {
        this.hierarchicalGrid.isLoading = true;
        
        RemotePagingService.getDataWithPaging(pageIndex,pageSize)
        .then((response: CustomersWithPageResponseModel) => {
          this.totalRecordsCount = response.totalRecordsCount;
          this.pager.perPage = pageSize;
          this.pager.totalRecords = this.totalRecordsCount;
          this.page = response.pageNumber;
          this.data = response.items;
          this.hierarchicalGrid.isLoading = false;
          this.updateUI(); // Update the UI after receiving data
        })
        .catch((error) => {
          console.error(error.message);
          this.hierarchicalGrid.data = [];
          this.hierarchicalGrid.isLoading = false;
          this.updateUI();
        })
      }
}

new Sample();
