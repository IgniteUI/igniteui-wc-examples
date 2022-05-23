import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager} from 'igniteui-webcomponents-core';
import { DataGridSharedData } from './DataGridSharedData';
import { IgcColumnGroupDescription } from 'igniteui-webcomponents-grids';
import { IgcColumnSummaryDescription } from 'igniteui-webcomponents-grids';
import { IgcComboBoxColumnComponent } from 'igniteui-webcomponents-grids';
import { SummaryOperand } from 'igniteui-webcomponents-core';
import { Localization } from 'igniteui-webcomponents-core';
import { DataGridLocalizationJa } from './DataGridLocaleJa';
import { DataGridSummariesLocalizationJa } from './DataGridLocaleJa';
import { DataGridDateTimeColumnLocalizationJa } from './DataGridLocaleJa';
import { DataGridMultiColumnComboBoxLocalizationJa } from './DataGridLocaleJa';

ModuleManager.register(
    IgcDataGridModule,
    IgcGridColumnOptionsModule
);

export class DataGridLocalization {

    private grid: IgcDataGridComponent;
    public data: any[];
    public countryList: any[] = [];
    public countryLookup = new Map<string, any>();

    constructor() {

        // If your browser language is JA then you should use "ja" after eg."DataGrid-ja" etc.  The grid will automatically look for the correct
        // suffix based on what the browser language is. This means you could force the grid to use the Japanese resources for whatever
        // the browser culture is by registering it for each language.
        
        //Localization.register("DataGrid-ja", new CustomDataGridLocaleJa());

        //Register custom strings for column options in the DataGrid
        Localization.register("DataGrid-en", new DataGridLocalizationJa());

        //Register custom strings for summary cells in the DataGrid
        Localization.register("DataVisualization-en", new DataGridSummariesLocalizationJa());

        //Register custom strings for date-time column in the DataGrid
        Localization.register("Calendar-en", new DataGridDateTimeColumnLocalizationJa());

        //Register custom strings for combo-column in the DataGrid
        Localization.register("MultiColumnComboBox-en", new DataGridMultiColumnComboBoxLocalizationJa());

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.data = DataGridSharedData.getSales();

        this.grid.dataSource = this.data;

        this.onLoad();
    }

    onLoad() {

         // iterate all sales and generate a list of countries
         this.data.forEach(sales => {
            if (!this.countryLookup.has(sales.Countries)) {
                this.countryLookup.set(sales.Countries, sales);
                this.countryList.push(sales);
            }
        });

        const cityComboColumn = document.getElementById('countryColumn') as IgcComboBoxColumnComponent;
        if (cityComboColumn)
            cityComboColumn.dataSource = this.countryList;
            cityComboColumn.textField = "Countries";
            cityComboColumn.valueField = "Countries";

        const productGroup = new IgcColumnGroupDescription();
        productGroup.field = 'ProductName';
        productGroup.displayName = 'ProductName';
        this.grid.groupDescriptions.add(productGroup);

        const productCount = new IgcColumnSummaryDescription();
        productCount.field = 'ProductName';
        productCount.operand = SummaryOperand.Count;
        this.grid.summaryDescriptions.add(productCount);

        const priceMin = new IgcColumnSummaryDescription();
        priceMin.field = 'BundlePrice';
        priceMin.operand = SummaryOperand.Min;
        priceMin.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
        this.grid.summaryDescriptions.add(priceMin);

        const priceMax = new IgcColumnSummaryDescription();
        priceMax.field = 'BundlePrice';
        priceMax.operand = SummaryOperand.Max;
        priceMax.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
        this.grid.summaryDescriptions.add(priceMax);

        const orderSum = new IgcColumnSummaryDescription();
        orderSum.field = 'OrderItems';
        orderSum.operand = SummaryOperand.Sum;
        this.grid.summaryDescriptions.add(orderSum);

        const orderValueSum = new IgcColumnSummaryDescription();
        orderValueSum.field = 'OrderValue';
        orderValueSum.operand = SummaryOperand.Sum;
        orderValueSum.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0});
        this.grid.summaryDescriptions.add(orderValueSum);

        const orderValueAvg = new IgcColumnSummaryDescription();
        orderValueAvg.field = 'OrderValue';
        orderValueAvg.operand = SummaryOperand.Average;
        orderValueAvg.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
        this.grid.summaryDescriptions.add(orderValueAvg);

        const sum1 = new IgcColumnSummaryDescription();
        sum1.field = 'Profit';
        sum1.operand = SummaryOperand.Sum;
        sum1.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
        this.grid.summaryDescriptions.add(sum1);

        const avg2 = new IgcColumnSummaryDescription();
        avg2.field = 'Profit';
        avg2.operand = SummaryOperand.Average;
        avg2.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
        this.grid.summaryDescriptions.add(avg2);
    }
}

new DataGridLocalization();
