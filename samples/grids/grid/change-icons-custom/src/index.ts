import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent, IgcPinningConfig, RowPinningPosition, IgcActionStripComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { NwindDataItem, NwindDataItem_LocationsItem, NwindData } from './NwindData';
import { defineComponents, IgcButtonGroupComponent, registerIcon, registerIconFromText, setIconRef } from 'igniteui-webcomponents';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import { ModuleManager } from 'igniteui-webcomponents-core';
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
        registerIcon("filter_list", require('./assets/filter-solid.svg') as string, "fontAwesome");
        registerIcon("arrow_upward", require('./assets/arrow-up-wide-short-solid.svg') as string, "fontAwesome");
        registerIcon("arrow_downward", require('./assets/arrow-down-wide-short-solid.svg') as string, "fontAwesome");
        registerIcon("more_vert", require('./assets/ellipsis-vertical-solid.svg') as string, "fontAwesome");
        registerIcon("unpin-left", require('./assets/thumbtack-slash-solid.svg') as string, "fontAwesome");
        registerIcon("pin-left", require('./assets/thumbtack-solid.svg') as string, "fontAwesome");
        registerIcon("visibility", require('./assets/eye-solid.svg') as string, "fontAwesome");
        registerIcon("visibility_off", require('./assets/eye-slash-solid.svg') as string, "fontAwesome");
        registerIcon("search", require('./assets/magnifying-glass-solid.svg') as string, "fontAwesome");
        registerIcon("chevron_right", require('./assets/chevron-right-solid.svg') as string, "fontAwesome");
        registerIcon("clear", require('./assets/xmark-solid.svg') as string, "fontAwesome");
        registerIcon("import_export", require('./assets/file-export-solid.svg') as string, "fontAwesome");
        registerIcon("arrow_drop_down", require('./assets/caret-down-solid.svg') as string, "fontAwesome");
    }

    private changeRefs(collectionName: string) {
        setIconRef('arrow_drop_down', 'default', {
            name: 'arrow_drop_down',
            collection: collectionName,
        });
        setIconRef('import_export', 'default', {
            name: 'import_export',
            collection: collectionName,
        });
        setIconRef('clear', 'default', {
            name: 'clear',
            collection: collectionName,
        });
        setIconRef('chevron_right', 'default', {
            name: 'search',
            collection: collectionName,
        });

        setIconRef('search', 'default', {
            name: 'search',
            collection: collectionName,
        });

        setIconRef('visibility_off', 'default', {
            name: 'visibility_off',
            collection: collectionName,
        });

        setIconRef('visibility', 'default', {
            name: 'visibility',
            collection: collectionName,
        });

        setIconRef('unpin-left', 'default', {
            name: 'unpin-left',
            collection: collectionName === "material" ? "imx-icons" : collectionName,
        });

        setIconRef('pin-left', 'default', {
            name: 'pin-left',
            collection: collectionName === "material" ? "imx-icons" : collectionName,
        });
        setIconRef('filter_list', 'default', {
            name: 'filter_list',
            collection: collectionName,
        });

        setIconRef('arrow_upward', 'default', {
            name: 'arrow_upward',
            collection: collectionName,
        });

        setIconRef('more_vert', 'default', {
            name: 'more_vert',
            collection: collectionName,
        });

        setIconRef('arrow_downward', 'default', {
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
