import {
    defineComponents,
    IgcAvatarComponent,
    IgcButtonComponent,
    IgcCheckboxComponent,
    IgcListComponent,
    IgcListItemComponent
} from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(
    IgcAvatarComponent,
    IgcButtonComponent,
    IgcCheckboxComponent,
    IgcListComponent,
    IgcListItemComponent
);

interface TeamMember {
    name: string;
    email: string;
    avatar: string;
    selected: boolean;
}

export class CheckboxStyling {
    private members: TeamMember[] = [
        { name: 'Emily Potter', email: 'emily@team.com', avatar: 'https://dl.infragistics.com/x/img/avatars/avatar-profile-06.png', selected: false },
        { name: 'Alex Lima', email: 'alex@team.com', avatar: 'https://dl.infragistics.com/x/img/avatars/avatar-profile-05.png', selected: true },
        { name: 'Mateo García', email: 'mateo@team.com', avatar: 'https://dl.infragistics.com/x/img/avatars/avatar-profile-07.png', selected: false },
        { name: 'Kate Roberts', email: 'kate@team.com', avatar: 'https://dl.infragistics.com/x/img/avatars/avatar-profile-08.png', selected: false }
    ];

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    private toggleAll(checked: boolean) {
        this.members.forEach((member) => (member.selected = checked));
        this.renderSample();
    }

    private toggleMember(member: TeamMember, checked: boolean) {
        member.selected = checked;
        this.renderSample();
    }

    private renderSample() {
        const allSelected = this.members.every((member) => member.selected);
        const someSelected = this.members.some((member) => member.selected);

        const template = html`
            <div class="team-card">
                <p class="team-title">Team members</p>

                <igc-checkbox
                    class="select-all"
                    label-position="before"
                    .checked=${allSelected}
                    .indeterminate=${someSelected && !allSelected}
                    @igcChange=${(e: CustomEvent<{ checked: boolean }>) => this.toggleAll(e.detail.checked)}
                >
                    <span>Select all</span>
                </igc-checkbox>

                <igc-list class="members">
                    ${this.members.map(
                        (member) => html`
                            <igc-list-item class=${member.selected ? 'member member-selected' : 'member'}>
                                <igc-avatar
                                    slot="start"
                                    src=${member.avatar}
                                    shape="circle"
                                    alt=${member.name}
                                ></igc-avatar>
                                <span slot="title" class="member-name">${member.name}</span>
                                <span slot="subtitle" class="member-email">${member.email}</span>
                                <igc-checkbox
                                    slot="end"
                                    class="member-check"
                                    aria-label=${member.name}
                                    .checked=${member.selected}
                                    @igcChange=${(e: CustomEvent<{ checked: boolean }>) =>
                                        this.toggleMember(member, e.detail.checked)}
                                ></igc-checkbox>
                            </igc-list-item>
                        `
                    )}
                </igc-list>

                <igc-button variant="contained" class="continue-button">Continue</igc-button>
            </div>
        `;

        render(template, this.root);
    }
}

new CheckboxStyling();
