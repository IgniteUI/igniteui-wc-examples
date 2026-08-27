import {
    defineComponents,
    IgcButtonGroupComponent,
    IgcRippleComponent,
    IgcToggleButtonComponent
} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/material.css';
import './index.css';

defineComponents(IgcButtonGroupComponent, IgcRippleComponent, IgcToggleButtonComponent);

const albums = {
    device: {
        title: 'Trip around the world',
        photos: [
            'https://picsum.photos/id/1015/300/220',
            'https://picsum.photos/id/1016/300/220',
            'https://picsum.photos/id/1018/300/220',
            'https://picsum.photos/id/1019/300/220',
        ],
    },
    cloud: {
        title: 'Trip around the world',
        photos: [
            'https://picsum.photos/id/1036/300/220',
            'https://picsum.photos/id/1051/300/220',
            'https://picsum.photos/id/1062/300/220',
            'https://picsum.photos/id/1067/300/220',
        ],
    },
};

export class ButtonGroupOverview {
    private buttonGroup: IgcButtonGroupComponent;
    private albumTitle: HTMLElement;
    private albumPhotos: HTMLElement;

    constructor() {
        this.buttonGroup = document.querySelector('igc-button-group') as IgcButtonGroupComponent;
        this.albumTitle = document.querySelector('.album-title') as HTMLElement;
        this.albumPhotos = document.querySelector('.album-photos') as HTMLElement;

        this.buttonGroup.addEventListener('igcSelect', (e) => {
            const source = e.detail as 'device' | 'cloud';

            if (source === 'device' || source === 'cloud') {
                this.renderAlbum(source);
            }
        });

        this.renderAlbum('cloud');
    }

    private renderAlbum(source: 'device' | 'cloud') {
        const album = albums[source];

        this.albumTitle.textContent = album.title;
        this.albumPhotos.innerHTML = album.photos
            .map((photo) => `<img src="${photo}" alt="${album.title}" />`)
            .join('');
    }
}

new ButtonGroupOverview();
