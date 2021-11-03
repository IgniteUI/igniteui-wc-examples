import 'igniteui-webcomponents';
import 'igniteui-webcomponents/src/styles/themes/material.css';
import { registerIconFromText } from 'igniteui-webcomponents';
import { all } from '@igniteui/material-icons-extended';
import './CardStyling.css';

all.forEach((icon: any) => {
    registerIconFromText(icon.name, icon.value);
});

export class CardStyling {
    constructor() {}
}

new CardStyling();
