import { IgcLinearGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcLinearGaugeComponent } from 'igniteui-webcomponents-gauges';
import { IgcLinearGraphRangeComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcLinearGaugeModule);

export class LinearGaugeTypeMultiScale {

    private gauge1: IgcLinearGaugeComponent;
    private gauge2: IgcLinearGaugeComponent;

    constructor() {

        this.gauge1 = document.getElementById('gauge1') as IgcLinearGaugeComponent;
        this.gauge2 = document.getElementById('gauge2') as IgcLinearGaugeComponent;
        this.renderFahrenheitGauge(this.gauge1);
        this.renderCelsiusGauge(this.gauge2);
    }

    public covertToFahrenheit(celsius: number): number {
        return (celsius * 9 / 5) + 32;
    }

    public renderCelsiusGauge(gauge: IgcLinearGaugeComponent) {

        this.setupGauge(gauge);

        gauge.formatLabel = (s: any, e: any) => {
            e.label = e.value + ' °C'
        };
    }

    public renderFahrenheitGauge(gauge: IgcLinearGaugeComponent) {

        this.setupGauge(gauge);
        gauge.ranges.clear();
        gauge.scaleBrush   = 'transparent';
        gauge.scaleOutline = 'transparent';
        gauge.labelExtent = 0.15;
        gauge.tickStartExtent = -0.2;
        gauge.tickEndExtent = 0.0;
        gauge.minorTickStartExtent = -0.2;
        gauge.minorTickEndExtent = -0.1;

        gauge.formatLabel = (s: any, e: any) => {
            e.label = this.covertToFahrenheit(e.value) + ' °F'
        };
    }

    public setupGauge(gauge: IgcLinearGaugeComponent)  {

        gauge.minimumValue = -40;
        gauge.maximumValue = 100;
        gauge.value = 20;
        gauge.interval = 20;
        gauge.labelInterval = 20;
        gauge.labelExtent = 0.1;
        gauge.transitionDuration = 0;

        // setting appearance of needle
        gauge.isNeedleDraggingEnabled = false;
        gauge.needleBrush = 'transparent';
        gauge.needleOutline = 'transparent';

        gauge.backingBrush = 'transparent';
        gauge.backingOutline = 'transparent';

        // setting extent of gauge scale
        gauge.scaleStrokeThickness = 0;
        gauge.scaleBrush   = '#e0dfdf';
        gauge.scaleOutline = '#e0dfdf';
        gauge.scaleInnerExtent = 0.35;
        gauge.scaleOuterExtent = 1.0;
        gauge.scaleStartExtent = 0.05;
        gauge.scaleEndExtent = 0.95;

        // setting appearance of minor ticks
        gauge.minorTickBrush = 'gray';
        gauge.minorTickStartExtent = gauge.scaleInnerExtent - 0.1;
        gauge.minorTickEndExtent   = gauge.scaleInnerExtent - 0.0;
        gauge.minorTickStrokeThickness = 1;
        gauge.minorTickCount = 4;
        gauge.minorTickBrush = 'gray';

        // setting segments major ticks
        // gauge.tickStartExtent = 0.25;
        // gauge.tickEndExtent = 0.15;
        gauge.tickStartExtent = gauge.scaleInnerExtent - 0.2;
        gauge.tickEndExtent   = gauge.scaleInnerExtent - 0;
        gauge.tickStrokeThickness = 1;
        gauge.tickBrush = 'gray';

        const rangeExtentSpan = gauge.scaleOuterExtent - gauge.scaleInnerExtent;
        const rangeExtentInterval = rangeExtentSpan / 2;

        gauge.ranges.clear();
        // setting fill range
        const range1 = new IgcLinearGraphRangeComponent();
        range1.brush   = 'linear-gradient(#ff0000, #c70101)';
        range1.outline = 'transparent';
        range1.startValue = gauge.minimumValue;
        range1.endValue   = gauge.value;
        range1.innerStartExtent = gauge.scaleInnerExtent;
        range1.innerEndExtent   = gauge.scaleInnerExtent;
        range1.outerStartExtent = gauge.scaleInnerExtent + rangeExtentInterval;
        range1.outerEndExtent   = gauge.scaleInnerExtent + rangeExtentInterval;
        gauge.ranges.add(range1);

        const range2 = new IgcLinearGraphRangeComponent();
        range2.brush   = 'linear-gradient(#fa8f8f, #fa5151)';
        range2.outline = 'transparent';
        range2.startValue = gauge.minimumValue;
        range2.endValue   = gauge.value;
        range2.innerStartExtent = gauge.scaleInnerExtent + rangeExtentInterval;
        range2.innerEndExtent   = gauge.scaleInnerExtent + rangeExtentInterval;
        range2.outerStartExtent = gauge.scaleOuterExtent;
        range2.outerEndExtent   = gauge.scaleOuterExtent;
        gauge.ranges.add(range2);
    }

}

export function initialize() {
  return new LinearGaugeTypeMultiScale();
}