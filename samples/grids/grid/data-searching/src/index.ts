import 'igniteui-webcomponents-grids/grids/combined';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { defineComponents, IgcInputComponent, IgcChipComponent, IgcIconComponent, IgcIconButtonComponent, registerIconFromText  } from 'igniteui-webcomponents';
import { MarketData } from './MarketData';

defineComponents(IgcInputComponent, IgcChipComponent, IgcIconComponent, IgcIconButtonComponent);

export class Sample {

    private grid: IgcGridComponent;    

    private searchBox: IgcInputComponent;
    
    private clearIcon: IgcIconComponent;
    private nextIconButton: IgcIconButtonComponent;
    private prevIconButton: IgcIconButtonComponent;

    private caseSensitiveChip: IgcChipComponent;
    private exactMatchChip: IgcChipComponent;

    private data: MarketData;

    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;        
                
        this.nextSearch = this.nextSearch.bind(this);
        this.prevSearch = this.prevSearch.bind(this);
        this.clearSearch = this.clearSearch.bind(this);        
        
        const prevIconText = "<svg width='24' height='24' viewBox='0 0 24 24'><path d='M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z'></path></svg>";
        const nextIconText = "<svg width='24' height='24' viewBox='0 0 24 24'><path d='M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'></path></svg>";
        const clearIconText = "<svg width='24' height='24' viewBox='0 0 24 24' title='Clear'><path d='M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path></svg>";
        
        registerIconFromText("prev", prevIconText, "material");
        registerIconFromText("next", nextIconText, "material");
        registerIconFromText("clear", clearIconText, "material");
        
        var clearIcon = this.clearIcon = document.getElementById('clearIcon') as IgcIconComponent;

        var nextIconButton = this.nextIconButton = document.getElementById('nextIconBtn') as IgcIconButtonComponent;
        var prevIconButton = this.prevIconButton = document.getElementById('prevIconBtn') as IgcIconButtonComponent;

        this.caseSensitiveChip = document.getElementById('caseSensitiveChip') as IgcChipComponent;
        this.exactMatchChip = document.getElementById('exactMatchChip') as IgcChipComponent;

        var searchBox = this.searchBox = document.getElementById('searchBox') as IgcInputComponent;

        this.data = new MarketData();

        this._bind = () => {
            grid.data = this.data;            
                        
            searchBox.addEventListener("keydown", (evt) => { this.onSearchKeydown(evt); });
            nextIconButton.addEventListener("click", this.nextSearch);
            prevIconButton.addEventListener("click", this.prevSearch);
            clearIcon.addEventListener("click", this.clearSearch);
        }
        this._bind();
    }

    public onSearchKeydown(evt: KeyboardEvent) {  
        if (evt.key === 'Enter' || evt.key === 'ArrowDown') {
            evt.preventDefault();
            this.grid.findNext(this.searchBox.value, this.caseSensitiveChip.selected, this.exactMatchChip.selected);
        } else if (evt.key === 'ArrowUp') {
            evt.preventDefault();
            this.grid.findPrev(this.searchBox.value, this.caseSensitiveChip.selected, this.exactMatchChip.selected);
        }
    }

    public prevSearch() {
        this.grid.findPrev(this.searchBox.value, this.caseSensitiveChip.selected, this.exactMatchChip.selected);
    }

    public nextSearch() {
        this.grid.findNext(this.searchBox.value, this.caseSensitiveChip.selected, this.exactMatchChip.selected);
    }

    public clearSearch() {
        this.searchBox.value = "";
        this.grid.clearSearch();
    }
}

new Sample();
