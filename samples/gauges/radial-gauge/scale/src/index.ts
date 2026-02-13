import { IgcRadialGaugeModule } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcRadialGaugeModule);

export class RadialGaugeScale {

    constructor() {
    }

}

export function initialize() {
  return new RadialGaugeScale();
}