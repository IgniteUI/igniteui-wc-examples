import { IgcLinearGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcLinearGaugeComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcLinearGaugeModule);

export class LinearGaugeLabels {

    private gauge: IgcLinearGaugeComponent;

    constructor() {

        this.gauge = document.getElementById('gauge') as IgcLinearGaugeComponent;
    }

}

let sample = new LinearGaugeLabels();
