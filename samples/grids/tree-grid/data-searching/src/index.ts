import 'igniteui-webcomponents-grids/grids/combined';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import { IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { defineComponents, IgcInputComponent, IgcChipComponent, IgcIconComponent, IgcIconButtonComponent, registerIconFromText  } from 'igniteui-webcomponents';
import { EmployeesFlatData } from './EmployeesFlatData';

defineComponents(IgcInputComponent, IgcChipComponent, IgcIconComponent, IgcIconButtonComponent);

export class Sample {

    private treeGrid: IgcTreeGridComponent;    

    private searchBox: IgcInputComponent;
    
    private icon: IgcIconComponent;
    private nextIconButton: IgcIconButtonComponent;
    private prevIconButton: IgcIconButtonComponent;

    private caseSensitiveChip: IgcChipComponent;
    private exactMatchChip: IgcChipComponent;

    private _bind: () => void;

    constructor() {
        this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;        
                
        this.nextSearch = this.nextSearch.bind(this);
        this.prevSearch = this.prevSearch.bind(this);
        this.clearSearch = this.clearSearch.bind(this);        
        
        const prevIconText = "<svg width='24' height='24' viewBox='0 0 24 24'><path d='M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z'></path></svg>";
        const nextIconText = "<svg width='24' height='24' viewBox='0 0 24 24'><path d='M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'></path></svg>";
        const searchIconText = "<svg width='24' height='24' viewBox='0 0 24 24'><path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' /></svg>";
        const clearIconText = "<svg width='24' height='24' viewBox='0 0 24 24' title='Clear'><path d='M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path></svg>";
        
        registerIconFromText('prev', prevIconText, 'material');
        registerIconFromText('next', nextIconText, 'material');
        registerIconFromText('search', searchIconText, 'material');
        registerIconFromText('clear', clearIconText, 'material');
        
        this.icon = document.getElementById('icon') as IgcIconComponent;

        this.nextIconButton = document.getElementById('nextIconBtn') as IgcIconButtonComponent;
        this.prevIconButton = document.getElementById('prevIconBtn') as IgcIconButtonComponent;

        this.caseSensitiveChip = document.getElementById('caseSensitiveChip') as IgcChipComponent;
        this.exactMatchChip = document.getElementById('exactMatchChip') as IgcChipComponent;

        this.searchBox = document.getElementById('searchBox') as IgcInputComponent;

        this._bind = () => {
            this.treeGrid.data = new EmployeesFlatData();      
                        
            this.searchBox.addEventListener("keydown", (evt) => { this.onSearchKeydown(evt); });
            this.searchBox.addEventListener("igcInput", (evt) => {
                this.icon.name = evt.detail ? 'clear' : 'search';
                this.treeGrid.findNext(evt.detail, this.caseSensitiveChip.selected, this.exactMatchChip.selected);
            });
            this.caseSensitiveChip.addEventListener("igcSelect", (evt) => {
                this.treeGrid.findNext(this.searchBox.value, evt.detail, this.exactMatchChip.selected);
            });
            this.exactMatchChip.addEventListener("igcSelect", (evt) => {
                this.treeGrid.findNext(this.searchBox.value, this.caseSensitiveChip.selected, evt.detail);
            });
            this.nextIconButton.addEventListener("click", this.nextSearch);
            this.prevIconButton.addEventListener("click", this.prevSearch);
            this.icon.addEventListener("click", this.clearSearch);
        }
        this._bind();
    }

    public onSearchKeydown(evt: KeyboardEvent) {  
        if (evt.key === 'Enter' || evt.key === 'ArrowDown') {
            evt.preventDefault();
            this.treeGrid.findNext(this.searchBox.value, this.caseSensitiveChip.selected, this.exactMatchChip.selected);
        } else if (evt.key === 'ArrowUp') {
            evt.preventDefault();
            this.treeGrid.findPrev(this.searchBox.value, this.caseSensitiveChip.selected, this.exactMatchChip.selected);
        }
    }

    public prevSearch() {
        this.treeGrid.findPrev(this.searchBox.value, this.caseSensitiveChip.selected, this.exactMatchChip.selected);
    }

    public nextSearch() {
        this.treeGrid.findNext(this.searchBox.value, this.caseSensitiveChip.selected, this.exactMatchChip.selected);
    }

    public clearSearch() {
        this.searchBox.value = '';
        this.icon.name = 'search';
        this.treeGrid.clearSearch();
    }
}

new Sample();
