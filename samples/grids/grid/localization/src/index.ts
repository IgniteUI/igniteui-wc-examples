import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, registerI18n, setCurrentI18n } from 'igniteui-webcomponents-grids/grids';
import NwindData from './NwindData.json';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";
import {
    ResourceStringsBG,
    ResourceStringsCS,
    ResourceStringsDA,
    ResourceStringsDE,
    ResourceStringsES,
    ResourceStringsFR,
    ResourceStringsHU,
    ResourceStringsIT,
    ResourceStringsJA,
    ResourceStringsKO,
    ResourceStringsNB,
    ResourceStringsNL,
    ResourceStringsPL,
    ResourceStringsPT,
    ResourceStringsRO,
    ResourceStringsSV,
    ResourceStringsTR,
    ResourceStringsZHHANS,
    ResourceStringsZHHANT
} from 'igniteui-i18n-resources';

import { defineComponents, IgcSelectComponent, IgcSelectItemComponent, IgcInputComponent } from 'igniteui-webcomponents';

defineComponents(IgcSelectComponent, IgcSelectItemComponent, IgcInputComponent);

export class Sample {

    private grid: IgcGridComponent;

    private _bind: () => void;

    constructor() {
        const grid = this.grid = document.getElementById('grid') as IgcGridComponent;

        // Partial custom Hindi locale (same as Angular sample)
        const partialCustomHindi = {
            grid_summary_count: 'गणना',
            grid_summary_min: 'न्यून',
            grid_summary_max: 'अधिक',
            grid_summary_sum: 'योग',
            grid_summary_average: 'औसत'
        };

        // Register locales
        registerI18n(ResourceStringsBG, 'bg');
        registerI18n(ResourceStringsCS, 'cs');
        registerI18n(ResourceStringsDA, 'da');
        registerI18n(ResourceStringsDE, 'de');
        registerI18n(ResourceStringsES, 'es');
        registerI18n(ResourceStringsFR, 'fr');
        registerI18n(ResourceStringsHU, 'hu');
        registerI18n(ResourceStringsIT, 'it');
        registerI18n(ResourceStringsJA, 'ja');
        registerI18n(ResourceStringsKO, 'ko');
        registerI18n(ResourceStringsNB, 'nb');
        registerI18n(ResourceStringsNL, 'nl');
        registerI18n(ResourceStringsPL, 'pl');
        registerI18n(ResourceStringsPT, 'pt');
        registerI18n(ResourceStringsRO, 'ro');
        registerI18n(ResourceStringsSV, 'sv');
        registerI18n(ResourceStringsTR, 'tr');
        registerI18n(ResourceStringsZHHANS, 'zh-Hans');
        registerI18n(ResourceStringsZHHANT, 'zh-Hant');
        registerI18n(partialCustomHindi, 'hi');

        const localeSelect = document.getElementById('localeSelect') as IgcSelectComponent;

        const applyLocale = (locale: string) => {
          setCurrentI18n(locale);
          grid.locale = locale;
        };
        
        // Initial value reflecting the default locale
        const initialLocale = localeSelect.value || 'en';
        localeSelect.value = initialLocale;
        applyLocale(initialLocale);
        
        // User changes reaction
        localeSelect.addEventListener('igcChange', (e: CustomEvent) => {
          applyLocale(e.detail.value);
        });
        

        this._bind = () => {
            grid.data = this.nwindData;
        };
        this._bind();
    }

    private _nwindData: any[] = NwindData;
    public get nwindData(): any[] {
        return this._nwindData;
    }
}

new Sample();
