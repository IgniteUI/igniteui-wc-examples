import "igniteui-webcomponents-grids/grids/combined";
import { defineComponents, IgcButtonComponent, IgcDialogComponent, IgcCheckboxComponent } from "igniteui-webcomponents";
import { ComponentRenderer, WebGridDescriptionModule } from "igniteui-webcomponents-core";
import { IgcHierarchicalGridComponent, IgcColumnComponent, IgcSummaryOperand, IgcSummaryResult, IgcNumberSummaryOperand } from "igniteui-webcomponents-grids/grids";
import SingersData from "./SingersData.json";
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcButtonComponent, IgcDialogComponent, IgcCheckboxComponent);

class GrammySummary extends IgcSummaryOperand {
    constructor() {
        super();
    }

    operate(data?: any[], allData: any[] = [], fieldName: string = ""): IgcSummaryResult[] {
        const result: IgcSummaryResult[] = [];

        result.push({
            key: "count",
            label: "Count",
            summaryResult: allData.filter((rec) => rec["Artist"] !== undefined && rec["Artist"] !== null && rec["Artist"] !== "").length
        });

        result.push({
            key: "nominatedSingers",
            label: "Nominated Singers",
            summaryResult: allData.filter((rec) => rec["GrammyNominations"] > 0).length
        });

        result.push({
            key: "singersWithAwards",
            label: "Singers with Awards",
            summaryResult: allData.filter((rec) => rec["GrammyAwards"] > 0).length
        });

        result.push({
            key: "nominations",
            label: "Total Nominations",
            summaryResult: IgcNumberSummaryOperand.sum(allData.map((r) => r["GrammyNominations"] || 0))
        });

        result.push({
            key: "awards",
            label: "Total Awards",
            summaryResult: IgcNumberSummaryOperand.sum(allData.map((r) => r["GrammyAwards"] || 0))
        });

        return result;
    }
}

export class Sample {
    private hierarchicalGrid: IgcHierarchicalGridComponent;
    private dialog: IgcDialogComponent;
    private _bind: () => void;
    private currentColumn: IgcColumnComponent | null = null;
    private summariesContainer: HTMLDivElement | null = null;
    private disableAllBtn!: HTMLButtonElement;
    private enableAllBtn!: HTMLButtonElement;

    constructor() {
        this.hierarchicalGrid = document.getElementById("hierarchicalGrid") as IgcHierarchicalGridComponent;
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
            this.hierarchicalGrid.data = this.singersData;
            this.hierarchicalGrid.addEventListener("columnInit", this.handleColumnInit);
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

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
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
        if (args.detail.field === "Photo") {
            args.detail.summaries = GrammySummary;
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
                return operand.operate([], this.hierarchicalGrid.data, this.currentColumn!.field);
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
                if (this.hierarchicalGrid && this.currentColumn) {
                    return operand.operate([], this.hierarchicalGrid.data, this.currentColumn.field).map((s: { key: any; }) => s.key);
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
        this.hierarchicalGrid.markForCheck();
    }

    public enableAllSummaries() {
        if (!this.currentColumn) return;
        this.currentColumn.disabledSummaries = [];
        this.updateCheckboxes();
        this.hierarchicalGrid.markForCheck();
    }
}

export function initialize() {
  return new Sample();
}