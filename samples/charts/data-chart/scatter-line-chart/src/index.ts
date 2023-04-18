import { IgcLegendModule, IgcNumberAbbreviatorModule, IgcDataChartCoreModule, IgcDataChartScatterModule, IgcDataChartScatterCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
//insert bindingImports
//end bindingImports

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcNumberAbbreviatorModule,
    IgcDataChartCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartInteractivityModule,
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
