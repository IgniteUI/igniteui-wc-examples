import 'igniteui-webcomponents-grids/grids/combined';
import { defineComponents, IgcButtonComponent } from 'igniteui-webcomponents';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { createProductInfo, createUserSimple, ProductInfo, UserSimple } from './mock-data';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcButtonComponent);

type DataSources = ProductInfo | UserSimple;

export class Sample {

    private grid: IgcGridComponent;
    private switchButton: IgcButtonComponent;
    private dataType: "products" | "users" = "products";
    private generators = {
        products: createProductInfo,
        users: createUserSimple,
    };
    private _bind: () => void;

    constructor() {
        this.grid = document.getElementById('grid') as IgcGridComponent;
        this.switchButton = document.getElementById('switchButton') as IgcButtonComponent;

        this._bind = () => {
            this.grid.data = this.data;
            this.switchButton.addEventListener('click', () => this.switchData());
        }
        this._bind();

    }

    private data: DataSources[] = Array.from({ length: 50 }, () => createProductInfo()) as DataSources[];

    private switchData() {
        this.dataType = this.dataType === "products" ? "users" : "products";
        const generator = this.generators[this.dataType];
        this.grid.data = Array.from({ length: 50 }, () => generator()) as DataSources[];
    }

}

new Sample();
