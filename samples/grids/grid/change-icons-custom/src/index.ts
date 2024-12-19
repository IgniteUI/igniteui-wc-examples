import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent, IgcPinningConfig, RowPinningPosition, IgcActionStripComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { NwindDataItem, NwindDataItem_LocationsItem, NwindData } from './NwindData';
import { defineComponents, IgcButtonGroupComponent, registerIcon, registerIconFromText, setIconRef } from 'igniteui-webcomponents';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import { ModuleManager } from 'igniteui-webcomponents-core';
import { arrowDown, arrowUp, caretDown, chevronRight, ellipsisRight, eye,
     eyeSlash, fileExport, filter, magnifyGlass, thumbtack, thumbtackSlash, xMark } from "./icons"
import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule
);
defineComponents(IgcButtonGroupComponent);
export class Sample {
    private grid: IgcGridComponent
    private _pinningConfig1: IgcPinningConfig | null = null;
    public get pinningConfig1(): IgcPinningConfig {
        if (this._pinningConfig1 == null)
        {
            var pinningConfig1: IgcPinningConfig = {} as IgcPinningConfig;
            pinningConfig1.rows = RowPinningPosition.Top;
            this._pinningConfig1 = pinningConfig1;
        }
        return this._pinningConfig1;
    }
    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var buttonGroup = document.getElementById('btnGroup') as IgcButtonGroupComponent;
        grid.data = this.nwindData;
        grid.pinning = this.pinningConfig1;
        this.registerAwesomeIcons();
        buttonGroup.addEventListener("igcSelect", (e) => {
            this.changeRefs(e.detail);
        });
    }

    private registerAwesomeIcons() {
        registerIconFromText("filter_list", filter, "fontAwesome");
        registerIconFromText("arrow_upward", arrowUp, "fontAwesome");
        registerIconFromText("arrow_downward", arrowDown, "fontAwesome");
        registerIconFromText("more_vert", ellipsisRight, "fontAwesome");
        registerIconFromText("unpin-left", thumbtackSlash, "fontAwesome");
        registerIconFromText("pin-left", thumbtack, "fontAwesome");
        registerIconFromText("visibility", eye, "fontAwesome");
        registerIconFromText("visibility_off", eyeSlash, "fontAwesome");
        registerIconFromText("search", magnifyGlass, "fontAwesome");
        registerIconFromText("chevron_right", chevronRight, "fontAwesome");
        registerIconFromText("clear", xMark, "fontAwesome");
        registerIconFromText("file_download", fileExport, "fontAwesome");
        registerIconFromText("arrow_drop_down", caretDown , "fontAwesome");
    }

    private changeRefs(collectionName: string) {
        setIconRef('arrow_drop_down', 'default', {
            name: 'arrow_drop_down',
            collection: collectionName,
        });
        setIconRef('file_download', 'default', {
            name: 'file_download',
            collection: collectionName,
        });
        setIconRef('clear', 'default', {
            name: 'clear',
            collection: collectionName,
        });
        setIconRef('chevron_right', 'default', {
            name: 'chevron_right',
            collection: collectionName,
        });

        setIconRef('search', 'default', {
            name: 'search',
            collection: collectionName,
        });

        setIconRef('hide', 'default', {
            name: 'visibility_off',
            collection: collectionName,
        });

        setIconRef('show', 'default', {
            name: 'visibility',
            collection: collectionName,
        });

        setIconRef('unpin', 'default', {
            name: 'unpin-left',
            collection: collectionName === "material" ? "imx-icons" : collectionName,
        });

        setIconRef('pin', 'default', {
            name: 'pin-left',
            collection: collectionName === "material" ? "imx-icons" : collectionName,
        });
        setIconRef('filter_list', 'default', {
            name: 'filter_list',
            collection: collectionName,
        });

        setIconRef('sort_asc', 'default', {
            name: 'arrow_upward',
            collection: collectionName,
        });

        setIconRef('more_vert', 'default', {
            name: 'more_vert',
            collection: collectionName,
        });

        setIconRef('sort_desc', 'default', {
            name: 'arrow_downward',
            collection: collectionName,
        });
    }

    private _nwindData: NwindData = null;
    public get nwindData(): NwindData {
        if (this._nwindData == null)
        {
            this._nwindData = new NwindData();
        }
        return this._nwindData;
    }
}

new Sample();
