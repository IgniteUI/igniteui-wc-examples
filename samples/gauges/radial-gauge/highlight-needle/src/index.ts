import { IgcRadialGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcRadialGaugeComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcRadialGaugeModule);

export class RadialGaugeHighlightNeedle {

    private gauge: IgcRadialGaugeComponent;

    constructor() {

        this.gauge = document.getElementById('gauge') as IgcRadialGaugeComponent;
        this.gauge.font = '22px Verdana'
    }

}

export function initialize() {
  return new RadialGaugeHighlightNeedle();
}