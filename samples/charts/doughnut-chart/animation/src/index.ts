import { IgcDoughnutChartModule } from 'igniteui-webcomponents-charts';
import { IgcDoughnutChartComponent } from 'igniteui-webcomponents-charts';
import { IgcRingSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcRingSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcSliceClickEventArgs } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDoughnutChartModule,
    IgcRingSeriesModule
);

export class DoughnutChartAnimation {

    private chart: IgcDoughnutChartComponent;
    private chartSeries: IgcRingSeriesComponent;
    private interval: number = -1;
    public isAnimating: boolean = false;

    constructor() {

        this.onAnimationToggle = this.onAnimationToggle.bind(this);
        this.onAnimationClear = this.onAnimationClear.bind(this);

        this.chart = document.getElementById('chart') as IgcDoughnutChartComponent;
        let ringSeries = document.getElementById('ringSeries') as IgcRingSeriesComponent;
        ringSeries.dataSource = this.getData();

        this.chartSeries = ringSeries;

        let Animatebutton = document.getElementById('animateButton') as HTMLInputElement;
        Animatebutton!.addEventListener('click', this.onAnimationToggle);
        this.onChartInit();
    }

    public getData(): any[] {
        return[
            { MarketShare: 30, Company: 'Google',    },
            { MarketShare: 15, Company: 'Microsoft', },
            { MarketShare: 30, Company: 'Apple',     },
            { MarketShare: 15, Company: 'Samsung',   },
            { MarketShare: 10, Company: 'Other',     },
        ];
    }

    public componentWillUnmount() {
        this.onAnimationClear();
    }

    public onChartInit(): void {
       this.onAnimationClear();
       this.onAnimationToggle();
    }

    public onAnimationToggle = () => {
        if (!this.isAnimating) {
            console.log('animation start');
            this.chartSeries.startAngle = 0;
            this.chartSeries.radiusFactor = 0.1;
            this.isAnimating = true;
            this.interval = window.setInterval(() => this.tick(), 15);
        } else {
            console.log('animation stop');
            this.isAnimating = false;
            this.onAnimationClear();
        }
    }

    public onAnimationClear(): void {
        if (this.interval >= 0) {
            console.log('animation clear');
            window.clearInterval(this.interval);
            this.interval = -1;
        }
    }

    public tick(): void {
        if (this.isAnimating) {
            if (this.chartSeries.radiusFactor < 1.0)
                this.chartSeries.radiusFactor += 0.0025;

            if (this.chartSeries.startAngle < 360)
                this.chartSeries.startAngle++;

            if (this.chartSeries.radiusFactor >= 1.0 &&
                this.chartSeries.startAngle >= 360) {
                this.isAnimating = false;
                this.onAnimationClear();
            }
        }
    }

}

new DoughnutChartAnimation();
