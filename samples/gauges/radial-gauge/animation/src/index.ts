import { IgcRadialGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcRadialGaugeComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { RadialGaugeNeedleShape } from 'igniteui-webcomponents-gauges';
import { RadialGaugePivotShape } from 'igniteui-webcomponents-gauges';
import { RadialGaugeScaleOversweepShape } from 'igniteui-webcomponents-gauges';
import { SweepDirection } from 'igniteui-webcomponents-core';
import { RadialGaugeBackingShape } from 'igniteui-webcomponents-gauges';
import { IgcRadialGaugeRangeComponent } from 'igniteui-webcomponents-gauges';

ModuleManager.register(IgcRadialGaugeModule);

export class RadialGaugeAnimation {

    private gauge: IgcRadialGaugeComponent;
    private shouldAnimate: boolean = false;

    constructor() {

        this.gauge = document.getElementById('gauge') as IgcRadialGaugeComponent;

        let button1 = document.getElementById('button1');
        button1!.addEventListener('click', this.onAnimateToGauge1)

        let button2 = document.getElementById('button2');
        button2!.addEventListener('click', this.onAnimateToGauge2)

        let button3 = document.getElementById('button3');
        button3!.addEventListener('click', this.onAnimateToGauge3)

        let button4 = document.getElementById('button4');
        button4!.addEventListener('click', this.onAnimateToGauge4)

        this.onAnimateToGauge4(this.gauge);
    }

    // full radial gauge
    public onAnimateToGauge4 = (e: any) => {

        if(this.shouldAnimate){
            this.gauge.transitionDuration = 1000;
        }

        this.gauge.minimumValue = 0;
        this.gauge.maximumValue = 50;
        this.gauge.value = 25;
        this.gauge.interval = 5;

        // setting appearance of labels
        this.gauge.labelInterval = 5;
        this.gauge.labelExtent = 0.71;
        this.gauge.font = '15px Verdana,Arial';

        // setting custom needle
        this.gauge.isNeedleDraggingEnabled = true;
        this.gauge.needleEndExtent = 0.5;
        this.gauge.needleShape = RadialGaugeNeedleShape.Triangle;
        this.gauge.needleEndWidthRatio = 0.03;
        this.gauge.needleStartWidthRatio = 0.05;
        this.gauge.needlePivotShape = RadialGaugePivotShape.CircleOverlay;
        this.gauge.needlePivotWidthRatio = 0.15;
        this.gauge.needleBaseFeatureWidthRatio = 0.15;
        this.gauge.needleBrush = '#79797a';
        this.gauge.needleOutline = '#79797a';
        this.gauge.needlePivotBrush = '#79797a';
        this.gauge.needlePivotOutline = '#79797a';

        // setting appearance of major/minor ticks
        this.gauge.minorTickCount = 4;
        this.gauge.minorTickEndExtent = 0.625;
        this.gauge.minorTickStartExtent = 0.6;
        this.gauge.minorTickStrokeThickness = 1;
        this.gauge.minorTickBrush = '#79797a';
        this.gauge.tickStartExtent = 0.6;
        this.gauge.tickEndExtent = 0.65;
        this.gauge.tickStrokeThickness = 2;
        this.gauge.tickBrush = '#79797a';

        // setting extent of gauge scale
        this.gauge.scaleStartAngle = 120;
        this.gauge.scaleEndAngle = 60;
        this.gauge.scaleBrush = '#d6d6d6';
        this.gauge.scaleOversweepShape = RadialGaugeScaleOversweepShape.Fitted;
        this.gauge.scaleSweepDirection = SweepDirection.Clockwise;
        this.gauge.scaleEndExtent = 0.57;
        this.gauge.scaleStartExtent = 0.5;

        // setting appearance of backing dial
        this.gauge.backingBrush = '#fcfcfc';
        this.gauge.backingOutline = '#d6d6d6';
        this.gauge.backingStrokeThickness = 5;
        this.gauge.backingShape = RadialGaugeBackingShape.Circular;

        // setting custom gauge ranges
        const range1 = new IgcRadialGaugeRangeComponent();
        range1.startValue = 5;
        range1.endValue = 15;
        const range2 = new IgcRadialGaugeRangeComponent();
        range2.startValue = 15;
        range2.endValue = 35;
        const range3 = new IgcRadialGaugeRangeComponent();
        range3.startValue = 35;
        range3.endValue = 45;
        this.gauge.rangeBrushes  = [ '#F86232', '#DC3F76', '#7446B9'];
        this.gauge.rangeOutlines = [ '#F86232', '#DC3F76', '#7446B9'];
        this.gauge.ranges.clear();
        this.gauge.ranges.add(range1);
        this.gauge.ranges.add(range2);
        this.gauge.ranges.add(range3);
        // setting extent of all gauge ranges
        for (let i = 0; i < this.gauge.ranges.count; i++) {
            const range = this.gauge.ranges.item(i);
            range.innerStartExtent = 0.5;
            range.innerEndExtent = 0.5;
            range.outerStartExtent = 0.57;
            range.outerEndExtent = 0.57;
        }

        this.shouldAnimate = true;
    }

    // semi radial gauge
    public onAnimateToGauge3 = (e: any) => {

        if(this.shouldAnimate){
            this.gauge.transitionDuration = 1000;
        }

        this.gauge.minimumValue = 0;
        this.gauge.maximumValue = 80;
        this.gauge.value = 10;
        this.gauge.interval = 10;

        // Label Settings
        this.gauge.labelExtent = 0.6;
        this.gauge.labelInterval = 10;
        this.gauge.font = '15px Verdana,Arial';

        // Scale Settings
        this.gauge.scaleStartAngle = 135;
        this.gauge.scaleEndAngle = 45;
        this.gauge.scaleBrush = '#0b8fed';
        this.gauge.scaleOversweepShape = RadialGaugeScaleOversweepShape.Auto;
        this.gauge.scaleSweepDirection = SweepDirection.Clockwise;
        this.gauge.scaleEndExtent = 0.825;
        this.gauge.scaleStartExtent = 0.775;

        this.gauge.minorTickStartExtent = 0.7;
        this.gauge.minorTickEndExtent = 0.75;
        this.gauge.tickStartExtent = 0.675;
        this.gauge.tickEndExtent = 0.75;

        // Backing Settings
        this.gauge.backingShape = RadialGaugeBackingShape.Fitted;
        this.gauge.backingBrush = '#fcfcfc';
        this.gauge.backingOutline = '#d6d6d6';
        this.gauge.backingOversweep = 5;
        this.gauge.backingCornerRadius = 10;
        this.gauge.backingOuterExtent = 0.9;

        // Needle Settings
        this.gauge.needleShape = RadialGaugeNeedleShape.NeedleWithBulb;
        this.gauge.needlePivotShape = RadialGaugePivotShape.CircleOverlay;
        this.gauge.needleEndExtent = 0.5;
        this.gauge.needlePointFeatureExtent = 0.3;
        this.gauge.needlePivotWidthRatio = 0.2;
        this.gauge.needleBrush = '#9f9fa0';
        this.gauge.needleOutline = '#9f9fa0';
        this.gauge.needlePivotBrush = '#9f9fa0';
        this.gauge.needlePivotOutline = '#9f9fa0';

        // TickMark Settings
        this.gauge.tickBrush = 'rgba(51, 51, 51, 1)';
        this.gauge.minorTickBrush = 'rgba(73, 73, 73, 1)';
        this.gauge.minorTickCount = 6;

        this.gauge.ranges.clear();
        this.shouldAnimate = true;
    }

    // half radial gauge
    public onAnimateToGauge2 = (e: any) => {

        if(this.shouldAnimate){
            this.gauge.transitionDuration = 1000;
        }

        this.gauge.minimumValue = 100;
        this.gauge.maximumValue = 200;
        this.gauge.value = 125;

        // Scale Settings
        this.gauge.scaleStartAngle = 180;
        this.gauge.scaleEndAngle = 0;
        this.gauge.scaleBrush = 'transparent';
        this.gauge.scaleSweepDirection = SweepDirection.Clockwise;

        // Backing Settings
        this.gauge.backingOutline = 'white';
        this.gauge.backingBrush = 'white';
        this.gauge.backingShape = RadialGaugeBackingShape.Fitted;

        // Needle Settings
        this.gauge.needleEndExtent = 0.8;
        this.gauge.needleShape = RadialGaugeNeedleShape.Triangle;
        this.gauge.needlePivotShape = RadialGaugePivotShape.Circle;
        this.gauge.needlePivotWidthRatio = 0.1;
        this.gauge.needleBrush = '#79797a';
        this.gauge.needleOutline = '#79797a';

        // TickMark Settings
        this.gauge.tickBrush = 'transparent';
        this.gauge.minorTickBrush = 'transparent';

        // Label Settings
        this.gauge.labelInterval = 50;
        this.gauge.labelExtent = 0.935;
        this.gauge.font = '13px Verdana,Arial';

        // setting custom gauge ranges
        const range1 = new IgcRadialGaugeRangeComponent();
        range1.startValue = 100;
        range1.endValue = 150;
        const range2 = new IgcRadialGaugeRangeComponent();
        range2.startValue = 150;
        range2.endValue = 200;

        this.gauge.rangeBrushes  = [ '#32f845', '#bf32f8' ];
        this.gauge.rangeOutlines = [ '#32f845', '#bf32f8' ];
        this.gauge.ranges.clear();
        this.gauge.ranges.add(range1);
        this.gauge.ranges.add(range2);

        // setting extent of all gauge ranges
        for (let i = 0; i < this.gauge.ranges.count; i++) {
            const range = this.gauge.ranges.item(i);
            range.innerStartExtent = 0.3;
            range.innerEndExtent = 0.3;
            range.outerStartExtent = 0.9;
            range.outerEndExtent = 0.9;
        }

        this.shouldAnimate = true;
    }

    // quatre radial gauge
    public onAnimateToGauge1 = (e: any) => {

        if(this.shouldAnimate){
            this.gauge.transitionDuration = 1000;
        }

        this.gauge.minimumValue = 0;
        this.gauge.maximumValue = 10;
        this.gauge.value = 7.5;

        // Scale Settings
        this.gauge.scaleStartAngle = 180;
        this.gauge.scaleEndAngle = 270;
        this.gauge.scaleBrush = 'transparent';
        this.gauge.scaleSweepDirection = SweepDirection.Clockwise;

        // Backing Settings
        this.gauge.backingOutline = 'white';
        this.gauge.backingBrush = 'white';
        this.gauge.backingShape = RadialGaugeBackingShape.Fitted;

        // Needle Settings
        this.gauge.needleEndExtent = 0.8;
        this.gauge.needleShape = RadialGaugeNeedleShape.Triangle;
        this.gauge.needlePivotShape = RadialGaugePivotShape.Circle;
        this.gauge.needlePivotWidthRatio = 0.1;
        this.gauge.needleBrush = '#79797a';
        this.gauge.needleOutline = '#79797a';

        // TickMark Settings
        this.gauge.tickBrush = 'transparent';
        this.gauge.minorTickBrush = 'transparent';

        // Label Settings
        this.gauge.labelInterval = 5;
        this.gauge.labelExtent = 0.915;
        this.gauge.font = '15px Verdana,Arial';

        // setting custom gauge ranges
        const range1 = new IgcRadialGaugeRangeComponent();
        range1.startValue = 0;
        range1.endValue = 5;
        const range2 = new IgcRadialGaugeRangeComponent();
        range2.startValue = 5;
        range2.endValue = 10;

        this.gauge.rangeBrushes  = [ '#a4bd29', '#F86232' ];
        this.gauge.rangeOutlines = [ '#a4bd29', '#F86232' ];
        this.gauge.ranges.clear();
        this.gauge.ranges.add(range1);
        this.gauge.ranges.add(range2);

        // setting extent of all gauge ranges
        for (let i = 0; i < this.gauge.ranges.count; i++) {
            const range = this.gauge.ranges.item(i);
            range.innerStartExtent = 0.3;
            range.innerEndExtent = 0.3;
            range.outerStartExtent = 0.9;
            range.outerEndExtent = 0.9;
        }

        this.shouldAnimate = true;
    }
}

new RadialGaugeAnimation();
