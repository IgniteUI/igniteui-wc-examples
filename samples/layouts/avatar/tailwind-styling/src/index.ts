import {
    defineComponents,
    IgcAvatarComponent,
    IgcButtonComponent,
    IgcCardActionsComponent,
    IgcCardComponent,
    IgcCardContentComponent,
    IgcCardHeaderComponent,
    IgcCardMediaComponent,
    IgcDividerComponent,
    IgcIconComponent,
    IgcIconButtonComponent,
    registerIconFromText
} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/material.css';
import './index.css';
import { berealIcon, instagramIcon, plusIcon, threadsIcon } from './icons';

defineComponents(
    IgcAvatarComponent,
    IgcButtonComponent,
    IgcCardActionsComponent,
    IgcCardComponent,
    IgcCardContentComponent,
    IgcCardHeaderComponent,
    IgcCardMediaComponent,
    IgcDividerComponent,
    IgcIconComponent,
    IgcIconButtonComponent
);

export class AvatarTailwindStyling {
    constructor() {
        registerIconFromText('instagram', instagramIcon, 'material');
        registerIconFromText('bereal', berealIcon, 'material');
        registerIconFromText('threads', threadsIcon, 'material');
        registerIconFromText('plus', plusIcon, 'material');
    }
}

new AvatarTailwindStyling();
