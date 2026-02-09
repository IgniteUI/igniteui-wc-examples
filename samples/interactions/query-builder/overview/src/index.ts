import 'igniteui-webcomponents-grids/grids/combined';
import 'igniteui-webcomponents-grids/grids/themes/light/material.css';
import './index.css';
import {
  IgcGridComponent,
  IgcExpressionTree,
  IgcFilteringExpressionsTree,
  FilteringLogic,
  IgcQueryBuilderComponent
} from 'igniteui-webcomponents-grids/grids';
import 'igniteui-webcomponents-grids/grids/themes/light/material.css';
import "./index.css";

const API_ENDPOINT = 'https://data-northwind.indigo.design';


export class QueryBuilderOverview {
  private grid: IgcGridComponent;
  private queryBuilder: IgcQueryBuilderComponent;

  public entities: any[] = [];
  public customersFields: any[] = [];
  public ordersFields: any[] = [];
  public expressionTree!: IgcExpressionTree;
  public data: any[] = [];

  constructor() {
    this.grid = document.getElementById('grid') as IgcGridComponent;
    this.grid.height = '420px';
    this.queryBuilder = document.getElementById('queryBuilder') as IgcQueryBuilderComponent;

    this.initFields();
    this.syncTreeOnExpressionChange();
  }

  private initFields(): void {
    this.customersFields = [
      { field: 'customerId', dataType: 'string' },
      { field: 'companyName', dataType: 'string' },
      { field: 'contactName', dataType: 'string' },
      { field: 'contactTitle', dataType: 'string' }
    ];

    this.ordersFields = [
      { field: 'orderId', dataType: 'number' },
      { field: 'customerId', dataType: 'string' },
      { field: 'employeeId', dataType: 'number' },
      { field: 'shipperId', dataType: 'number' },
      { field: 'orderDate', dataType: 'date' },
      { field: 'requiredDate', dataType: 'date' },
      { field: 'shipVia', dataType: 'string' },
      { field: 'freight', dataType: 'number' },
      { field: 'shipName', dataType: 'string' },
      { field: 'completed', dataType: 'boolean' }
    ];

    this.entities = [
      { name: 'Customers', fields: this.customersFields },
      { name: 'Orders', fields: this.ordersFields }
    ];

    const tree = new IgcFilteringExpressionsTree();
    tree.operator = FilteringLogic.And;
    tree.entity = 'Orders';
    tree.returnFields = [
      'orderId',
      'customerId',
      'employeeId',
      'shipperId',
      'orderDate',
      'requiredDate',
      'shipVia',
      'freight',
      'shipName',
      'completed'
    ];

    this.expressionTree = tree;
  }

  private syncTreeOnExpressionChange(): void {
    this.queryBuilder.entities = this.entities as any;
    this.queryBuilder.expressionTree = this.expressionTree;

    this.queryBuilder.addEventListener('expressionTreeChange', (e: CustomEvent<IgcExpressionTree>) => {
      this.expressionTree = e.detail;
      this.onChange();
    });

    this.onChange();
  }

  public async onChange(): Promise<void> {
    this.grid.isLoading = true;

    try {
      const res = await fetch(`${API_ENDPOINT}/QueryBuilder/ExecuteQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.expressionTree)
      });

      if (!res.ok) {
        throw new Error(`ExecuteQuery failed: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();
      this.data = (Object.values(json)[0] as any[]) ?? [];
      this.grid.data = this.data;
    } catch (err) {
      console.error(err);
      this.data = [];
      this.grid.data = [];
    } finally {
      this.grid.isLoading = false;

      await this.nextFrame();
      this.calculateColsInView();
    }
  }

  private calculateColsInView(): void {
    const returnFields = this.expressionTree.returnFields ?? [];

    if (returnFields.length === 0 || returnFields[0] === '*') {
      const selectedEntity = this.entities.find(e => e.name === this.expressionTree.entity);
      const selectedEntityFields = (selectedEntity?.fields ?? []).map((f: any) => f.field);
      this.grid.columns.forEach(column => column.hidden = !selectedEntityFields.includes(column.field));
    } else {
      this.grid.columns.forEach(column => column.hidden = !returnFields.includes(column.field));
    }
  }

  private nextFrame(): Promise<void> {
    return new Promise(resolve => requestAnimationFrame(() => resolve()));
  }
}

new QueryBuilderOverview();
