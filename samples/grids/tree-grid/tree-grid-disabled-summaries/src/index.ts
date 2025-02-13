import "igniteui-webcomponents-grids/grids/combined";
import { defineComponents, IgcButtonComponent, IgcDialogComponent, IgcCheckboxComponent } from "igniteui-webcomponents";
import { ComponentRenderer, WebGridDescriptionModule } from "igniteui-webcomponents-core";
import { IgcTreeGridComponent, IgcColumnComponent, IgcSummaryOperand, IgcSummaryResult } from "igniteui-webcomponents-grids/grids";
import { OrdersTreeData } from "./OrdersTreeData";
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcButtonComponent, IgcDialogComponent, IgcCheckboxComponent);

class UnitsSummary extends IgcSummaryOperand {
    constructor() {
        super();
    }

    operate(data?: any[], allData: any[] = [], fieldName: string = ""): IgcSummaryResult[] {
        const result: IgcSummaryResult[] = [];

        const values = allData.map((rec) => rec[fieldName]).filter((value) => value !== undefined && value !== null);
        const totalSum = values.reduce((sum, value) => sum + value, 0);
        const sortedValues = values.slice().sort((a, b) => a - b);
        const deliveredValues = allData
            .filter((rec) => rec["Delivered"])
            .map((rec) => rec[fieldName])
            .filter((value) => value !== undefined && value !== null);

        result.push({
            key: "count",
            label: "Count",
            summaryResult: allData.length
        });

        result.push({
            key: "min",
            label: "Min",
            summaryResult: values.length > 0 ? Math.min(...values) : "N/A"
        });

        result.push({
            key: "max",
            label: "Max",
            summaryResult: values.length > 0 ? Math.max(...values) : "N/A"
        });

        result.push({
            key: "sum",
            label: "Sum",
            summaryResult: totalSum
        });

        result.push({
            key: "average",
            label: "Average",
            summaryResult: values.length > 0 ? totalSum / values.length : "N/A"
        });

        result.push({
            key: "totalDelivered",
            label: "Total Units Delivered",
            summaryResult: deliveredValues.length > 0 ? deliveredValues.reduce((sum, value) => sum + value, 0) : "N/A" 
        });

        result.push({
            key: "medianUnits",
            label: "Median Units",
            summaryResult:
                values.length > 0
                    ? (() => {
                          const mid = Math.floor(sortedValues.length / 2);
                          return sortedValues.length % 2 !== 0 ? sortedValues[mid] : (sortedValues[mid - 1] + sortedValues[mid]) / 2;
                      })()
                    : "N/A"
        });

        result.push({
            key: "uniqueCount",
            label: "Count of Unique Unit Values",
            summaryResult: values.length > 0 ? new Set(values).size : "N/A"
        });

        result.push({
            key: "maxDifference",
            label: "Max Difference Between Units",
            summaryResult:
                values.length > 1
                    ? values.reduce((maxDiff, value, idx, arr) => {
                          if (idx === 0) return maxDiff;
                          const diff = Math.abs(value - arr[idx - 1]);
                          return Math.max(maxDiff, diff);
                      }, 0)
                    : "N/A"
        });

        return result;
    }
}

class DeliveredSummary extends IgcSummaryOperand {
    constructor() {
        super();
    }

    operate(data: any[] = [], allData: any[] = [], fieldName: string = ""): IgcSummaryResult[] {
        const result: IgcSummaryResult[] = [];

        result.push({
            key: "count",
            label: "Count",
            summaryResult: allData.length
        });

        result.push({
            key: "true",
            label: "True",
            summaryResult: allData.filter((item) => item[fieldName] === true).length
        });

        result.push({
            key: "false",
            label: "False",
            summaryResult: allData.filter((item) => item[fieldName] === false).length
        });

        return result;
    }
}

export class Sample {
    private treeGrid: IgcTreeGridComponent;
    private dialog: IgcDialogComponent;
    private _bind: () => void;
    private currentColumn: IgcColumnComponent | null = null;
    private summariesContainer: HTMLDivElement | null = null;
    private disableAllBtn!: HTMLButtonElement;
    private enableAllBtn!: HTMLButtonElement;

    constructor() {
        this.treeGrid = document.getElementById("treeGrid") as IgcTreeGridComponent;
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
            this.treeGrid.data = this.ordersTreeData;
            this.treeGrid.addEventListener("columnInit", this.handleColumnInit);
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

    private _ordersTreeData: OrdersTreeData | undefined;
    public get ordersTreeData(): OrdersTreeData {
        if (this._ordersTreeData == null) {
            this._ordersTreeData = new OrdersTreeData();
        }
        return this._ordersTreeData;
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
        if (args.detail.field === "Units") {
            args.detail.summaries = UnitsSummary;
        }
        if (args.detail.field === "Delivered") {
            args.detail.summaries = DeliveredSummary;
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
                return operand.operate([], this.treeGrid.data, this.currentColumn!.field);
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
                if (this.treeGrid && this.currentColumn) {
                    return operand.operate([], this.treeGrid.data, this.currentColumn.field).map((s: { key: any; }) => s.key);
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
        this.treeGrid.markForCheck();
    }

    public enableAllSummaries() {
        if (!this.currentColumn) return;
        this.currentColumn.disabledSummaries = [];
        this.updateCheckboxes();
        this.treeGrid.markForCheck();
    }
}

new Sample();
