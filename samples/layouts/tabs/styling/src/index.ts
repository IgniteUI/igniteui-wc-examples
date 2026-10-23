import {
    defineComponents,
    IgcAvatarComponent,
    IgcChipComponent,
    IgcListComponent,
    IgcListItemComponent,
    IgcTabsComponent
} from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(
    IgcAvatarComponent,
    IgcChipComponent,
    IgcListComponent,
    IgcListItemComponent,
    IgcTabsComponent
);

interface ProfileDetail {
    label: string;
    value: string;
}

interface ProfileSection {
    label: string;
    disabled?: boolean;
    details: ProfileDetail[];
}

export class TabsStyling {
    private sections: ProfileSection[] = [
        {
            label: 'Overview',
            details: [
                { label: 'Email', value: 'emily.carter@gmail.com' },
                { label: 'Team', value: 'Finance, 8 members' },
                { label: 'Joined', value: 'March 2023' }
            ]
        },
        {
            label: 'Activity',
            details: [
                { label: 'Last login', value: 'Today, 09:24' },
                { label: 'Reports', value: '12 this month' },
                { label: 'Approvals', value: '3 pending' }
            ]
        },
        {
            label: 'Billing',
            disabled: true,
            details: []
        }
    ];

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    private renderSample() {
        const template = html`
            <div class="profile-card">
                <igc-list class="profile-header">
                    <igc-list-item>
                        <igc-avatar
                            slot="start"
                            src="https://dl.infragistics.com/x/img/avatars/avatar-profile-09.png"
                            alt="Emily Carter"
                            shape="circle"
                        ></igc-avatar>
                        <span slot="title" class="profile-name">Emily Carter</span>
                        <span slot="subtitle" class="profile-role">Finance lead - Sofia</span>
                        <igc-chip slot="end" class="profile-status">Active</igc-chip>
                    </igc-list-item>
                </igc-list>
                <igc-tabs class="profile-tabs" alignment="justify">
                    ${this.sections.map(
                        (section) => html`
                            <igc-tab label=${section.label} ?disabled=${section.disabled}>
                                <igc-list class="profile-details">
                                    ${section.details.map(
                                        (detail) => html`
                                            <igc-list-item>
                                                <span slot="title" class="detail-label">${detail.label}</span>
                                                <span slot="end" class="detail-value">${detail.value}</span>
                                            </igc-list-item>
                                        `
                                    )}
                                </igc-list>
                            </igc-tab>
                        `
                    )}
                </igc-tabs>
            </div>
        `;

        render(template, this.root);
    }
}

new TabsStyling();
