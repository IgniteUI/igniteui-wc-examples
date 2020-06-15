import { SampleBase } from "../../sample-base";

import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { DataGridSharedData } from "./DataGridSharedData";
import { ColumnShowingAnimationMode } from 'igniteui-webcomponents-grids';
import { ColumnExchangingAnimationMode } from 'igniteui-webcomponents-grids';
import { ColumnHidingAnimationMode } from 'igniteui-webcomponents-grids';
import { ColumnPropertyUpdatingAnimationMode } from 'igniteui-webcomponents-grids';
import { ColumnMovingAnimationMode } from 'igniteui-webcomponents-grids';

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <label class="optionItem" style="width: 130px">Adding Animation: </label>
        <select id="addAnimationDropDown" class="optionItem" style="width: 175px">
            <option>Auto</option>
            <option>None</option>
            <option>SlideFromLeft</option>
            <option>SlideFromRight</option>
            <option>SlideFromTop</option>
            <option>SlideFromBottom</option>
            <option>FadeIn</option>
            <option>SlideFromLeftAndFadeIn</option>
            <option>SlideFromRightAndFadeIn</option>
            <option>SlideFromTopAndFadeIn</option>
            <option>SlideFromBottomAndFadeIn</option>
        </select>
        <span class="optionItem" style="width: 130px">Exchange Animation: </span>
        <select id="exchangeAnimationDropDown" class="optionItem" style="width: 175px">
            <option>Auto</option>
            <option>None</option>
            <option>SlideToLeft</option>
            <option>SlideToRight</option>
            <option>SlideToTop</option>
            <option>SlideToBottom</option>
            <option>Crossfade</option>
            <option>SlideToLeftAndCrossfade</option>
            <option>SlideToRightAndCrossfade</option>
            <option>SlideToTopAndCrossfade</option>
            <option>SlideToBottomAndCrossfade</option>
        </select>
    </div>
    <div class="options">
        <span class="optionItem" style="width: 130px">Hiding Animation: </span>
        <select id="hidingAnimationDropDown" class="optionItem" style="width: 175px">
            <option>Auto</option>
            <option>None</option>
            <option>SlideToLeft</option>
            <option>SlideToRight</option>
            <option>SlideToTop</option>
            <option>SlideToBottom</option>
            <option>FadeOut</option>
            <option>SlideToLeftAndFadeOut</option>
            <option>SlideToRightAndFadeOut</option>
            <option>SlideToTopAndFadeOut</option>
            <option>SlideToBottomAndFadeOut</option>
        </select>
        <span class="optionItem" style="width: 130px">Updating Animation: </span>
        <select id="updatingAnimationDropDown" class="optionItem" style="width: 175px" >
            <option>Auto</option>
            <option>None</option>
            <option>Interpolate</option>
            <option>InterpolateDeep</option>
        </select>
    </div>
    <div class="options">
        <span class="optionItem" style="width: 130px">Moving Animation: </span>
        <select id="movingAnimationDropDown" class="optionItem" style="width: 175px">
            <option>Auto</option>
            <option>None</option>
            <option>SlideOver</option>
        </select>
        <button id="hideColumnBtnClick" class="optionItem" style="width: 100px">Hide Column</button>
        <button id="showColumnBtnClick" class="optionItem" style="width: 100px">Show Column</button>
        <button id="reloadGridBtnClick" class="optionItem" style="width: 100px">Reload Grid</button>
    </div>

    <igc-data-grid
        id="grid"
        height="calc(100% - 90px)"
        width="100%"
        default-column-min-width="100"
        column-adding-animation-mode="Auto"
        column-showing-animation-mode="Auto"
        column-exchanging-animation-mode="Auto"
        column-hiding-animation-mode="Auto"
        column-moving-animation-mode="Auto"
        column-property-updating-animation-mode="Auto"
        is-column-options-enabled="true"
        auto-generate-columns="false" >

        <igc-text-column property-path="Name" width="*>150"></igc-text-column>
        <igc-text-column property-path="Street" header-text="Address" width="*>165" ></igc-text-column>
        <igc-text-column property-path="City" width="*>140" ></igc-text-column>
        <igc-numeric-column property-path="Salary" positive-prefix="$" show-grouping-separator="true" width="*>140" ></igc-numeric-column>
        <igc-date-time-column property-path="Birthday" ></igc-date-time-column>

    </igc-data-grid>
