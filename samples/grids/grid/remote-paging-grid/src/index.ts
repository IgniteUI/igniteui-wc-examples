import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcPaginatorComponent } from 'igniteui-webcomponents-grids/grids';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";
import { RemotePagingService } from './RemotePagingService';

export class Sample {

    public data: any[] = [];
    public dataLength: number = 0;
    private grid: IgcGridComponent;
    private _bind: () => void;
    private remotePagingService: RemotePagingService = new RemotePagingService();
    public page = 0;
    private _perPage = 10;
    private pager: IgcPaginatorComponent;

    public get perPage(): number {
        return this.pager.perPage || 10;
    }

    private _totalRecordsCount: number;

    public get totalRecordsCount(): number {
    return this._totalRecordsCount;
    }

    public set totalRecordsCount(value: number) {
    this._totalRecordsCount = value;
    this.grid.totalRecords = value;
    }

    constructor() {
      this.pager = document.getElementById('paginator') as IgcPaginatorComponent;
      this.grid = document.getElementById('grid') as IgcGridComponent;

      this._bind = () => {
        this.remotePagingService.getDataLength().then((length) => {
            this.totalRecordsCount = length;
            this.pager.totalRecords = this.totalRecordsCount;
        });
        window.addEventListener("load", () => {
          this.pager.totalRecords = this.totalRecordsCount;
          this.paginate(0);
       });
       this.pager.addEventListener("perPageChange", ()=> {
        this.paginate(0);
       })
       this.pager.addEventListener("pageChange", ((args: CustomEvent<any>) => {
        this.paginate(args.detail);}) as EventListener);
    }
    this._bind();
    }

      public paginate(page: number) {
        this.page = page;
        const skip = this.page * this.perPage;
        const top = this.perPage;

        this.remotePagingService.getData(skip, top).then((data)=> {
          this.data = data; // Assign received data to this.data
          this.grid.isLoading = false;
          this.updateUI(); // Update the UI after receiving data
        });
    }

    public set perPage(val: number) {
        this._perPage = val;
        this.paginate(val);
    }

    private updateUI() {
      if (this.grid && this.data) { // Check if grid and data are available
          this.grid.data = this.data;
      }
  }

}

new Sample();
