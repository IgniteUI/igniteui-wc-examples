import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { AthletesDataItem, AthletesData } from './AthletesData';
import { defineComponents, IgcButtonComponent, IgcIconComponent, registerIconFromText } from "igniteui-webcomponents";
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
defineComponents(IgcButtonComponent, IgcIconComponent);
export class Sample {

    private grid1: IgcGridComponent
    private _bind: () => void;

    constructor() {
        var icon = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>`;
        registerIconFromText("clear", icon, "material");
        var grid1 = this.grid1 = document.getElementById('grid1') as IgcGridComponent;
        grid1.data = this.athletesData;
        var button = document.getElementById('clearButton') as IgcButtonComponent;
        button.addEventListener("click", () => {
            grid1.clearSort();
        });
    }

    private _athletesData: AthletesData = null;
    public get athletesData(): AthletesData {
        if (this._athletesData == null)
        {
            this._athletesData = new AthletesData();
        }
        return this._athletesData;
    }
}

new Sample();