</div>
`;

export class DataGridColumnAnimation extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataGridColumnAnimation");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataGridColumnAnimation); return this;
    }

    private grid: IgcDataGridComponent;

    constructor() {
        super();

        this.onHideColumnBtnClick = this.onHideColumnBtnClick.bind(this);
        this.onShowColumnBtnClick = this.onShowColumnBtnClick.bind(this);
        this.onReloadGridBtnClick = this.onReloadGridBtnClick.bind(this);

        this.onMovingAnimationDropDownValueChanged = this.onMovingAnimationDropDownValueChanged.bind(this);
        this.onUpdatingAnimationDropDownValueChanged = this.onUpdatingAnimationDropDownValueChanged.bind(this);
        this.onHidingAnimationDropDownValueChanged = this.onHidingAnimationDropDownValueChanged.bind(this);
        this.onExchangeAnimationDropDownValueChanged = this.onExchangeAnimationDropDownValueChanged.bind(this);
        this.onAddAnimationDropDownValueChanged = this.onAddAnimationDropDownValueChanged.bind(this);
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.grid = document.getElementById("grid") as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees();

        document.getElementById("hideColumnBtnClick").addEventListener("click", this.onHideColumnBtnClick);
        document.getElementById("showColumnBtnClick").addEventListener("click", this.onShowColumnBtnClick);
        document.getElementById("reloadGridBtnClick").addEventListener("click", this.onReloadGridBtnClick);

        document.getElementById("movingAnimationDropDown").addEventListener("change", this.onMovingAnimationDropDownValueChanged);
        document.getElementById("updatingAnimationDropDown").addEventListener("change", this.onUpdatingAnimationDropDownValueChanged);
        document.getElementById("hidingAnimationDropDown").addEventListener("change", this.onHidingAnimationDropDownValueChanged);
        document.getElementById("exchangeAnimationDropDown").addEventListener("change", this.onExchangeAnimationDropDownValueChanged);
        document.getElementById("addAnimationDropDown").addEventListener("change", this.onAddAnimationDropDownValueChanged);
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
        let dropDown = document.getElementById("movingAnimationDropDown") as any;

        switch (dropDown.value) {
            case "Auto": {
                this.grid.columnMovingAnimationMode = ColumnMovingAnimationMode.Auto;
                break;
            }
            case "None": {
                this.grid.columnMovingAnimationMode = ColumnMovingAnimationMode.None;
                break;
            }
            case "SlideOver": {
                this.grid.columnMovingAnimationMode = ColumnMovingAnimationMode.SlideOver;
                break;
            }
        }
    }

    onUpdatingAnimationDropDownValueChanged() {
        let dropDown = document.getElementById("updatingAnimationDropDown") as any;

        switch (dropDown.value) {
            case "Auto": {
                this.grid.columnPropertyUpdatingAnimationMode = ColumnPropertyUpdatingAnimationMode.Auto;
                break;
            }
            case "None": {
                this.grid.columnPropertyUpdatingAnimationMode = ColumnPropertyUpdatingAnimationMode.None;
                break;
            }
            case "Interpolate": {
                this.grid.columnPropertyUpdatingAnimationMode = ColumnPropertyUpdatingAnimationMode.Interpolate;
                break;
            }
            case "InterpolateDeep": {
                this.grid.columnPropertyUpdatingAnimationMode = ColumnPropertyUpdatingAnimationMode.InterpolateDeep;
                break;
            }
        }
    }

    onHidingAnimationDropDownValueChanged() {
        let dropDown = document.getElementById("hidingAnimationDropDown") as any;

        switch (dropDown.value) {
            case "Auto": {
                this.grid.columnHidingAnimationMode = ColumnHidingAnimationMode.Auto;
                break;
            }
            case "None": {
                this.grid.columnHidingAnimationMode = ColumnHidingAnimationMode.None;
                break;
            }
            case "SlideToLeft": {
                this.grid.columnHidingAnimationMode = ColumnHidingAnimationMode.SlideToLeft;
                break;
            }
            case "SlideToRight": {
                this.grid.columnHidingAnimationMode = ColumnHidingAnimationMode.SlideToRight;
                break;
            }
            case "SlideToTop": {
                this.grid.columnHidingAnimationMode = ColumnHidingAnimationMode.SlideToTop;
                break;
            }
            case "SlideToBottom": {
                this.grid.columnHidingAnimationMode = ColumnHidingAnimationMode.SlideToBottom;
                break;
            }
            case "FadeOut": {
                this.grid.columnHidingAnimationMode = ColumnHidingAnimationMode.FadeOut;
                break;
            }
            case "SlideToLeftAndFadeOut": {
                this.grid.columnHidingAnimationMode = ColumnHidingAnimationMode.SlideToLeftAndFadeOut;
                break;
            }
            case "SlideToRightAndFadeOut": {
                this.grid.columnHidingAnimationMode = ColumnHidingAnimationMode.SlideToRightAndFadeOut;
                break;
            }
            case "SlideToTopAndFadeOut": {
                this.grid.columnHidingAnimationMode = ColumnHidingAnimationMode.SlideToTopAndFadeOut;
                break;
            }
            case "SlideToBottomAndFadeOut": {
                this.grid.columnHidingAnimationMode = ColumnHidingAnimationMode.SlideToBottomAndFadeOut;
                break;
            }
        }
    }

    onExchangeAnimationDropDownValueChanged() {
        let dropDown = document.getElementById("exchangeAnimationDropDown") as any;

        switch (dropDown.value) {
            case "Auto": {
                this.grid.columnExchangingAnimationMode = ColumnExchangingAnimationMode.Auto;
                break;
            }
            case "None": {
                this.grid.columnExchangingAnimationMode = ColumnExchangingAnimationMode.None;
                break;
            }
            case "SlideToLeft": {
                this.grid.columnExchangingAnimationMode = ColumnExchangingAnimationMode.SlideToLeft;
                break;
            }
            case "SlideToRight": {
                this.grid.columnExchangingAnimationMode = ColumnExchangingAnimationMode.SlideToRight;
                break;
            }
            case "SlideToTop": {
                this.grid.columnExchangingAnimationMode = ColumnExchangingAnimationMode.SlideToTop;
                break;
            }
            case "SlideToBottom": {
                this.grid.columnExchangingAnimationMode = ColumnExchangingAnimationMode.SlideToBottom;
                break;
            }
            case "Crossfade": {
                this.grid.columnExchangingAnimationMode = ColumnExchangingAnimationMode.Crossfade;
                break;
            }
            case "SlideToLeftAndCrossfade": {
                this.grid.columnExchangingAnimationMode = ColumnExchangingAnimationMode.SlideToLeftAndCrossfade;
                break;
            }
            case "SlideToRightAndCrossfade": {
                this.grid.columnExchangingAnimationMode = ColumnExchangingAnimationMode.SlideToRightAndCrossfade;
                break;
            }
            case "SlideToTopAndCrossfade": {
                this.grid.columnExchangingAnimationMode = ColumnExchangingAnimationMode.SlideToTopAndCrossfade;
                break;
            }
            case "SlideToBottomAndCrossfade": {
                this.grid.columnExchangingAnimationMode = ColumnExchangingAnimationMode.SlideToBottomAndCrossfade;
                break;
            }
        }
    }

    onAddAnimationDropDownValueChanged() {
        let dropDown = document.getElementById("addAnimationDropDown") as any;

        switch (dropDown.value) {
            case "Auto": {
                this.grid.columnAddingAnimationMode = ColumnShowingAnimationMode.Auto;
                this.grid.columnShowingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                break;
            }
            case "None": {
                this.grid.columnAddingAnimationMode = ColumnShowingAnimationMode.None;
                this.grid.columnShowingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                break;
            }
            case "SlideFromLeft": {
                this.grid.columnAddingAnimationMode = ColumnShowingAnimationMode.SlideFromLeft;
                this.grid.columnShowingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                break;
            }
            case "SlideFromRight": {
                this.grid.columnAddingAnimationMode = ColumnShowingAnimationMode.SlideFromRight;
                this.grid.columnShowingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                break;
            }
            case "SlideFromTop": {
                this.grid.columnAddingAnimationMode = ColumnShowingAnimationMode.SlideFromTop;
                this.grid.columnShowingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                break;
            }
            case "SlideFromBottom": {
                this.grid.columnAddingAnimationMode = ColumnShowingAnimationMode.SlideFromBottom;
                this.grid.columnShowingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                break;
            }
            case "FadeIn": {
                this.grid.columnAddingAnimationMode = ColumnShowingAnimationMode.FadeIn;
                this.grid.columnShowingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                break;
            }
            case "SlideFromLeftAndFadeIn": {
                this.grid.columnAddingAnimationMode = ColumnShowingAnimationMode.SlideFromLeftAndFadeIn;
                this.grid.columnShowingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                break;
            }
            case "SlideFromRightAndFadeIn": {
                this.grid.columnAddingAnimationMode = ColumnShowingAnimationMode.SlideFromRightAndFadeIn;
                this.grid.columnShowingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                break;
            }
            case "SlideFromTopAndFadeIn": {
                this.grid.columnAddingAnimationMode = ColumnShowingAnimationMode.SlideFromTopAndFadeIn;
                this.grid.columnShowingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                break;
            }
            case "SlideFromBottomAndFadeIn": {
                this.grid.columnAddingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                this.grid.columnShowingAnimationMode = ColumnShowingAnimationMode.SlideFromBottomAndFadeIn;
                break;
            }
        }
    }
}
