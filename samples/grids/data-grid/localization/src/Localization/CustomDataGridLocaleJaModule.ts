import { Localization } from 'igniteui-webcomponents-core';
import { CustomDataGridLocaleJa } from './CustomDataGridLocaleJa';

export class CustomDataGridLocaleJaModule {
    public static register() : void {
        // If your browser language is JA then you should use "ja" after "DataGrid-".  The grid will automatically look for the correct
        // suffix based on what the browser language is.  This means you could force the grid to use the Japanese resources for whatever
        // the browser culture is by registering it for each language.
        
        //Localization.register("DataGrid-ja", new CustomDataGridLocaleJa());

        // This would force the grid to use the JA resource with the EN browser language.
        Localization.register("DataGrid-en", new CustomDataGridLocaleJa());
    }
}