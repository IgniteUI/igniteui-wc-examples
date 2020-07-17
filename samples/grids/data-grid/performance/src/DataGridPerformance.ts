

import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { IgcNumericColumnComponent } from 'igniteui-webcomponents-grids';

import { IgcTemplateColumnComponent } from 'igniteui-webcomponents-grids';
import { IgcTemplateCellInfo } from 'igniteui-webcomponents-grids';
import { IgcTemplateCellUpdatingEventArgs } from 'igniteui-webcomponents-grids';
import { IgcCellStyleRequestedEventArgs } from 'igniteui-webcomponents-grids';
import { IgcColumnGroupDescription } from 'igniteui-webcomponents-grids';

import { IgcDataBindingEventArgs } from 'igniteui-webcomponents-grids';

import { IgcColumnComponent } from 'igniteui-webcomponents-grids';

import { IgcColumnWidth } from 'igniteui-webcomponents-grids';
import { GridSelectionMode } from 'igniteui-webcomponents-grids';
import { HeaderClickAction } from 'igniteui-webcomponents-grids';

ModuleManager.register(IgcDataGridModule);


export class DataGridPerformance {


    
    
        

    private grid: IgcDataGridComponent;
    private _kpiColumns: string[] = [];
    private data: SalesPerson[];
    private good_color = '#4EB862';
    private bad_color = '#FF134A';
    private _badBorder = '4px solid #FF134A';
    private _goodBorder = '4px solid #4EB862';
    private _lastDataUpdate: Date = new Date();
    private _interval: number = 100;

    constructor() {
        

        this.tick = this.tick.bind(this);

        this.onPriceCellUpdating = this.onPriceCellUpdating.bind(this);
        this.onPriceStyleKey = this.onPriceStyleKey.bind(this);

        this.onPriceAmountStyleKey = this.onPriceAmountStyleKey.bind(this);
        this.onPriceAmountCellUpdating = this.onPriceAmountCellUpdating.bind(this);

        this.onPricePercentCellUpdating = this.onPricePercentCellUpdating.bind(this);
        this.onPricePercentStyleKey = this.onPricePercentStyleKey.bind(this);

        for (let i = 0; i < 43; i++) {
            this._kpiColumns.push('KPI_' + i);
        }
    
        

        this.data = this.generateSalesPeople(8000);
        this.grid = document.getElementById('grid') as IgcDataGridComponent;

        this.grid.selectionMode = GridSelectionMode.MultipleRow;
        this.grid.headerClickAction = HeaderClickAction.SortByMultipleColumnsTriState;

        const avgSaleTemplateColumn = document.getElementById('avgSaleTemplateColumn') as IgcTemplateColumnComponent;
        avgSaleTemplateColumn.cellStyleKeyRequested = this.onPriceStyleKey;
        avgSaleTemplateColumn.cellUpdating = this.onPriceCellUpdating;

        const changeTemplateColumn = document.getElementById('changeTemplateColumn') as IgcTemplateColumnComponent;
        changeTemplateColumn.cellStyleKeyRequested = this.onPriceAmountStyleKey;
        changeTemplateColumn.cellUpdating = this.onPriceAmountCellUpdating;

        const percentChangeTemplateColumn = document.getElementById('percentChangeTemplateColumn') as IgcTemplateColumnComponent;
        percentChangeTemplateColumn.cellStyleKeyRequested = this.onPricePercentStyleKey;
        percentChangeTemplateColumn.cellUpdating = this.onPricePercentCellUpdating;

        this.grid.dataSource = this.data;

        for (let i = 0; i < this._kpiColumns.length; i++) {
            const column = new IgcNumericColumnComponent();
            column.propertyPath = this._kpiColumns[i];
            let width = new IgcColumnWidth();
            width.value = 110;
            column.width = width;
            this.grid.columns.add(column);
        }

        this.doComponentDidMount();
    }

