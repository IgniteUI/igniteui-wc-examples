import { IgcFunnelChartModule } from 'igniteui-webcomponents-charts';
import { IgcFunnelChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcFunnelChartModule);

export class FunnelChartInverted {

    private chart: IgcFunnelChartComponent;

    constructor() {
        this.onInvertedToggle = this.onInvertedToggle.bind(this);

        this.chart = document.getElementById('chart') as IgcFunnelChartComponent;
        this.chart.dataSource = [
            { MarketShare: 37, Company: "Cooling", Summary: "Cooling 37%" },
            { MarketShare: 25, Company: "Residential", Summary: "Residential 25%"  },
            { MarketShare: 12, Company: "Heating", Summary: "Heating 12%" },
            { MarketShare: 8, Company: "Lighting", Summary: "Lighting 8%" },
            { MarketShare: 18, Company: "Other", Summary: "Other 18%" }
        ];

        this.chart.transitionDuration = 800;
        let Invertbutton = document.getElementById('invertButton') as HTMLInputElement;
        Invertbutton!.addEventListener('click', this.onInvertedToggle);

    }

    public onInvertedToggle = () => {
        this.chart.isInverted = !this.chart.isInverted;  
    }
}

new FunnelChartInverted();
