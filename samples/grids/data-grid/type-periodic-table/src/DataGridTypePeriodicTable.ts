

import { PeriodicElements } from './PeriodicElements';
import './DataGridStyles.css';

import { IgcDataGridModule, IgcTemplateHeaderComponent, IgcTemplateCellInfo, IgcTemplateColumnComponent, IgcTemplateCellUpdatingEventArgs, IgcTemplateHeaderCellUpdatingEventArgs, IgcGridSelectedCellsChangedEventArgs, IgcGridSelectedKeysChangedEventArgs, IgcGridSelectedItemsChangedEventArgs, IgcGridSelectedCellRangesChangedEventArgs, IgcGridActiveCellChangedEventArgs, IgcTextColumnComponent, IgcNumericColumnComponent } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcDataGridModule);


export class DataGridTypePeriodicTable {






    public grid: IgcDataGridComponent;
    public ElementsData: any[] = [];
    public ElementGroups: number = 18;

    public HorizontalCenterHeader: IgcTemplateHeaderComponent;
    public HorizontalRightHeader: IgcTemplateHeaderComponent;
    public HorizontalLeftHeader: IgcTemplateHeaderComponent;
    public PeriodicScale: PeriodicScale;
    public CellSize: number = 50;

    constructor() {


        this.onVerticalHeaderUpdating = this.onVerticalHeaderUpdating.bind(this);
        this.onElementCellUpdating = this.onElementCellUpdating.bind(this);
        this.activeCellChanged = this.activeCellChanged.bind(this);



        this.createData();

        this.HorizontalCenterHeader = new IgcTemplateHeaderComponent();
        this.HorizontalCenterHeader.cellUpdating = (s, e) => this.onHorizontalHeaderUpdating(s, e, 'center');

        this.HorizontalRightHeader = new IgcTemplateHeaderComponent();
        this.HorizontalRightHeader.cellUpdating = (s, e) => this.onHorizontalHeaderUpdating(s, e, 'right');

        this.HorizontalLeftHeader = new IgcTemplateHeaderComponent();
        this.HorizontalLeftHeader.cellUpdating = (s, e) => this.onHorizontalHeaderUpdating(s, e, 'left');

        // TemplateColumn setup
        for (let i = 0; i <= 17; i++) {
            const column = document.getElementById('group' + i) as IgcTemplateColumnComponent;
            column.field = 'group' + i;
            column.header = this.HorizontalCenterHeader;
            column.border = 'white';
            column.borderLeftWidth = 0.5;
            column.borderRightWidth = 0.5;
            column.borderTopWidth = 0;
            column.borderBottomWidth = 0;
            column.paddingBottom = 0;
            column.paddingLeft = 0;
            column.paddingTop = 0;
            column.paddingRight = 0;
            column.cellUpdating = this.onElementCellUpdating;
        }
        // TextColumn Setup
        const rowColumn = document.getElementById('row') as IgcNumericColumnComponent;
        rowColumn.field = 'row';
        rowColumn.header = this.HorizontalRightHeader;

        // TextColumn Setup
        const spaceColumn = document.getElementById('space') as IgcNumericColumnComponent;
        spaceColumn.field = 'space';
        spaceColumn.header = this.HorizontalLeftHeader;

        this.PeriodicScale = new PeriodicScale(0, 6000);
        this.PeriodicScale.isInverted = true;
        this.PeriodicScale.colors = ['#ffd425', '#e5cc8b', '#e9bc86', '#edac7d', '#f29a71', '#f68863', '#f97454', '#fc5d45', '#fe4035', '#ff0025'];

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = this.ElementsData;

        // Event handling
        this.grid.activeCellChanged = this.activeCellChanged;
        this.grid.selectedItemsChanged = this.selectedItemsChanged;
        this.grid.selectedKeysChanged = this.selectedKeysChanged;
        this.grid.selectedCellsChanged = this.selectedCellsChanged;
        this.grid.selectedCellRangesChanged = this.selectedCellRangesChanged;

    }
    public activeCellChanged (s: IgcDataGridComponent, e: IgcGridActiveCellChangedEventArgs) {
        console.log('activeCellChanged');
        let label = document.getElementById('label');
        const column = e.newActiveCell.columnUniqueKey.toString();
        const row = e.newActiveCell.rowIndex;

        const item = this.ElementsData[row];
        if (item === undefined ||
            item[column] === undefined ||
            item[column].name === undefined) {
            label.textContent = 'Selected Element:';
        } else {
            label.textContent = 'Selected Element:' + ' ' + item[column].name + ' (' + item[column].symbol + ')';
        }
    }

    public selectedCellRangesChanged (s: IgcDataGridComponent, e: IgcGridSelectedCellRangesChangedEventArgs) {
        console.log('selectedCellRangesChanged');
    }

    public selectedItemsChanged (s: IgcDataGridComponent, e: IgcGridSelectedItemsChangedEventArgs) {
        console.log('selectedItemsChanged');
    }

