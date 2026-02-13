import { IgcBulletGraphModule } from 'igniteui-webcomponents-gauges';
import { IgcBulletGraphComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcLinearGraphRangeComponent } from 'igniteui-webcomponents-gauges';

ModuleManager.register(IgcBulletGraphModule);

export class BulletGraphAnimation {

    private gauge: IgcBulletGraphComponent;

    constructor() {

        this.gauge = document.getElementById('gauge') as IgcBulletGraphComponent;

        let button = document.getElementById('animationButton1');
        button!.addEventListener('click', this.onAnimateToGauge1)

        let button2 = document.getElementById('animationButton2');
        button2!.addEventListener('click', this.onAnimateToGauge2)

        let button3 = document.getElementById('animationButton3');
        button3!.addEventListener('click', this.onAnimateToGauge3)

        this.onAnimateToGauge1 = this.onAnimateToGauge1.bind(this);
        this.onAnimateToGauge2 = this.onAnimateToGauge2.bind(this);
        this.onAnimateToGauge3 = this.onAnimateToGauge3.bind(this);
    }

    public onAnimateToGauge3 = (e: any) => {

        this.gauge.transitionDuration = 1000;
        this.gauge.minimumValue = 0;
        this.gauge.maximumValue = 120;
        this.gauge.value = 70;
        this.gauge.interval = 10;

        // setting appearance of labels
        this.gauge.labelInterval = 10;
        this.gauge.labelExtent = 0.02;

        // setting custom appearance of performance bar
        this.gauge.valueInnerExtent = 0.5;
        this.gauge.valueOuterExtent = 0.7;
        this.gauge.valueBrush = '#000000';

        // setting custom appearance of target bar
        this.gauge.targetValueBrush = '#000000';
        this.gauge.targetValueBreadth = 10;
        this.gauge.targetValue = 90;

        // setting appearance of major/minor ticks
        this.gauge.minorTickCount = 5;
        this.gauge.minorTickEndExtent = 0.10;
        this.gauge.minorTickStartExtent = 0.20;
        this.gauge.tickStartExtent = 0.20;
        this.gauge.tickEndExtent = 0.05;
        this.gauge.tickStrokeThickness = 2;

        // setting custom gauge ranges
        const range1 = new IgcLinearGraphRangeComponent();
        range1.startValue = 0;
        range1.endValue = 40;
        const range2 = new IgcLinearGraphRangeComponent();
        range2.startValue = 40;
        range2.endValue = 80;
        const range3 = new IgcLinearGraphRangeComponent();
        range3.startValue = 80;
        range3.endValue = 120;

        this.gauge.rangeBrushes  = [ '#FF9800', '#F96232', '#C62828'];
        this.gauge.rangeOutlines = [ '#FF9800', '#F96232', '#C62828'];
        this.gauge.ranges.clear();
        this.gauge.ranges.add(range1);
        this.gauge.ranges.add(range2);
        this.gauge.ranges.add(range3);

        // setting extent of all gauge ranges
        for (let i = 0; i < this.gauge.ranges.count; i++) {
            const range = this.gauge.ranges.item(i);
            range.innerStartExtent = 0.2;
            range.innerEndExtent = 0.2;
            range.outerStartExtent = 0.95;
            range.outerEndExtent = 0.95;
        }

        // setting extent of gauge scale
        this.gauge.scaleBackgroundThickness = 0.5;
        this.gauge.scaleBackgroundBrush = '#dbdbdb';
        this.gauge.scaleBackgroundOutline = 'gray';
        this.gauge.scaleStartExtent = 0.05;
        this.gauge.scaleEndExtent = 0.95;
        this.gauge.scaleBackgroundThickness = 0;

        // setting appearance of backing fill and outline
        this.gauge.backingBrush = '#f7f7f7';
        this.gauge.backingOutline = '#d1d1d1';
        this.gauge.backingStrokeThickness = 0;
    }

