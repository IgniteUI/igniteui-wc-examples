import 'igniteui-webcomponents';
import { registerIconFromText } from 'igniteui-webcomponents';
import { all } from '@igniteui/material-icons-extended';
import './CardStyling.css';

all.forEach((icon: any) => {
    registerIconFromText(icon.name, icon.value);
});

export class CardStyling {}

new CardStyling();
