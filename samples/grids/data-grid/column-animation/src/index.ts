import { IgcDataGridModule } from 'igniteui-webcomponents-data-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-data-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-data-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { DataGridSharedData } from './DataGridSharedData';
import { ColumnShowingAnimationMode } from 'igniteui-webcomponents-data-grids';
import { ColumnExchangingAnimationMode } from 'igniteui-webcomponents-data-grids';
import { ColumnHidingAnimationMode } from 'igniteui-webcomponents-data-grids';
import { ColumnPropertyUpdatingAnimationMode } from 'igniteui-webcomponents-data-grids';
import { ColumnMovingAnimationMode } from 'igniteui-webcomponents-data-grids';

ModuleManager.register(
    IgcDataGridModule,
    IgcGridColumnOptionsModule
);

export class DataGridColumnAnimation {

    private grid: IgcDataGridComponent;

    constructor() {

        this.onHideColumnBtnClick = this.onHideColumnBtnClick.bind(this);
        this.onShowColumnBtnClick = this.onShowColumnBtnClick.bind(this);
        this.onReloadGridBtnClick = this.onReloadGridBtnClick.bind(this);

        this.onMovingAnimationDropDownValueChanged = this.onMovingAnimationDropDownValueChanged.bind(this);
        this.onUpdatingAnimationDropDownValueChanged = this.onUpdatingAnimationDropDownValueChanged.bind(this);
        this.onHidingAnimationDropDownValueChanged = this.onHidingAnimationDropDownValueChanged.bind(this);
        this.onExchangeAnimationDropDownValueChanged = this.onExchangeAnimationDropDownValueChanged.bind(this);
        this.onAddAnimationDropDownValueChanged = this.onAddAnimationDropDownValueChanged.bind(this);

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees();

        document.getElementById('hideColumnBtnClick')!.addEventListener('click', this.onHideColumnBtnClick);
        document.getElementById('showColumnBtnClick')!.addEventListener('click', this.onShowColumnBtnClick);
        document.getElementById('reloadGridBtnClick')!.addEventListener('click', this.onReloadGridBtnClick);

        document.getElementById('movingAnimationDropDown')!.addEventListener('change', this.onMovingAnimationDropDownValueChanged);
        document.getElementById('updatingAnimationDropDown')!.addEventListener('change', this.onUpdatingAnimationDropDownValueChanged);
        document.getElementById('hidingAnimationDropDown')!.addEventListener('change', this.onHidingAnimationDropDownValueChanged);
        document.getElementById('exchangeAnimationDropDown')!.addEventListener('change', this.onExchangeAnimationDropDownValueChanged);
        document.getElementById('addAnimationDropDown')!.addEventListener('change', this.onAddAnimationDropDownValueChanged);
    }

    onHideColumnBtnClick() {
        for (const col of this.grid.combinedColumns) {
            if (!col.isHidden) {
                col.isHidden = true;
                break;
            }
        }
    }

    onShowColumnBtnClick() {

        const columns = this.grid.combinedColumns.reverse();

        for (const col of columns) {
            if (col.isHidden) {
                col.isHidden = false;
                break;
            }
        }
    }

    onReloadGridBtnClick() {
        const newData = DataGridSharedData.getEmployees();

        for (let i = 0; i < this.grid.dataSource.length; i++) {
            const oldItem = this.grid.dataSource[i];
            oldItem.Salary = newData[i].Salary;
            this.grid.notifySetItem(i, oldItem, newData[i]);
        }
    }

    onMovingAnimationDropDownValueChanged() {
        let dropDown = document.getElementById('movingAnimationDropDown') as any;

        switch (dropDown.value) {
            case 'Auto': {
                this.grid.columnMovingAnimationMode = ColumnMovingAnimationMode.Auto;
                break;
            }
            case 'None': {
                this.grid.columnMovingAnimationMode = ColumnMovingAnimationMode.None;
                break;
            }
            case 'SlideOver': {
                this.grid.columnMovingAnimationMode = ColumnMovingAnimationMode.SlideOver;
                break;
            }
        }
    }

    onUpdatingAnimationDropDownValueChanged() {
        let dropDown = document.getElementById('updatingAnimationDropDown') as any;

        switch (dropDown.value) {
            case 'Auto': {
                this.grid.columnPropertyUpdatingAnimationMode = ColumnPropertyUpdatingAnimationMode.Auto;
                break;
            }
            case 'None': {
                this.grid.columnPropertyUpdatingAnimationMode = ColumnPropertyUpdatingAnimationMode.None;
                break;
            }
            case 'Interpolate': {
                this.grid.columnPropertyUpdatingAnimationMode = ColumnPropertyUpdatingAnimationMode.Interpolate;
                break;
            }
            case 'InterpolateDeep': {
                this.grid.columnPropertyUpdatingAnimationMode = ColumnPropertyUpdatingAnimationMode.InterpolateDeep;
                break;
            }
        }
    }

