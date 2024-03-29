import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { FinancialChartVolumeType } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { StocksUtility } from './StocksUtility';

ModuleManager.register(IgcFinancialChartModule);

export class FinancialChartVolumeTypes {

    private chart: IgcFinancialChartComponent;
    public volumeType: FinancialChartVolumeType = FinancialChartVolumeType.Area;

    constructor() {

        this.chart = document.getElementById('chart') as IgcFinancialChartComponent;
        this.chart.dataSource = this.initData();
        this.chart.volumeType = this.volumeType;

        let volumeTypeSelect = document.getElementById('volumeTypeSelect');
        volumeTypeSelect!.addEventListener('change', this.onVolumeTypeChanged);
    }

    public onVolumeTypeChanged = (e: any) =>{
        const type = e.target.value;
        switch (type) {
            case 'Column':
                this.volumeType = FinancialChartVolumeType.Column;
            break;
            case 'Area':
                this.volumeType = FinancialChartVolumeType.Area;
            break;
            case 'Line':
                this.volumeType = FinancialChartVolumeType.Line;
            break;
            case 'None':
                this.volumeType = FinancialChartVolumeType.None;
            break;
        }
        this.chart.volumeType = this.volumeType;
    }

    initData(): any[] {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const dateEnd = new Date(year, month, 1);
        const dateStart = new Date(year - 1, month, 1);

        return StocksUtility.getStocksBetween(dateStart, dateEnd);
    }

}

new FinancialChartVolumeTypes();
