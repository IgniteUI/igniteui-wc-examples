import { IgcLegendModule, IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartCategoryCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule, IgcDataChartStackedModule, IgcStackedFragmentSeriesModule } from 'igniteui-webcomponents-charts';
//insert bindingImports
//end bindingImports

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule,
    IgcDataChartStackedModule,
    IgcStackedFragmentSeriesModule
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
