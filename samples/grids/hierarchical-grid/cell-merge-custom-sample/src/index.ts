import 'igniteui-webcomponents-grids/grids/combined';
import { IgcDefaultMergeStrategy, IgcHierarchicalGridComponent, IgcRowIslandComponent, SortingDirection } from 'igniteui-webcomponents-grids/grids';
import MultiColumnsExportData from './MultiColumnsExportData.json';
import 'igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';

defineAllComponents();

import './index.css';

type RecordType = { Country: string;[key: string]: any };

class PerCountryMergeStrategy extends IgcDefaultMergeStrategy {
    // merges only when field values and Country match
    public comparer(prevRecord: RecordType, record: RecordType, field: string): boolean {
        const a = (prevRecord as any)[field];
        const b = (record as any)[field];
        return a === b && prevRecord.Country === record.Country;
    }
}

export class Sample {
    private grid: IgcHierarchicalGridComponent;
    private rowIsland: IgcRowIslandComponent;
    private _bind: () => void;

    constructor() {
        const grid = (this.grid = document.getElementById('grid') as IgcHierarchicalGridComponent);
        const rowIsland = (this.rowIsland = document.getElementById('rowIsland') as IgcRowIslandComponent);

        this._bind = (): void => {
            grid.data = this.localData;
            const sortExpr = [{ fieldName: 'ContactTitle', dir: SortingDirection.Asc }];
            grid.sortingExpressions = sortExpr;
            rowIsland.sortingExpressions = sortExpr;

            (grid as any).mergeStrategy = new PerCountryMergeStrategy();
            (rowIsland as any).mergeStrategy = new PerCountryMergeStrategy();
            (grid as any).cellMergeMode = 'always';
            (rowIsland as any).cellMergeMode = 'always';
        };

        this._bind();
    }

    private _localData: any[] = MultiColumnsExportData as any[];
    public get localData(): any[] {
        return this._localData;
    }
}

new Sample();
