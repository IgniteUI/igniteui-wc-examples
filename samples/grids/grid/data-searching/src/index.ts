import 'igniteui-webcomponents-grids/grids/combined';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { defineComponents, IgcInputComponent, IgcChipComponent, IgcIconComponent, IgcIconButtonComponent, registerIconFromText } from 'igniteui-webcomponents';
import { MarketData } from './MarketData';

defineComponents(IgcInputComponent, IgcChipComponent, IgcIconComponent, IgcIconButtonComponent);

export class Sample {

    private grid: IgcGridComponent;    
    private searchBox: IgcInputComponent;
    private searchIcon: IgcIconComponent;
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
        const searchIconText = "<svg width='24' height='24' viewBox='0 0 24 24'><path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' /></svg>";

        registerIconFromText("prev", prevIconText, "material");
        registerIconFromText("next", nextIconText, "material");
        registerIconFromText("clear", clearIconText, "material");
        registerIconFromText("search", searchIconText, "material");

        var searchIcon = this.searchIcon = document.getElementById('searchIcon') as IgcIconComponent;
        

        var nextIconButton = this.nextIconButton = document.getElementById('nextIconBtn') as IgcIconButtonComponent;
        var prevIconButton = this.prevIconButton = document.getElementById('prevIconBtn') as IgcIconButtonComponent;

        this.caseSensitiveChip = document.getElementById('caseSensitiveChip') as IgcChipComponent;
        this.exactMatchChip = document.getElementById('exactMatchChip') as IgcChipComponent;

        var searchBox = this.searchBox = document.getElementById('searchBox') as IgcInputComponent;

        this.data = new MarketData();

        this._bind = () => {
            grid.data = this.data;            
                        
            searchBox.addEventListener("keydown", (evt) => { this.onSearchKeydown(evt); });
            this.searchBox.addEventListener("igcInput", (evt) => {
                this.searchIcon.name = evt.detail ? 'clear' : 'search';
                this.grid.findNext(evt.detail, this.caseSensitiveChip.selected, this.exactMatchChip.selected);
            });
            nextIconButton.addEventListener("click", this.nextSearch);
            prevIconButton.addEventListener("click", this.prevSearch);
            searchIcon.addEventListener("click", this.clearSearch);
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
        this.searchIcon.name = 'search';    
    }
}

new Sample();
