import { defineComponents, IgcBadgeComponent, IgcComboComponent, IgcLinearProgressComponent, IgcTooltipComponent } from 'igniteui-webcomponents';
import { bindComboDataSource, ComboDataPage, ComboDataRequest } from 'igniteui-webcomponents/extras/combo-data-source';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcComboComponent, IgcBadgeComponent, IgcLinearProgressComponent, IgcTooltipComponent);

interface Product {
    ProductID: number;
    ProductName: string;
}

type RequestStatus = 'pending' | 'done' | 'cancelled' | 'error';

interface LogEntry {
    title: string;
    status: RequestStatus;
    /** The short result on the right: "200 · 20 items · count 77", "pending…" or "cancelled". */
    result: string;
    /** The request URL. */
    detail: string;
}

const SERVICE_URL = 'https://services.odata.org/V4/Northwind/Northwind.svc/Products';
/** The service sends up to 20 products per request. */
const PAGE_SIZE = 20;
const LOG_SIZE = 4;
/** Up to this many IDs fit on the value row of the state panel. */
const INLINE_SELECTION = 5;
/** About three lines of IDs in the selection box of the state panel. */
const SELECTION_CHARS = 130;

export class ComboRemoteBinding {
    private combo = document.getElementById('combo') as IgcComboComponent<Product>;
    private log: LogEntry[] = [];
    /** The latest request. A request that the binding aborts for a newer one does not change the footer. */
    private latest?: LogEntry;
    /** The event that loads the next first page. */
    private trigger = 'init · refresh()';
    /** The search text of the items in `data`. */
    private loadedSearch = '';
    /** The items of the next page while it loads. */
    private loadingRange: { from: number; to: number } | null = null;

    constructor() {
        const combo = this.combo;

        // Added before the binding, so each one names its event before the binding loads.
        combo.addEventListener('igcOpening', () => {
            this.trigger = 'igcOpening · load()';
        });
        combo.addEventListener('igcSearchInput', ({ detail }) => {
            const text = detail.searchText.trim();
            this.trigger = `igcSearchInput · load(${text ? `"${text}"` : ''})`;
        });

        // The binding sets data, totalItemCount and loading, so the panel reads them after each update of the combo.
        combo.addController({ hostUpdated: () => this.renderState() });

        // The binding switches the combo to remote filtering. It loads the first page of a search when the typing
        // pauses, appends the next page on igcDataRequest, and aborts a request that a newer search makes stale.
        const binding = bindComboDataSource(combo, { load: (request, signal) => this.load(request, signal) }, { pageSize: PAGE_SIZE });

        // The first page loads now, so the total shows before the list opens.
        void binding.refresh();
    }

    /** Loads one page of products from the OData service. */
    private async load({ searchText, startIndex, count }: ComboDataRequest, signal: AbortSignal): Promise<ComboDataPage<Product>> {
        // OData doubles a single quote in a string, as in "Chef Anton's".
        const filter = searchText ? `contains(ProductName, '${searchText.replace(/'/g, "''")}')` : '';
        const query = `$skip=${startIndex}&$top=${count}&$count=true`;

        // Only igcDataRequest asks for a page after the first one.
        const entry = this.addLog(startIndex ? 'igcDataRequest · load()' : this.trigger, `GET /Products?${query}${filter ? `&$filter=${filter}` : ''}`);
        const total = this.combo.totalItemCount ?? startIndex + count;
        this.loadingRange = startIndex ? { from: startIndex + 1, to: Math.min(startIndex + count, total) } : null;
        this.renderFooter();

        let status = 0;
        try {
            const response = await fetch(`${SERVICE_URL}?${query}${filter ? `&$filter=${encodeURIComponent(filter)}` : ''}`, { signal });
            status = response.status;
            if (!response.ok) {
                throw new Error(`The service responded with ${status}.`);
            }

            const data = await response.json();
            const items: Product[] = data.value;
            const totalCount: number = data['@odata.count'];

            // A first page sets the total, and a next page adds to the loaded items.
            entry.status = 'done';
            entry.result = `200 · ${items.length} ${items.length === 1 ? 'item' : 'items'}${startIndex ? '' : ` · count ${totalCount}`}`;
            if (!startIndex) {
                this.loadedSearch = searchText;
            }
            return { items, totalCount };
        } catch (error) {
            entry.status = signal.aborted ? 'cancelled' : 'error';
            entry.result = signal.aborted ? 'cancelled' : status ? `${status} · failed` : 'failed';
            throw error;
        } finally {
            if (entry === this.latest) {
                this.loadingRange = null;
            }
            this.renderLog();
        }
    }

