import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent, IgcRowIslandComponent, SortingDirection } from 'igniteui-webcomponents-grids/grids';
import MultiColumnsExportData from './MultiColumnsExportData.json';
import 'igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents, IgcSelectComponent } from 'igniteui-webcomponents';

defineAllComponents();

import './index.css';

export class Sample {
    private grid: IgcHierarchicalGridComponent;
    private rowIsland: IgcRowIslandComponent;

    constructor() {
        const grid = (this.grid = document.getElementById('grid') as IgcHierarchicalGridComponent);
        const rowIsland = (this.rowIsland = document.getElementById('rowIsland') as IgcRowIslandComponent);

        grid.data = this.localData;
        grid.sortingExpressions = [{ fieldName: 'ContactTitle', dir: SortingDirection.Asc }];
        rowIsland.sortingExpressions = [{ fieldName: 'ContactTitle', dir: SortingDirection.Asc }];

        const mergeSelectRoot = document.getElementById('mergeSelectRoot') as IgcSelectComponent;
        mergeSelectRoot?.addEventListener('igcChange', (e: CustomEvent) => {
            const value = (e as any).detail.value as 'always' | 'onSort';
            (grid as any).cellMergeMode = value;
        });

        const mergeSelectChild = document.getElementById('mergeSelectChild') as IgcSelectComponent;
        mergeSelectChild?.addEventListener('igcChange', (e: CustomEvent) => {
            const value = (e as any).detail.value as 'always' | 'onSort';
            (rowIsland as any).cellMergeMode = value;
        });

    }

    private _localData: any[] = MultiColumnsExportData as any[];
    public get localData(): any[] {
        return this._localData;
    }
}

new Sample();
