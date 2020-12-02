import '@webcomponents/custom-elements/custom-elements.min';
import '@webcomponents/custom-elements/src/native-shim.js';
// TODO use LiveFinancialData.ts from React browser
import { LiveFinancialData } from './LiveFinancialData';
import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { IgcNumericColumnComponent } from 'igniteui-webcomponents-grids';
import { IgcTextColumnComponent } from 'igniteui-webcomponents-grids';
import { IgcDateTimeColumnComponent } from 'igniteui-webcomponents-grids';
import { IgcTemplateColumnComponent } from 'igniteui-webcomponents-grids';
import { IgcColumnGroupDescription } from 'igniteui-webcomponents-grids';
import { ListSortDirection } from 'igniteui-webcomponents-core';
import { HeaderClickAction } from 'igniteui-webcomponents-grids';
import { IgcCellStyleRequestedEventArgs } from 'igniteui-webcomponents-grids';
import { IgcTemplateCellUpdatingEventArgs } from 'igniteui-webcomponents-grids';
import { IgcTemplateCellInfo } from 'igniteui-webcomponents-grids';
import { IgcDataBindingEventArgs } from 'igniteui-webcomponents-grids';
import { DataGridCellLayoutPanel } from 'igniteui-webcomponents-grids';
import { DataGridPresenterManager } from 'igniteui-webcomponents-grids';
import { IgcColumnComponent } from 'igniteui-webcomponents-grids';
import '@material/mwc-button';
import '@material/mwc-switch';
import '@material/mwc-slider';
import '@material/mwc-dialog';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcColumnSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcCategoryXAxisComponent } from 'igniteui-webcomponents-charts';
import { IgcNumericYAxisComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { IgcItemToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { IgcTextHeaderComponent } from 'igniteui-webcomponents-grids';
import { FilterFactory } from 'igniteui-webcomponents-core';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCategoryModule,
    IgcDataGridModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule
);

// TODO open chart on clicking a cell in the Chart column
// <igc-template-column id='chartTemplateColumn' property-path='Chart' width='60'>
// </igc-template-column>
// <igc-template-column id='gridTemplateColumn' property-path='Grid' width='80'>
// </igc-template-column>

export class DataGridBindingLiveData {

    private grid: IgcDataGridComponent;
    private good_color = '#4EB862';
    private bad_color = '#FF134A';
    private lastDataUpdate: Date = new Date();
    private badBorder = '4px solid #FF134A';
    private goodBorder = '4px solid #4EB862';
    private ticking: boolean = false;
    private isAllUpdate = false;

    private liveButton: any;
    private liveAllButton: any;
    private stopButton: any;
    private chartButton: any;
    private frequencySpan: any;
    private volumeSpan: any;
    private chart: IgcDataChartComponent;
    private financialData: LiveFinancialData;

    private state = {
        data: LiveFinancialData.generateData(1000),
        stopDisabled: true,
        liveDisabled: false,
        allDisabled: false,
        frequency: 100,
        volume: 1000,
        canvasChecked: false,
        groupingChecked: true,
        heatChecked: false,
        chartOpen: false,
        priceByCountry: [],
        hiddenColumns: ['ID'],
        allColumns: [],
    };

    constructor() {

        this.financialData = new LiveFinancialData();

        this.onPriceStyleKey = this.onPriceStyleKey.bind(this);
        this.onPriceCellUpdating = this.onPriceCellUpdating.bind(this);
        this.onPriceDataBound = this.onPriceDataBound.bind(this);

        this.onPriceAmountStyleKey = this.onPriceAmountStyleKey.bind(this);
        this.onPriceAmountCellUpdating = this.onPriceAmountCellUpdating.bind(this);

        this.onPricePercentStyleKey = this.onPricePercentStyleKey.bind(this);
        this.onPricePercentCellUpdating = this.onPricePercentCellUpdating.bind(this);

        this.onChartStyleKey = this.onChartStyleKey.bind(this);
        this.onChartCellUpdating = this.onChartCellUpdating.bind(this);

        this.onGridStyleKey = this.onGridStyleKey.bind(this);
        this.onGridCellUpdating = this.onGridCellUpdating.bind(this);

        this.onLiveClicked = this.onLiveClicked.bind(this);
        this.onAllClicked = this.onAllClicked.bind(this);
        this.onStopClicked = this.onStopClicked.bind(this);
        this.onChartClicked = this.onChartClicked.bind(this);
        this.onFrequencyChange = this.onFrequencyChange.bind(this);
        this.onVolumeChange = this.onVolumeChange.bind(this);
        this.onCanvasModeChanged = this.onCanvasModeChanged.bind(this);
        this.onGroupingChanged = this.onGroupingChanged.bind(this);
        this.onHeatChanged = this.onHeatChanged.bind(this);

        this.updateButtonStates = this.updateButtonStates.bind(this);
        this.updateDialogState = this.updateDialogState.bind(this);
        this.updatePriceByCountry = this.updatePriceByCountry.bind(this);
        this.updateSpanStates = this.updateSpanStates.bind(this);

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = this.state.data;

        let priceTemplate = document.getElementById('priceTemplateColumn') as IgcTemplateColumnComponent;
        priceTemplate.cellStyleKeyRequested = this.onPriceStyleKey;
        priceTemplate.cellUpdating = this.onPriceCellUpdating;
        priceTemplate.dataBound = this.onPriceDataBound;

        let changeTemplate = document.getElementById('changeTemplateColumn') as IgcTemplateColumnComponent;
        changeTemplate.cellStyleKeyRequested = this.onPriceAmountStyleKey;
        changeTemplate.cellUpdating = this.onPriceAmountCellUpdating;

        let changePercentTemplate = document.getElementById('changePercentTemplateColumn') as IgcTemplateColumnComponent;
        changePercentTemplate.cellStyleKeyRequested = this.onPricePercentStyleKey;
        changePercentTemplate.cellUpdating = this.onPricePercentCellUpdating;
        // TODO set property settings (if any) in code-behind:

        let chartTemplate = document.getElementById('chartTemplateColumn') as IgcTemplateColumnComponent;
        chartTemplate.cellStyleKeyRequested = this.onChartStyleKey;
        chartTemplate.cellUpdating = this.onChartCellUpdating;

        let gridTemplate = document.getElementById('chartTemplateColumn') as IgcTemplateColumnComponent;
        gridTemplate.cellStyleKeyRequested = this.onGridStyleKey;
        gridTemplate.cellUpdating = this.onGridCellUpdating;

        this.liveButton = document.getElementById('liveButton');
        this.liveButton.onclick = () => {
            this.onLiveClicked();
        };

        this.liveAllButton = document.getElementById('liveAllButton');
        this.liveAllButton.onclick = () => {
            this.onAllClicked();
        };

        this.stopButton = document.getElementById('stopButton');
        this.stopButton.onclick = () => {
            this.onStopClicked();
        };

        let self = this;
        (document.getElementById('fSlider') as any)!.addEventListener('MDCSlider:change', function (ev: any, val: any) {
            self.onFrequencyChange(ev, val);
        });
        (document.getElementById('fSlider') as any)!.addEventListener('MDCSlider:input', function (ev: any, val: any) {
            self.onFrequencyChange(ev, val);
        });

        (document.getElementById('vSlider') as any)!.addEventListener('MDCSlider:change', function (ev: any, val: any) {
            self.onVolumeChange(ev, val);
        });
        (document.getElementById('vSlider') as any)!.addEventListener('MDCSlider:input', function (ev: any, val: any) {
            self.onVolumeChange(ev, val)
        });

        (document.getElementById('groupingSwitch') as any)!.addEventListener('change', function (ev: any, val: any) {
            self.onGroupingChanged(ev);
        });
        (document.getElementById('heatSwitch') as any)!.addEventListener('change', function (ev: any, val: any) {
            self.onHeatChanged(ev);
        });

        this.frequencySpan = document.getElementById('frequencySpan');
        this.volumeSpan = document.getElementById('volumeSpan');

        this.addGroups();
        this.updateSpanStates();
    }

    removeGroups() {
        this.grid.groupDescriptions.clear();
        this.grid.flush();
    }

    addGroups() {
        let g = new IgcColumnGroupDescription();
        g.field = 'Category';
        g.sortDirection = ListSortDirection.Descending;
        this.grid.groupDescriptions.add(g);

        g = new IgcColumnGroupDescription();
        g.field = 'Contract';
        g.sortDirection = ListSortDirection.Descending;
        this.grid.groupDescriptions.add(g);

        g = new IgcColumnGroupDescription();
        g.field = 'Region';
        g.sortDirection = ListSortDirection.Descending;
        this.grid.groupDescriptions.add(g);
    }

    tick() {

        if (!this.ticking) {
            return;
        }
        if (!this.grid) {
            window.setTimeout(() => this.tick(), 16);
            return;
        }

        let sortedBySales = false;
        // foreach (let item in this.grid.SortDescriptions)
        // {
        // 	if (item.PropertyName === 'YearToDateSales')
        // 	{
        // 		sortedBySales = true;
        // 	}
        // }

        let toChange = Math.round(this.state.volume / 10);
        let toChangeIndexes = {};
        let stillAnimating = false;
        for (let i = 0; i < this.state.data.length; i++) {
            let item = this.state.data[i];
            if (item.PriceHeat !== 0) {
                stillAnimating = true;
            }
        }

        let now = new Date();
        let intervalElapsed = false;
        if ((+now - + this.lastDataUpdate) > this.state.frequency) {
            intervalElapsed = true;
        }

        let useClear = this.isAllUpdate;
        let updateAll = this.isAllUpdate;

        if (updateAll) {
            toChange = this.state.data.length;
        }

        let sortingByPrice = false;
        for (let i = 0; i < this.grid.sortDescriptions.count; i++) {
            if (this.grid.sortDescriptions.item(i).field === 'Price' ||
                this.grid.sortDescriptions.item(i).field.indexOf('Change') >= 0) {
                sortingByPrice = true;
            }
        }

        let changing = false;
        if (intervalElapsed) {

            this.lastDataUpdate = new Date();
            for (let i = 0; i < toChange; i++) {
                let index = Math.round(Math.random() * this.state.data.length - 1);
                while (toChangeIndexes[index.toString()] !== undefined) {
                    index = Math.round(Math.random() * this.state.data.length - 1);
                }
                toChangeIndexes[index.toString()] = true;
                changing = true;
            }
        }

        for (let i = 0; i < this.state.data.length; i++) {
            let item = this.state.data[i];
            if (toChangeIndexes[i.toString()] !== undefined) {
                if (sortingByPrice && !useClear) {

                    this.grid.notifyRemoveItem(i, item);
                    LiveFinancialData.randomizeDataValues(item);
                    this.grid.notifyInsertItem(i, item);
                } else {
                    LiveFinancialData.randomizeDataValues(item);
                }

                if (item.Change > 0) {
                    // item.YearToDateSales += Math.round(Math.random() * 4.0);
                    item.PriceHeat = 1;
                } else {
                    item.PriceHeat = -1;
                }
            }
            else {
                if (item.PriceHeat > 0) {
                    item.PriceHeat -= .06;
                    if (item.PriceHeat < 0) {
                        item.PriceHeat = 0;
                    }
                }
                if (item.PriceHeat < 0) {
                    item.PriceHeat += .06;
                    if (item.PriceHeat > 0) {
                        item.PriceHeat = 0;
                    }
                }
            }
        }

        if (sortingByPrice && useClear && intervalElapsed) {
            this.grid.actualDataSource.queueAutoRefresh();
        }

        // if (!sortingByPrice) {
        // if (!useClear) {
        if (!sortingByPrice || !intervalElapsed) {
            this.grid.invalidateVisibleRows();
        }
        // }
        // }
        // this.this.grid.invalidateVisibleRows();
        // actualDataSource.queueAutoRefresh();

        if (intervalElapsed && this.state.chartOpen) {
            this.updatePriceByCountry();
            this.chart.notifyClearItems(this.state.priceByCountry);
        }

        window.setTimeout(() => this.tick(), 16);
    }

    updatePriceByCountry() {
        let shouldPopulate = false;
        if (this.state.priceByCountry.length === 0) {
            shouldPopulate = true;
        }

        let priceByCountry = new Map<string, number>();
        let countryNames = [];

        for (let i = 0; i < this.state.data.length; i++) {
            const currItem = this.state.data[i];
            const currCountry = currItem.Country;
            if (!currCountry) {
                continue;
            }
            if (!priceByCountry.has(currCountry)) {
                priceByCountry.set(currCountry, 0);
                if (shouldPopulate) {

                    countryNames.push(currCountry);
                }
            }
            let currVal = priceByCountry.get(currCountry);
            if (currVal === undefined)
                currVal = 0;

            currVal += currItem.Price;
            currVal = Math.round(currVal * 100.0) / 100.0;
            priceByCountry.set(currCountry, currVal);
        }

        if (shouldPopulate) {
            countryNames = countryNames.sort();
            for (let i = 0; i < countryNames.length; i++) {
                this.state.priceByCountry.push({
                    Country: countryNames[i],
                    Price: priceByCountry.get(countryNames[i])
                })
            }
        } else {
            for (let i = 0; i < this.state.priceByCountry.length; i++) {
                this.state.priceByCountry[i].Price = priceByCountry.get(this.state.priceByCountry[i].Country);
            }
        }
    }

    onPriceStyleKey(col: IgcColumnComponent, args: IgcCellStyleRequestedEventArgs) {
        let row: any | null = null;
        if (this.grid && this.grid.actualDataSource) {
            row = this.grid.actualDataSource.getItemAtIndex(args.rowNumber);
        } else {
            row = this.state.data[args.rowNumber];
        }
        if (row.Change >= 0) {
            args.styleKey = 'priceShiftUp';
        } else {
            args.styleKey = 'priceShiftDown';
        }
    }

    onPriceCellUpdating(grid: IgcTemplateColumnComponent, args: IgcTemplateCellUpdatingEventArgs) {
        let row = args.cellInfo.rowItem;
        let priceShiftUp = row.Change >= 0;
        let templ = args.cellInfo as IgcTemplateCellInfo;

        if (args.isCanvasBased) {
            let resized = args.ensureCorrectSize();
            if (resized || args.cellInfo.isContentDirty) {
                args.renderStandardBackground();

                let context: CanvasRenderingContext2D = args.context;

                let iconText = 'trending_up';
                let iconColor = this.good_color;

                let scale = window.devicePixelRatio;
                if (scale !== 1.0) {
                    context.save();
                    context.scale(scale, scale);
                }

                if (priceShiftUp) {
                    iconText = 'trending_up';
                    iconColor = this.good_color;
                } else {
                    iconText = 'trending_down';
                    iconColor = this.bad_color;
                }

                // context.fillStyle = 'blue';
                // context.fillRect(0,0,args.cellInfo.width,args.cellInfo.height);
                let txt = '$' + (+templ.value).toFixed(2);
                context.font = '13px Verdana';
                let width = context.measureText(txt).width;

                context.font = '13px "Material Icons"';
                let iconWidth = context.measureText(iconText).width;

                let totalWidth = width + iconWidth;

                context.font = '13px Verdana';
                context.fillStyle = iconColor;
                context.textBaseline = 'top';
                context.fillText(txt, templ.width - (totalWidth + 5), (templ.height / 2.0) - 7);

                context.font = '13px "Material Icons"';
                context.fillStyle = iconColor;
                context.textBaseline = 'top';
                context.fillText(iconText, templ.width - (iconWidth + 5), (templ.height / 2.0) - 7);

                if (scale !== 1.0) {
                    context.restore();
                }
            }
            return;
        }

        let content = args.content as HTMLDivElement;
        let sp: HTMLSpanElement;
        // let icon: HTMLSpanElement = null;

        if (content.childElementCount > 0) {
            sp = content.children[0] as HTMLSpanElement;
            // icon = content.children[1] as HTMLSpanElement;
        } else {
            content.style.textAlign = 'right';
            sp = document.createElement('span');
            // icon = document.createElement('span');
            sp.style.font = '13px Verdana';
            sp.style.verticalAlign = 'center';
            content.appendChild(sp);
            // content.appendChild(icon);
            // icon.style.fontFamily = 'Material Icons';
            // icon.style.fontSize = '13px';
            // icon.style.fontFeatureSettings = 'liga';
            // icon.style.verticalAlign = 'center';
        }

        sp.textContent = '$' + (+templ.value).toFixed(2);

        if ((sp as any).__isUp === undefined ||
            (sp as any).__isUp !== priceShiftUp) {
            (sp as any).__isUp = priceShiftUp;
            if (priceShiftUp) {
                // icon.textContent = 'trending_up';
                // icon.style.color = this.good_color;
                sp.style.color = this.good_color;
            } else {
                // icon.textContent = 'trending_down';
                // icon.style.color = this.bad_color;
                sp.style.color = this.bad_color;
            }
        }
    }

    onPricePercentStyleKey(grid: IgcColumnComponent, args: IgcCellStyleRequestedEventArgs) {
        if (args.resolvedValue >= 0) {
            args.styleKey = 'pricePercentUp';
        } else {
            args.styleKey = 'pricePercentDown';
        }
    }

    onPricePercentCellUpdating(grid: IgcTemplateColumnComponent, args: IgcTemplateCellUpdatingEventArgs) {
        let templ = args.cellInfo as IgcTemplateCellInfo;
        let priceShiftUp = templ.value >= 0;

        if (args.isCanvasBased) {
            let resized = args.ensureCorrectSize();
            if (resized || args.cellInfo.isContentDirty) {
                args.renderStandardBackground();

                let context: CanvasRenderingContext2D = args.context;

                let iconColor = this.good_color;

                let scale = window.devicePixelRatio;
                if (scale !== 1.0) {
                    context.save();
                    context.scale(scale, scale);
                }

                if (priceShiftUp) {
                    iconColor = this.good_color;
                } else {
                    iconColor = this.bad_color;
                }

                // context.fillStyle = 'blue';
                // context.fillRect(0,0,args.cellInfo.width,args.cellInfo.height);
                let txt = (+templ.value).toFixed(2) + '%';
                context.font = '13px Verdana';
                let width = context.measureText(txt).width;

                let totalWidth = width + 4;

                context.font = '13px Verdana';
                context.fillStyle = templ.textColor;
                context.textBaseline = 'top';
                context.fillText(txt, templ.width - (totalWidth + 10), (templ.height / 2.0) - 7);

                context.font = '13px "Material Icons"';
                context.fillStyle = iconColor;
                context.fillRect(templ.width - (5 + 4), (templ.height / 2.0) - 8, 4, 16);

                if (scale !== 1.0) {
                    context.restore();
                }
            }

            return;
        }

        let content = args.content as HTMLDivElement;
        let sp: HTMLSpanElement;

        if (content.childElementCount > 0) {
            sp = content.children[0] as HTMLSpanElement;
        } else {
            content.style.textAlign = 'right';
            sp = document.createElement('span');
            sp.style.font = '13px Verdana';
            sp.style.verticalAlign = 'center';
            content.appendChild(sp);
        }

        sp.textContent = (+templ.value).toFixed(2) + '%';
        if ((sp as any).__isUp === undefined ||
            (sp as any).__isUp !== priceShiftUp) {
            (sp as any).__isUp = priceShiftUp;
            if (priceShiftUp) {
                sp.style.paddingRight = '5px';
                sp.style.borderRight = this.goodBorder;
                // sp.style.color = this.good_color;
            } else {
                sp.style.paddingRight = '5px';
                sp.style.borderRight = this.badBorder;
                // sp.style.color = this.bad_color;
            }
        }
    }

    onPriceAmountStyleKey(grid: IgcColumnComponent, args: IgcCellStyleRequestedEventArgs) {
        if (args.resolvedValue >= 0) {
            args.styleKey = 'priceAmountUp';
        } else {
            args.styleKey = 'priceAmountDown';
        }
    }

    onPriceAmountCellUpdating(grid: IgcTemplateColumnComponent, args: IgcTemplateCellUpdatingEventArgs) {
        let templ = args.cellInfo as IgcTemplateCellInfo;
        let priceShiftUp = templ.value >= 0;

        if (args.isCanvasBased) {
            let resized = args.ensureCorrectSize();
            if (resized || args.cellInfo.isContentDirty) {
                args.renderStandardBackground();

                let context: CanvasRenderingContext2D = args.context;

                let iconColor = this.good_color;

                let scale = window.devicePixelRatio;
                if (scale !== 1.0) {
                    context.save();
                    context.scale(scale, scale);
                }

                if (priceShiftUp) {
                    iconColor = this.good_color;
                } else {
                    iconColor = this.bad_color;
                }

                // context.fillStyle = 'blue';
                // context.fillRect(0,0,args.cellInfo.width,args.cellInfo.height);
                let txt = (+templ.value).toFixed(2);
                context.font = '13px Verdana';
                let width = context.measureText(txt).width;

                let totalWidth = width + 4;

                context.font = '13px Verdana';
                context.fillStyle = templ.textColor;
                context.textBaseline = 'top';
                context.fillText(txt, templ.width - (totalWidth + 10), (templ.height / 2.0) - 7);

                context.font = '13px "Material Icons"';
                context.fillStyle = iconColor;
                context.fillRect(templ.width - (5 + 4), (templ.height / 2.0) - 8, 4, 16);

                if (scale !== 1.0) {
                    context.restore();
                }
            }

            return;
        }

        let content = args.content as HTMLDivElement;
        let sp: HTMLSpanElement;

        if (content.childElementCount > 0) {
            sp = content.children[0] as HTMLSpanElement;
        } else {
            content.style.textAlign = 'right';
            sp = document.createElement('span');
            sp.style.font = '13px Verdana';
            sp.style.verticalAlign = 'center';
            content.appendChild(sp);
        }

        sp.textContent = (+templ.value).toFixed(2);

        if ((sp as any).__isUp === undefined ||
            (sp as any).__isUp !== priceShiftUp) {
            (sp as any).__isUp = priceShiftUp;
            if (priceShiftUp) {
                sp.style.paddingRight = '5px';
                sp.style.borderRight = this.goodBorder;
                // sp.style.color = this.good_color;
            } else {
                sp.style.paddingRight = '5px';
                sp.style.borderRight = this.badBorder;
                // sp.style.color = this.bad_color;
            }
        }
    }

    onChartStyleKey(grid: IgcColumnComponent, args: IgcCellStyleRequestedEventArgs) {
        args.styleKey = 'chart';
    }

    onChartCellUpdating(grid: IgcTemplateColumnComponent, args: IgcTemplateCellUpdatingEventArgs) {
        if (args.isCanvasBased) {
            return;
        }
        let templ = args.cellInfo as IgcTemplateCellInfo;

        let content = args.content as HTMLDivElement;
        let icon: HTMLSpanElement;

        if (content.childElementCount > 0) {
            icon = content.children[0] as HTMLSpanElement;
            icon.onclick = (e) => {
                console.log('chart clicked!!')
                e.stopPropagation();
            }
        } else {
            icon = document.createElement('span');
            content.appendChild(icon);
            icon.style.fontFamily = 'Material Icons';
            icon.style.fontSize = '13px';
            icon.style.fontFeatureSettings = 'liga';
            icon.style.verticalAlign = 'center';
            icon.textContent = 'insert_chart_outlined';
        }
    }

    onGridStyleKey(grid: IgcColumnComponent, args: IgcCellStyleRequestedEventArgs) {
        args.styleKey = 'grid';
    }

    onGridCellUpdating(grid: IgcTemplateColumnComponent, args: IgcTemplateCellUpdatingEventArgs) {
        if (args.isCanvasBased) {
            return;
        }
        let templ = args.cellInfo as IgcTemplateCellInfo;

        let content = args.content as HTMLDivElement;
        let icon: HTMLSpanElement;

        if (content.childElementCount > 0) {
            icon = content.children[0] as HTMLSpanElement;
            icon.onclick = (e) => {
                console.log('grid clicked!!')
                e.stopPropagation();
            }
        } else {
            icon = document.createElement('span');
            content.appendChild(icon);
            icon.style.fontFamily = 'Material Icons';
            icon.style.fontSize = '13px';
            icon.style.fontFeatureSettings = 'liga';
            icon.style.verticalAlign = 'center';
            icon.textContent = 'table_chart';
        }
    }

    startTicking() {
        if (!this.ticking) {
            this.ticking = true;
            window.setTimeout(() => this.tick(), 16);
        }
    }

    stopTicking() {
        if (this.ticking) {
            this.ticking = false;
        }
    }

    updateButtonStates() {
        this.liveButton.disabled = this.state.liveDisabled;
        this.liveAllButton.disabled = this.state.allDisabled;
        this.stopButton.disabled = this.state.stopDisabled;
    }

    updateSpanStates() {
        this.frequencySpan.innerText = 'Frequency: ' + this.state.frequency.toString() + 'ms';
        this.volumeSpan.innerText = 'Volume: ' + this.state.volume.toString();
    }

    updateDialogState() {
    }

    onLiveClicked() {
        this.isAllUpdate = false;
        if (!this.ticking) {
            this.startTicking();

            this.state.liveDisabled = true;
            this.state.allDisabled = true;
            this.state.stopDisabled = false;
            this.updateButtonStates();
        }
    }

    onAllClicked() {
        this.isAllUpdate = true;
        if (!this.ticking) {
            this.startTicking();

            this.state.liveDisabled = true;
            this.state.allDisabled = true;
            this.state.stopDisabled = false;
            this.updateButtonStates();
        }
    }

    onStopClicked() {
        this.stopTicking();

        this.state.liveDisabled = false;
        this.state.allDisabled = false;
        this.state.stopDisabled = true;
        this.updateButtonStates();
    }

    onChartClicked() {
        this.updatePriceByCountry();
        this.state.chartOpen = true;
        this.updateDialogState();
    }

    onFrequencyChange(event: any, value: any) {
        this.state.frequency = +event.target.value;
        this.updateSpanStates();
    }

    onVolumeChange(event: any, value: any) {
        this.state.volume = +event.target.value;
        this.state.data = LiveFinancialData.generateData(+event.target.value);
        this.grid.dataSource = this.state.data;
        this.updateSpanStates();
    }

    onCanvasModeChanged(event: any) {
        this.state.canvasChecked = event.target.checked;
        // this.createGrid(this.state.canvasChecked);
    }

    onHeatChanged(event: any) {
        this.state.heatChecked = event.target.checked;
    }

    onGroupingChanged(event: any) {
        this.state.groupingChecked = event.target.checked;

        if (event.target.checked) {
            this.addGroups();
        } else {
            this.removeGroups();
        }
    }

    onPriceDataBound(sender: any, args: IgcDataBindingEventArgs) {
        let item: any = args.cellInfo.rowItem;
        if (item !== null) {
            if (item.PriceHeat > 0 && this.state.heatChecked) {
                let p = +item.PriceHeat;
                let toA = 1.0;
                let fromA = 1.0;
                let toR = 0.0;
                let fromR = 1.0;
                let toG = 1.0;
                let fromG = 1.0;
                let toB = 0.0;
                let fromB = 1.0;

                let a = fromA + (toA - fromA) * p;
                let r = fromR + (toR - fromR) * p;
                let g = fromG + (toG - fromG) * p;
                let b = fromB + (toB - fromB) * p;

                let colorString = 'rgba(' + Math.round(r * 255.0) + ',' + Math.round(g * 255.0) + ',' + Math.round(b * 255.0) + ',' + a + ')';

                args.cellInfo.background = colorString;
            }
            else if (item.PriceHeat < 0 && this.state.heatChecked) {
                let p = +item.PriceHeat * -1.0;
                let toA = 1.0;
                let fromA = 1.0;
                let toR = 1.0;
                let fromR = 1.0;
                let toG = 0.0;
                let fromG = 1.0;
                let toB = 0.0;
                let fromB = 1.0;

                let a = fromA + (toA - fromA) * p;
                let r = fromR + (toR - fromR) * p;
                let g = fromG + (toG - fromG) * p;
                let b = fromB + (toB - fromB) * p;

                let colorString = 'rgba(' + Math.round(r * 255.0) + ',' + Math.round(g * 255.0) + ',' + Math.round(b * 255.0) + ',' + a + ')';

                args.cellInfo.background = colorString;
            }
            else {
                let colorString = 'white';
                args.cellInfo.background = colorString;
            }
        }
    }

    handleChartClose() {
        this.state.chartOpen = false;
        this.updateDialogState();
    }

    createChart() {

        this.chart = document.createElement('igc-data-chart') as any;
        console.log(this.chart);

        if (this.chart) {
            this.updatePriceByCountry();
            this.chart.animateSeriesWhenAxisRangeChanges = true;
            this.chart.isHorizontalZoomEnabled = true;
            this.chart.isVerticalZoomEnabled = true;
            let xAxis = document.createElement('igc-category-x-axis') as IgcCategoryXAxisComponent;
            xAxis.name = 'xAxis';
            xAxis.dataSource = this.state.priceByCountry;
            xAxis.label = 'Country';
            xAxis.labelAngle = 90;
            xAxis.interval = 1;
            let yAxis = document.createElement('igc-numeric-y-axis') as IgcNumericYAxisComponent;
            yAxis.name = 'yAxis;'

            let columnSeries = document.createElement('igc-column-series') as IgcColumnSeriesComponent;
            columnSeries.name = 'series1';
            columnSeries.transitionDuration = this.state.frequency;
            columnSeries.xAxisName = 'xAxis';
            columnSeries.yAxisName = 'yAxis';
            columnSeries.xAxis = xAxis;
            columnSeries.yAxis = yAxis;
            columnSeries.showDefaultTooltip = true;
            columnSeries.isHighlightingEnabled = true;

            columnSeries.dataSource = this.state.priceByCountry;
            columnSeries.valueMemberPath = 'Price';

            let itemTooltip = document.createElement('igc-item-tool-tip-layer') as IgcItemToolTipLayerComponent;
            itemTooltip.name = 'tooltips'

            this.chart.series.add(columnSeries);
            this.chart.axes.add(xAxis);
            this.chart.axes.add(yAxis);
            // this._chart.series.add(itemTooltip);
        }
    }

    onSearchChange(event: any) {
        let term = event.target.value;

        if (!this.grid) {
            return;
        }

        if (!term || term.length === 0) {
            this.grid.filterExpressions.clear();
        } else {
            let ff = FilterFactory.instance;
            let filter = ff.property('Category').toLower().contains(ff.literal(term).toLower())
                .or(ff.property('Type').toLower().contains(ff.literal(term).toLower()))
                .or(ff.property('Contract').toLower().contains(ff.literal(term).toLower()))
                .or(ff.property('Settlement').toLower().contains(ff.literal(term).toLower()))
                .or(ff.property('Region').toLower().contains(ff.literal(term).toLower()))
                .or(ff.property('Country').toLower().contains(ff.literal(term).toLower()));

            this.grid.filterExpressions.clear();
            this.grid.filterExpressions.add(filter);
        }
    }

    handleHiddenChange(event: any) {
        let options = event.target.value;
        console.log(event.target);
        let hidden = [];
        let hiddenSet = new Set<string>();
        for (let i = 0, l = options.length; i < l; i += 1) {
            hidden.push(options[i]);
            hiddenSet.add(options[i]);
        }
        this.state.hiddenColumns = hidden;

        if (!this.grid) {
            return;
        }
        for (let i = 0; i < this.grid.actualColumns.count; i++) {
            let col = this.grid.actualColumns.item(i);
            if (hiddenSet.has(col.name || col.field)) {
                if (!col.isHidden) {
                    col.isHidden = true;
                }
            } else {
                if (col.isHidden) {
                    col.isHidden = false;
                }
            }
        }
    }
}

let sample = new DataGridBindingLiveData();
