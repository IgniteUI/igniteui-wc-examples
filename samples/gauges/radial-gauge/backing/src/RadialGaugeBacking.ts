import { IgcRadialGaugeModule } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcRadialGaugeModule);

export class RadialGaugeBacking {

    constructor() {
    }

}

let sample = new RadialGaugeBacking();
