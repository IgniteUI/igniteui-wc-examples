


import { IgcRadialGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcRadialGaugeComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcRadialGaugeModule);


export class RadialGaugeNeedle {


    
    
        

    private gauge: IgcRadialGaugeComponent;

    constructor() {
        
    }


    constructor() {
        

        this.gauge = document.getElementById('gauge') as IgcRadialGaugeComponent;

    }

}

let sample = new RadialGaugeNeedle();