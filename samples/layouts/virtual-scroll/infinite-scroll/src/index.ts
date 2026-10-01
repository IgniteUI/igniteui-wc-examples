import { defineComponents, IgcAvatarComponent, IgcChipComponent, IgcLinearProgressComponent, IgcListComponent, IgcListHeaderComponent, IgcListItemComponent, IgcVirtualScrollComponent } from "igniteui-webcomponents";
import type { VirtualScrollDataRequest, VirtualScrollItemContext } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import { html } from "lit";
import { Employee, generateEmployees } from "./EmployeeData";
import "./index.css";

defineComponents(IgcVirtualScrollComponent, IgcListComponent, IgcListHeaderComponent, IgcListItemComponent, IgcAvatarComponent, IgcChipComponent, IgcLinearProgressComponent);

/** The size of the whole remote collection. */
const TOTAL_COUNT = 1_000;
const PAGE_SIZE = 50;

export class VirtualScrollInfiniteScroll {
    private employees: Employee[] = [];
    private loading = false;
    private virtualScroll: IgcVirtualScrollComponent<Employee>;

    constructor() {
        this.virtualScroll = document.getElementById("virtualScroll") as IgcVirtualScrollComponent<Employee>;

        this.virtualScroll.itemTemplate = (ctx: VirtualScrollItemContext<Employee>) => html`
            <igc-list-item aria-posinset=${ctx.index + 1} aria-setsize=${TOTAL_COUNT}>
                <igc-avatar slot="start" shape="circle" initials=${ctx.value.initials}></igc-avatar>
                <span slot="title">#${ctx.value.id} ${ctx.value.name}</span>
                <span slot="subtitle">${ctx.value.email}</span>
                <igc-chip slot="end" variant=${ctx.value.variant}>${ctx.value.department}</igc-chip>
            </igc-list-item>
        `;
        this.virtualScroll.addEventListener("igcDataRequest", (event: CustomEvent<VirtualScrollDataRequest>) => this.loadMore(event.detail));

        // Load the first page up front: an empty list has no rendered window to run out of,
        // so it does not request data.
        this.setData(generateEmployees(PAGE_SIZE));
    }

    /**
     * `igcDataRequest` is emitted when the rendered window nears the end of `data`.
     * Only one request is emitted at a time: the next one follows the next `data` change.
     */
    private loadMore(request: VirtualScrollDataRequest): void {
        if (this.loading || request.startIndex >= TOTAL_COUNT) {
            return;
        }

        this.setLoading(true);
        const count = Math.min(Math.max(request.count, PAGE_SIZE), TOTAL_COUNT - request.startIndex);

        // Simulates a request to a remote service.
        setTimeout(() => {
            // Assign a new array: `data` is compared by reference.
            this.setData([...this.employees, ...generateEmployees(count, request.startIndex)]);
            this.setLoading(false);
        }, 800);
    }

    private setData(employees: Employee[]): void {
        this.employees = employees;
        this.virtualScroll.data = employees;
        document.getElementById("status")!.textContent = `Loaded ${employees.length} of ${TOTAL_COUNT} employees`;
    }

    private setLoading(loading: boolean): void {
        this.loading = loading;
        (document.getElementById("progress") as IgcLinearProgressComponent).hidden = !loading;
    }
}

new VirtualScrollInfiniteScroll();
