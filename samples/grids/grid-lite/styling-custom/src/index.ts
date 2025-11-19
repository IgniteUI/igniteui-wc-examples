import 'igniteui-webcomponents-grids/grids/combined';
import { defineComponents, IgcCheckboxComponent, IgcSwitchComponent } from 'igniteui-webcomponents';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, render } from 'lit-html';
import { createUser, User } from './mock-data';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcCheckboxComponent, IgcSwitchComponent);

export class Sample {

    private grid: IgcGridComponent;
    private activeColumn: IgcColumnComponent;
    private controls: HTMLElement;
    private theme: 'dark' | 'light' = 'dark';
    private _bind: () => void;

    constructor() {
        this.grid = document.getElementById('grid') as IgcGridComponent;
        this.activeColumn = document.getElementById('activeColumn') as IgcColumnComponent;
        this.controls = document.getElementById('controls') as HTMLElement;

        this._bind = () => {
            this.grid.data = this.data;
            this.activeColumn.bodyTemplate = this.activeTemplate;
            this.renderControls();
            this.applyTheme();
        }
        this._bind();

    }

    private data: User[] = Array.from({ length: 50 }, () => createUser());

    public activeTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<igc-checkbox .checked=${ctx.cell.value}></igc-checkbox>`;
    }

    private renderControls() {
        const nextTheme = this.theme === 'dark' ? 'light' : 'dark';
        const controlsContent = html`
            <igc-switch
                @igcChange=${() => this.switchTheme()}
                label-position="before">
                Switch to ${nextTheme} theme
            </igc-switch>
        `;
        render(controlsContent, this.controls);
    }

    private switchTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme();
        this.renderControls();
    }

    private applyTheme() {
        this.grid.classList.remove('custom-light', 'custom-dark');
        this.grid.classList.add(`custom-${this.theme}`);
    }

}

new Sample();
