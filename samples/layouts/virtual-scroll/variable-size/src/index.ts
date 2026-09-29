import { defineComponents, IgcAvatarComponent, IgcChipComponent, IgcListComponent, IgcListHeaderComponent, IgcListItemComponent, IgcVirtualScrollComponent } from "igniteui-webcomponents";
import type { VirtualScrollItemContext } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import { html, nothing } from "lit";
import { Employee, generateEmployees } from "./EmployeeData";
import "./index.css";

defineComponents(IgcVirtualScrollComponent, IgcListComponent, IgcListHeaderComponent, IgcListItemComponent, IgcAvatarComponent, IgcChipComponent);

export class VirtualScrollVariableSize {
    private employees: Employee[] = generateEmployees(10_000);

    constructor() {
        const virtualScroll = document.getElementById("virtualScroll") as IgcVirtualScrollComponent<Employee>;
        document.getElementById("count")!.textContent = String(this.employees.length);

        // Every third employee has a bio, so the items have different heights.
        // Each rendered item is measured and its size replaces the estimate.
        virtualScroll.itemTemplate = (ctx: VirtualScrollItemContext<Employee>) => html`
            <igc-list-item aria-posinset=${ctx.index + 1} aria-setsize=${ctx.count}>
                <igc-avatar slot="start" shape="circle" initials=${ctx.value.initials}></igc-avatar>
                <span slot="title">${ctx.value.name}</span>
                <span slot="subtitle">${ctx.value.email}</span>
                ${ctx.value.bio ? html`<span class="employees__bio">${ctx.value.bio}</span>` : nothing}
                <igc-chip slot="end" variant=${ctx.value.variant}>${ctx.value.department}</igc-chip>
            </igc-list-item>
        `;
        virtualScroll.data = this.employees;
    }
}

new VirtualScrollVariableSize();
