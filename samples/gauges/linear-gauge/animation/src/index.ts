import { IgcLinearGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcLinearGaugeComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcLinearGraphRangeComponent } from 'igniteui-webcomponents-gauges';
import { LinearGraphNeedleShape } from 'igniteui-webcomponents-gauges';

ModuleManager.register(IgcLinearGaugeModule);

export class LinearGaugeAnimation {

    private gauge: IgcLinearGaugeComponent;
    private shouldAnimate: boolean = false;

    constructor() {

        this.gauge = document.getElementById('gauge') as IgcLinearGaugeComponent;

        let button = document.getElementById('animationButton1');
        button!.addEventListener('click', this.onAnimateToGauge1)

        let button2 = document.getElementById('animationButton2');
        button2!.addEventListener('click', this.onAnimateToGauge2)

        let button3 = document.getElementById('animationButton3');
        button3!.addEventListener('click', this.onAnimateToGauge3)

        this.onAnimateToGauge3(null);

        this.onAnimateToGauge1 = this.onAnimateToGauge1.bind(this);
        this.onAnimateToGauge2 = this.onAnimateToGauge2.bind(this);
        this.onAnimateToGauge3 = this.onAnimateToGauge3.bind(this);
    }

    public onAnimateToGauge1 = (e: any) => {
        // linear gauge requires settings for these properties:
        if (this.shouldAnimate) {
            this.gauge.transitionDuration = 1000;
        }

        this.gauge.minimumValue = 0;
        this.gauge.maximumValue = 80;
        this.gauge.value = 60;
        this.gauge.interval = 20;

        // setting custom appearance of labels
        this.gauge.labelInterval = 20;
        this.gauge.labelExtent = 0.0;

        // setting custom appearance of needle
        this.gauge.isNeedleDraggingEnabled = true;
        this.gauge.needleShape = LinearGraphNeedleShape.Trapezoid;
        this.gauge.needleBrush = '#79797a';
        this.gauge.needleOutline = '#ffffffff';
        this.gauge.needleStrokeThickness = 1;
        this.gauge.needleOuterExtent = 0.9;
        this.gauge.needleInnerExtent = 0.3;

        // setting custom appearance of major/minor ticks
        this.gauge.minorTickCount = 5;
        this.gauge.minorTickEndExtent = 0.10;
        this.gauge.minorTickStartExtent = 0.20;
        this.gauge.minorTickStrokeThickness = 1;
        this.gauge.tickStartExtent = 0.25;
        this.gauge.tickEndExtent = 0.05;
        this.gauge.tickStrokeThickness = 2;

        // setting custom gauge ranges
        const range1 = new IgcLinearGraphRangeComponent();
        range1.startValue = 0;
        range1.endValue = 40;
        const range2 = new IgcLinearGraphRangeComponent();
        range2.startValue = 40;
        range2.endValue = 80;

        this.gauge.rangeBrushes = ['#a4bd29', '#F86232'];
        this.gauge.rangeOutlines = ['#a4bd29', '#F86232'];
        this.gauge.ranges.clear();
        this.gauge.ranges.add(range1);
        this.gauge.ranges.add(range2);

        // setting extent of all gauge ranges
        for (let i = 0; i < this.gauge.ranges.count; i++) {
            const range = this.gauge.ranges.item(i);
            range.innerStartExtent = 0.075;
            range.innerEndExtent = 0.075;
            range.outerStartExtent = 0.65;
            range.outerEndExtent = 0.65;
        }

        // setting extent of gauge scale
        this.gauge.scaleStrokeThickness = 0;
        this.gauge.scaleBrush = '#ffffff';
        this.gauge.scaleOutline = '#dbdbdb';
        this.gauge.scaleInnerExtent = 0.075;
        this.gauge.scaleOuterExtent = 0.85;
        this.gauge.scaleStartExtent = 0.05;
        this.gauge.scaleEndExtent = 0.95;

        // setting appearance of backing fill and outline
        this.gauge.backingBrush = '#ffffff';
        this.gauge.backingOutline = '#d1d1d1';
        this.gauge.backingStrokeThickness = 0;

        this.shouldAnimate = true;
    }

