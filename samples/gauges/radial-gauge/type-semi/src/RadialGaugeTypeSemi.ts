import { IgcRadialGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcRadialGaugeComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { RadialGaugeScaleOversweepShape } from 'igniteui-webcomponents-gauges';
import { SweepDirection } from 'igniteui-webcomponents-core';
import { RadialGaugeBackingShape } from 'igniteui-webcomponents-gauges';
import { RadialGaugeNeedleShape } from 'igniteui-webcomponents-gauges';
import { RadialGaugePivotShape } from 'igniteui-webcomponents-gauges';

ModuleManager.register(IgcRadialGaugeModule);

export class RadialGaugeTypeSemi {

    private gauge: IgcRadialGaugeComponent;

    constructor() {

        this.gauge = document.getElementById('gauge') as IgcRadialGaugeComponent;

        this.renderGauge( this.gauge);
    }

    public renderGauge(gauge: IgcRadialGaugeComponent) {

        gauge.transitionDuration = 0;

        gauge.minimumValue = 0;
        gauge.maximumValue = 80;
        gauge.value = 10;
        gauge.interval = 10;

        // Label Settings
        gauge.labelExtent = 0.6;
        gauge.labelInterval = 10;
        gauge.font = '15px Verdana,Arial';

        // Scale Settings
        gauge.scaleStartAngle = 135;
        gauge.scaleEndAngle = 45;
        gauge.scaleBrush = '#0b8fed';
        gauge.scaleOversweepShape = RadialGaugeScaleOversweepShape.Auto;
        gauge.scaleSweepDirection = SweepDirection.Clockwise;
        gauge.scaleEndExtent = 0.825;
        gauge.scaleStartExtent = 0.775;

        // Backing Settings
        gauge.backingShape = RadialGaugeBackingShape.Fitted;
        gauge.backingBrush = '#fcfcfc';
        gauge.backingOutline = '#d6d6d6';
        gauge.backingOversweep = 5;
        gauge.backingCornerRadius = 10;
        gauge.backingOuterExtent = 0.9;
        gauge.backingStrokeThickness = 4;

        // Needle Settings
        gauge.needleShape = RadialGaugeNeedleShape.Needle;
        gauge.needlePivotShape = RadialGaugePivotShape.CircleOverlay;
        gauge.needleEndExtent = 0.5;
        gauge.needlePointFeatureExtent = 0.2;
        gauge.needlePivotWidthRatio = 0.1;
        gauge.needleBrush = '#9f9fa0';
        gauge.needleOutline = '#9f9fa0';
        gauge.needlePivotBrush = '#9f9fa0';
        gauge.needlePivotOutline = '#9f9fa0';

        // TickMark Settings
        gauge.tickBrush = 'rgba(51, 51, 51, 1)';
        gauge.tickStartExtent = gauge.scaleStartExtent - 0.10;
        gauge.tickEndExtent   = gauge.scaleStartExtent - 0.025;
        gauge.tickStrokeThickness = 1;

        gauge.minorTickBrush = 'rgba(73, 73, 73, 1)';
        gauge.minorTickCount = 4;
        gauge.minorTickStartExtent = gauge.scaleStartExtent - 0.05;
        gauge.minorTickEndExtent   = gauge.scaleStartExtent - 0.025;
        gauge.minorTickStrokeThickness = 1;

        gauge.ranges.clear();
    }
}

new RadialGaugeTypeSemi();
