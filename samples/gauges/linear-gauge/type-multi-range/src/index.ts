import { IgcLinearGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcLinearGaugeComponent } from 'igniteui-webcomponents-gauges';
import { IgcLinearGraphRangeComponent } from 'igniteui-webcomponents-gauges';
import { LinearGraphNeedleShape } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcLinearGaugeModule);

export class LinearGaugeTypeMultiRange {

    private gauge1: IgcLinearGaugeComponent;
    private gauge2: IgcLinearGaugeComponent;
    private gauge3: IgcLinearGaugeComponent;

    constructor() {

        this.gauge1 = document.getElementById('gauge1') as IgcLinearGaugeComponent;
        this.gauge2 = document.getElementById('gauge2') as IgcLinearGaugeComponent;
        this.gauge3 = document.getElementById('gauge3') as IgcLinearGaugeComponent;

        this.renderGauge(this.gauge1, 80, ['#2efa2e', '#45ec03', '#10b401', '#008000']);
        this.renderGauge(this.gauge2, 50, ['#fdd682', '#fdc957', '#fdb417', '#e29b03']);
        this.renderGauge(this.gauge3, 30, ['#fa6363', '#fd3939', '#ff0000', '#cf0000']);
    }

    public renderGauge(gauge: IgcLinearGaugeComponent, value: number, colors: string[]) {

        gauge.value = value;
        gauge.minimumValue = 0;
        gauge.maximumValue = 100;
        gauge.interval = 5;
        gauge.labelInterval = 5;
        gauge.labelExtent = 0.15;
        gauge.transitionDuration = 0;

        // setting extent of gauge scale
        gauge.scaleInnerExtent = 0.25;
        gauge.scaleOuterExtent = 0.8;
        gauge.scaleStartExtent = 0.05;
        gauge.scaleEndExtent = 0.95;

        gauge.rangeBrushes  = colors;
        gauge.rangeOutlines = colors;

        const rangeSpan = gauge.maximumValue - gauge.minimumValue;
        const rangeValueInterval = rangeSpan / colors.length;
        const rangeExtentInterval = 0.5 / colors.length;

        gauge.ranges.clear();
        for (let i = 0; i < colors.length; i++) {
            const color = colors[i];
            const range = new IgcLinearGraphRangeComponent();
            range.startValue = rangeValueInterval * i;
            range.endValue   = rangeValueInterval * (i + 1);
            range.brush = color;
            range.outline = color;
            range.innerStartExtent = 0.25;
            range.innerEndExtent   = 0.25;
            range.outerStartExtent = 0.3 + (rangeExtentInterval * i); //  0.65;
            range.outerEndExtent   = 0.3 + (rangeExtentInterval * (i + 1)); // 0.65;
            gauge.ranges.add(range);
        }

        // setting appearance of needle
        gauge.isNeedleDraggingEnabled = true;
        gauge.needleShape = LinearGraphNeedleShape.Triangle;
        gauge.needleBrush = '#494949';
        gauge.needleOutline = '#494949';
        gauge.needleStrokeThickness = 1;
        gauge.needleOuterExtent = 0.9;
        gauge.needleInnerExtent = gauge.scaleInnerExtent + 0.1;
        gauge.needleBreadth = 10;
        // setting appearance of major ticks
        gauge.tickBrush = 'gray';
        gauge.tickStartExtent = 0.25;
        gauge.tickEndExtent = 0.15;
        gauge.tickStrokeThickness = 1;

        // setting appearance of minor ticks
        gauge.minorTickBrush = 'transparent';
        gauge.minorTickStartExtent = 0.25;
        gauge.minorTickEndExtent = 0.2;
        gauge.minorTickStrokeThickness = 1;
        gauge.minorTickCount = 9;

        gauge.backingBrush = 'transparent';
        gauge.backingOutline = 'transparent';

        // setting extent of gauge scale
        gauge.scaleStrokeThickness = 0;
        gauge.scaleBrush   = '#e0dfdf';
        gauge.scaleOutline = '#e0dfdf';
    }

}

export function initialize() {
  return new LinearGaugeTypeMultiRange();
}