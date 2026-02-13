import '@webcomponents/custom-elements/custom-elements.min';
import '@webcomponents/custom-elements/src/native-shim.js';
import { LiveFinancialData } from "./LiveFinancialData";
import { IgcDataGridModule } from 'igniteui-webcomponents-data-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-data-grids';
import { IgcTemplateColumnComponent } from 'igniteui-webcomponents-data-grids';
import { IgcColumnGroupDescription } from 'igniteui-webcomponents-data-grids';
import { IgcCellStyleRequestedEventArgs } from 'igniteui-webcomponents-data-grids';
import { IgcTemplateCellUpdatingEventArgs } from 'igniteui-webcomponents-data-grids';
import { IgcTemplateCellInfo } from 'igniteui-webcomponents-data-grids';
import { IgcDataBindingEventArgs } from 'igniteui-webcomponents-data-grids';
import { IgcDataGridColumnComponent } from 'igniteui-webcomponents-data-grids';
import { IgcDefinitionBaseComponent } from 'igniteui-webcomponents-data-grids';
import { ListSortDirection } from 'igniteui-webcomponents-core';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcDataGridModule);

export class DataGridTypeMarketingTable {

    private grid: IgcDataGridComponent;
    private good_color = "#4EB862";
    private bad_color = "#FF134A";
    private lastDataUpdate: Date = new Date();
    private badBorder = "4px solid #FF134A";
    private goodBorder = "4px solid #4EB862";
    private ticking: boolean = false;
    private isAllUpdate = false;

    private state = {
        data: LiveFinancialData.generateData(2000),
        frequency: 100,
        volume: 2000,
    };

