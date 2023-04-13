import { IgcWebTreeGridModule } from 'igniteui-webcomponents-grids';
import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { ComponentRenderer, WebTreeGridDescriptionModule, PropertyEditorPanelDescriptionModule } from 'igniteui-webcomponents-core';
//insert bindingImports
//end bindingImports

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcWebTreeGridModule,
    IgcPropertyEditorPanelModule
);

export class Sample {

    //insert bindingFields
    //end bindingFields

    constructor() {
        //insert bindingInit
        //end bindingInit


    }


    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebTreeGridDescriptionModule.register(context);
            PropertyEditorPanelDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

new Sample();
