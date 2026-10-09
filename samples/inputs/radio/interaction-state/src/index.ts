import { defineComponents, IgcRadioComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcRadioComponent);

export class RadioInteractionState {
    constructor() {
        // A keyup is what turns on a radio's keyboard focus ring, so dispatching one
        // shows the focused state without moving focus to the radio.
        document.querySelectorAll('.focused, .focused-hover').forEach((radio) => {
            radio.dispatchEvent(new KeyboardEvent('keyup'));
        });
    }
}

new RadioInteractionState();
