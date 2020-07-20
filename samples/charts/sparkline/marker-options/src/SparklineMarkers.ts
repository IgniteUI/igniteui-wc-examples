

import { IgcSparklineModule } from 'igniteui-webcomponents-charts';
import { IgcSparklineCoreModule } from 'igniteui-webcomponents-charts';

import { IgcSparklineComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { SparklineSharedData } from './SparklineSharedData';
import { Visibility } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcSparklineCoreModule,
    IgcSparklineModule
);


export class SparklineMarkers {


    
    
        

    private sparkline: IgcSparklineComponent;
    public data: any[];

    constructor() {
        
        this.onMarkerCheckboxChanged = this.onMarkerCheckboxChanged.bind(this);

        this.data = SparklineSharedData.getPaddedDataForMarkers();
    
        

        this.sparkline = document.getElementById('sparkline') as IgcSparklineComponent;
        this.sparkline.dataSource = this.data;

        let High = document.getElementById('High');
        High.addEventListener('change', this.onMarkerCheckboxChanged);

        let Low = document.getElementById('Low');
        Low.addEventListener('change', this.onMarkerCheckboxChanged);

        let First = document.getElementById('First');
        First.addEventListener('change', this.onMarkerCheckboxChanged);

        let Last = document.getElementById('Last');
        Last.addEventListener('change', this.onMarkerCheckboxChanged);

        let Negative = document.getElementById('Negative');
        Negative.addEventListener('change', this.onMarkerCheckboxChanged);

        let All = document.getElementById('All');
        All.addEventListener('change', this.onMarkerCheckboxChanged);
    }

    public onMarkerCheckboxChanged(e: any) {

        const selection = e.target.checked as boolean;

        let visibility: Visibility;
        if (selection) {
            visibility = Visibility.Visible;
        }
        else {
            visibility = Visibility.Collapsed;
        }

        switch (e.target.id) {
            case 'High': {
                this.sparkline.highMarkerVisibility = visibility;
                break;
            }
            case 'Low': {
                this.sparkline.lowMarkerVisibility = visibility;
                break;
            }
            case 'First': {
                this.sparkline.firstMarkerVisibility = visibility;
                break;
            }
            case 'Last': {
                this.sparkline.lastMarkerVisibility = visibility;
                break;
            }
            case 'Negative': {
                this.sparkline.negativeMarkerVisibility = visibility;
                break;
            }
            case 'All': {
                this.sparkline.markerVisibility = visibility;
                break;
            }
        }
    }

}

let sample = new SparklineMarkers();