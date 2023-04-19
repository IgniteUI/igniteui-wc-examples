import { IgcWebLinearProgressModule } from 'igniteui-webcomponents-inputs';
import { IgcWebGridModule } from 'igniteui-webcomponents-grids';
//insert bindingImports
//end bindingImports

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcWebLinearProgressModule,
    IgcWebGridModule
);

export class Sample {

    //insert bindingFields
    //end bindingFields

    constructor() {
        //insert bindingInit
        //end bindingInit

    }

}

new Sample();
