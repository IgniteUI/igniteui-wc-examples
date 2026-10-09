import 'igniteui-webcomponents-grids/grids/combined';
import { IgcCellTemplateContext, IgcNumberSummaryOperand, IgcPivotConfiguration, IgcSummaryResult } from 'igniteui-webcomponents-grids/grids';
import {
    defineComponents,
    registerIconFromText,
    IgcAccordionComponent,
    IgcAvatarComponent,
    IgcButtonComponent,
    IgcButtonGroupComponent,
    IgcColorPickerComponent,
    IgcDialogComponent,
    IgcExpansionPanelComponent,
    IgcIconButtonComponent,
    IgcSwitchComponent,
    IgcToggleButtonComponent
} from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import { InvoicesData, EmployeesFlatAvatars, SingersData, PivotDataFlat } from './PlaygroundData';

import "igniteui-webcomponents-grids/grids/themes/light/material.css";
import "./index.css";

defineComponents(
    IgcAccordionComponent,
    IgcAvatarComponent,
    IgcButtonComponent,
    IgcButtonGroupComponent,
    IgcColorPickerComponent,
    IgcDialogComponent,
    IgcExpansionPanelComponent,
    IgcIconButtonComponent,
    IgcSwitchComponent,
    IgcToggleButtonComponent
);

const copyIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>';
const checkIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
const restartIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6 0 2.97-2.17 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93 0-4.42-3.58-8-8-8zm-6 8c0-1.65.67-3.15 1.76-4.24L6.34 7.34A8.014 8.014 0 0 0 4 13c0 4.08 3.05 7.44 7 7.93v-2.02c-2.83-.48-5-2.94-5-5.91z"/></svg>';

type TokenKey = 'background' | 'accentColor' | 'foreground' | 'headerBackground' | 'headerForeground';
type Preview = 'grid' | 'tree' | 'hierarchical' | 'pivot';

interface TokenDescriptor {
    key: TokenKey;
    cssVar: string;
}

class CompactSummary extends IgcNumberSummaryOperand {
    public operate(data?: any[]): IgcSummaryResult[] {
        return super.operate(data).filter((r: IgcSummaryResult) => r.key === 'count' || r.key === 'sum');
    }
}

const PRIMARY_TOKENS: TokenDescriptor[] = [
    { key: 'background', cssVar: '--ig-grid-background' },
    { key: 'accentColor', cssVar: '--ig-grid-accent-color' },
    { key: 'foreground', cssVar: '--ig-grid-foreground' }
];
const HEADER_TOKENS: TokenDescriptor[] = [
    { key: 'headerBackground', cssVar: '--ig-grid-header-background' },
    { key: 'headerForeground', cssVar: '--ig-grid-header-text-color' }
];
const ALL_TOKENS = [...PRIMARY_TOKENS, ...HEADER_TOKENS];

const EMPTY_COLORS: Record<TokenKey, string> = {
    background: '', accentColor: '', foreground: '', headerBackground: '', headerForeground: ''
};

const MANAGED_VARS = [
    ...ALL_TOKENS.map(token => token.cssVar),
    '--ig-grid-row-border-color',
    '--ig-grid-body-column-border-color-odd',
    '--ig-grid-body-column-border-color-even',
    '--ig-grid-row-even-background',
    '--ig-size',
    '--ig-radius-factor'
];

const HEADER_TEXT_ON_HEADER = 'hsla(from color(from var(--ig-grid-header-background) var(--y-contrast)) h 0 l/1)';
const DIVIDER = 'hsl(from color-mix(in srgb, var(--ig-grid-foreground) 16%, var(--ig-grid-background)) h s l/0.38)';
const ZEBRA = 'color-mix(in srgb, var(--ig-grid-foreground) 4%, var(--ig-grid-background))';
const NO_DIVIDER = 'var(--ig-grid-background)';

export class Sample {

    private colors: Record<TokenKey, string> = { ...EMPTY_COLORS };
    private size: 'small' | 'medium' | 'large' = 'medium';
    private radiusFactor = 0.4;
    private horizontalDividers = true;
    private verticalDividers = false;
    private zebra = false;
    private preview: Preview = 'grid';

    private seedColors: Partial<Record<TokenKey, string>> = {};
    private themeTokens: [string, string][] = [];

    private highlighter: { codeToHtml: (code: string, opts: { lang: string; theme: string }) => string } | null = null;

