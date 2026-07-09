import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import NwindData from './NwindData.json';


// Lazy style imports: CSS is not injected on import, but exposes .use()/.unuse() for runtime theme switching
import lightBootstrap from '!!style-loader?{"injectType":"lazyStyleTag"}!css-loader!igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';
import lightMaterial from '!!style-loader?{"injectType":"lazyStyleTag"}!css-loader!igniteui-webcomponents-grids/grids/themes/light/material.css';
import lightFluent from '!!style-loader?{"injectType":"lazyStyleTag"}!css-loader!igniteui-webcomponents-grids/grids/themes/light/fluent.css';
import lightIndigo from '!!style-loader?{"injectType":"lazyStyleTag"}!css-loader!igniteui-webcomponents-grids/grids/themes/light/indigo.css';
import darkBootstrap from '!!style-loader?{"injectType":"lazyStyleTag"}!css-loader!igniteui-webcomponents-grids/grids/themes/dark/bootstrap.css';
import darkMaterial from '!!style-loader?{"injectType":"lazyStyleTag"}!css-loader!igniteui-webcomponents-grids/grids/themes/dark/material.css';
import darkFluent from '!!style-loader?{"injectType":"lazyStyleTag"}!css-loader!igniteui-webcomponents-grids/grids/themes/dark/fluent.css';
import darkIndigo from '!!style-loader?{"injectType":"lazyStyleTag"}!css-loader!igniteui-webcomponents-grids/grids/themes/dark/indigo.css';

import "./index.css";

interface LazyStyle {
    use: () => void;
    unuse: () => void;
}

const themes: { [key: string]: { css: LazyStyle; dark: boolean } } = {
    'light-bootstrap': { css: lightBootstrap, dark: false },
    'light-material': { css: lightMaterial, dark: false },
    'light-fluent': { css: lightFluent, dark: false },
    'light-indigo': { css: lightIndigo, dark: false },
    'dark-bootstrap': { css: darkBootstrap, dark: true },
    'dark-material': { css: darkMaterial, dark: true },
    'dark-fluent': { css: darkFluent, dark: true },
    'dark-indigo': { css: darkIndigo, dark: true },
};

export class Sample {

    private grid: IgcGridComponent;
    private _bind: () => void;
    private currentTheme: string;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
        var container = document.querySelector('.container.sample') as HTMLElement;

        this.currentTheme = themeSelect.value;

        this._bind = () => {
            grid.data = this.nwindData;
        }
        this._bind();

        themes[this.currentTheme].css.use();

        themeSelect.addEventListener('change', (event: Event) => {
            const newTheme = (event.target as HTMLSelectElement).value;
            themes[this.currentTheme].css.unuse();
            themes[newTheme].css.use();

            if (themes[newTheme].dark) {
                container.classList.add('container--dark');
            } else {
                container.classList.remove('container--dark');
            }

            this.currentTheme = newTheme;
        });
    }

    private _nwindData: any[] = NwindData;
    public get nwindData(): any[] {
        return this._nwindData;
    }
}

new Sample();
