import { IgcDataChartCategoryModule, IgcDataChartAnnotationModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
//insert bindingImports
//end bindingImports

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCategoryModule,
    IgcDataChartAnnotationModule,
    IgcDataChartInteractivityModule
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
