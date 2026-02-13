import { IgcRadialGaugeModule } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcRadialGaugeModule);

export class RadialGaugeBacking {

    constructor() {
    }

}

export function initialize() {
  return new RadialGaugeBacking();
}