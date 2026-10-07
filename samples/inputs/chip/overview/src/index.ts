import { defineComponents, IgcButtonComponent, IgcChipComponent, IgcInputComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcButtonComponent, IgcChipComponent, IgcInputComponent);

export class ChipOverview {
    constructor() {
        const header = document.getElementById('skills-header') as HTMLElement;
        const skills = Array.from(document.querySelectorAll<IgcChipComponent>('.skill'));
        const updateHeader = () => {
            header.textContent = `Skills · ${skills.filter((skill) => skill.selected).length} selected`;
        };

        skills.forEach((skill) => skill.addEventListener('igcSelect', updateHeader));
    }
}

new ChipOverview();
