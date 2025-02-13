import "igniteui-webcomponents-grids/grids/combined";
import { defineComponents, IgcButtonComponent, IgcDialogComponent, IgcCheckboxComponent } from "igniteui-webcomponents";
import { ComponentRenderer, WebGridDescriptionModule } from "igniteui-webcomponents-core";
import { IgcGridComponent, IgcColumnComponent, IgcSummaryOperand, IgcSummaryResult } from "igniteui-webcomponents-grids/grids";
import { NwindData } from "./NwindData";
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcButtonComponent, IgcDialogComponent, IgcCheckboxComponent);

class UnitsInStockSummary extends IgcSummaryOperand {
    constructor() {
        super();
    }
    operate(data: any[] = [], allData: any[] = [], fieldName: string = "", summaryResult: any = null): IgcSummaryResult[] {
        const result: IgcSummaryResult[] = [];
        const values = allData.map((item) => item[fieldName] ?? 0).filter((value) => value !== null);

        const discontinuedItems = allData.filter((item) => item["Discontinued"] === true);
        const discontinuedValues = discontinuedItems.map((item) => item[fieldName] ?? 0).filter((value) => !isNaN(value));

        result.push({ key: "count", label: "Count", summaryResult: values.length });
        result.push({ key: "min", label: "Min", summaryResult: values.length > 0 ? Math.min(...values) : "N/A" });
        result.push({ key: "max", label: "Max", summaryResult: values.length > 0 ? Math.max(...values) : "N/A" });
        result.push({ key: "sum", label: "Sum", summaryResult: values.reduce((a, b) => a + b, 0) });
        result.push({
            key: "average",
            label: "Average",
            summaryResult: values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : "N/A"
        });
        result.push({
            key: "median",
            label: "Median",
            summaryResult:
                values.length > 0
                    ? (() => {
                          const sortedValues = values.slice().sort((a, b) => a - b);
                          return sortedValues.length % 2 === 0 ? (sortedValues[sortedValues.length / 2 - 1] + sortedValues[sortedValues.length / 2]) / 2 : sortedValues[Math.floor(sortedValues.length / 2)];
                      })()
                    : "N/A"
        });
        result.push({ key: "range", label: "Range", summaryResult: values.length > 0 ? Math.max(...values) - Math.min(...values) : "N/A" });
        result.push({ key: "discontinued", label: "Discontinued Products", summaryResult: discontinuedItems.length });
        result.push({ key: "totalDiscontinued", label: "Total Discontinued Items", summaryResult: discontinuedValues.length > 0 ? discontinuedValues.reduce((a, b) => a + b, 0) : 0 });

        return result;
    }
}

class DiscontinuedSummary extends IgcSummaryOperand {
    constructor() {
        super();
    }
    operate(data: any[] = [], allData: any[] = [], fieldName: string = ""): IgcSummaryResult[] {
        const result: IgcSummaryResult[] = [];
        result.push({ key: "count", label: "Count", summaryResult: allData.length });
        result.push({ key: "true", label: "True", summaryResult: allData.filter((item) => item[fieldName] === true).length });
        result.push({ key: "false", label: "False", summaryResult: allData.filter((item) => item[fieldName] === false).length });
        return result;
    }
}

export class Sample {
    private grid: IgcGridComponent;
    private dialog: IgcDialogComponent;
    private _bind: () => void;
    private currentColumn: IgcColumnComponent | null = null;
    private summariesContainer: HTMLDivElement | null = null;
    private disableAllBtn!: HTMLButtonElement;
    private enableAllBtn!: HTMLButtonElement;

    constructor() {
        this.grid = document.getElementById("grid") as IgcGridComponent;
        this.dialog = document.getElementById("dialog") as IgcDialogComponent;
        this.dialog.closeOnOutsideClick = true;
        this.dialog.keepOpenOnEscape = false;

        this.summariesContainer = document.querySelector(".summaries");

        if (this.summariesContainer) {
            const title = document.createElement("p");
            title.classList.add("summaries-title");
            title.textContent = "Disable Summaries for Column:";
            this.summariesContainer.appendChild(title);
        }

        this.disableAllBtn = document.getElementById("disableAllBtn") as HTMLButtonElement;
        this.enableAllBtn = document.getElementById("enableAllBtn") as HTMLButtonElement;

        this.webGridCustomSummary = this.webGridCustomSummary.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.toggleSummary = this.toggleSummary.bind(this);
        this.disableAllSummaries = this.disableAllSummaries.bind(this);
        this.enableAllSummaries = this.enableAllSummaries.bind(this);
        this.handleColumnInit = this.handleColumnInit.bind(this);
        this.updateCheckboxes = this.updateCheckboxes.bind(this);

        this._bind = () => {
            this.grid.data = this.nwindData;
            this.grid.addEventListener("columnInit", this.handleColumnInit);
            document.getElementById("disableAllBtn")!.addEventListener("click", this.disableAllSummaries);
            document.getElementById("enableAllBtn")!.addEventListener("click", this.enableAllSummaries);
        };
        this._bind();
    }