    onHidingAnimationDropDownValueChanged() {
        let dropDown = document.getElementById('hidingAnimationDropDown') as any;

        switch (dropDown.value) {
            case 'Auto': {
                this.grid.columnHidingAnimationMode = ColumnHidingAnimationMode.Auto;
                break;
            }
            case 'None': {
                this.grid.columnHidingAnimationMode = ColumnHidingAnimationMode.None;
                break;
            }
            case 'SlideToLeft': {
                this.grid.columnHidingAnimationMode = ColumnHidingAnimationMode.SlideToLeft;
                break;
            }
            case 'SlideToRight': {
                this.grid.columnHidingAnimationMode = ColumnHidingAnimationMode.SlideToRight;
                break;
            }
            case 'SlideToTop': {
                this.grid.columnHidingAnimationMode = ColumnHidingAnimationMode.SlideToTop;
                break;
            }
            case 'SlideToBottom': {
                this.grid.columnHidingAnimationMode = ColumnHidingAnimationMode.SlideToBottom;
                break;
            }
            case 'FadeOut': {
                this.grid.columnHidingAnimationMode = ColumnHidingAnimationMode.FadeOut;
                break;
            }
            case 'SlideToLeftAndFadeOut': {
                this.grid.columnHidingAnimationMode = ColumnHidingAnimationMode.SlideToLeftAndFadeOut;
                break;
            }
            case 'SlideToRightAndFadeOut': {
                this.grid.columnHidingAnimationMode = ColumnHidingAnimationMode.SlideToRightAndFadeOut;
                break;
            }
            case 'SlideToTopAndFadeOut': {
                this.grid.columnHidingAnimationMode = ColumnHidingAnimationMode.SlideToTopAndFadeOut;
                break;
            }
            case 'SlideToBottomAndFadeOut': {
                this.grid.columnHidingAnimationMode = ColumnHidingAnimationMode.SlideToBottomAndFadeOut;
                break;
            }
        }
    }

    onExchangeAnimationDropDownValueChanged() {
        let dropDown = document.getElementById('exchangeAnimationDropDown') as any;

        switch (dropDown.value) {
            case 'Auto': {
                this.grid.columnExchangingAnimationMode = ColumnExchangingAnimationMode.Auto;
                break;
            }
            case 'None': {
                this.grid.columnExchangingAnimationMode = ColumnExchangingAnimationMode.None;
                break;
            }
            case 'SlideToLeft': {
                this.grid.columnExchangingAnimationMode = ColumnExchangingAnimationMode.SlideToLeft;
                break;
            }
            case 'SlideToRight': {
                this.grid.columnExchangingAnimationMode = ColumnExchangingAnimationMode.SlideToRight;
                break;
            }
            case 'SlideToTop': {
                this.grid.columnExchangingAnimationMode = ColumnExchangingAnimationMode.SlideToTop;
                break;
            }
            case 'SlideToBottom': {
                this.grid.columnExchangingAnimationMode = ColumnExchangingAnimationMode.SlideToBottom;
                break;
            }
            case 'Crossfade': {
                this.grid.columnExchangingAnimationMode = ColumnExchangingAnimationMode.Crossfade;
                break;
            }
            case 'SlideToLeftAndCrossfade': {
                this.grid.columnExchangingAnimationMode = ColumnExchangingAnimationMode.SlideToLeftAndCrossfade;
                break;
            }
            case 'SlideToRightAndCrossfade': {
                this.grid.columnExchangingAnimationMode = ColumnExchangingAnimationMode.SlideToRightAndCrossfade;
                break;
            }
            case 'SlideToTopAndCrossfade': {
                this.grid.columnExchangingAnimationMode = ColumnExchangingAnimationMode.SlideToTopAndCrossfade;
                break;
            }
            case 'SlideToBottomAndCrossfade': {
                this.grid.columnExchangingAnimationMode = ColumnExchangingAnimationMode.SlideToBottomAndCrossfade;
                break;
            }
        }
    }

    onAddAnimationDropDownValueChanged() {
        let dropDown = document.getElementById('addAnimationDropDown') as any;

        switch (dropDown.value) {
            case 'Auto': {
                this.grid.columnAddingAnimationMode = ColumnShowingAnimationMode.Auto;
                this.grid.columnShowingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                break;
            }
            case 'None': {
                this.grid.columnAddingAnimationMode = ColumnShowingAnimationMode.None;
                this.grid.columnShowingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                break;
            }
            case 'SlideFromLeft': {
                this.grid.columnAddingAnimationMode = ColumnShowingAnimationMode.SlideFromLeft;
                this.grid.columnShowingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                break;
            }
            case 'SlideFromRight': {
                this.grid.columnAddingAnimationMode = ColumnShowingAnimationMode.SlideFromRight;
                this.grid.columnShowingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                break;
            }
            case 'SlideFromTop': {
                this.grid.columnAddingAnimationMode = ColumnShowingAnimationMode.SlideFromTop;
                this.grid.columnShowingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                break;
            }
            case 'SlideFromBottom': {
                this.grid.columnAddingAnimationMode = ColumnShowingAnimationMode.SlideFromBottom;
                this.grid.columnShowingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                break;
            }
            case 'FadeIn': {
                this.grid.columnAddingAnimationMode = ColumnShowingAnimationMode.FadeIn;
                this.grid.columnShowingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                break;
            }
            case 'SlideFromLeftAndFadeIn': {
                this.grid.columnAddingAnimationMode = ColumnShowingAnimationMode.SlideFromLeftAndFadeIn;
                this.grid.columnShowingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                break;
            }
            case 'SlideFromRightAndFadeIn': {
                this.grid.columnAddingAnimationMode = ColumnShowingAnimationMode.SlideFromRightAndFadeIn;
                this.grid.columnShowingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                break;
            }
            case 'SlideFromTopAndFadeIn': {
                this.grid.columnAddingAnimationMode = ColumnShowingAnimationMode.SlideFromTopAndFadeIn;
                this.grid.columnShowingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                break;
            }
            case 'SlideFromBottomAndFadeIn': {
                this.grid.columnAddingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                this.grid.columnShowingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                break;
            }
        }
    }
}

export function initialize() {
  return new DataGridColumnAnimation();
}