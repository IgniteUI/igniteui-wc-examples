import { IgcRadialGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcRadialGaugeComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcRadialGaugeModule);

export class RadialGaugeOpticalScaling {

    private gauge: IgcRadialGaugeComponent;

    constructor() {
        this.onOpticalSizeChanged = this.onOpticalSizeChanged.bind(this);

        this.gauge = document.getElementById('gauge') as IgcRadialGaugeComponent;
        this.gauge.font = '22px Verdana'

        let checkbox1 = document.getElementById('checkbox1');
        checkbox1!.addEventListener('change', this.onOpticalScalingChanged);

        let slider1 = document.getElementById('slider') as HTMLInputElement;
        slider1.value = "250";
        slider1!.addEventListener('change', this.onOpticalSizeChanged);
    }

    public onOpticalScalingChanged = (e: any) => {
        const isEnabled = e.target.checked;
        this.gauge.opticalScalingEnabled = isEnabled;

        if (isEnabled) {
            this.gauge.opticalScalingEnabled = true;
            this.gauge.subtitleText = "Enabled";
        }
        else {
            this.gauge.opticalScalingEnabled = false;
            this.gauge.subtitleText = "Disabled";
        }
    }

    public onOpticalSizeChanged = (e: any) => {

        let num: number = parseInt(e.target.value, 10);

        this.gauge.opticalScalingSize = num;
    }
}

new RadialGaugeOpticalScaling();
