import { IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartCategoryCoreModule, IgcDataChartInteractivityModule, IgcDataChartVerticalCategoryModule, IgcAnnotationLayerProxyModule, IgcCalloutLayerModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
//insert bindingImports
//end bindingImports

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartVerticalCategoryModule,
    IgcAnnotationLayerProxyModule,
    IgcCalloutLayerModule,
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
