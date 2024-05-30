import { IgcGridCreatedEventArgs, IgcHierarchicalGridComponent, IgcPaginatorComponent, IgcRowIslandComponent } from 'igniteui-webcomponents-grids/grids';

import 'igniteui-webcomponents-grids/grids/combined';
import 'igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';
import { getData, getDataLength } from './RemoteService';
import { html } from 'lit-html';

export class Sample {

    public data: any[] = [];
    public page = 0;
    private pager = document.getElementById('paginator') as IgcPaginatorComponent;
    private islandpaginator = document.getElementById('islandPaginator') as IgcPaginatorComponent;
    
    public get perPage(): number {
        return this.pager.perPage || 15;
    }

    public hierarchicalGrid = document.getElementById("hGrid") as IgcHierarchicalGridComponent;

    constructor() {
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

        this.hierarchicalGrid.isLoading = true;
        getData({ parentID: null, rootLevel: true, key: "Customers" }, this.page, this.perPage).then((data: any) => {
            this.hierarchicalGrid.isLoading = false;
            this.hierarchicalGrid.data = data;
            this.hierarchicalGrid.markForCheck();
        });
    }

    public gridCreated(event: CustomEvent<IgcGridCreatedEventArgs>, _parentKey: string) {
        const context = event.detail;
        //console.log(context.grid.children.length);

        //const paginator = context.grid.features.find(feature => feature instanceof IgcPaginatorComponent);

        // if(paginator) {
        //     console.log("Paginator found");
        // }

        const dataState = {
            key: context.owner.childDataKey,
            parentID: context.parentID,
            parentKey: _parentKey,
            rootLevel: false
        };

        context.grid.isLoading = true;
        getDataLength(dataState).then((length: number) => {
            this.pager.totalRecords = length;
        
        getData(dataState, this.page, this.perPage).then((data: any[]) => {
            context.grid.isLoading = false;
            context.grid.data = data;
            context.grid.markForCheck();
        });});
    }

    public paginate(page: number) {
        this.page = page;
        const skip = this.page * this.perPage;
        const top = this.perPage;
    
        getData({ parentID: null, rootLevel: true, key: 'Customers' }, skip, top).then((data:any)=> {
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
