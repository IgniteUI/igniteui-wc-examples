import { SampleBase } from "../../sample-base";

import { IgcDataGridModule, IgcTemplateHeaderComponent, IgcTemplateColumnComponent, IgcTextColumnComponent, IgcNumericColumnComponent, CellContentVerticalAlignment, CellContentHorizontalAlignment } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { IgcTemplateCellInfo } from 'igniteui-webcomponents-grids';
import { IgcTemplateCellUpdatingEventArgs } from 'igniteui-webcomponents-grids';
import { IgcTemplateHeaderCellUpdatingEventArgs } from 'igniteui-webcomponents-grids';

import { ModuleManager, HorizontalAlignment, VerticalAlignment } from 'igniteui-webcomponents-core';

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

        <igc-text-column id="nameColumn" property-path="Name" header-text="Skills" horizontal-alignment="right" width="*>110"></igc-text-column>

        <igc-template-column id="JavaScript" property-path="JavaScript" width="50"></igc-template-column>
        <igc-template-column id="Angular" property-path="Angular" width="50"></igc-template-column>
        <igc-template-column id="React" property-path="React" width="50"></igc-template-column>
        <igc-template-column id="CSharp" property-path="CSharp" header-text="C#" width="50"></igc-template-column>
        <igc-template-column id="CPP" property-path="CPP" header-text="C++" width="50"></igc-template-column>
        <igc-template-column id="Swift" property-path="Swift"width="50"></igc-template-column>
        <igc-template-column id="VB" property-path="VB"  width="50"></igc-template-column>
        <igc-template-column id="Python" property-path="Python" width="50"></igc-template-column>
        <igc-template-column id="Ruby" property-path="Ruby" width="50"></igc-template-column>
        <igc-template-column id="XAML" property-path="XAML" width="50"></igc-template-column>

        <igc-numeric-column id="skillColumn" property-path="Skills" header-text="Total" horizontal-alignment="left" width="*>110"></igc-numeric-column>
    </igc-data-grid>
</div>
`;

export class DataGridTypeComparisonTable extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataGridTypeComparisonTable");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataGridTypeComparisonTable); return this;
    }

    private grid: IgcDataGridComponent;
    private data: any[];

    private VerticalHeader: IgcTemplateHeaderComponent;
    private HorizontalRightHeader: IgcTemplateHeaderComponent;
    private HorizontalLeftHeader: IgcTemplateHeaderComponent;
    public cellSize: number = 50;

    public genders: string[] = ["male", "female"];
    public maleNames: string[] = ["Kyle", "Oscar", "Ralph", "Mike", "Bill", "Frank", "Howard", "Jack", "Larry", "Pete", "Steve", "Vince", "Mark", "Alex", "Max", "Brian", "Chris", "Andrew", "Martin", "Mike", "Steve", "Glenn", "Bruce"];
    public femaleNames: string[] = ["Gina", "Irene", "Katie", "Brenda", "Casey", "Fiona", "Holly", "Kate", "Liz", "Pamela", "Nelly", "Marisa", "Monica", "Anna", "Jessica", "Sofia", "Isabella", "Margo", "Jane", "Audrey", "Sally", "Melanie", "Greta", "Aurora", "Sally"];
    public lastNames: string[] = ["Adams", "Crowley", "Ellis", "Martinez", "Irvine", "Maxwell", "Clark", "Owens", "Rooney", "Lincoln", "Thomas", "Spacey", "Betts", "King", "Newton", "Fitzgerald", "Holmes", "Jefferson", "Landry", "Newberry", "Perez", "Spencer", "Starr", "Carter", "Edwards", "Stark", "Johnson", "Fitz", "Chief", "Blanc", "Perry", "Stone", "Williams", "Lane", "Jobs", "Adama", "Power", "Tesla"];
    public skillNames = ["JavaScript", "Angular", "React", "CSharp", "CPP", "Swift", "VB", "Python", "Ruby", "XAML"];

    constructor() {
        super();

        this.onCellUpdating = this.onCellUpdating.bind(this);
        this.onVerticalHeaderUpdating = this.onVerticalHeaderUpdating.bind(this);
        this.onHorizontalHeaderUpdating = this.onHorizontalHeaderUpdating.bind(this);
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

        for (const name of this.skillNames) {
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

        const skillColumn = document.getElementById("skillColumn") as IgcNumericColumnComponent;
        skillColumn.header = this.HorizontalLeftHeader;
        skillColumn.border = "lightgray";
        skillColumn.borderTopWidth = 0;
        skillColumn.borderBottomWidth = 0;

        this.grid = document.getElementById("grid") as IgcDataGridComponent;
        this.grid.dataSource = this.data;
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
            cell.style.textAlign = "center";
            cell.style.fontFamily = "Verdana";
            cell.style.fontSize = "x-large";
            cell.style.color = "#fdb417";
            content.appendChild(cell);
        } else {
            cell = content.children[0] as HTMLDivElement;
        }

        if (info.value) {
            cell.textContent = "\u2605";
        } else {
            cell.textContent = "";
        }
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

    public createData() {

        this.data = [];
        for (let row = 0; row < 20; row++) {

            const person: any = {};
            person.ID = row;
            person.Gender = this.getRandomGender();
            person.FirstName = this.getRandomNameFirst(person.Gender);
            person.LastName = this.getRandomNameLast();
            person.Name = person.FirstName + " " + person.LastName;
            person.Skills = 0;
            // generating experience level for all skills
            for (let c = 0; c < this.skillNames.length; c++) {
                const month = this.skillNames[c];
                const rand = Math.random();
                person[month] = rand > 0.65;
                person.Skills += rand > 0.65 ? 1 : 0;
            }
            this.data.push(person);
        }

        this.data.sort(this.compareData);
    }

    public compareData(a: any, b: any): number {
        if (a.Name < b.Name) {
            return 1;
        }
        if (a.Name > b.Name) {
            return -1;
        }
        return 0;
    }

    public getRandomGender(): string {
        return this.getRandomItem(this.genders);
    }
    public getRandomNameLast(): string {
        return this.getRandomItem(this.lastNames);
    }

    public getRandomNameFirst(gender: string): string {
        if (gender === "male") {
            return this.getRandomItem(this.maleNames);
        }
        else {
            return this.getRandomItem(this.femaleNames);
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