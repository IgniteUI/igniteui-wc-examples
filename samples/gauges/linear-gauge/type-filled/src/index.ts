import { IgcLinearGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcLinearGaugeComponent } from 'igniteui-webcomponents-gauges';
import { IgcLinearGraphRangeComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcLinearGaugeModule);

export class LinearGaugeTypeFilled {

    private gauge1: IgcLinearGaugeComponent;
    private gauge2: IgcLinearGaugeComponent;
    private gauge3: IgcLinearGaugeComponent;

    constructor() {

        this.gauge1 = document.getElementById('gauge1') as IgcLinearGaugeComponent;
        this.gauge2 = document.getElementById('gauge2') as IgcLinearGaugeComponent;
        this.gauge3 = document.getElementById('gauge3') as IgcLinearGaugeComponent;

        this.renderGauge(this.gauge1, 80, 'green');
        this.renderGauge(this.gauge2, 50, 'orange');
        this.renderGauge(this.gauge3, 30, 'red');
    }

    public renderGauge(gauge: IgcLinearGaugeComponent, value: number, color: string) {

        gauge.value = value;
        gauge.minimumValue = 0;
        gauge.maximumValue = 100;
        gauge.interval = 10;
        gauge.transitionDuration = 0;
        gauge.labelInterval = gauge.interval;
        gauge.labelExtent = 0.1;
        gauge.formatLabel = (s: any, e: any) => {
            e.label = e.value + '%'
        };

        // setting appearance of needle
        gauge.isNeedleDraggingEnabled = false;
        gauge.needleBrush = 'transparent';
        gauge.needleOutline = 'transparent';

        // setting extent of gauge scale
        gauge.scaleStrokeThickness = 0;
        gauge.scaleBrush   = '#e0dfdf';
        gauge.scaleOutline = '#e0dfdf';
        gauge.scaleInnerExtent = 0.25;
        gauge.scaleOuterExtent = 0.65;
        gauge.scaleStartExtent = 0.05;
        gauge.scaleEndExtent = 0.95;

        // setting appearance of major ticks
        gauge.tickBrush = 'gray';
        gauge.tickStartExtent = gauge.scaleInnerExtent;
        gauge.tickEndExtent   = gauge.scaleInnerExtent - 0.1;
        gauge.tickStrokeThickness = 1;

        // setting appearance of minor ticks
        gauge.minorTickBrush = 'transparent';

        gauge.backingBrush = 'transparent';
        gauge.backingOutline = 'transparent';

        // setting fill range
        const range = new IgcLinearGraphRangeComponent();
        range.brush   = color;
        range.outline = color;
        range.startValue = 0;
        range.endValue = gauge.value;
        range.innerStartExtent = gauge.scaleInnerExtent;
        range.innerEndExtent   = gauge.scaleInnerExtent;
        range.outerStartExtent = gauge.scaleOuterExtent;
        range.outerEndExtent   = gauge.scaleOuterExtent;

        gauge.ranges.clear();
        gauge.ranges.add(range);
    }

}

export function initialize() {
  return new LinearGaugeTypeFilled();
}