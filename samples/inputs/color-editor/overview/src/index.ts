import { IgcColorEditorModule } from 'igniteui-webcomponents-inputs';
import { IgcColorEditorComponent } from 'igniteui-webcomponents-inputs';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcColorEditorModule
);

export class Sample {

    private colorEditor: IgcColorEditorComponent

    constructor() {
        var colorEditor = this.colorEditor = document.getElementById('colorEditor') as IgcColorEditorComponent;

    }

}

export function initialize() {
  return new Sample();
}