import { defineComponents, IgcAvatarComponent, IgcCardComponent, IgcChipComponent, IgcVirtualScrollComponent } from "igniteui-webcomponents";
import type { VirtualScrollItemContext } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import { html } from "lit";
import { Employee, generateEmployees } from "./EmployeeData";
import "./index.css";

defineComponents(IgcVirtualScrollComponent, IgcCardComponent, IgcAvatarComponent, IgcChipComponent);

export class VirtualScrollHorizontal {
    private employees: Employee[] = generateEmployees(10_000);

    constructor() {
        const virtualScroll = document.getElementById("virtualScroll") as IgcVirtualScrollComponent<Employee>;

        virtualScroll.itemTemplate = (ctx: VirtualScrollItemContext<Employee>) => html`
            <div class="cards__item ${ctx.value.bio ? "cards__item--wide" : ""}" role="listitem" aria-posinset=${ctx.index + 1} aria-setsize=${ctx.count}>
                <igc-card elevated>
                    <igc-card-header>
                        <igc-avatar slot="thumbnail" shape="circle" initials=${ctx.value.initials}></igc-avatar>
                        <h3 slot="title">${ctx.value.name}</h3>
                        <h5 slot="subtitle">${ctx.value.bio ? ctx.value.email : `#${ctx.value.id}`}</h5>
                    </igc-card-header>
                    <igc-card-content>
                        <igc-chip variant=${ctx.value.variant}>${ctx.value.department}</igc-chip>
                    </igc-card-content>
                </igc-card>
            </div>
        `;
        virtualScroll.data = this.employees;
    }
}

new VirtualScrollHorizontal();
