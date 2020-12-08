import { IgcLinearGaugeModule } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcLinearGaugeModule);

export class LinearGaugeBacking {

    constructor() {
    }
}

let sample = new LinearGaugeBacking();
