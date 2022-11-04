import { SampleBase } from "./SampleBase"; // auto inserted

export class SampleFallback extends SampleBase {

    public static missingRoute: string = "";
    public static htmlTagName: string = SampleBase.tag("SampleFallback");
    public static register(missingRoute: string): any {
        this.missingRoute = missingRoute;
        window.customElements.define(this.htmlTagName, SampleFallback);
        return this;
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="container sample vertical">
              <div>Samples Browser is missing routing path:</div>
              <div>` + SampleFallback.missingRoute + `</div>
            </div>
        `;
    }
}
