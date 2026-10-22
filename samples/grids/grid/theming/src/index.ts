import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcColumnComponent, IgcNumberSummaryOperand, IgcSummaryResult } from 'igniteui-webcomponents-grids/grids';
import { defineComponents, IgcButtonGroupComponent, IgcToggleButtonComponent } from 'igniteui-webcomponents';
import { InvoicesData } from './InvoicesData';

import "igniteui-webcomponents-grids/grids/themes/light/material.css";
import "./index.css";

defineComponents(IgcButtonGroupComponent, IgcToggleButtonComponent);

class CompactSummary extends IgcNumberSummaryOperand {
    public operate(data?: any[]): IgcSummaryResult[] {
        return super.operate(data).filter((r: IgcSummaryResult) => r.key === 'count' || r.key === 'sum');
    }
}

export class Sample {

    private grid: IgcGridComponent;
    private unitPrice: IgcColumnComponent;
    private themeSwitcher: IgcButtonGroupComponent;
    private activeTheme = 'theme-studio';
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var unitPrice = this.unitPrice = document.getElementById('unitPrice') as IgcColumnComponent;
        var themeSwitcher = this.themeSwitcher = document.getElementById('themeSwitcher') as IgcButtonGroupComponent;

        this._bind = () => {
            grid.data = this.invoicesData;
            unitPrice.formatter = this.formatCurrency;
            unitPrice.summaries = CompactSummary;
            themeSwitcher.addEventListener('igcSelect', (e: CustomEvent<string>) => this.selectTheme(e.detail));
        }
        this._bind();
    }

    private _invoicesData: InvoicesData = null;
    public get invoicesData(): InvoicesData {
        if (this._invoicesData == null)
        {
            this._invoicesData = new InvoicesData();
        }
        return this._invoicesData;
    }

    public selectTheme(theme: string): void {
        this.grid.classList.replace(this.activeTheme, theme);
        this.activeTheme = theme;
    }

    public formatCurrency(value: number): string {
        return '$' + value.toFixed(2);
    }
}

new Sample();
