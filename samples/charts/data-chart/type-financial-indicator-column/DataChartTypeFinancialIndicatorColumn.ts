import { SampleBase } from "../../../sample-base";

import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryTrendLineModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialPriceSeriesModule } from 'igniteui-webcomponents-charts';

import { IgcAbsoluteVolumeOscillatorIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcAccumulationDistributionIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcAverageDirectionalIndexIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcAverageTrueRangeIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcBollingerBandWidthIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcChaikinVolatilityIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcChaikinOscillatorIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcCommodityChannelIndexIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcDetrendedPriceOscillatorIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcEaseOfMovementIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcFastStochasticOscillatorIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcForceIndexIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcFullStochasticOscillatorIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcMarketFacilitationIndexIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcMassIndexIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcMedianPriceIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcMoneyFlowIndexIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcMovingAverageConvergenceDivergenceIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcNegativeVolumeIndexIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcOnBalanceVolumeIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcPercentagePriceOscillatorIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcPercentageVolumeOscillatorIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcPositiveVolumeIndexIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcPriceVolumeTrendIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcRateOfChangeAndMomentumIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcRelativeStrengthIndexIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcSlowStochasticOscillatorIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcStandardDeviationIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcStochRSIIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcTRIXIndicatorModule } from 'igniteui-webcomponents-charts';
// import { IgcStrategyBasedIndicatorModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IndicatorDisplayType } from 'igniteui-webcomponents-charts';

import { IgcAbsoluteVolumeOscillatorIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcAccumulationDistributionIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcAverageDirectionalIndexIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcAverageTrueRangeIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcBollingerBandWidthIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcChaikinVolatilityIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcChaikinOscillatorIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcCommodityChannelIndexIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcDetrendedPriceOscillatorIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcEaseOfMovementIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcFastStochasticOscillatorIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcForceIndexIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcFullStochasticOscillatorIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcMarketFacilitationIndexIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcMassIndexIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcMedianPriceIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcMoneyFlowIndexIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcMovingAverageConvergenceDivergenceIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcNegativeVolumeIndexIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcOnBalanceVolumeIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcPercentagePriceOscillatorIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcPercentageVolumeOscillatorIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcPositiveVolumeIndexIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcPriceVolumeTrendIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcRateOfChangeAndMomentumIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcRelativeStrengthIndexIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcSlowStochasticOscillatorIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcStandardDeviationIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcStochRSIIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcTRIXIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IgcStrategyBasedIndicatorComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

import { SampleFinancialData } from '../utilities/SampleFinancialData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartCategoryTrendLineModule,
    IgcDataChartInteractivityModule,
    IgcFinancialPriceSeriesModule,
    IgcAbsoluteVolumeOscillatorIndicatorModule,
    IgcAccumulationDistributionIndicatorModule,
    IgcAverageDirectionalIndexIndicatorModule,
    IgcAverageTrueRangeIndicatorModule,
    IgcBollingerBandWidthIndicatorModule,
    IgcChaikinVolatilityIndicatorModule,
    IgcChaikinOscillatorIndicatorModule,
    IgcCommodityChannelIndexIndicatorModule,
    IgcDetrendedPriceOscillatorIndicatorModule,
    IgcEaseOfMovementIndicatorModule,
    IgcFastStochasticOscillatorIndicatorModule,
    IgcForceIndexIndicatorModule,
    IgcFullStochasticOscillatorIndicatorModule,
    IgcMarketFacilitationIndexIndicatorModule,
    IgcMassIndexIndicatorModule,
    IgcMedianPriceIndicatorModule,
    IgcMoneyFlowIndexIndicatorModule,
    IgcMovingAverageConvergenceDivergenceIndicatorModule,
    IgcNegativeVolumeIndexIndicatorModule,
    IgcOnBalanceVolumeIndicatorModule,
    IgcPercentagePriceOscillatorIndicatorModule,
    IgcPercentageVolumeOscillatorIndicatorModule,
    IgcPositiveVolumeIndexIndicatorModule,
    IgcPriceVolumeTrendIndicatorModule,
    IgcRateOfChangeAndMomentumIndicatorModule,
    IgcRelativeStrengthIndexIndicatorModule,
    IgcSlowStochasticOscillatorIndicatorModule,
    IgcStandardDeviationIndicatorModule,
    IgcStochRSIIndicatorModule,
    IgcTRIXIndicatorModule
);

