import { IgcLegendModule, IgcDataChartCoreModule, IgcDataChartCategoryCoreModule, IgcDataChartCategoryModule, IgcDataChartInteractivityModule, IgcDataChartVerticalCategoryModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
//insert bindingImports
//end bindingImports

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcDataChartVerticalCategoryModule,
    IgcDataChartAnnotationModule
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