    private stage: HTMLElement;
    private colorFields: { key: TokenKey; picker: IgcColorPickerComponent; reset: IgcIconButtonComponent }[];
    private sizeGroup: IgcButtonGroupComponent;
    private roundnessGroup: IgcButtonGroupComponent;
    private horizontalSwitch: IgcSwitchComponent;
    private verticalSwitch: IgcSwitchComponent;
    private zebraSwitch: IgcSwitchComponent;
    private codeDialog: IgcDialogComponent;
    private copyButton: IgcIconButtonComponent;
    private cssCode: HTMLElement;

    public pivotConfig: IgcPivotConfiguration = {
        columns: [{ memberName: 'Product', memberFunction: (data: any) => data.ProductName, enabled: true }],
        rows: [{
            memberName: 'City',
            memberFunction: (data: any) => data.SellerCity,
            enabled: true,
            childLevel: { memberName: 'Seller', memberFunction: (data: any) => data.SellerName, enabled: true }
        }],
        values: [{
            member: 'NumberOfUnits',
            aggregate: { key: 'sum', aggregatorName: 'SUM', label: 'Sum' },
            enabled: true
        }],
        filters: null
    };

    constructor() {
        registerIconFromText('content_copy', copyIcon, 'material');
        registerIconFromText('check', checkIcon, 'material');
        registerIconFromText('restart_alt', restartIcon, 'material');

        this.stage = document.getElementById('stage');
        this.colorFields = ALL_TOKENS.map(({ key }) => ({
            key,
            picker: document.getElementById(`${key}Picker`) as IgcColorPickerComponent,
            reset: document.getElementById(`${key}Reset`) as IgcIconButtonComponent
        }));
        for (const { key, picker, reset } of this.colorFields) {
            picker.addEventListener('igcInput', (e: Event) => this.onColorChange(key, e));
            picker.addEventListener('igcChange', (e: Event) => this.onColorChange(key, e));
            reset.addEventListener('click', () => this.setColor(key, ''));
        }
        this.sizeGroup = document.getElementById('sizeGroup') as IgcButtonGroupComponent;
        this.roundnessGroup = document.getElementById('roundnessGroup') as IgcButtonGroupComponent;
        this.horizontalSwitch = document.getElementById('horizontalDividers') as IgcSwitchComponent;
        this.verticalSwitch = document.getElementById('verticalDividers') as IgcSwitchComponent;
        this.zebraSwitch = document.getElementById('zebra') as IgcSwitchComponent;
        this.codeDialog = document.getElementById('codeDialog') as IgcDialogComponent;
        this.copyButton = document.getElementById('copyButton') as IgcIconButtonComponent;
        this.cssCode = document.getElementById('cssCode');

        document.getElementById('previewGroup').addEventListener('igcSelect', (e: CustomEvent<string>) => {
            this.preview = e.detail as Preview;
            this.renderPreview();
        });
        this.sizeGroup.addEventListener('igcSelect', (e: CustomEvent<string>) => {
            this.size = e.detail as 'small' | 'medium' | 'large';
            this.update();
        });
        this.roundnessGroup.addEventListener('igcSelect', (e: CustomEvent<string>) => {
            this.radiusFactor = Number(e.detail);
            this.update();
        });
        this.horizontalSwitch.addEventListener('igcChange', () => {
            this.horizontalDividers = this.horizontalSwitch.checked;
            this.update();
        });
        this.verticalSwitch.addEventListener('igcChange', () => {
            this.verticalDividers = this.verticalSwitch.checked;
            this.update();
        });
        this.zebraSwitch.addEventListener('igcChange', () => {
            this.zebra = this.zebraSwitch.checked;
            this.update();
        });
        document.getElementById('resetButton').addEventListener('click', () => this.reset());
        document.getElementById('showCodeButton').addEventListener('click', () => this.showCode());
        document.getElementById('closeButton').addEventListener('click', () => this.codeDialog.hide());
        this.copyButton.addEventListener('click', () => this.copy());

        this.readCompiledTheme();
        this.seedFromStylesheet();
        this.colors = { ...this.colors, ...this.seedColors };

        this.renderPreview();
        this.update();
    }

    private _invoicesData: InvoicesData = null;
    public get invoicesData(): InvoicesData {
        if (this._invoicesData == null) {
            this._invoicesData = new InvoicesData();
        }
        return this._invoicesData;
    }

    private _employeesFlatAvatars: EmployeesFlatAvatars = null;
    public get employeesFlatAvatars(): EmployeesFlatAvatars {
        if (this._employeesFlatAvatars == null) {
            this._employeesFlatAvatars = new EmployeesFlatAvatars();
        }
        return this._employeesFlatAvatars;
    }