let templateHTML = `
<div class="sample-container">
    <div class="chart" style="height: calc(50% - 20px)">
        <igc-data-chart id="chart1"
            width="100%"
            height="100%"
            is-horizontal-zoom-enabled="true"
            is-vertical-zoom-enabled="true">

            <igc-category-x-axis name="xAxis1" label="Label">
            </igc-category-x-axis>
            <igc-numeric-y-axis name="yAxis1" label-location="OutsideLeft" title="Financial Prices">
            </igc-numeric-y-axis>

            <igc-financial-price-series
                name="series1"
                x-axis-name="xAxis1"
                y-axis-name="yAxis1"
                display-type="Candlestick"
                high-member-path="High"
                low-member-path="Low"
                close-member-path="Close"
                open-member-path="Open"
                volume-member-path="Volume">
            </igc-financial-price-series>
        </igc-data-chart>
    </div>
    <div class="options">
        <span class="option-label"> Indicator Display Type: </span>
        <select id="indicatorSelect">
            <option>AbsoluteVolumeOscillator</option>
            <option>AccumulationDistribution</option>
            <option>AverageDirectionalIndex</option>
            <option>AverageTrueRange</option>
            <option>BollingerBandWidth</option>
            <option>ChaikinVolatility</option>
            <option>ChaikinOscillator</option>
            <option>CommodityChannelIndex</option>
            <option>DetrendedPriceOscillator</option>
            <option>EaseOfMovement</option>
            <option>FastStochasticOscillator</option>
            <option>ForceIndex</option>
            <option>FullStochasticOscillator</option>
            <option>MarketFacilitationIndex</option>
            <option>MassIndex</option>
            <option>MedianPrice</option>
            <option>MoneyFlowIndex</option>
            <option>MovingAverageConvergenceDivergence</option>
            <option>NegativeVolumeIndex</option>
            <option>OnBalanceVolume</option>
            <option>PercentagePriceOscillator</option>
            <option>PercentageVolumeOscillator</option>
            <option>PositiveVolumeIndex</option>
            <option>PriceVolumeTrend</option>
            <option>RateOfChangeAndMomentum</option>
            <option>RelativeStrengthIndex</option>
            <option>SlowStochasticOscillator</option>
            <option>StandardDeviation</option>
            <option>StochRSI</option>
            <option>TRIX</option>
        </select>
    </div>

    <div class="chart" style="height: calc(50% - 20px)">
        <igc-data-chart id="chart2"
            width="100%"
            height="100%"
            is-horizontal-zoom-enabled="true"
            is-vertical-zoom-enabled="true">

            <igc-category-x-axis name="xAxis2" label="Label">
            </igc-category-x-axis>
            <igc-numeric-y-axis name="yAxis2" label-location="OutsideLeft" title="Indicators">
            </igc-numeric-y-axis>
        </igc-data-chart>
    </div>
</div>
`;

