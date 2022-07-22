import { defineComponents, IgcIconButtonComponent, IgcIconComponent, IgcTabComponent, IgcTabPanelComponent, IgcTabsComponent, registerIconFromText } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcIconButtonComponent, IgcIconComponent, IgcTabComponent, IgcTabPanelComponent, IgcTabsComponent);

export class TabsPrefixSuffix {
    constructor() {
        registerIconFromText(
            'home',
            '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>'
        );
        registerIconFromText(
            'search',
            '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>'
        );
        registerIconFromText(
            'favorite',
            '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'
        );
        registerIconFromText(
            'close',
            '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>'
        );

        const tabs = Array.from(document.querySelectorAll('igc-tab')) as IgcTabComponent[];
        const panels = Array.from(document.querySelectorAll('igc-tab-panel')) as IgcTabPanelComponent[];
        const iconButtons = document.getElementsByTagName('igc-icon-button');

        for (let i = 0; i < iconButtons.length; i++) {
            iconButtons[i].addEventListener('click', function handleClick(event) {
                const panel = panels.find((panel) => panel.id === tabs[i].panel);
                if (panel) {
                    panel.remove();
                }
                tabs[i].remove();
            });
        }
    }
}

new TabsPrefixSuffix();
