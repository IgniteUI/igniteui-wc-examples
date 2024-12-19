import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcTreemapModule, IgcTreemapNodePointerEventArgs } from 'igniteui-webcomponents-charts';
import { IgcTreemapComponent } from 'igniteui-webcomponents-charts';
import { SampleData } from './SampleData';

ModuleManager.register(IgcTreemapModule);

export class TreeMapEvents {
    private treeMap: IgcTreemapComponent;
    private hoveredNodeParent: HTMLLabelElement;
    private hoveredNodeName: HTMLLabelElement;
    private hoveredNodeValue: HTMLLabelElement;
    private selectedNodeParent: HTMLLabelElement;
    private selectedNodeName: HTMLLabelElement;
    private selectedNodeValue: HTMLLabelElement;

    constructor() {
        this.onNodePointerEnter = this.onNodePointerEnter.bind(this);
        this.onNodePointerLeave = this.onNodePointerLeave.bind(this);
        this.onNodePointerPressed = this.onNodePointerPressed.bind(this);

        this.treeMap = document.getElementById('treeMap') as IgcTreemapComponent;
        this.treeMap.dataSource = SampleData.create();
        this.treeMap.nodePointerEnter = this.onNodePointerEnter;
        this.treeMap.nodePointerLeave = this.onNodePointerLeave;
        this.treeMap.nodePointerPressed = this.onNodePointerPressed;

        this.hoveredNodeParent = document.getElementById('hoveredNodeParent') as HTMLLabelElement;
        this.hoveredNodeName = document.getElementById('hoveredNodeName') as HTMLLabelElement;
        this.hoveredNodeValue = document.getElementById('hoveredNodeValue') as HTMLLabelElement;
        this.selectedNodeParent = document.getElementById('selectedNodeParent') as HTMLLabelElement;
        this.selectedNodeName = document.getElementById('selectedNodeName') as HTMLLabelElement;
        this.selectedNodeValue = document.getElementById('selectedNodeValue') as HTMLLabelElement;
    }

    private onNodePointerEnter(sender: IgcTreemapComponent, args: IgcTreemapNodePointerEventArgs) {
        if (!args.item) {
            return;
        }

        if (!args.item.parent) {
            this.hoveredNodeParent.innerText = "Countries";
            this.hoveredNodeName.innerText = args.item.name;
            this.hoveredNodeValue.innerText = "None";
        } else {
            let population = (args.item.pop / 1000000).toFixed(0).toString() + " M";
            this.hoveredNodeParent.innerText = args.item.parent;
            this.hoveredNodeName.innerText = args.item.name;
            this.hoveredNodeValue.innerText = population;
        }
    }

    private onNodePointerLeave(sender: IgcTreemapComponent, args: IgcTreemapNodePointerEventArgs) {
        this.hoveredNodeParent.innerText = "None";
        this.hoveredNodeName.innerText = "None";
        this.hoveredNodeValue.innerText = "None";
    }

    private onNodePointerPressed(sender: IgcTreemapComponent, args: IgcTreemapNodePointerEventArgs) {
        if (!args.item) {
            return;
        }

        if (!args.item.parent) {
            this.selectedNodeParent.innerText = "Countries";
            this.selectedNodeName.innerText = args.item.name;
            this.selectedNodeValue.innerText = "None";
        } else {
            let population = (args.item.pop / 1000000).toFixed(0).toString() + " M";
            this.selectedNodeParent.innerText = args.item.parent;
            this.selectedNodeName.innerText = args.item.name;
            this.selectedNodeValue.innerText = population;
        }
    }
}

new TreeMapEvents();