    private _singersData: SingersData = null;
    public get singersData(): SingersData {
        if (this._singersData == null) {
            this._singersData = new SingersData();
        }
        return this._singersData;
    }

    private _pivotDataFlat: PivotDataFlat = null;
    public get pivotDataFlat(): PivotDataFlat {
        if (this._pivotDataFlat == null) {
            this._pivotDataFlat = new PivotDataFlat();
        }
        return this._pivotDataFlat;
    }

    public get previewStyle(): Record<string, string> {
        const style: Record<string, string> = {};

        for (const token of ALL_TOKENS) {
            if (this.colors[token.key]) {
                style[token.cssVar] = this.colors[token.key];
            }
        }
        if (this.colors.headerBackground && !this.colors.headerForeground) {
            style['--ig-grid-header-text-color'] = HEADER_TEXT_ON_HEADER;
        }

        style['--ig-size'] = `var(--ig-size-${this.size})`;
        style['--ig-radius-factor'] = `${this.radiusFactor}`;
        style['--ig-grid-row-border-color'] = this.horizontalDividers ? DIVIDER : NO_DIVIDER;

        const columnRule = this.verticalDividers ? DIVIDER : NO_DIVIDER;
        style['--ig-grid-body-column-border-color-odd'] = columnRule;
        style['--ig-grid-body-column-border-color-even'] = columnRule;

        if (this.zebra) {
            style['--ig-grid-row-even-background'] = ZEBRA;
        }

        return style;
    }

    public get exportCss(): string {
        const overrides = this.previewStyle;
        const base = this.themeTokens;

        if (!base.length) {
            const lines = Object.entries(overrides).map(([name, value]) => `  ${name}: ${value};`);
            return `/* Overrides only -- requires a base grid theme to derive from. */\n.my-grid {\n${lines.join('\n')}\n}`;
        }

        const emitted = new Set<string>();
        const lines = base.map(([name, value]) => {
            emitted.add(name);
            return `  ${name}: ${overrides[name] ?? value};`;
        });
        const extras = Object.entries(overrides)
            .filter(([name]) => !emitted.has(name))
            .map(([name, value]) => `  ${name}: ${value};`);

        return `.my-grid {\n${[...extras, ...lines].join('\n')}\n}`;
    }

    public setColor(key: TokenKey, value: string): void {
        this.colors = { ...this.colors, [key]: value };
        this.update();
    }

    public reset(): void {
        this.colors = { ...EMPTY_COLORS, ...this.seedColors };
        this.size = 'medium';
        this.radiusFactor = 0.4;
        this.horizontalDividers = true;
        this.verticalDividers = false;
        this.zebra = false;

        this.sizeGroup.selectedItems = ['medium'];
        this.roundnessGroup.selectedItems = ['0.4'];
        this.horizontalSwitch.checked = true;
        this.verticalSwitch.checked = false;
        this.zebraSwitch.checked = false;

        this.update();
    }

    public async showCode(): Promise<void> {
        if (!this.highlighter) {
            const [core, engine, css, theme] = await Promise.all([
                import('shiki/core'),
                import('shiki/engine/javascript'),
                import('shiki/langs/css.mjs'),
                import('shiki/themes/dark-plus.mjs')
            ]);

            this.highlighter = await core.createHighlighterCore({
                themes: [theme.default],
                langs: [css.default],
                engine: engine.createJavaScriptRegexEngine()
            });
        }

        this.cssCode.innerHTML = this.highlighter.codeToHtml(this.exportCss, { lang: 'css', theme: 'dark-plus' });
        this.codeDialog.show();
    }

    public copy(): void {
        navigator.clipboard.writeText(this.exportCss).then(() => {
            this.setCopied(true);
            setTimeout(() => this.setCopied(false), 2000);
        });
    }

    private setCopied(copied: boolean): void {
        this.copyButton.name = copied ? 'check' : 'content_copy';
        this.copyButton.title = copied ? 'Copied' : 'Copy code';
    }

    private update(): void {
        const style = this.previewStyle;

        for (const name of MANAGED_VARS) {
            if (style[name]) {
                this.stage.style.setProperty(name, style[name]);
            } else {
                this.stage.style.removeProperty(name);
            }
        }

        for (const { key, picker, reset } of this.colorFields) {
            if (picker.value !== this.colors[key]) {
                picker.value = this.colors[key];
            }
            reset.disabled = !this.colors[key];
        }
    }

    private onColorChange(key: TokenKey, event: Event): void {
        if (event.composedPath()[0] === event.currentTarget) {
            this.setColor(key, (event as CustomEvent<string>).detail);
        }
    }

