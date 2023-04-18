import { IgcFinancialChartModule, IgcDataChartInteractivityModule, IgcLegendModule } from 'igniteui-webcomponents-charts';
//insert bindingImports
//end bindingImports

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcFinancialChartModule,
    IgcDataChartInteractivityModule,
    IgcLegendModule
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
