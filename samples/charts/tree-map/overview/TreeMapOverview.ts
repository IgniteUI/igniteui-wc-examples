import { SampleBase } from "../../sample-base";
import { WorldHierarchicalData } from "../../../utilities/WorldHierarchicalData";

import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcTreemapModule } from 'igniteui-webcomponents-charts';
import { IgcTreemapComponent } from 'igniteui-webcomponents-charts';
import { TreemapFillScaleMode } from 'igniteui-webcomponents-charts';
import { TreemapLayoutType } from 'igniteui-webcomponents-charts';
import { TreemapOrientation } from 'igniteui-webcomponents-charts';

ModuleManager.register(IgcTreemapModule);

let templateHTML = `
<div class="sample-container">

    <div class="options" >
        <button style="width: 140px" id="buttonSliceVer" class="button">Slice Vertically</button>
        <button style="width: 140px" id="buttonSliceHor" class="button">Slice Horizontally</button>
        <button style="width: 140px" id="buttonSquared" class="button">Squarified</button>
    </div>
    <div class="options" style="margin-bottom: 10px;">
        <button style="width: 140px" id="buttonStripVer" class="button">Stripped Vertically</button>
        <button style="width: 140px" id="buttonStripHor" class="button">Stripped Horizontally</button>
    </div>

    <igc-treemap id="treeMap" width="100%" height="calc(100% - 75px)"
        layout-type="stripped"
        layout-orientation="horizontal"
        parent-id-member-path="parent"
        id-member-path="id"
        label-member-path="name"
        value-member-path="pop"
        transition-duration="500"
        root-title="Countries" >
    </igc-treemap>
</div>
`;

export class TreeMapOverview extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("TreeMapOverview");
    public static register(): any {
        window.customElements.define(this.htmlTagName, TreeMapOverview); return this;
    }

    private treeMap: IgcTreemapComponent;

    constructor() {
        super();
        this.onClickSliceVer = this.onClickSliceVer.bind(this);
        this.onClickSliceHor = this.onClickSliceHor.bind(this);

        this.onClickStripVer = this.onClickStripVer.bind(this);
        this.onClickStripHor = this.onClickStripHor.bind(this);

        this.onClickSquared = this.onClickSquared.bind(this);
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.treeMap = document.getElementById("treeMap") as IgcTreemapComponent;
        this.treeMap.dataSource = WorldHierarchicalData.getPopulation();
        this.treeMap.layoutType = TreemapLayoutType.Squarified;
        this.treeMap.fillScaleMode = TreemapFillScaleMode.Value;
        this.treeMap.fillScaleMinimumValue = 0;
        this.treeMap.fillScaleMaximumValue = 1500000000; // 1.5B
        this.treeMap.fillBrushes = "#4e62cf #8a58d6" as any;
        this.treeMap.isFillScaleLogarithmic = false;

        document.getElementById("buttonSliceVer").addEventListener("click", this.onClickSliceVer);
        document.getElementById("buttonSliceHor").addEventListener("click", this.onClickSliceHor);
        document.getElementById("buttonStripVer").addEventListener("click", this.onClickStripVer);
        document.getElementById("buttonStripHor").addEventListener("click", this.onClickStripHor);
        document.getElementById("buttonSquared").addEventListener("click", this.onClickSquared);
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