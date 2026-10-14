import {
    defineComponents,
    IgcAvatarComponent,
    IgcListComponent,
    IgcListItemComponent,
    IgcTabsComponent
} from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcAvatarComponent, IgcListComponent, IgcListItemComponent, IgcTabsComponent);

interface Person {
    name: string;
    team: string;
    avatar: string;
}

export class TabsOverview {
    private people: Person[] = [
        { name: 'Emily Carter', team: 'Finance', avatar: 'https://dl.infragistics.com/x/img/avatars/avatar-profile-06.png' },
        { name: 'Jose Diaz', team: 'Engineering', avatar: 'https://dl.infragistics.com/x/img/avatars/avatar-profile-07.png' },
        { name: 'Kira Tanaka', team: 'Finance', avatar: 'https://dl.infragistics.com/x/img/avatars/avatar-profile-08.png' },
        { name: 'Liam Brooks', team: 'Engineering', avatar: 'https://dl.infragistics.com/x/img/avatars/avatar-profile-03.png' }
    ];

    private teams = ['Everyone', 'Finance', 'Engineering'];

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    private renderSample() {
        const template = html`
            <div class="team-tabs">
                <igc-tabs alignment="justify">
                    ${this.teams.map(
                        (team) => html`
                            <igc-tab label=${team}>
                                <igc-list>
                                    ${this.people
                                        .filter((person) => team === 'Everyone' || person.team === team)
                                        .map(
                                            (person) => html`
                                                <igc-list-item>
                                                    <igc-avatar
                                                        slot="start"
                                                        src=${person.avatar}
                                                        alt=${person.name}
                                                        shape="circle"
                                                    ></igc-avatar>
                                                    <span slot="title">${person.name}</span>
                                                    <span slot="end" class="team-name">${person.team}</span>
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

new TabsOverview();