    private renderPreview(): void {
        render(this.previewTemplate(), this.stage);
    }

    private previewTemplate() {
        switch (this.preview) {
            case 'grid':
                return html`
                    <igc-grid .data=${this.invoicesData} auto-generate="false" width="100%" height="100%"
                        allow-filtering="true" filter-mode="excelStyleFilter" row-selection="multiple">
                        <igc-column field="ShipCountry" header="Country" width="150px" sortable="true" filterable="true" groupable="true"></igc-column>
                        <igc-column field="ShipCity" header="City" width="150px" sortable="true" filterable="true" groupable="true"></igc-column>
                        <igc-column field="ShipName" header="Ship Name" width="220px" sortable="true" filterable="true"></igc-column>
                        <igc-column field="Salesperson" header="Salesperson" width="180px" sortable="true" filterable="true"></igc-column>
                        <igc-column field="Quantity" header="Quantity" width="120px" data-type="number"
                            sortable="true" has-summary="true" .summaries=${CompactSummary}></igc-column>
                        <igc-paginator per-page="50"></igc-paginator>
                    </igc-grid>`;
            case 'tree':
                return html`
                    <igc-tree-grid .data=${this.employeesFlatAvatars} primary-key="ID" foreign-key="ParentID"
                        auto-generate="false" width="100%" height="100%"
                        allow-filtering="true" filter-mode="excelStyleFilter" row-selection="multiple">
                        <igc-column field="Name" width="260px" sortable="true" filterable="true"
                            .bodyTemplate=${this.avatarCellTemplate}></igc-column>
                        <igc-column field="Title" data-type="string" sortable="true" filterable="true"></igc-column>
                        <igc-column field="Age" data-type="number" sortable="true" filterable="true"></igc-column>
                        <igc-column field="HireDate" data-type="date" sortable="true" filterable="true"></igc-column>
                    </igc-tree-grid>`;
            case 'hierarchical':
                return html`
                    <igc-hierarchical-grid .data=${this.singersData} auto-generate="false" width="100%" height="100%"
                        allow-filtering="true" filter-mode="excelStyleFilter">
                        <igc-column field="Artist" sortable="true" filterable="true"></igc-column>
                        <igc-column field="Debut" data-type="number" sortable="true" filterable="true"></igc-column>
                        <igc-column field="GrammyNominations" header="Nominations" sortable="true" filterable="true"></igc-column>
                        <igc-column field="GrammyAwards" header="Awards" sortable="true" filterable="true"></igc-column>
                        <igc-row-island child-data-key="Albums" auto-generate="false" .height=${null}>
                            <igc-column field="Album" sortable="true"></igc-column>
                            <igc-column field="LaunchDate" header="Launch Date" data-type="date" sortable="true"></igc-column>
                            <igc-column field="BillboardReview" header="Review" sortable="true"></igc-column>
                        </igc-row-island>
                    </igc-hierarchical-grid>`;
            case 'pivot':
                return html`
                    <igc-pivot-grid .data=${this.pivotDataFlat} .pivotConfiguration=${this.pivotConfig}
                        width="100%" height="100%" allow-filtering="true" filter-mode="excelStyleFilter">
                    </igc-pivot-grid>`;
        }
    }

    public avatarCellTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<div class="playground__cell">
            <igc-avatar src="${ctx.cell.row.data.Avatar}" shape="circle"></igc-avatar>
            <span>${ctx.cell.value}</span>
        </div>`;
    };

    private readCompiledTheme(): void {
        const tokens = new Map<string, string>();

        for (const sheet of Array.from(document.styleSheets)) {
            let rules: CSSRuleList;

            try {
                rules = sheet.cssRules;
            } catch {
                continue;
            }

            for (const rule of Array.from(rules)) {
                if (!(rule instanceof CSSStyleRule) || !rule.selectorText.includes('playground__stage')) {
                    continue;
                }

                for (let i = 0; i < rule.style.length; i++) {
                    const name = rule.style.item(i);
                    if (name.startsWith('--ig-')) {
                        tokens.set(name, rule.style.getPropertyValue(name).trim());
                    }
                }
            }
        }

        this.themeTokens = Array.from(tokens);
    }

    private seedFromStylesheet(): void {
        const styles = getComputedStyle(this.stage);

        this.seedColors = {
            background: styles.getPropertyValue('--ig-grid-background').trim(),
            accentColor: styles.getPropertyValue('--ig-grid-accent-color').trim()
        };
    }
}

new Sample();
