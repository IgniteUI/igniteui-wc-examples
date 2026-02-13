import { IgcLinearGaugeModule } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcLinearGaugeModule);

export class LinearGaugeNeedle {

    constructor() {
    }

}

export function initialize() {
  return new LinearGaugeNeedle();
}