    public selectedKeysChanged (s: IgcDataGridComponent, e: IgcGridSelectedKeysChangedEventArgs) {
        console.log('selectedKeysChanged');
    }

    public selectedCellsChanged (s: IgcDataGridComponent, e: IgcGridSelectedCellsChangedEventArgs)  {
        console.log('selectedCellsChanged');
    }

    public onVerticalHeaderUpdating(s: IgcTemplateHeaderComponent, e: IgcTemplateHeaderCellUpdatingEventArgs) {
        const content = e.content as HTMLDivElement;
        let label: HTMLSpanElement | null = null;
        if (content.childElementCount === 0) {
            label = document.createElement('div');
            label.style.background = 'transparent';
            label.style.color = 'rgb(24, 29, 31)';
            label.style.fontSize = '13px';
            label.style.fontFamily = 'Verdana';
            label.style.textAlign = 'center';
            // content.style.lineHeight = '140px';
            content.style.margin = '0px';
            content.style.padding = '0px';
            content.appendChild(label);
        } else {
            label = content.children[0] as HTMLDivElement;
        }

        const info = e.cellInfo as IgcTemplateCellInfo;
        label.textContent = info.value;
    }

    public onHorizontalHeaderUpdating(s: IgcTemplateHeaderComponent, e: IgcTemplateHeaderCellUpdatingEventArgs, align: string) {
        const content = e.content as HTMLDivElement;
        let label: HTMLSpanElement | null = null;
        if (content.childElementCount === 0) {
            label = document.createElement('div');
            label.style.background = 'transparent';
            label.style.color = 'rgb(24, 29, 31)';
            label.style.fontSize = '13px';
            label.style.fontFamily = 'Verdana';
            label.style.verticalAlign = 'bottom';
            label.style.textAlign = align;
            // content.style.lineHeight = '140px';
            content.style.margin = '0px';
            content.style.padding = '0px';
            content.appendChild(label);
        } else {
            label = content.children[0] as HTMLDivElement;
        }

        const info = e.cellInfo as IgcTemplateCellInfo;
        label.textContent = info.value;
    }

    public onElementCellUpdating(s: IgcTemplateColumnComponent, e: IgcTemplateCellUpdatingEventArgs) {
        const content = e.content as HTMLDivElement;
        const info = e.cellInfo as IgcTemplateCellInfo;
        let cell: HTMLDivElement | null = null;
        let atomic: HTMLDivElement | null = null;
        let symbol: HTMLDivElement | null = null;
        let mass:   HTMLDivElement | null = null;

        if (content.childElementCount !== 0) {
            cell = content.children[0] as HTMLDivElement;
            atomic = cell.children[0] as HTMLDivElement;
            symbol = cell.children[1] as HTMLDivElement;
            mass   = cell.children[2] as HTMLDivElement;
        } else {
            atomic = document.createElement('div');
            atomic.style.minWidth = '10px';
            atomic.style.margin = '0px';
            atomic.style.padding = '0px';
            atomic.style.fontFamily = 'Verdana';
            atomic.style.fontSize = '8pt';
            atomic.style.textAlign = 'left';
            // atomic.style.color = 'gray'
            atomic.style.lineHeight = 'initial';

            symbol = document.createElement('div');
            symbol.style.minWidth = '10px';
            symbol.style.margin = '0px';
            symbol.style.padding = '0px';
            symbol.style.fontFamily = 'Verdana';
            symbol.style.fontSize = '12pt';
            symbol.style.textAlign = 'left';
            symbol.style.lineHeight = 'initial';

            mass = document.createElement('div');
            mass.style.minWidth = '10px';
            mass.style.margin = '0px';
            mass.style.padding = '0px';
            mass.style.fontFamily = 'Verdana';
            mass.style.fontSize = '7pt';
            mass.style.textAlign = 'left';
            // mass.style.color = 'gray'
            mass.style.lineHeight = 'initial';

            cell = document.createElement('div');
            cell.style.display = 'grid';
            cell.style.lineHeight = 'initial';
            cell.style.height = '100%';
            // cell.style.height = '70px';
            cell.style.padding = '2px';
            cell.style.paddingBottom = '5px';
            cell.appendChild(atomic);
            cell.appendChild(symbol);
            cell.appendChild(mass);

            content.style.height = '100%';
            content.style.display = 'block';
            content.style.margin = '0px';
            content.style.padding = '0px';
            content.appendChild(cell);
        }

        // symbol.style.background = this.HeatScale.getColor(info.value);

        const element = info.value;

        if (element === undefined || element === null || element.symbol === '') {
            cell.style.background = 'white';
            cell.style.color = 'black';

            atomic.textContent = '';
            symbol.textContent = '';
            mass.textContent = '';

        } else if (element.symbol === '..') {
            cell.style.background = '#ffbb00';
            cell.style.color = 'black';

            mass.textContent   = '';
            atomic.textContent = '';
            symbol.textContent = '...';
            symbol.style.textAlign = 'center';

        } else {

            mass.textContent = element.standardState;
            atomic.textContent = element.atomic;
            symbol.textContent = element.symbol;
            symbol.style.textAlign = 'left';

            if (element.standardState === 'gas') {
                cell.style.background = '#10b401';
                cell.style.color = 'black';

            } else if (element.standardState === 'solid') {
                cell.style.background = '#ffbb00';
                cell.style.color = 'black';

            } else if (element.standardState === 'liquid') {
                cell.style.background = '#00aeff';
                cell.style.color = 'black';

            } else {
                cell.style.background = 'gray';
                cell.style.color = 'white';
                mass.textContent = 'unknown';
            }
        }
    }

