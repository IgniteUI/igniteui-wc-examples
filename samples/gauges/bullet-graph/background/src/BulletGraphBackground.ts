


import { IgcBulletGraphModule } from 'igniteui-webcomponents-gauges';
import { IgcBulletGraphComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcBulletGraphModule);


export class BulletGraphBackground {


    
    
        

    private gauge: IgcBulletGraphComponent;

    constructor() {
        
    }

    constructor() {
        

        this.gauge = document.getElementById('gauge') as IgcBulletGraphComponent;
    }

}

let sample = new BulletGraphBackground();