    public onAnimateToGauge2 = (e: any) => {

        this.gauge.transitionDuration = 1000;
        this.gauge.minimumValue = 100;
        this.gauge.maximumValue = 200;
        this.gauge.value = 120;
        this.gauge.interval = 10;

        // setting appearance of labels
        this.gauge.labelInterval = 10;
        this.gauge.labelExtent = 0.02;

        // setting custom appearance of performance bar
        this.gauge.valueInnerExtent = 0.5;
        this.gauge.valueOuterExtent = 0.7;
        this.gauge.valueBrush = '#000000';

        // setting custom appearance of target bar
        this.gauge.targetValueBrush = '#000000';
        this.gauge.targetValueBreadth = 10;
        this.gauge.targetValue = 180;

        // setting appearance of major/minor ticks
        this.gauge.minorTickCount = 5;
        this.gauge.minorTickEndExtent = 0.10;
        this.gauge.minorTickStartExtent = 0.20;
        this.gauge.tickStartExtent = 0.20;
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

        this.gauge.rangeBrushes  = [ '#0078C8', '#0099FF', '#21A7FF', '#4FB9FF'];
        this.gauge.rangeOutlines = [ '#0078C8', '#0099FF', '#21A7FF', '#4FB9FF'];
        this.gauge.ranges.clear();
        this.gauge.ranges.add(range1);
        this.gauge.ranges.add(range2);
        this.gauge.ranges.add(range3);
        this.gauge.ranges.add(range4);

        // setting extent of all gauge ranges
        for (let i = 0; i < this.gauge.ranges.count; i++) {
            const range = this.gauge.ranges.item(i);
            range.innerStartExtent = 0.2;
            range.innerEndExtent = 0.2;
            range.outerStartExtent = 0.95;
            range.outerEndExtent = 0.95;
        }

        // setting extent of gauge scale
        this.gauge.scaleBackgroundThickness = 0.5;
        this.gauge.scaleBackgroundBrush = '#dbdbdb';
        this.gauge.scaleBackgroundOutline = 'gray';
        this.gauge.scaleStartExtent = 0.05;
        this.gauge.scaleEndExtent = 0.95;
        this.gauge.scaleBackgroundThickness = 0;

        // setting appearance of backing fill and outline
        this.gauge.backingBrush = '#f7f7f7';
        this.gauge.backingOutline = '#d1d1d1';
        this.gauge.backingStrokeThickness = 0;
    }

    public onAnimateToGauge1 = (e: any) => {

        this.gauge.transitionDuration = 1000;
        this.gauge.minimumValue = 0;
        this.gauge.maximumValue = 80;
        this.gauge.value = 70;
        this.gauge.interval = 20;

        // setting appearance of labels
        this.gauge.labelInterval = 20;
        this.gauge.labelExtent = 0.02;

        // setting custom appearance of performance bar
        this.gauge.valueInnerExtent = 0.5;
        this.gauge.valueOuterExtent = 0.7;
        this.gauge.valueBrush = '#000000';

        // setting custom appearance of target bar
        this.gauge.targetValueBrush = '#000000';
        this.gauge.targetValueBreadth = 10;
        this.gauge.targetValue = 60;

        // setting appearance of major/minor ticks
        this.gauge.minorTickCount = 5;
        this.gauge.minorTickEndExtent = 0.10;
        this.gauge.minorTickStartExtent = 0.20;
        this.gauge.tickStartExtent = 0.20;
        this.gauge.tickEndExtent = 0.05;
        this.gauge.tickStrokeThickness = 2;

        // setting custom gauge ranges
        const range1 = new IgcLinearGraphRangeComponent();
        range1.startValue = 0;
        range1.endValue = 40;
        const range2 = new IgcLinearGraphRangeComponent();
        range2.startValue = 40;
        range2.endValue = 80;

        this.gauge.rangeBrushes  = [ '#a4bd29', '#F86232' ];
        this.gauge.rangeOutlines = [ '#a4bd29', '#F86232' ];
        this.gauge.ranges.clear();
        this.gauge.ranges.add(range1);
        this.gauge.ranges.add(range2);

        // setting extent of all gauge ranges
        for (let i = 0; i < this.gauge.ranges.count; i++) {
            const range = this.gauge.ranges.item(i);
            range.innerStartExtent = 0.2;
            range.innerEndExtent = 0.2;
            range.outerStartExtent = 0.95;
            range.outerEndExtent = 0.95;
        }

        // setting extent of gauge scale
        this.gauge.scaleBackgroundThickness = 0.5;
        this.gauge.scaleBackgroundBrush = '#dbdbdb';
        this.gauge.scaleBackgroundOutline = 'gray';
        this.gauge.scaleStartExtent = 0.05;
        this.gauge.scaleEndExtent = 0.95;
        this.gauge.scaleBackgroundThickness = 0;

        // setting appearance of backing fill and outline
        this.gauge.backingBrush = '#f7f7f7';
        this.gauge.backingOutline = '#d1d1d1';
        this.gauge.backingStrokeThickness = 0;
    }

}

export function initialize() {
  return new BulletGraphAnimation();
}