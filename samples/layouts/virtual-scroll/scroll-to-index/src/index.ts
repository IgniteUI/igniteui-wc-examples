import { defineComponents, IgcAvatarComponent, IgcButtonComponent, IgcChipComponent, IgcInputComponent, IgcListComponent, IgcListHeaderComponent, IgcListItemComponent, IgcRadioComponent, IgcRadioGroupComponent, IgcVirtualScrollComponent } from "igniteui-webcomponents";
import type { VirtualScrollItemContext } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import { html } from "lit";
import { Employee, generateEmployees } from "./EmployeeData";
import "./index.css";

defineComponents(IgcVirtualScrollComponent, IgcListComponent, IgcListHeaderComponent, IgcListItemComponent, IgcAvatarComponent, IgcChipComponent, IgcInputComponent, IgcRadioGroupComponent, IgcRadioComponent, IgcButtonComponent);

export class VirtualScrollScrollToIndex {
    private employees: Employee[] = generateEmployees(100_000);
    private virtualScroll: IgcVirtualScrollComponent<Employee>;
    private targetIndex: IgcInputComponent;
    private alignment: IgcRadioGroupComponent;

    constructor() {
        this.virtualScroll = document.getElementById("virtualScroll") as IgcVirtualScrollComponent<Employee>;
        this.targetIndex = document.getElementById("targetIndex") as IgcInputComponent;
        this.alignment = document.getElementById("alignment") as IgcRadioGroupComponent;
        this.targetIndex.max = this.employees.length - 1;
        document.getElementById("count")!.textContent = String(this.employees.length);

        this.virtualScroll.itemTemplate = (ctx: VirtualScrollItemContext<Employee>) => html`
            <igc-list-item aria-posinset=${ctx.index + 1} aria-setsize=${ctx.count}>
                <igc-avatar slot="start" shape="circle" initials=${ctx.value.initials}></igc-avatar>
                <span slot="title">#${ctx.index} ${ctx.value.name}</span>
                <span slot="subtitle">${ctx.value.email}</span>
                <igc-chip slot="end" variant=${ctx.value.variant}>${ctx.value.department}</igc-chip>
            </igc-list-item>
        `;
        this.virtualScroll.data = this.employees;

        const last = this.employees.length - 1;
        document.getElementById("go")!.addEventListener("click", () => this.goTo(Number(this.targetIndex.value)));
        document.getElementById("first")!.addEventListener("click", () => this.goTo(0));
        document.getElementById("middle")!.addEventListener("click", () => this.goTo(last / 2));
        document.getElementById("last")!.addEventListener("click", () => this.goTo(last));
        document.getElementById("random")!.addEventListener("click", () => this.goTo(Math.random() * last));
    }

    private async goTo(index: number): Promise<void> {
        const target = Math.min(Math.max(Math.trunc(index) || 0, 0), this.employees.length - 1);
        const block = (this.alignment.value || "start") as ScrollLogicalPosition;
        this.targetIndex.value = String(target);

        // Items that have not been rendered only have an estimated size, so the
        // first jump lands near the target. The promise resolves once the
        // component has measured the landing area and corrected the offset.
        await this.virtualScroll.scrollToIndex(target, { block });
        this.highlight(target);
    }

    private highlight(index: number): void {
        const item = this.virtualScroll.querySelector<HTMLElement>(`[data-vs-index="${index}"]`);
        if (!item) {
            return;
        }

        // Restart the animation when the same item is highlighted again.
        item.classList.remove("employees__item--highlighted");
        void item.offsetWidth;
        item.classList.add("employees__item--highlighted");
    }
}

new VirtualScrollScrollToIndex();