    private addLog(title: string, detail: string): LogEntry {
        const entry: LogEntry = { title, status: 'pending', result: 'pending…', detail };
        this.latest = entry;
        this.log = [...this.log, entry].slice(-LOG_SIZE);
        this.renderLog();
        return entry;
    }

    private renderState() {
        const { data, totalItemCount, loading } = this.combo;
        const value = [...(this.combo.value as number[])].sort((a, b) => a - b);

        this.setText('state-loaded', `${data.length}`);
        this.setText('state-total', `${totalItemCount ?? '—'}`);
        this.setText('state-loading', `${loading}`);
        this.setText('state-search', this.loadedSearch ? `"${this.loadedSearch}"` : '—');
        this.setText('state-value', value.length > INLINE_SELECTION ? `${value.length} items` : `[${value.join(', ')}]`);

        // The hint is in the helper-text slot only with a selection, so that the combo has no empty helper row.
        const hint = document.getElementById('selection-hint')!;
        const slot = value.length ? 'helper-text' : '';
        if (hint.slot !== slot) {
            hint.slot = slot;
        }
        hint.textContent = `${value.length} selected · kept by ProductID across searches`;

        this.renderSelection(value);
        this.renderFooter();
    }

    /** A selection too long for its row is listed below it, up to about three lines. */
    private renderSelection(value: number[]) {
        const box = document.getElementById('selection-values')!;
        box.hidden = value.length <= INLINE_SELECTION;
        if (box.hidden) {
            return;
        }

        let list = '[';
        let shown = 0;
        for (const id of value) {
            const next = `${shown ? ', ' : ''}${id}`;
            if (list.length + next.length > SELECTION_CHARS) {
                break;
            }
            list += next;
            shown++;
        }

        const hidden = value.length - shown;
        this.setText('selection-list', hidden ? `${list}, …` : `${list}]`);
        document.getElementById('selection-more')!.hidden = !hidden;
        this.setText('selection-more-link', `+${hidden} more`);
        this.setText('selection-tooltip', `[${value.join(', ')}]`);
    }

    /** The dropdown footer: the page being loaded, and how much of the data is loaded. */
    private renderFooter() {
        const total = this.combo.totalItemCount ?? 0;
        const loaded = this.combo.data.length;
        const range = this.loadingRange;

        document.getElementById('loading-chunk')!.hidden = !range;
        if (range) {
            this.setText('loading-text', `Loading items ${range.from}–${range.to}…`);
        }

        let text: string;
        if (!total) {
            text = this.loadedSearch ? `No products match "${this.loadedSearch}"` : 'No products';
        } else if (this.loadedSearch) {
            text = `Loaded 1–${loaded} of ${total} matches`;
        } else if (range) {
            text = `Loaded 1–${loaded} of ${total} · loading ${range.from}–${range.to}`;
        } else {
            text = loaded < total ? `Loaded 1–${loaded} of ${total} · more on scroll` : `Loaded 1–${loaded} of ${total}`;
        }

        this.setText('footer-text', text);
        this.setText('total-badge', `${total} total`);
    }

    private renderLog() {
        document.getElementById('log')!.replaceChildren(...this.log.map((entry) => {
            const item = document.createElement('li');
            item.className = 'log-entry';

            const name = document.createElement('span');
            name.className = 'log-name';
            name.textContent = entry.title;

            const result = document.createElement('span');
            result.className = 'log-result';
            result.dataset.status = entry.status;
            result.textContent = entry.result;

            const detail = document.createElement('code');
            detail.className = 'log-detail';
            detail.textContent = entry.detail;

            item.append(name, result, detail);
            return item;
        }));
    }

    /** The panel renders after each update of the combo, so it changes only the text that differs. */
    private setText(id: string, text: string) {
        const element = document.getElementById(id)!;
        if (element.textContent !== text) {
            element.textContent = text;
        }
    }
}

new ComboRemoteBinding();