    private handleColumnInit(event: any) {
        this.webGridCustomSummary(event);
        const column: IgcColumnComponent = event.detail;

        if (!this.summariesContainer) return;

        const button = document.createElement("igc-button");
        button.classList.add("summary-button");
        button.textContent = column.header ? column.header.toString() : column.field;
        button.setAttribute("variant", "contained");
        button.addEventListener("click", () => this.openDialog(column));
        this.summariesContainer.appendChild(button);
    }

    private _nwindData: NwindData | undefined;
    public get nwindData(): NwindData {
        if (this._nwindData == null) {
            this._nwindData = new NwindData();
        }
        return this._nwindData;
    }

    private _componentRenderer: ComponentRenderer | undefined;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            WebGridDescriptionModule.register(this._componentRenderer.context);
        }
        return this._componentRenderer;
    }

    public webGridCustomSummary(args: any): void {
        if (args.detail.field === "UnitsInStock") {
            args.detail.summaries = UnitsInStockSummary;
        }
        if (args.detail.field === "Discontinued") {
            args.detail.summaries = DiscontinuedSummary;
        }
    }

    private updateCheckboxes() {
        if (!this.currentColumn) return;

        const dialogItemsContainer = this.dialog.querySelector(".summaries-dialog-items")!;
        dialogItemsContainer.innerHTML = "";

        let allSummaries: IgcSummaryResult[] = [];

        const getSummaryResults = (operand: any): IgcSummaryResult[] => {
            if (typeof operand === "function") {
                operand = new operand();
            }
            if (operand instanceof IgcSummaryOperand) {
                return operand.operate([], this.grid.data, this.currentColumn!.field);
            }
            return [];
        };

        if (!this.currentColumn.summaries) {
            const defaultOperand = IgcSummaryOperand;
            allSummaries = getSummaryResults(defaultOperand);
        } else {
            allSummaries = getSummaryResults(this.currentColumn.summaries);
        }

        let allDisabled = true;
        let allEnabled = true;

        allSummaries.forEach((summary) => {
            const checkbox = document.createElement("igc-checkbox") as IgcCheckboxComponent;
            checkbox.classList.add("summaries-dialog-item");
            checkbox.textContent = summary.label;
            const isDisabled = this.currentColumn!.disabledSummaries?.includes(summary.key);
            checkbox.checked = isDisabled;

            if (isDisabled) {
                allEnabled = false;
            } else {
                allDisabled = false;
            }

            checkbox.addEventListener("click", () => this.toggleSummary(summary.key));
            dialogItemsContainer.appendChild(checkbox);
        });

        this.disableAllBtn.disabled = allDisabled;
        this.enableAllBtn.disabled = allEnabled;
    }

    public openDialog(column: IgcColumnComponent) {
        this.currentColumn = column;
        this.dialog.title = `Disable Summaries for ${column.header || column.field}`;
        this.updateCheckboxes();
        this.dialog.show();
    }

    public toggleSummary(summaryKey: string) {
        if (!this.currentColumn) return;

        if (!this.currentColumn.disabledSummaries) {
            this.currentColumn.disabledSummaries = [];
        }

        if (this.currentColumn.disabledSummaries.includes(summaryKey)) {
            this.currentColumn.disabledSummaries = this.currentColumn.disabledSummaries.filter((key: string) => key !== summaryKey);
        } else {
            this.currentColumn.disabledSummaries = [...this.currentColumn.disabledSummaries, summaryKey];
        }

        this.updateCheckboxes();
    }

    public disableAllSummaries() {
        if (!this.currentColumn) return;

        let allSummaryKeys: string[] = [];

        const getSummaryKeys = (operand: any): string[] => {
            if (typeof operand === "function") {
                operand = new operand();
            }
            if (operand instanceof IgcSummaryOperand) {
                if (this.grid && this.currentColumn) {
                    return operand.operate([], this.grid.data, this.currentColumn.field).map((s: { key: any; }) => s.key);
                }
                return [];
            }
            return [];
        };

        if (!this.currentColumn.summaries) {
            const defaultOperand = IgcSummaryOperand;
            allSummaryKeys = getSummaryKeys(defaultOperand);
        } else {
            allSummaryKeys = getSummaryKeys(this.currentColumn.summaries);
        }

        this.currentColumn.disabledSummaries = allSummaryKeys;
        this.updateCheckboxes();
        this.grid.markForCheck();
    }

    public enableAllSummaries() {
        if (!this.currentColumn) return;
        this.currentColumn.disabledSummaries = [];
        this.updateCheckboxes();
        this.grid.markForCheck();
    }
}

new Sample();
