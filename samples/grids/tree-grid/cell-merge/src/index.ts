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
    private _bind: () => void;

    constructor() {
        const treeGrid = (this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent);

        this._bind = (): void => {
            treeGrid.data = this.data;
            treeGrid.sortingExpressions = [{ fieldName: 'Country', dir: SortingDirection.Asc }];
            (treeGrid as any).mergeStrategy = new IgcDefaultTreeGridMergeStrategy();
            (treeGrid as any).cellMergeMode = 'always';

            const mergeModeSelect = document.getElementById('mergeModeSelect') as IgcSelectComponent;
            mergeModeSelect?.addEventListener('igcChange', (e: CustomEvent) => {
                const value = (e as any).detail.value as 'always' | 'onSort';
                (treeGrid as any).cellMergeMode = value;
            });

            const mergeStrategySelect = document.getElementById('mergeStrategySelect') as IgcSelectComponent;
            mergeStrategySelect?.addEventListener('igcChange', (e: CustomEvent) => {
                const name = (e as any).detail.value as string;
                const strategy = name === 'By Level Strategy' ? new IgcByLevelTreeGridMergeStrategy() : new IgcDefaultTreeGridMergeStrategy();
                (treeGrid as any).mergeStrategy = strategy;
            });
        };

        this._bind();
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
