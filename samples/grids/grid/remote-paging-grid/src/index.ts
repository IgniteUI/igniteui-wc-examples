import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcPaginatorComponent } from 'igniteui-webcomponents-grids/grids';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";
import { RemotePagingService } from './RemotePagingService';
import { CustomersWithPageResponseModel } from './CustomersWithPageResponseModel';


export class Sample {

  public data: any[] = [];
  public dataLength: number = 0;
  public page: number = 0;
  private grid: IgcGridComponent;
  private _bind: () => void;
  private _perPage: number = 15;
  private pager: IgcPaginatorComponent;
  private _totalRecordsCount: number;
  public get perPage(): number {
      return this.pager.perPage || this._perPage;
  }
  public set perPage(val: number) {
    this._perPage = val;
  }
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

        window.addEventListener("load", () => {
          this.loadData(this.page,this.perPage);
        });

        this.pager.addEventListener("perPageChange", ((args: CustomEvent<any>) => {
          this.perPage = args.detail;
          this.loadData(this.page, this.perPage);
        }) as EventListener);

        this.pager.addEventListener("pageChange", ((args: CustomEvent<any>) => {
          this.page = args.detail;
          this.loadData(this.page, this.perPage);
        }) as EventListener);
      }

      this._bind();
  }

  private updateUI(): void {
    if (this.grid && this.data) { // Check if grid and data are available
        this.grid.data = this.data;
    }
  }

  private loadData(pageIndex?: number, pageSize?: number): void {
    this.grid.isLoading = true;
    
    RemotePagingService.getDataWithPaging(pageIndex,pageSize)
    .then((response: CustomersWithPageResponseModel) => {
      this.totalRecordsCount = response.totalRecordsCount;
      this.pager.perPage = pageSize;
      this.pager.totalRecords = this.totalRecordsCount;
      this.page = response.pageNumber;
      this.data = response.items;
      this.grid.isLoading = false;
      this.updateUI(); // Update the UI after receiving data
    })
    .catch((error) => {
      console.error(error.message);
      this.grid.data = [];
      // Stop loading even if error occurs. Prevents endless loading
      this.grid.isLoading = false;
      this.updateUI();
    })
  }
    
}

new Sample();
  