import { defineComponents, IgcButtonComponent, IgcDialogComponent } from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcButtonComponent, IgcDialogComponent);

export class DialogOverview {
    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    private get dialog() {
        return this.root.querySelector('igc-dialog') as IgcDialogComponent;
    }

    private showDialog() {
        this.dialog.show();
    }

    private hideDialog() {
        this.dialog.hide();
    }

    private renderSample() {
        const template = html`
            <igc-button variant="outlined" class="open-button" @click=${() => this.showDialog()}>
                <span>Open dialog</span>
            </igc-button>
            <igc-dialog title="Confirmation" open>
                <span slot="message">Your email will be permanently deleted</span>
                <igc-button slot="footer" variant="flat" @click=${() => this.hideDialog()}>
                    <span>Cancel</span>
                </igc-button>
                <igc-button slot="footer" variant="flat" @click=${() => this.hideDialog()}>
                    <span>OK</span>
                </igc-button>
            </igc-dialog>
        `;

        render(template, this.root);
    }
}

new DialogOverview();
