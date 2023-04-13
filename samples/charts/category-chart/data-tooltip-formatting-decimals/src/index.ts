import { IgcLegendModule, IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
//insert bindingImports
//end bindingImports

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcCategoryChartModule
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
