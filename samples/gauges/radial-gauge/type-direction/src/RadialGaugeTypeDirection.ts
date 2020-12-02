import { IgcRadialGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcRadialGaugeComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { RadialGaugeScaleOversweepShape } from 'igniteui-webcomponents-gauges';
import { SweepDirection } from 'igniteui-webcomponents-core';
import { RadialGaugePivotShape } from 'igniteui-webcomponents-gauges';
import { RadialGaugeNeedleShape } from 'igniteui-webcomponents-gauges';
import { RadialGaugeBackingShape } from 'igniteui-webcomponents-gauges';

ModuleManager.register(IgcRadialGaugeModule);

export class RadialGaugeTypeDirection {

    public directions: any = {
        '0':   'N',
        '45':  'NE',
        '90':  'E',
        '135': 'SE',
        '180': 'S',
        '225': 'SW',
        '270': 'W',
        '315': 'NW',
        '360': 'N',
    }

    private gauge1: IgcRadialGaugeComponent;
    private gauge2: IgcRadialGaugeComponent;

    constructor() {

        this.gauge1 = document.getElementById('gauge1') as IgcRadialGaugeComponent;
        this.gauge2 = document.getElementById('gauge2') as IgcRadialGaugeComponent;
    }

    public onCreateDegreesGauge(gauge: IgcRadialGaugeComponent) {
        this.renderGauge(gauge);

        gauge.interval      = 15;
        gauge.labelInterval = 15;
        gauge.needleBrush = 'red';
        gauge.value = 30;
        gauge.font = '11px Verdana,Arial';
        gauge.labelExtent  = gauge.scaleStartExtent - 0.1;
        gauge.formatLabel = (s: any, e: any) => {
            e.label = e.value < 360 ? e.value + '°' : '';
        };

        gauge.minorTickStartExtent = gauge.scaleStartExtent - 0.0125;
        gauge.minorTickEndExtent   = gauge.scaleStartExtent - 0.0125 - 0.0125;
        gauge.tickStartExtent = gauge.scaleStartExtent - 0.0125;
        gauge.tickEndExtent   = gauge.scaleStartExtent - 0.0125 - 0.03;
    }

    public onCreateDirectionGauge(gauge: IgcRadialGaugeComponent) {
        this.renderGauge(gauge);

        gauge.interval      = 45;
        gauge.labelInterval = 45;
        gauge.needleBrush = 'dodgerblue';
        gauge.value = (30 + 180) % 360;
        // setting appearance of labels
        gauge.font = '15px Verdana,Arial';
        gauge.labelExtent  = gauge.scaleEndExtent + 0.05;
        gauge.formatLabel = (s: any, e: any) => {
            if (this.directions[e.value] !== undefined) {
                e.label = this.directions[e.value];
            } else {
                e.label = e.value;
            }
        };

        gauge.minorTickBrush = 'transparent';
        gauge.tickBrush = 'transparent';
    }

    public renderGauge(gauge: IgcRadialGaugeComponent) {

        gauge.minimumValue = 0;
        gauge.maximumValue = 360;
        gauge.value = 270;
        gauge.interval      = 45;
        gauge.labelInterval = 45;
        gauge.transitionDuration = 0;

        // setting extent of gauge scale
        gauge.scaleStartAngle = -90;
        gauge.scaleEndAngle = 270;
        gauge.scaleBrush = '#e0dfdf';
        gauge.scaleOversweepShape = RadialGaugeScaleOversweepShape.Circular;
        gauge.scaleSweepDirection = SweepDirection.Clockwise;
        gauge.scaleEndExtent = 0.7;
        gauge.scaleStartExtent = 0.675;

        gauge.isNeedleDraggingConstrained = false;
        gauge.isNeedleDraggingEnabled = false;
        gauge.needlePivotShape = RadialGaugePivotShape.None;
        gauge.needleShape = RadialGaugeNeedleShape.Triangle;
        gauge.needleBaseFeatureWidthRatio = 0.2;
        gauge.needleEndExtent = gauge.scaleStartExtent - 0.15;

        // setting appearance of major/minor ticks
        gauge.minorTickCount = (gauge.interval / 15) - 1;
        gauge.minorTickStrokeThickness = 1;
        gauge.minorTickBrush = '#79797a';
        gauge.tickStrokeThickness = 1;
        gauge.tickBrush = '#79797a';

        // setting appearance of backing dial
        gauge.backingBrush = 'transparent';
        gauge.backingOutline = 'transparent';
        gauge.backingShape = RadialGaugeBackingShape.Circular;
    }
}

let sample = new RadialGaugeTypeDirection();