    constructor() {

        this.onPriceStyleKey = this.onPriceStyleKey.bind(this);
        this.onPriceCellUpdating = this.onPriceCellUpdating.bind(this);
        this.onPriceDataBound = this.onPriceDataBound.bind(this);

        this.onPriceAmountStyleKey = this.onPriceAmountStyleKey.bind(this);
        this.onPriceAmountCellUpdating = this.onPriceAmountCellUpdating.bind(this);

        this.onPricePercentStyleKey = this.onPricePercentStyleKey.bind(this);
        this.onPricePercentCellUpdating = this.onPricePercentCellUpdating.bind(this);

        this.grid = document.getElementById("grid") as IgcDataGridComponent;
        this.grid.dataSource = this.state.data;

        let priceTemplate = document.getElementById("priceTemplateColumn") as IgcTemplateColumnComponent;
        priceTemplate.cellStyleKeyRequested = this.onPriceStyleKey;
        priceTemplate.cellUpdating = this.onPriceCellUpdating;
        priceTemplate.dataBound = this.onPriceDataBound;

        let changeTemplate = document.getElementById("changeTemplateColumn") as IgcTemplateColumnComponent;
        changeTemplate.cellStyleKeyRequested = this.onPriceAmountStyleKey;
        changeTemplate.cellUpdating = this.onPriceAmountCellUpdating;

        let changePercentTemplate = document.getElementById("changePercentTemplateColumn") as IgcTemplateColumnComponent;
        changePercentTemplate.cellStyleKeyRequested = this.onPricePercentStyleKey;
        changePercentTemplate.cellUpdating = this.onPricePercentCellUpdating;

        this.addGroups();
        this.startTicking();
    }
    addGroups() {
        let g = new IgcColumnGroupDescription();
        g.field = "Category";
        g.sortDirection = ListSortDirection.Descending;
        this.grid.groupDescriptions.add(g);

        g = new IgcColumnGroupDescription();
        g.field = "Contract";
        g.sortDirection = ListSortDirection.Descending;
        this.grid.groupDescriptions.add(g);

        g = new IgcColumnGroupDescription();
        g.field = "Region";
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

        let toChange = Math.round(this.state.volume / 10);
        let toChangeIndexes = {} as any;
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
            if (this.grid.sortDescriptions.item(i).field === "Price" ||
                this.grid.sortDescriptions.item(i).field.indexOf("Change") >= 0) {
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

        if (!sortingByPrice || !intervalElapsed) {
            this.grid.invalidateVisibleRows();
        }

        window.setTimeout(() => this.tick(), 16);
    }

    onPriceStyleKey(col: IgcDefinitionBaseComponent, args: IgcCellStyleRequestedEventArgs) {
        let row: any | null = null;
        if (this.grid && this.grid.actualDataSource) {
            row = this.grid.actualDataSource.getItemAtIndex(args.rowNumber);
        } else {
            row = this.state.data[args.rowNumber];
        }
        if (row.Change >= 0) {
            args.styleKey = "priceShiftUp";
        } else {
            args.styleKey = "priceShiftDown";
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

                let iconText = "trending_up";
                let iconColor = this.good_color;

                let scale = window.devicePixelRatio;
                if (scale !== 1.0) {
                    context.save();
                    context.scale(scale, scale);
                }

                if (priceShiftUp) {
                    iconText = "trending_up";
                    iconColor = this.good_color;
                } else {
                    iconText = "trending_down";
                    iconColor = this.bad_color;
                }

                let txt = "$" + (+templ.value).toFixed(2);
                context.font = "13px Verdana";
                let width = context.measureText(txt).width;

                context.font = "13px 'Material Icons'";
                let iconWidth = context.measureText(iconText).width;

                let totalWidth = width + iconWidth;

                context.font = "13px Verdana";
                context.fillStyle = iconColor;
                context.textBaseline = "top";
                context.fillText(txt, templ.width - (totalWidth + 5), (templ.height / 2.0) - 7);

                context.font = "13px 'Material Icons'";
                context.fillStyle = iconColor;
                context.textBaseline = "top";
                context.fillText(iconText, templ.width - (iconWidth + 5), (templ.height / 2.0) - 7);

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
            content.style.textAlign = "right";
            sp = document.createElement("span");
            sp.style.font = "13px Verdana";
            sp.style.verticalAlign = "center";
            content.appendChild(sp);
        }

        sp.textContent = "$" + (+templ.value).toFixed(2);

        if ((sp as any).__isUp === undefined ||
            (sp as any).__isUp !== priceShiftUp) {
            (sp as any).__isUp = priceShiftUp;
            if (priceShiftUp) {
                sp.style.color = this.good_color;
            } else {
                sp.style.color = this.bad_color;
            }
        }
    }

    onPricePercentStyleKey(grid: IgcDefinitionBaseComponent, args: IgcCellStyleRequestedEventArgs) {
        if (args.resolvedValue >= 0) {
            args.styleKey = "pricePercentUp";
        } else {
            args.styleKey = "pricePercentDown";
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

                let txt = (+templ.value).toFixed(2) + "%";
                context.font = "13px Verdana";
                let width = context.measureText(txt).width;

                let totalWidth = width + 4;

                context.font = "13px Verdana";
                context.fillStyle = templ.textColor;
                context.textBaseline = "top";
                context.fillText(txt, templ.width - (totalWidth + 10), (templ.height / 2.0) - 7);

                context.font = "13px 'Material Icons'";
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
            content.style.textAlign = "right";
            sp = document.createElement("span");
            sp.style.font = "13px Verdana";
            sp.style.verticalAlign = "center";
            content.appendChild(sp);
        }

        sp.textContent = (+templ.value).toFixed(2) + "%";
        if ((sp as any).__isUp === undefined ||
            (sp as any).__isUp !== priceShiftUp) {
            (sp as any).__isUp = priceShiftUp;
            if (priceShiftUp) {
                sp.style.paddingRight = "5px";
                sp.style.borderRight = this.goodBorder;
            } else {
                sp.style.paddingRight = "5px";
                sp.style.borderRight = this.badBorder;
            }
        }
    }

    onPriceAmountStyleKey(grid: IgcDefinitionBaseComponent, args: IgcCellStyleRequestedEventArgs) {
        if (args.resolvedValue >= 0) {
            args.styleKey = "priceAmountUp";
        } else {
            args.styleKey = "priceAmountDown";
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

                let txt = (+templ.value).toFixed(2);
                context.font = "13px Verdana";
                let width = context.measureText(txt).width;

                let totalWidth = width + 4;

                context.font = "13px Verdana";
                context.fillStyle = templ.textColor;
                context.textBaseline = "top";
                context.fillText(txt, templ.width - (totalWidth + 10), (templ.height / 2.0) - 7);

                context.font = "13px 'Material Icons'";
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
            content.style.textAlign = "right";
            sp = document.createElement("span");
            sp.style.font = "13px Verdana";
            sp.style.verticalAlign = "center";
            content.appendChild(sp);
        }

        sp.textContent = (+templ.value).toFixed(2);

        if ((sp as any).__isUp === undefined ||
            (sp as any).__isUp !== priceShiftUp) {
            (sp as any).__isUp = priceShiftUp;
            if (priceShiftUp) {
                sp.style.paddingRight = "5px";
                sp.style.borderRight = this.goodBorder;
            } else {
                sp.style.paddingRight = "5px";
                sp.style.borderRight = this.badBorder;
            }
        }
    }

    onPriceDataBound(sender: any, args: IgcDataBindingEventArgs) {
        let item: any = args.cellInfo.rowItem;
        if (item !== null) {
            if (item.PriceHeat > 0) {
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

                let colorString = "rgba(" + Math.round(r * 255.0) + "," + Math.round(g * 255.0) + "," + Math.round(b * 255.0) + "," + a + ")";

                args.cellInfo.background = colorString;
            }
            else if (item.PriceHeat < 0) {
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

                let colorString = "rgba(" + Math.round(r * 255.0) + "," + Math.round(g * 255.0) + "," + Math.round(b * 255.0) + "," + a + ")";

                args.cellInfo.background = colorString;
            }
            else {
                let colorString = "white";
                args.cellInfo.background = colorString;
            }
        }
    }

    startTicking() {
        if (!this.ticking) {
            this.ticking = true;
            window.setTimeout(() => this.tick(), 16);
        }
    }
}

export function initialize() {
  return new DataGridTypeMarketingTable();
}