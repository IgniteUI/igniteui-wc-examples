

import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager, IgcProvideCalculatorEventArgs } from 'igniteui-webcomponents-core';
import { DataGridSharedData } from './DataGridSharedData';
import { IgcColumnGroupDescription } from 'igniteui-webcomponents-grids';
import { IgcColumnSummaryDescription } from 'igniteui-webcomponents-grids'
import { SummaryOperand, SummaryCalculator, DefaultSummaryResult, IDataSource, ISummaryResult } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);


export class DataGridColumnSummaries {


    
    
        
    private grid: IgcDataGridComponent;

    constructor() {
        
        this.onSummaryScopeChanging = this.onSummaryScopeChanging.bind(this);
        this.onGroupSummaryDisplayModeChanging = this.onGroupSummaryDisplayModeChanging.bind(this);
    
        
        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getSales();

        document.getElementById('onSummaryScopeChanging').addEventListener('change', this.onSummaryScopeChanging);
        document.getElementById('onGroupSummaryDisplayModeChanging').addEventListener('change', this.onGroupSummaryDisplayModeChanging);

        this.onLoad();
    }

    onSummaryScopeChanging = (e: any) => {
        this.grid.summaryScope = e.target.value;
    }

    onGroupSummaryDisplayModeChanging = (e: any) => {
        this.grid.groupSummaryDisplayMode = e.target.value;
    }

    onLoad() {
        const productGroup = new IgcColumnGroupDescription();
        productGroup.propertyPath = 'ProductName';
        productGroup.displayName = 'ProductName';
        this.grid.groupDescriptions.add(productGroup);

        const productCount = new IgcColumnSummaryDescription();
        productCount.propertyPath = 'ProductName';
        productCount.operand = SummaryOperand.Count;
        this.grid.summaryDescriptions.add(productCount);

        const priceMin = new IgcColumnSummaryDescription();
        priceMin.propertyPath = 'BundlePrice';
        priceMin.operand = SummaryOperand.Min;
        priceMin.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
        this.grid.summaryDescriptions.add(priceMin);

        const priceMax = new IgcColumnSummaryDescription();
        priceMax.propertyPath = 'BundlePrice';
        priceMax.operand = SummaryOperand.Max;
        priceMax.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
        this.grid.summaryDescriptions.add(priceMax);

        const orderSum = new IgcColumnSummaryDescription();
        orderSum.propertyPath = 'OrderItems';
        orderSum.operand = SummaryOperand.Sum;
        this.grid.summaryDescriptions.add(orderSum);

        const orderValueSum = new IgcColumnSummaryDescription();
        orderValueSum.propertyPath = 'OrderValue';
        orderValueSum.operand = SummaryOperand.Sum;
        orderValueSum.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0});
        this.grid.summaryDescriptions.add(orderValueSum);

        const orderValueAvg = new IgcColumnSummaryDescription();
        orderValueAvg.propertyPath = 'OrderValue';
        orderValueAvg.operand = SummaryOperand.Average;
        orderValueAvg.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
        this.grid.summaryDescriptions.add(orderValueAvg);

        const orderDateMin = new IgcColumnSummaryDescription();
        orderDateMin.propertyPath = 'OrderDate';
        orderDateMin.operand = SummaryOperand.Min;
        orderDateMin.calculatorDisplayName = 'First'
        orderDateMin.formatOverride = new Intl.DateTimeFormat('en-EN');
        this.grid.summaryDescriptions.add(orderDateMin);

        const orderDateMax = new IgcColumnSummaryDescription();
        orderDateMax.propertyPath = 'OrderDate';
        orderDateMax.operand = SummaryOperand.Max;
        orderDateMax.calculatorDisplayName = 'Last'
        orderDateMax.formatOverride = new Intl.DateTimeFormat('en-EN');
        this.grid.summaryDescriptions.add(orderDateMax);

        const sum1 = new IgcColumnSummaryDescription();
        sum1.propertyPath = 'Profit';
        sum1.operand = SummaryOperand.Sum;
        sum1.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
        this.grid.summaryDescriptions.add(sum1);

        const avg2 = new IgcColumnSummaryDescription();
        avg2.propertyPath = 'Profit';
        avg2.operand = SummaryOperand.Average;
        avg2.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
        this.grid.summaryDescriptions.add(avg2);

        const countries = new IgcColumnSummaryDescription();
        countries.propertyPath = 'Countries';
        countries.operand = SummaryOperand.Custom;
        countries.provideCalculator = this.onProvideCalculator;
        this.grid.summaryDescriptions.add(countries);
    }

    onProvideCalculator(s: IgcColumnSummaryDescription, e: IgcProvideCalculatorEventArgs) {
        e.calculator = new CustomDomestic();
    }
}

// Custom Calculator - calculates the count for all USA.
class CustomDomestic extends SummaryCalculator {
    get displayName(): string {
        return 'USA';
    }
    public usCountries: number;

    public beginCalculation(a: IDataSource, b: string): void {
        super.beginCalculation(a, b);
        this.usCountries = 0;
    }
    public endCalculation(): ISummaryResult {
       return new DefaultSummaryResult(this.propertyName, SummaryOperand.Custom, this.usCountries)
    }
    public aggregate(a: any): void {
       if (a.Countries === 'USA') {
            this.usCountries++;
       }
    }
}


let sample = new DataGridColumnSummaries();