    public createData() {

        let elementsLookup = new Map<string, any>();
        for (const element of PeriodicElements.getData()) {
            const symbol = element.symbol.toString().toUpperCase();
            elementsLookup.set(symbol, element);
        }

        let elementsTable = [
            // 1    2     3     4     5     6     7     8     9    10    11    12    13    14    15    16    17    18
            ['H' , ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  , 'HE'],
            ['LI', 'BE', ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  , 'B' , 'C' , 'N' , 'O' , 'F' , 'NE'],
            ['NA', 'MG', ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  , 'AL', 'SI', 'P' , 'S' , 'CL', 'AR'],
            ['K' , 'CA', 'SC', 'TI', 'V' , 'CR', 'MN', 'FE', 'CO', 'NI', 'CU', 'ZN', 'GA', 'GE', 'AS', 'SE', 'BR', 'KR'],
            ['RB', 'SR', 'Y' , 'ZR', 'NB', 'MO', 'TC', 'RU', 'RH', 'PB', 'AG', 'CD', 'IN', 'SN', 'SB', 'TE', 'I' , 'XE'],
            ['CS', 'BA', '..', 'HF', 'TA', 'W' , 'RE', 'OS', 'IR', 'PT', 'AU', 'HG', 'TI', 'PB', 'BI', 'PO', 'AT', 'RN'],
            ['FR', 'RA', '..', 'RF', 'DB', 'SG', 'BH', 'HS', 'MT', 'DS', 'RG', 'CN', 'NH', 'FL', 'MC', 'LV', 'TS', 'OG'],
            [''  , ''  , '..', ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  ],
            [''  , ''  , '..', 'LA', 'CE', 'PR', 'ND', 'PM', 'SM', 'EU', 'GD', 'TB', 'DY', 'HO', 'ER', 'TM', 'YB', 'LU'],
            [''  , ''  , '..', 'AC', 'TH', 'PA', 'U' , 'NP', 'PU', 'AM', 'CM', 'BK', 'CF', 'ES', 'FM', 'MD', 'NO', 'LR'],
        ];

        this.ElementsData = [];
        for (let r = 0; r < elementsTable.length; r++) {

            const dataItem: any = {};
            dataItem.row = r < 7 ? r + 1 : '';
            dataItem.space = r < 7 ? r + 1 : '';

            for (let g = 0; g < elementsTable[r].length; g++) {
                const group = 'group' + g;

                const symbol = elementsTable[r][g];

                if (symbol === '' || symbol === '..') {
                    const element: any = {};
                    element.row = r + 1;
                    element.group = g + 1;
                    element.symbol = symbol;
                    dataItem[group] = element;
                } else if (!elementsLookup.has(symbol)) {
                    console.error('missing element data for ' + symbol)
                } else  {
                    const element = elementsLookup.get(symbol);
                    element.row = r + 1;
                    element.group = g + 1;
                    dataItem[group] = element;
                }
            }
            this.ElementsData.push(dataItem);
        }

    }
}

class PeriodicScale {

    public minimum: number = 0;
    public maximum: number = 1;
    public colors: string[] = ['white', 'yellow', 'orange', 'red'];
    public isInverted: boolean = false;

    constructor(min: number, max: number) {
        this.minimum = min;
        this.maximum = max;
    }

    public getRange(): number {
        return this.maximum - this.minimum;
    }

    public getUnscaled(v: number): number {
        return this.Clamp(this.minimum + v * this.getRange(), this.minimum, this.maximum);
    }

    public getScaled(v: number): number {
        return this.Clamp((v - this.minimum) / this.getRange(), this.minimum, this.maximum);
    }

    public Clamp(value: number, min: number, max: number): number {
        return Math.min(max, Math.max(min, value));
    }

    public getColor(v: number): string {
        let scale =  this.getScaled(v);
        let index = Math.round(scale * (this.colors.length - 1));
        if (this.isInverted) {
            index = this.colors.length - index - 1;
        }
        // console.log('' +  index + ' ' + scale + ' ' + v)
        if (index < 0 || index > this.colors.length) {
            return 'white';
        } else {
            return this.colors[index]
        } ;
    }
}

let sample = new DataGridTypePeriodicTable();