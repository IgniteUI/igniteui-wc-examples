import { IgcWebGridModule, IgcWebColumnLayoutModule } from 'igniteui-webcomponents-grids';
import { ComponentRenderer, WebGridDescriptionModule, WebColumnLayoutDescriptionModule } from 'igniteui-webcomponents-core';
//insert bindingImports
//end bindingImports

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcWebGridModule,
    IgcWebColumnLayoutModule
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
            WebGridDescriptionModule.register(context);
            WebColumnLayoutDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

new Sample();
