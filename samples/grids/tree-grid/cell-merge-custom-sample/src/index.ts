import 'igniteui-webcomponents-grids/grids/combined';
import { IgcDefaultTreeGridMergeStrategy, IgcTreeGridComponent, SortingDirection } from 'igniteui-webcomponents-grids/grids';
import 'igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { generateEmployeeDetailedFlatData2 } from './EmployeesFlatDetails2';

defineAllComponents();

import './index.css';

class CustomTreeGridMergeStrategy extends IgcDefaultTreeGridMergeStrategy {
    public comparer(prevRecord: any, record: any, field: string): boolean {
        const a = prevRecord[field];
        const b = record[field];

        const levelA = (prevRecord as any).level ?? (prevRecord as any).data?.level ?? null;
        const levelB = (record as any).level ?? (record as any).data?.level ?? null;
        const countryA = (prevRecord as any).data?.["Country"] ?? (prevRecord as any)["Country"];
        const countryB = (record as any).data?.["Country"] ?? (record as any)["Country"];

        return a === b && levelA === levelB && countryA === countryB;
    }
}

export class Sample {
    private treeGrid: IgcTreeGridComponent;

    constructor() {
        this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;

        this.treeGrid.data = this.data;
        this.treeGrid.sortingExpressions = [{ fieldName: 'Country', dir: SortingDirection.Asc }];
        (this.treeGrid as any).mergeStrategy = new CustomTreeGridMergeStrategy();
        this.treeGrid.cellMergeMode = 'always';
    }

    private _data: any[] | null = null;
    public get data(): any[] {
        if (!this._data) {
            this._data = generateEmployeeDetailedFlatData2();
        }
        return this._data;
    }
}

export function initialize() {
  return new Sample();
}