import { SampleBase } from "../../sample-base";

import { IgcDataGridModule, IgcTemplateHeaderComponent, IgcTemplateColumnComponent, CellContentHorizontalAlignment, CellContentVerticalAlignment, IgcTextColumnComponent, IgcNumericColumnComponent, IgcTemplateCellUpdatingEventArgs, IgcTemplateCellInfo, IgcTemplateHeaderCellUpdatingEventArgs } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcDataGridModule);

let templateHTML = `
<div class="sample-container">
    <igc-data-grid
        id="grid"
        height="100%"
        width="100%"
        row-height="50"
        row-separator-height="1"
        row-separator-background="lightgray"
        header-separator-background="lightgray"
        header-separator-width="1"
        header-height="110"
        column-resizing-mode="None"
        auto-generate-columns="false"
        >

        <igc-text-column id="nameColumn" property-path="Name" header-text="Friends" horizontal-alignment="right" width="*>110"></igc-text-column>
        <igc-template-column id="Kyle" property-path="Kyle" header-text="Kyle" horizontal-alignment="center" width="50"></igc-template-column>
        <igc-template-column id="Oscar" property-path="Oscar" header-text="Oscar" horizontal-alignment="center" width="50"></igc-template-column>
        <igc-template-column id="Gina" property-path="Gina" header-text="Gina" horizontal-alignment="center" width="50"></igc-template-column>
        <igc-template-column id="Irene" property-path="Irene" header-text="Irene" horizontal-alignment="center" width="50"></igc-template-column>
        <igc-template-column id="Kate" property-path="Kate" header-text="Kate" horizontal-alignment="center" width="50"></igc-template-column>
        <igc-template-column id="Brenda" property-path="Brenda" header-text="Brenda" horizontal-alignment="center" width="50"></igc-template-column>
        <igc-template-column id="Mark" property-path="Mark" header-text="Mark" horizontal-alignment="center" width="50"></igc-template-column>
        <igc-template-column id="John" property-path="John" header-text="John" horizontal-alignment="center" width="50"></igc-template-column>
        <igc-template-column id="Andrew" property-path="Andrew" header-text="Andrew" horizontal-alignment="center" width="50"></igc-template-column>
        <igc-template-column id="Casey" property-path="Casey" header-text="Casey" horizontal-alignment="center" width="50"></igc-template-column>
        <igc-template-column id="Holly" property-path="Holly" header-text="Holly" horizontal-alignment="center" width="50"></igc-template-column>
        <igc-template-column id="Larry" property-path="Larry" header-text="Larry" horizontal-alignment="center" width="50"></igc-template-column>
        <igc-template-column id="Pete" property-path="Pete" header-text="Pete" horizontal-alignment="center" width="50"></igc-template-column>
        <igc-template-column id="Steve" property-path="Steve" header-text="Steve" horizontal-alignment="center" width="50"></igc-template-column>
        <igc-numeric-column id="countColumn" property-path="Count" header-text="Total" horizontal-alignment="left" width="*>110"></igc-numeric-column>
    </igc-data-grid>
</div>
`;

