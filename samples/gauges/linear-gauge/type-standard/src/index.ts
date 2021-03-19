import { IgcLinearGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcLinearGaugeComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcLinearGaugeModule);

export class LinearGaugeTypeStandard {

    private gauge: IgcLinearGaugeComponent;

    constructor() {

        this.gauge = document.getElementById('gauge') as IgcLinearGaugeComponent;

        this.setupGauge(this.gauge);
    }

    public setupGauge(gauge: IgcLinearGaugeComponent)  {

        gauge.ranges.clear();
        gauge.minimumValue = 0;
        gauge.maximumValue = 100;
        gauge.value = 80;
        gauge.interval = 10;
        gauge.labelInterval = 10;
        gauge.transitionDuration = 0;

        // setting appearance of needle
        gauge.isNeedleDraggingEnabled = true;
    }

}

new LinearGaugeTypeStandard();
