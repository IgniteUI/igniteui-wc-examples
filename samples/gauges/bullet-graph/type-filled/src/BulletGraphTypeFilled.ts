


import { IgcBulletGraphModule } from 'igniteui-webcomponents-gauges';
import { IgcBulletGraphComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcLinearGraphRangeComponent } from 'igniteui-webcomponents-gauges';
import { LinearScaleOrientation } from 'igniteui-webcomponents-gauges';

ModuleManager.register(IgcBulletGraphModule);


export class BulletGraphTypeFilled {


    
    
        

    private gauge1: IgcBulletGraphComponent;
    private gauge2: IgcBulletGraphComponent;
    private gauge3: IgcBulletGraphComponent;
    constructor() {
        
    }

    public renderGauge(gauge: IgcBulletGraphComponent, value: number, target: number, color: string) {

        gauge.orientation = LinearScaleOrientation.Horizontal;
        gauge.backingBrush = 'transparent';
        gauge.backingOutline = 'transparent';
        gauge.transitionDuration = 0;
        gauge.minorTickCount = 4;
        gauge.value = value;
        gauge.valueBrush = color;
        gauge.valueOutline = color;
        gauge.targetValue = target;
        gauge.minimumValue = 0;
        gauge.maximumValue = 100;
        gauge.interval = (gauge.maximumValue - gauge.minimumValue) / 10;
        gauge.labelInterval = gauge.interval;
        gauge.labelExtent = 0.1;
        gauge.formatLabel = (s: any, e : any) => {
            e.label = e.value + '%'
        };

        gauge.scaleBackgroundBrush   = 'transparent';
        gauge.scaleBackgroundOutline = 'transparent';
        gauge.scaleStartExtent = 0.05;
        gauge.scaleEndExtent   = 0.96;
        gauge.valueInnerExtent = 0.3;
        gauge.valueOuterExtent = 0.85;

        gauge.ranges.clear();
        const range = new IgcLinearGraphRangeComponent();
        range.startValue = gauge.minimumValue;
        range.endValue   = gauge.maximumValue;
        range.brush   = '#e0dfdf';
        range.outline = '#e0dfdf';
        range.innerStartExtent  = gauge.valueInnerExtent;
        range.innerEndExtent    = gauge.valueInnerExtent;
        range.outerStartExtent  = gauge.valueOuterExtent;
        range.outerEndExtent    = gauge.valueOuterExtent;
        gauge.ranges.add(range);

        gauge.minorTickBrush = 'transparent';
        gauge.tickBrush = 'gray';
        gauge.tickStartExtent = gauge.valueInnerExtent;
        gauge.tickEndExtent   = gauge.valueInnerExtent - 0.1;
        gauge.tickStrokeThickness = 1;
    }

    constructor() {
        
        this.gauge1 = document.getElementById('gauge1') as IgcBulletGraphComponent;
        this.gauge2 = document.getElementById('gauge2') as IgcBulletGraphComponent;
        this.gauge3 = document.getElementById('gauge3') as IgcBulletGraphComponent;

        this.renderGauge(this.gauge1, 90, 80, '#10b401');
        this.renderGauge(this.gauge2, 70, 80, '#fdb417');
        this.renderGauge(this.gauge3, 50, 80, '#ff0000');
    }
}

let sample = new BulletGraphTypeFilled();