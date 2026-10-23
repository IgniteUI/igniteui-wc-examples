import {
    defineComponents,
    IgcButtonComponent,
    IgcDialogComponent,
    IgcIconComponent,
    IgcInputComponent,
    registerIconFromText
} from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcButtonComponent, IgcDialogComponent, IgcIconComponent, IgcInputComponent);

const accountCircleIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5ZM9 3.75C10.245 3.75 11.25 4.755 11.25 6C11.25 7.245 10.245 8.25 9 8.25C7.755 8.25 6.75 7.245 6.75 6C6.75 4.755 7.755 3.75 9 3.75ZM9 14.4003C7.125 14.4003 5.4675 13.4403 4.5 11.9853C4.5225 10.4928 7.5 9.67529 9 9.67529C10.4925 9.67529 13.4775 10.4928 13.5 11.9853C12.5325 13.4403 10.875 14.4003 9 14.4003Z"/></svg>';
const lockIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 6.75H12.75V5.25C12.75 3.18 11.07 1.5 9 1.5C6.93 1.5 5.25 3.18 5.25 5.25V6.75H4.5C3.675 6.75 3 7.425 3 8.25V15.75C3 16.575 3.675 17.25 4.5 17.25H13.5C14.325 17.25 15 16.575 15 15.75V8.25C15 7.425 14.325 6.75 13.5 6.75ZM9 13.5C8.175 13.5 7.5 12.825 7.5 12C7.5 11.175 8.175 10.5 9 10.5C9.825 10.5 10.5 11.175 10.5 12C10.5 12.825 9.825 13.5 9 13.5ZM11.3249 6.75029H6.67493V5.25029C6.67493 3.96779 7.71743 2.92529 8.99993 2.92529C10.2824 2.92529 11.3249 3.96779 11.3249 5.25029V6.75029Z"/></svg>';

export class DialogTypes {
    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        registerIconFromText('account_circle', accountCircleIcon, 'material');
        registerIconFromText('lock', lockIcon, 'material');

        this.renderSample();
    }

    private renderSample() {
        const template = html`
            <div class="dialog-types">
                <igc-dialog title="Notification">
                    <span slot="message">Your email has been sent successfully!</span>
                    <igc-button slot="footer" variant="flat">
                        <span>OK</span>
                    </igc-button>
                </igc-dialog>
                <igc-dialog title="Confirmation">
                    <span slot="message">Your email will be permanently deleted</span>
                    <igc-button slot="footer" variant="flat">
                        <span>Cancel</span>
                    </igc-button>
                    <igc-button slot="footer" variant="flat">
                        <span>OK</span>
                    </igc-button>
                </igc-dialog>
                <igc-dialog title="Sign In">
                    <div class="sign-in-form">
                        <igc-input label="Username" value="DeanG" outlined>
                            <igc-icon slot="prefix" name="account_circle" collection="material"></igc-icon>
                        </igc-input>
                        <igc-input label="Password" type="password" value="password123" outlined>
                            <igc-icon slot="prefix" name="lock" collection="material"></igc-icon>
                        </igc-input>
                    </div>
                    <igc-button slot="footer" variant="flat">
                        <span>Cancel</span>
                    </igc-button>
                    <igc-button slot="footer" variant="flat">
                        <span>Sign In</span>
                    </igc-button>
                </igc-dialog>
            </div>
        `;

        render(template, this.root);
    }
}

new DialogTypes();
