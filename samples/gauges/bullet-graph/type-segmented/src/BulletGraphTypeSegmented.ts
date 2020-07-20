


import { IgcBulletGraphModule } from 'igniteui-webcomponents-gauges';
import { IgcBulletGraphComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcLinearGraphRangeComponent } from 'igniteui-webcomponents-gauges';
import { LinearScaleOrientation } from 'igniteui-webcomponents-gauges';

ModuleManager.register(IgcBulletGraphModule);


export class BulletGraphTypeSegmented {

    private gauge1: IgcBulletGraphComponent;
    private gauge2: IgcBulletGraphComponent;
    private gauge3: IgcBulletGraphComponent;

    constructor() {

        this.gauge1 = document.getElementById('gauge1') as IgcBulletGraphComponent;
        this.gauge2 = document.getElementById('gauge2') as IgcBulletGraphComponent;
        this.gauge3 = document.getElementById('gauge3') as IgcBulletGraphComponent;

        this.renderGauge(this.gauge1, 90, 80, '#10b401');
        this.renderGauge(this.gauge2, 70, 80, '#fdb417');
        this.renderGauge(this.gauge3, 50, 80, '#ff0000');        
    }

    public renderGauge(gauge: IgcBulletGraphComponent, value: number, target: number, color: string) {

        gauge.orientation = LinearScaleOrientation.Horizontal;
        gauge.backingBrush = 'transparent';
        gauge.backingOutline = 'transparent';
        gauge.transitionDuration = 0;
        gauge.minimumValue = 0;
        gauge.maximumValue = 100;
        gauge.interval = (gauge.maximumValue - gauge.minimumValue) / 10;
        gauge.labelInterval = gauge.interval;
        gauge.labelExtent = 0.15;
        gauge.formatLabel = (s: any, e : any) => {
            e.label = e.value + '%'
        };

        gauge.scaleBackgroundBrush   = 'transparent';
        gauge.scaleBackgroundOutline = 'transparent';
        gauge.scaleStartExtent = 0.05;
        gauge.scaleEndExtent   = 0.96;

        gauge.value = value;
        gauge.valueBrush = 'transparent';
        gauge.valueOutline = 'transparent';
        gauge.valueInnerExtent = 0.3;
        gauge.valueOuterExtent = 0.85;

        gauge.targetValue = target;
        gauge.targetValueInnerExtent = gauge.valueInnerExtent - 0.1;
        gauge.targetValueOuterExtent = gauge.valueOuterExtent + 0.1;

        gauge.ranges.clear();
        const rangeBG = new IgcLinearGraphRangeComponent();
        rangeBG.startValue = gauge.minimumValue;
        rangeBG.endValue   = gauge.maximumValue;
        rangeBG.brush   = '#e0dfdf';
        rangeBG.outline = '#e0dfdf';
        rangeBG.innerStartExtent  = gauge.valueInnerExtent;
        rangeBG.innerEndExtent    = gauge.valueInnerExtent;
        rangeBG.outerStartExtent  = gauge.valueOuterExtent;
        rangeBG.outerEndExtent    = gauge.valueOuterExtent;
        gauge.ranges.add(rangeBG);

        const rangeVal = new IgcLinearGraphRangeComponent();
        rangeVal.startValue = gauge.minimumValue;
        rangeVal.endValue   = gauge.value;
        rangeVal.brush   = color;
        rangeVal.outline = color;
        rangeVal.innerStartExtent  = gauge.valueInnerExtent;
        rangeVal.innerEndExtent    = gauge.valueInnerExtent;
        rangeVal.outerStartExtent  = gauge.valueOuterExtent;
        rangeVal.outerEndExtent    = gauge.valueOuterExtent;
        gauge.ranges.add(rangeVal);

        // using major ticks as segment bounds
        gauge.tickBrush = 'white';
        gauge.tickStrokeThickness = 2;
        gauge.tickStartExtent = gauge.valueInnerExtent;
        gauge.tickEndExtent   = gauge.valueOuterExtent;

        // using minor ticks as segment bounds
        gauge.minorTickBrush = 'white';
        gauge.minorTickStrokeThickness = 2;
        gauge.minorTickStartExtent = gauge.valueInnerExtent;
        gauge.minorTickEndExtent   = gauge.valueOuterExtent;
        gauge.minorTickCount = (gauge.interval / 2) - 1;
    }
}

let sample = new BulletGraphTypeSegmented();