    public onAnimateToGauge2 = (e: any) => {

        if (this.shouldAnimate) {
            this.gauge.transitionDuration = 1000;
        }
        // linear gauge requires settings for these properties:
        this.gauge.minimumValue = 100;
        this.gauge.maximumValue = 200;
        this.gauge.value = 150;
        this.gauge.interval = 20;

        // setting custom appearance of labels
        this.gauge.labelInterval = 20;
        this.gauge.labelExtent = 0.0;

        // setting custom appearance of needle
        this.gauge.isNeedleDraggingEnabled = true;
        this.gauge.needleShape = LinearGraphNeedleShape.Triangle;
        this.gauge.needleBrush = '#79797a';
        this.gauge.needleOutline = '#ffffffff';
        this.gauge.needleStrokeThickness = 1;
        this.gauge.needleOuterExtent = 0.9;
        this.gauge.needleInnerExtent = 0.3;

        // setting custom appearance of major/minor ticks
        this.gauge.minorTickCount = 4;
        this.gauge.minorTickEndExtent = 0.10;
        this.gauge.minorTickStartExtent = 0.20;
        this.gauge.minorTickStrokeThickness = 1;
        this.gauge.tickStartExtent = 0.25;
        this.gauge.tickEndExtent = 0.05;
        this.gauge.tickStrokeThickness = 2;

        // setting custom gauge ranges
        const range1 = new IgcLinearGraphRangeComponent();
        range1.startValue = 100;
        range1.endValue = 125;
        const range2 = new IgcLinearGraphRangeComponent();
        range2.startValue = 125;
        range2.endValue = 150;
        const range3 = new IgcLinearGraphRangeComponent();
        range3.startValue = 150;
        range3.endValue = 175;
        const range4 = new IgcLinearGraphRangeComponent();
        range4.startValue = 175;
        range4.endValue = 200;

        this.gauge.rangeBrushes = ['#0078C8', '#0099FF', '#21A7FF', '#4FB9FF'];
        this.gauge.rangeOutlines = ['#0078C8', '#0099FF', '#21A7FF', '#4FB9FF'];
        this.gauge.ranges.clear();
        this.gauge.ranges.add(range1);
        this.gauge.ranges.add(range2);
        this.gauge.ranges.add(range3);
        this.gauge.ranges.add(range4);

        // setting extent of all gauge ranges
        for (let i = 0; i < this.gauge.ranges.count; i++) {
            const range = this.gauge.ranges.item(i);
            range.innerStartExtent = 0.075;
            range.innerEndExtent = 0.075;
            range.outerStartExtent = 0.65;
            range.outerEndExtent = 0.65;
        }

        // setting extent of gauge scale
        this.gauge.scaleStrokeThickness = 0;
        this.gauge.scaleBrush = '#ffffff';
        this.gauge.scaleOutline = '#dbdbdb';
        this.gauge.scaleInnerExtent = 0.075;
        this.gauge.scaleOuterExtent = 0.85;
        this.gauge.scaleStartExtent = 0.05;
        this.gauge.scaleEndExtent = 0.95;

        // setting appearance of backing fill and outline
        this.gauge.backingBrush = '#ffffff';
        this.gauge.backingOutline = '#d1d1d1';
        this.gauge.backingStrokeThickness = 0;

        this.shouldAnimate = true;
    }

    public onAnimateToGauge3 = (e: any) => {

        if (this.shouldAnimate) {
            this.gauge.transitionDuration = 1000;
        }
        // linear gauge requires settings for these properties:
        this.gauge.minimumValue = 0;
        this.gauge.maximumValue = 100;
        this.gauge.value = 50;
        this.gauge.interval = 10;

        // setting custom appearance of labels
        this.gauge.labelInterval = 10;
        this.gauge.labelExtent = 0.0;

        // setting custom appearance of needle
        this.gauge.isNeedleDraggingEnabled = true;
        this.gauge.needleShape = LinearGraphNeedleShape.Needle;
        this.gauge.needleBrush = '#79797a';
        this.gauge.needleOutline = '#ffffffff';
        this.gauge.needleStrokeThickness = 1;
        this.gauge.needleOuterExtent = 0.9;
        this.gauge.needleInnerExtent = 0.3;

        // setting custom appearance of major/minor ticks
        this.gauge.minorTickCount = 5;
        this.gauge.minorTickEndExtent = 0.10;
        this.gauge.minorTickStartExtent = 0.20;
        this.gauge.minorTickStrokeThickness = 1;
        this.gauge.tickStartExtent = 0.25;
        this.gauge.tickEndExtent = 0.05;
        this.gauge.tickStrokeThickness = 2;

        // setting custom gauge ranges
        const range1 = new IgcLinearGraphRangeComponent();
        range1.startValue = 0;
        range1.endValue = 30;
        const range2 = new IgcLinearGraphRangeComponent();
        range2.startValue = 30;
        range2.endValue = 70;
        const range3 = new IgcLinearGraphRangeComponent();
        range3.startValue = 70;
        range3.endValue = 100;

        this.gauge.rangeBrushes = ['#9FB328', '#438C47', '#3F51B5'];
        this.gauge.rangeOutlines = ['#9FB328', '#438C47', '#3F51B5'];
        this.gauge.ranges.clear();
        this.gauge.ranges.add(range1);
        this.gauge.ranges.add(range2);
        this.gauge.ranges.add(range3);

        // setting extent of all gauge ranges
        for (let i = 0; i < this.gauge.ranges.count; i++) {
            const range = this.gauge.ranges.item(i);
            range.innerStartExtent = 0.075;
            range.innerEndExtent = 0.075;
            range.outerStartExtent = 0.65;
            range.outerEndExtent = 0.65;
        }

        // setting extent of gauge scale
        this.gauge.scaleStrokeThickness = 0;
        this.gauge.scaleBrush = '#ffffff';
        this.gauge.scaleOutline = '#dbdbdb';
        this.gauge.scaleInnerExtent = 0.075;
        this.gauge.scaleOuterExtent = 0.85;
        this.gauge.scaleStartExtent = 0.05;
        this.gauge.scaleEndExtent = 0.95;

        // setting appearance of backing fill and outline
        this.gauge.backingBrush = '#ffffff';
        this.gauge.backingOutline = '#d1d1d1';
        this.gauge.backingStrokeThickness = 0;

        this.shouldAnimate = true;
    }
}

export function initialize() {
  return new LinearGaugeAnimation();
}