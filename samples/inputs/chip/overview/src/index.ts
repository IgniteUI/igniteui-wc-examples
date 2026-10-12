import { defineComponents, IgcButtonComponent, IgcChipComponent, IgcInputComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcButtonComponent, IgcChipComponent, IgcInputComponent);

export class ChipOverview {
    private header = document.getElementById('skills-header') as HTMLElement;
    private selectedGroup = document.getElementById('selected') as HTMLElement;
    private skills = Array.from(document.querySelectorAll<IgcChipComponent>('#skills igc-chip'));
    private removables = new Map<IgcChipComponent, IgcChipComponent>();

    constructor() {
        this.skills.forEach((skill) => skill.addEventListener('igcSelect', () => this.update()));
        this.update();
    }

    private update() {
        const selected = this.skills.filter((skill) => skill.selected);
        this.header.textContent = `Skills · ${selected.length} selected`;
        // Both groups list the selected skills in the order of the skills list.
        this.selectedGroup.replaceChildren(...selected.map((skill) => this.removableFor(skill)));
    }

    private removableFor(skill: IgcChipComponent) {
        let chip = this.removables.get(skill);
        if (!chip) {
            chip = document.createElement('igc-chip');
            chip.className = 'skill';
            chip.outlined = true;
            chip.removable = true;
            chip.textContent = skill.textContent;
            chip.addEventListener('igcRemove', () => this.removeSkill(skill));
            this.removables.set(skill, chip);
        }
        return chip;
    }

    private removeSkill(skill: IgcChipComponent) {
        const index = Array.from(this.selectedGroup.children).indexOf(this.removableFor(skill));
        skill.selected = false;
        this.update();

        // The removed chip is gone, so move focus to the next selected skill, or back to the skill itself when none is left.
        const remaining = this.selectedGroup.children;
        const next = (remaining[index] ?? remaining[index - 1]) as IgcChipComponent | undefined;
        // The chip doesn't delegate focus yet, so focus its inner controls directly.
        const target = next
            ? next.shadowRoot?.querySelector<HTMLElement>('[part="remove"] igc-icon')
            : skill.shadowRoot?.querySelector<HTMLElement>('[part="action"]');
        target?.focus();
    }
}

new ChipOverview();