export class DataChartTypeFinancialIndicatorColumn extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartTypeFinancialIndicatorColumn");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartTypeFinancialIndicatorColumn); return this;
    }

    private chart1: IgcDataChartComponent;
    private chart2: IgcDataChartComponent;
    private displayType: IndicatorDisplayType = IndicatorDisplayType.Column;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        const dataItems = SampleFinancialData.create();

        this.chart1 = document.getElementById("chart1") as IgcDataChartComponent;
        this.chart1.dataSource = dataItems;

        this.chart2 = document.getElementById("chart2") as IgcDataChartComponent;
        this.chart2.dataSource = dataItems;
        this.switchSeries("AbsoluteVolumeOscillator");

        const indicatorSelect = document.getElementById("indicatorSelect") as HTMLSelectElement;
        indicatorSelect.value = "AbsoluteVolumeOscillator";
        indicatorSelect.addEventListener("change", this.onIndicatorChanged);
    }

    public onIndicatorChanged = (e: any) => {
        const seriesType = e.target.value.toString();
        this.chart2.series.clear();
        this.switchSeries(seriesType);
    }

    public switchSeries(seriesType: any) {
        let indicator: IgcStrategyBasedIndicatorComponent;

        switch (seriesType) {
            case "AbsoluteVolumeOscillator": {
                indicator = new IgcAbsoluteVolumeOscillatorIndicatorComponent();
                break;
            }
            case "AccumulationDistribution": {
                indicator = new IgcAccumulationDistributionIndicatorComponent();
                break;
            }
            case "AverageDirectionalIndex": {
                indicator = new IgcAverageDirectionalIndexIndicatorComponent();
                break;
            }
            case "AverageTrueRange": {
                indicator = new IgcAverageTrueRangeIndicatorComponent();
                break;
            }
            case "BollingerBandWidth": {
                indicator = new IgcBollingerBandWidthIndicatorComponent();
                break;
            }
            case "ChaikinVolatility": {
                indicator = new IgcChaikinVolatilityIndicatorComponent();
                break;
            }
            case "ChaikinOscillator": {
                indicator = new IgcChaikinOscillatorIndicatorComponent();
                break;
            }
            case "CommodityChannelIndex": {
                indicator = new IgcCommodityChannelIndexIndicatorComponent();
                break;
            }
            case "DetrendedPriceOscillator": {
                indicator = new IgcDetrendedPriceOscillatorIndicatorComponent();
                break;
            }
            case "EaseOfMovement": {
                indicator = new IgcEaseOfMovementIndicatorComponent();
                break;
            }
            case "FastStochasticOscillator": {
                indicator = new IgcFastStochasticOscillatorIndicatorComponent();
                break;
            }
            case "ForceIndex": {
                indicator = new IgcForceIndexIndicatorComponent();
                break;
            }
            case "FullStochasticOscillator": {
                indicator = new IgcFullStochasticOscillatorIndicatorComponent();
                break;
            }
            case "MarketFacilitationIndex": {
                indicator = new IgcMarketFacilitationIndexIndicatorComponent();
                break;
            }
            case "MassIndex": {
                indicator = new IgcMassIndexIndicatorComponent();
                break;
            }
            case "MedianPrice": {
                indicator = new IgcMedianPriceIndicatorComponent();
                break;
            }
            case "MoneyFlowIndex": {
                indicator = new IgcMoneyFlowIndexIndicatorComponent();
                break;
            }
            case "MovingAverageConvergenceDivergence": {
                indicator = new IgcMovingAverageConvergenceDivergenceIndicatorComponent();
                break;
            }
            case "NegativeVolumeIndex": {
                indicator = new IgcNegativeVolumeIndexIndicatorComponent();
                break;
            }
            case "OnBalanceVolume": {
                indicator = new IgcOnBalanceVolumeIndicatorComponent();
                break;
            }
            case "PercentagePriceOscillator": {
                indicator = new IgcPercentagePriceOscillatorIndicatorComponent();
                break;
            }
            case "PercentageVolumeOscillator": {
                indicator = new IgcPercentageVolumeOscillatorIndicatorComponent();
                break;
            }
            case "PositiveVolumeIndex": {
                indicator = new IgcPositiveVolumeIndexIndicatorComponent();
                break;
            }
            case "PriceVolumeTrend": {
                indicator = new IgcPriceVolumeTrendIndicatorComponent();
                break;
            }
            case "RateOfChangeAndMomentum": {
                indicator = new IgcRateOfChangeAndMomentumIndicatorComponent();
                break;
            }
            case "RelativeStrengthIndex": {
                indicator = new IgcRelativeStrengthIndexIndicatorComponent();
                break;
            }
            case "SlowStochasticOscillator": {
                indicator = new IgcSlowStochasticOscillatorIndicatorComponent();
                break;
            }
            case "StandardDeviation": {
                indicator = new IgcStandardDeviationIndicatorComponent();
                break;
            }
            case "StochRSI": {
                indicator = new IgcStochRSIIndicatorComponent();
                break;
            }
            case "TRIX": {
                indicator = new IgcTRIXIndicatorComponent();
                break;
            }
        }

        if (indicator !== undefined) {
            indicator.xAxisName = "xAxis2";
            indicator.yAxisName = "yAxis2";
            indicator.displayType = this.displayType;
            indicator.highMemberPath = "High";
            indicator.lowMemberPath = "Low";
            indicator.closeMemberPath = "Close";
            indicator.openMemberPath = "Open";
            indicator.volumeMemberPath = "Volume";
            this.chart2.series.add(indicator);
        }
    }
}