    public doComponentDidMount() {
        let g = new IgcColumnGroupDescription();
        g.propertyPath = 'Territory';
        this.grid.groupDescriptions.add(g);

        for (let i = 0; i < 43; i++) {
            (() => {
                let currVal = i;
                this.grid.forColumnsWithPropertyPath('KPI_' + currVal, (col: IgcColumnComponent) => {
                    col.cellStyleKeyRequested = (sender: any, args: IgcCellStyleRequestedEventArgs) => {
                        let value = args.resolvedValue;
                        if (value < 20.0) {
                            args.styleKey = 'kpi_red';
                        } else if (value > 80.0) {
                            args.styleKey = 'kpi_green';
                        }
                    };

                    col.dataBound = (sender: any, args: IgcDataBindingEventArgs) => {
                        let value = args.resolvedValue;
                        if (value < 20.0) {
                            if (args.cellInfo.background !== 'red') {
                                args.cellInfo.background = this.bad_color;
                            }
                        }

                        if (value > 80.0) {
                            if (args.cellInfo.background !== 'green') {
                                args.cellInfo.background = this.good_color;
                            }
                        }
                    };
                });
            })();
        }

        this.grid.forColumnsWithPropertyPath('AvgSale', (col: IgcColumnComponent) => {
            col.dataBound = (sender: any, args: IgcDataBindingEventArgs) => {
                let item: any = args.cellInfo.rowItem;
                if (item !== null) {
                    if (item.AvgSaleHeat > 0) {
                        let p = +item.AvgSaleHeat;
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
                    else if (item.AvgSaleHeat < 0) {
                        let p = +item.AvgSaleHeat * -1.0;
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
            };
        });

        window.setTimeout(this.tick, 16);
    }

    public onPriceStyleKey(grid: IgcColumnComponent, args: IgcCellStyleRequestedEventArgs) {
        let row: SalesPerson;
        if (this.grid) {
            row = this.grid.actualDataSource.getItemAtIndex(args.rowNumber);
        } else {
            row = this.data[args.rowNumber];
        }
        if (row.Change >= 0) {
            args.styleKey = 'priceShiftUp';
        } else {
            args.styleKey = 'priceShiftDown';
        }
    }

    public onPriceCellUpdating(grid: IgcTemplateColumnComponent, args: IgcTemplateCellUpdatingEventArgs) {
        let row = args.cellInfo.rowItem;
        let priceShiftUp = row.Change >= 0;
        let templ = args.cellInfo as IgcTemplateCellInfo;

        let content = args.content as HTMLDivElement;
        let sp: HTMLSpanElement | null = null;
        let icon: HTMLSpanElement | null = null;

        if (content.childElementCount > 0) {
            sp = content.children[0] as HTMLSpanElement;
            icon = content.children[1] as HTMLSpanElement;
        } else {
            content.style.textAlign = 'right';
            sp = document.createElement('span');
            icon = document.createElement('span');
            sp.style.font = '13px Verdana';
            sp.style.verticalAlign = 'center';
            content.appendChild(sp);
            content.appendChild(icon);
            icon.style.fontFamily = 'Material Icons';
            icon.style.fontSize = '13px';
            icon.style.fontFeatureSettings = 'liga';
            icon.style.verticalAlign = 'center';
        }

        sp.textContent = '$' + (+templ.value).toFixed(2);

        if ((sp as any).__isUp === undefined ||
            (sp as any).__isUp !== priceShiftUp) {
            (sp as any).__isUp = priceShiftUp;
            if (priceShiftUp) {
                // icon.textContent = 'trending_up';
                icon.style.color = this.good_color;
                sp.style.color = this.good_color;
            } else {
                // icon.textContent = 'trending_down';
                icon.style.color = this.bad_color;
                sp.style.color = this.bad_color;
            }
        }
    }

    public onPriceAmountStyleKey(grid: IgcColumnComponent, args: IgcCellStyleRequestedEventArgs) {
        if (args.resolvedValue >= 0) {
            args.styleKey = 'priceAmountUp';
        } else {
            args.styleKey = 'priceAmountDown';
        }
    }

    public onPriceAmountCellUpdating(grid: IgcTemplateColumnComponent, args: IgcTemplateCellUpdatingEventArgs) {
        let templ = args.cellInfo as IgcTemplateCellInfo;
        let priceShiftUp = templ.value >= 0;

        let content = args.content as HTMLDivElement;
        let sp: HTMLSpanElement | null = null;

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
                sp.style.borderRight = this._goodBorder;
                // sp.style.color = this.good_color;
            } else {
                sp.style.paddingRight = '5px';
                sp.style.borderRight = this._badBorder;
                // sp.style.color = this.bad_color;
            }
        }
    }

    public onPricePercentStyleKey(grid: IgcColumnComponent, args: IgcCellStyleRequestedEventArgs) {
        if (args.resolvedValue >= 0) {
            args.styleKey = 'pricePercentUp';
        } else {
            args.styleKey = 'pricePercentDown';
        }
    }

    public onPricePercentCellUpdating(grid: IgcTemplateColumnComponent, args: IgcTemplateCellUpdatingEventArgs) {
        let templ = args.cellInfo as IgcTemplateCellInfo;
        let priceShiftUp = templ.value >= 0;

        let content = args.content as HTMLDivElement;
        let sp: HTMLSpanElement | null = null;

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
                sp.style.borderRight = this._goodBorder;
                // sp.style.color = this.good_color;
            } else {
                sp.style.paddingRight = '5px';
                sp.style.borderRight = this._badBorder;
                // sp.style.color = this.bad_color;
            }
        }
    }

    private tick() {
        let sortedBySales = false;
        // foreach (let item in grid.SortDescriptions)
        // {
        // 	if (item.PropertyName === 'YearToDateSales')
        // 	{
        // 		sortedBySales = true;
        // 	}
        // }

        let toChange = 200;
        let toChangeIndexes = {};
        let stillAnimating = false;
        for (let i = 0; i < this.data.length; i++) {
            let item = this.data[i] as any;
            if (item.PriceHeat !== 0) {
                stillAnimating = true;
            }
        }

        let now = new Date();
        let intervalElapsed = false;
        if ((+now - +this._lastDataUpdate) > this._interval) {
            intervalElapsed = true;
        }

        let useClear = false;
        let sortingByAvgSale = false;
        for (let i = 0; i < this.grid.sortDescriptions.count; i++) {
            if (this.grid.sortDescriptions.item(i).propertyPath === 'AvgSale' ||
                this.grid.sortDescriptions.item(i).propertyPath.indexOf('Change') >= 0) {
                sortingByAvgSale = true;
            }
        }

        let changing = false;
        if (intervalElapsed) {
            this._lastDataUpdate = new Date();
            for (let i = 0; i < toChange; i++) {
                let index = Math.round(Math.random() * this.data.length - 1);
                while (toChangeIndexes[index.toString()] !== undefined) {
                    index = Math.round(Math.random() * this.data.length - 1);
                }
                toChangeIndexes[index.toString()] = true;
                changing = true;
            }
        }

        for (let i = 0; i < this.data.length; i++) {
            let item = this.data[i] as any;
            if (toChangeIndexes[i.toString()] !== undefined) {
                if (sortingByAvgSale && !useClear) {

                this.grid.notifyRemoveItem(i, item);
                this.randomizeItem(item);
                this.grid.notifyInsertItem(i, item);
                } else {
                    this.randomizeItem(item);
                }

                if (item.Change > 0) {
                    // item.YearToDateSales += Math.round(Math.random() * 4.0);
                    item.AvgSaleHeat = 1;
                } else {
                    item.AvgSaleHeat = -1;
                }
            }
            else {
                if (item.AvgSaleHeat > 0) {
                    item.AvgSaleHeat -= .06;
                    if (item.AvgSaleHeat < 0) {
                        item.AvgSaleHeat = 0;
                    }
                }
                if (item.AvgSaleHeat < 0) {
                    item.AvgSaleHeat += .06;
                    if (item.AvgSaleHeat > 0) {
                        item.AvgSaleHeat = 0;
                    }
                }
            }
        }

        if (sortingByAvgSale && useClear) {
            this.grid.actualDataSource.queueAutoRefresh();
        }

        // if (!sortingByPrice) {
            // if (!useClear) {
        if (!sortingByAvgSale || !intervalElapsed) {
            this.grid.invalidateVisibleRows();
        }
            // }
        // }
        // this.grid.invalidateVisibleRows();
        // actualDataSource.queueAutoRefresh();

        window.setTimeout(() => this.tick(), 16);
    }

    private randomizeItem(item: SalesPerson) {
        item.Change = Math.random() * 40.0 - 20.0;
        let prevSale = item.AvgSale;

        item.AvgSale += item.Change;
        item.PercentChange = ((item.AvgSale / prevSale) * 100.0);
    }


    private generateSalesPeople(num: number) {
        let firstNames = [
            'Kyle',
            'Gina',
            'Irene',
            'Katie',
            'Michael',
            'Oscar',
            'Ralph',
            'Torrey',
            'William',
            'Bill',
            'Daniel',
            'Frank',
            'Brenda',
            'Danielle',
            'Fiona',
            'Howard',
            'Jack',
            'Larry',
            'Holly',
            'Jennifer',
            'Liz',
            'Pete',
            'Steve',
            'Vince',
            'Zeke'
        ];

        let lastNames = [
            'Adams',
            'Crowley',
            'Ellis',
            'Gable',
            'Irvine',
            'Keefe',
            'Mendoza',
            'Owens',
            'Rooney',
            'Waddell',
            'Thomas',
            'Betts',
            'Doran',
            'Fitzgerald',
            'Holmes',
            'Jefferson',
            'Landry',
            'Newberry',
            'Perez',
            'Spencer',
            'Vargas',
            'Grimes',
            'Edwards',
            'Stark',
            'Cruise',
            'Fitz',
            'Chief',
            'Blanc',
            'Perry',
            'Stone',
            'Williams',
            'Lane',
            'Jobs'
        ];

        let genders = [
            'GUY',
            'GIRL',
            'GIRL',
            'GIRL',
            'GUY',
            'GUY',
            'GUY',
            'GUY',
            'GUY',
            'GUY',
            'GUY',
            'GUY',
            'GIRL',
            'GIRL',
            'GIRL',
            'GUY',
            'GUY',
            'GUY',
            'GIRL',
            'GIRL',
            'GIRL',
            'GUY',
            'GUY',
            'GUY',
            'GUY'
        ];

        let territories = [
            'Australia',
            'Canada',
            'Egypt',
            'Greece',
            'Italy',
            'Kenya',
            'Mexico',
            'Oman',
            'Qatar',
            'Sweden',
            'Uruguay',
            'Yemen',
            'Bulgaria',
            'Denmark',
            'France',
            'Hungary',
            'Japan',
            'Latvia',
            'Netherlands',
            'Portugal',
            'Russia',
            'Turkey',
            'Venezuela',
            'Zimbabwe'
        ];

        // let min = 10;
        // let max = 35;

        let items = [];
        for (let i = 0; i < num; i++) {
            let item = new SalesPerson();
            let firstIndex = Math.round(Math.random() * (firstNames.length - 1));
            item.Index = i;
            item.FirstName = firstNames[firstIndex];
            item.LastName = lastNames[Math.round(Math.random() * (lastNames.length - 1))];
            item.Name = item.FirstName + item.LastName;

            let randomIndex = Math.round(Math.random() * (firstNames.length - 1));
            if (randomIndex === 0)
                randomIndex = 1;

            let value = randomIndex.toString();
            if (randomIndex < 10)
            value = '0' + value;
            item.ImageName = ''; // this.createUri(genders[firstIndex] + value + '.png');
            item.Territory = territories[Math.round(Math.random() * (territories.length - 1))];
            item.AvgSale = Math.round(Math.random() * 800) + 200.0;
            item.Change = Math.random() * 40.0 - 20.0;
            item.PercentChange = 0;
            item.YearToDateSales = Math.round(Math.random() * 50000);

            item.DateValue = new Date();
            item.DateValue.setDate(item.DateValue.getDate() + Math.round(Math.random() * 500))

            for (let j = 0; j < 43; j++) {
                item['KPI_' + j] = Math.round(Math.random() * 100.0);
            }

            items.push(item);
        }

        return items;
    }

    private createUri(val: string): string {
        return 'http://localhost/People/' + val;
    }
}

export class SalesPerson {
    FirstName: string;
    LastName: string;
    Name: string;
    ImageName: string;
    Territory: string;
    Index: number;
    AvgSale: number;
    AvgSaleHeat: number;
    Change: number;
    PercentChange: number;
    YearToDateSales: number;
    DateValue: Date;
}


let sample = new DataGridPerformance();