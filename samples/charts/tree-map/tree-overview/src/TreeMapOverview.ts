
import { SampleTreeData } from './SampleTreeData';

import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcTreemapModule } from 'igniteui-webcomponents-charts';
import { IgcTreemapComponent } from 'igniteui-webcomponents-charts';
import { TreemapFillScaleMode } from 'igniteui-webcomponents-charts';
import { TreemapLayoutType } from 'igniteui-webcomponents-charts';
import { TreemapOrientation } from 'igniteui-webcomponents-charts';

ModuleManager.register(IgcTreemapModule);


export class TreeMapOverview {


    
    
        

    private treeMap: IgcTreemapComponent;

    constructor() {
        
        this.onClickSliceVer = this.onClickSliceVer.bind(this);
        this.onClickSliceHor = this.onClickSliceHor.bind(this);

        this.onClickStripVer = this.onClickStripVer.bind(this);
        this.onClickStripHor = this.onClickStripHor.bind(this);

        this.onClickSquared = this.onClickSquared.bind(this);
    
        

        this.treeMap = document.getElementById('treeMap') as IgcTreemapComponent;
        this.treeMap.dataSource = SampleTreeData.getPopulation();
        this.treeMap.layoutType = TreemapLayoutType.Squarified;
        this.treeMap.fillScaleMode = TreemapFillScaleMode.Value;
        this.treeMap.fillScaleMinimumValue = 0;
        this.treeMap.fillScaleMaximumValue = 1500000000; // 1.5B
        this.treeMap.fillBrushes = '#4e62cf #8a58d6' as any;
        this.treeMap.isFillScaleLogarithmic = false;

        document.getElementById('buttonSliceVer').addEventListener('click', this.onClickSliceVer);
        document.getElementById('buttonSliceHor').addEventListener('click', this.onClickSliceHor);
        document.getElementById('buttonStripVer').addEventListener('click', this.onClickStripVer);
        document.getElementById('buttonStripHor').addEventListener('click', this.onClickStripHor);
        document.getElementById('buttonSquared').addEventListener('click', this.onClickSquared);
    }

    public onClickSquared = (e: any) => {
        this.treeMap.layoutType = TreemapLayoutType.Squarified;
    }

    public onClickSliceVer = (e: any) => {
        this.treeMap.layoutType = TreemapLayoutType.SliceAndDice;
        this.treeMap.layoutOrientation = TreemapOrientation.Vertical;
    }
    public onClickSliceHor = (e: any) => {
        this.treeMap.layoutType = TreemapLayoutType.SliceAndDice;
        this.treeMap.layoutOrientation = TreemapOrientation.Horizontal;
    }

    public onClickStripVer = (e: any) => {
        this.treeMap.layoutType = TreemapLayoutType.Stripped;
        this.treeMap.layoutOrientation = TreemapOrientation.Vertical;
    }
    public onClickStripHor = (e: any) => {
        this.treeMap.layoutType = TreemapLayoutType.Stripped;
        this.treeMap.layoutOrientation = TreemapOrientation.Horizontal;
    }


}

let sample = new TreeMapOverview();