export class DataGridTypeMatrixTable extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataGridTypeMatrixTable");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataGridTypeMatrixTable); return this;
    }

    private grid: IgcDataGridComponent;
    public dataPeople: any[];
    public dataRelations: any[];

    private VerticalHeader: IgcTemplateHeaderComponent;
    private HorizontalRightHeader: IgcTemplateHeaderComponent;
    private HorizontalLeftHeader: IgcTemplateHeaderComponent;
    public cellSize: number = 50;

    public names: string[] = ["Kyle", "Oscar", "Gina", "Irene", "Kate", "Brenda", "Mark", "John", "Andrew", "Casey", "Holly", "Larry", "Pete", "Steve"];

    constructor() {
        super();

        this.onVerticalHeaderUpdating = this.onVerticalHeaderUpdating.bind(this);
        this.onHorizontalHeaderUpdating = this.onHorizontalHeaderUpdating.bind(this);
        this.onCellUpdating = this.onCellUpdating.bind(this);
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.createData();

        this.VerticalHeader = new IgcTemplateHeaderComponent();
        this.VerticalHeader.cellUpdating = (s, e) => this.onVerticalHeaderUpdating(s, e);

        this.HorizontalRightHeader = new IgcTemplateHeaderComponent();
        this.HorizontalRightHeader.cellUpdating = (s, e) => this.onHorizontalHeaderUpdating(s, e, "right");

        this.HorizontalLeftHeader = new IgcTemplateHeaderComponent();
        this.HorizontalLeftHeader.cellUpdating = (s, e) => this.onHorizontalHeaderUpdating(s, e, "left");

        for (const name of this.names) {
            const column = document.getElementById(name) as IgcTemplateColumnComponent;
            column.propertyPath = name;
            column.header = this.VerticalHeader;
            column.horizontalAlignment = CellContentHorizontalAlignment.Center;
            column.verticalAlignment = CellContentVerticalAlignment.Bottom;
            column.border = "lightgray";
            column.borderLeftWidth = 0.5;
            column.borderRightWidth = 0.5;
            column.borderTopWidth = 0;
            column.borderBottomWidth = 0;
            column.paddingBottom = 0;
            column.paddingLeft = 0;
            column.paddingTop = 0;
            column.paddingRight = 0;
            column.cellUpdating = this.onCellUpdating;
        }

        // TextColumn Setup
        const nameColumn = document.getElementById("nameColumn") as IgcTextColumnComponent;
        nameColumn.header = this.HorizontalRightHeader;
        nameColumn.border = "lightgray";
        nameColumn.borderTopWidth = 0;
        nameColumn.borderBottomWidth = 0;

        // NumericColumn Setup
        const countColumn = document.getElementById("countColumn") as IgcNumericColumnComponent;
        countColumn.header = this.HorizontalLeftHeader;
        countColumn.border = "lightgray";
        countColumn.borderTopWidth = 0;
        countColumn.borderBottomWidth = 0;

        this.grid = document.getElementById("grid") as IgcDataGridComponent;
        this.grid.dataSource = this.dataRelations;
    }

    public onVerticalHeaderUpdating(s: IgcTemplateHeaderComponent, e: IgcTemplateHeaderCellUpdatingEventArgs) {
        const content = e.content as HTMLDivElement;
        let label: HTMLSpanElement | null = null;
        if (content.childElementCount === 0) {
            content.style.lineHeight = "140px";
            label = document.createElement("div");
            label.style.background = "transparent";
            label.style.color = "rgb(24, 29, 31)";
            label.style.transform = "rotate(270deg)";
            label.style.transformOrigin = "center";
            label.style.fontSize = "13px";
            label.style.fontFamily = "Verdana";
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
            content.style.lineHeight = "140px";
            label = document.createElement("div");
            label.style.background = "transparent";
            label.style.color = "rgb(24, 29, 31)";
            label.style.verticalAlign = "bottom";
            label.style.textAlign = align;
            label.style.fontSize = "13px";
            label.style.fontFamily = "Verdana";
            content.appendChild(label);
        } else {
            label = content.children[0] as HTMLDivElement;
        }

        const info = e.cellInfo as IgcTemplateCellInfo;
        label.textContent = info.value;
    }

    public onCellUpdating(s: IgcTemplateColumnComponent, e: IgcTemplateCellUpdatingEventArgs) {
        const content = e.content as HTMLDivElement;
        const info = e.cellInfo as IgcTemplateCellInfo;
        let cell: HTMLDivElement | null = null;

        if (content.childElementCount === 0) {
            content.style.margin = "0px";
            content.style.padding = "0px";
            cell = document.createElement("div");
            cell.style.margin = "0px";
            cell.style.padding = "0px";
            cell.style.fontFamily = "Verdana";
            cell.style.fontSize = "large";
            cell.style.textAlign = "center";
            cell.style.fontSize = "large";
            content.appendChild(cell);
        } else {
            cell = content.children[0] as HTMLDivElement;
        }

        if (info.value === 1) {
            cell.style.color = "lightgray";
            cell.style.background = "lightgray";
            cell.textContent = "";
        } else if (info.value > 0) {
            cell.style.color = "#02d302";
            cell.style.background = "transparent";
            cell.textContent = "\u2714";
        } else {
            cell.style.color = "red";
            cell.style.background = "transparent";
            cell.textContent = "\u2716";
        }
    }

    public createData() {

        this.dataPeople = [];
        this.dataRelations = [];

        this.names.sort();

        for (let i = 0; i < this.names.length; i++) {
            const person: any = {};
            person.ID = i;
            person.Name = this.names[i];
            this.dataPeople.push(person);
        }

        let friendships = new Map<string, number>();

        for (let row = 0; row < this.dataPeople.length; row++) {
            const person1 = this.dataPeople[row];

            for (let col = 0; col < this.dataPeople.length; col++) {
                const person2 = this.dataPeople[col];

                const rand = Math.random() - 0.5;

                if (person1.Name !== person2.Name) {
                    if (rand > 0) {
                       const p1p2 = person1.Name + person2.Name;
                       const p2p1 = person2.Name + person1.Name;

                       if (!friendships.has(p1p2)) {
                            friendships.set(p1p2, rand);
                       }

                       if (!friendships.has(p2p1)) {
                            friendships.set(p2p1, rand);
                       }
                    }
                }
            }
        }

        for (let row = 0; row < this.dataPeople.length; row++) {
            const person1 = this.dataPeople[row];

            const relation: any = {};
            relation.ID = row;
            relation.Name = person1.Name;
            relation.Count = 0;

            for (let col = 0; col < this.dataPeople.length; col++) {
                const person2 = this.dataPeople[col];
                const key = person2.Name

                if (person1.Name === person2.Name) {
                    relation[key] = 1;
                } else  {

                    const p1p2 = person1.Name + person2.Name;

                    if (friendships.has(p1p2)) {
                        relation[key] = friendships.get(p1p2);
                        relation.Count += 1;
                    } else {
                        relation[key] = 0;
                    }
                }
            }
            this.dataRelations.push(relation);
        }


    }


    public getRandomNumber(min: number, max: number): number {
        return Math.round(min + Math.random() * (max - min));
    }

    public getRandomItem(array: any[]): any {
        const index = Math.round(this.getRandomNumber(0, array.length - 1));
        return array[index];
    }
}