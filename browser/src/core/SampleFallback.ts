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
        var sbHome    = "https://www.infragistics.com/webcomponents-demos/samples/index";
        var sbMissing = "https://www.infragistics.com/webcomponents-demos/samples" + SampleFallback.missingRoute;

        this.innerHTML = `
        <div class="container sample vertical" style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; overflow: hidden;">
              <img style="max-height: calc(100% - 6rem); max-width: 30rem" src="https://static.infragistics.com/xplatform/images/browsers/comingSoon.svg" >

              <div style="background: #f2f2f2; width: 100%; padding-bottom: 1rem; margin-top: -0.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center; overflow: hidden;">
                    <div style="font-size: 1.5rem; font-weight: bold; text-align: center;">Coming Soon</div>
                    <div style="font-size: 0.75rem; text-align: center;  ">
                        This <a href="` + sbMissing + `" title="` + SampleFallback.missingRoute + `" >example</a> is under development. We are almost done!
                    </div>

                    <div style="font-size: 0.75rem; text-align: center;">
                        <span>
                            Meanwhile, you can explore all Web Component samples on this
                            <a href="` + sbHome + `" target="_blank">website</a>
                        </span>
                    </div>
              </div>

            </div>
        `;
    }
}
