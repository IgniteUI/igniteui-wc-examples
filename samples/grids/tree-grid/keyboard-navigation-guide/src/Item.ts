export enum ItemAction {
    Filterable,
    Sortable,
    Selectable,
    Groupable,
    Collapsible,
    Expandable,
    Editable,
    Always
}

export enum GridSection {
    THEAD = 'igx-grid__thead-wrapper',
    TBODY = 'igx-grid__tbody-content',
    FOOTER = 'igx-grid__tfoot'
}
export class Item {
    public title: string;
    public subTitle: string;
    public action: ItemAction;
    public active = false;

    private _completed: boolean;

    public constructor(title: string, subTitle: string, completed: boolean, itemAction?: ItemAction) {
        this.title = title;
        this.subTitle = subTitle;
        this.completed = completed;
        this.action = itemAction;

        if (itemAction === ItemAction.Always) {
            this.active = true;
        }
    }

    public set completed(value: boolean) {
        if (this.active || (!value && !this.completed)) {
            this._completed = value;
        }
    }

    public get completed() {
        return this._completed;
    }
}
