// import { ExcelUtility } from './ExcelUtility';
// import { ModuleManager } from 'igniteui-webcomponents-core';
// import { Workbook } from 'igniteui-webcomponents-excel';
// import { WorkbookOptionsBase, WorkbookFormat } from 'igniteui-webcomponents-excel';

export class ExcelLibraryTables {

    constructor() {

        const button = document.getElementById('button1');
        button!.addEventListener('click', this.onButtonClick)
    }

    public onButtonClick = (e: any) => {
    }
}

let sample = new ExcelLibraryTables();
