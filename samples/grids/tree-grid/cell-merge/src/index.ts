import 'igniteui-webcomponents-grids/grids/combined';
import { IgcByLevelTreeGridMergeStrategy, IgcDefaultTreeGridMergeStrategy, IgcTreeGridComponent, SortingDirection } from 'igniteui-webcomponents-grids/grids';
import 'igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents, IgcSelectComponent } from 'igniteui-webcomponents';
import { EmployeesFlatDetails } from './EmployeesFlatDetails';

defineAllComponents();

import './index.css';

export class Sample {
    private treeGrid: IgcTreeGridComponent;

    constructor() {
        this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;

        this.treeGrid.data = this.data;
        this.treeGrid.sortingExpressions = [{ fieldName: 'Country', dir: SortingDirection.Asc }];
        (this.treeGrid as any).mergeStrategy = new IgcDefaultTreeGridMergeStrategy();
        this.treeGrid.cellMergeMode = 'always';

        const mergeModeSelect = document.getElementById('mergeModeSelect') as IgcSelectComponent;
        mergeModeSelect?.addEventListener('igcChange', (e: CustomEvent) => {
            const value = e.detail.value as 'always' | 'onSort';
            this.treeGrid.cellMergeMode = value;
        });

        const mergeStrategySelect = document.getElementById('mergeStrategySelect') as IgcSelectComponent;
        mergeStrategySelect?.addEventListener('igcChange', (e: CustomEvent) => {
            const name = (e as any).detail.value as string;
            const strategy = name === 'By Level Strategy' ? new IgcByLevelTreeGridMergeStrategy() : new IgcDefaultTreeGridMergeStrategy();
            (this.treeGrid as any).mergeStrategy = strategy;
        });
    }

    private _data: EmployeesFlatDetails | null = null;
    public get data(): EmployeesFlatDetails {
        if (!this._data) {
            this._data = new EmployeesFlatDetails();
        }
        return this._data;
    }
}

new Sample();
