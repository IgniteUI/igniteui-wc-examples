import { SampleBase } from "../../../../core/SampleBase"; // auto inserted
// auto copied code from sample's .ts file:
// -------------------------------------------------
// AutoInsertImports
// -------------------------------------------------

// auto copied code from sample's index.html file:
// -------------------------------------------------
let htmlTemplate = `
AutoInsertHtml
`;
// -------------------------------------------------

// auto copied code from sample's .ts file:
export class AutoInsertClassName extends SampleBase { // auto appended base class

    // auto inserted code:
    public static htmlTagName: string = SampleBase.tag("AutoInsertClassName");
    // auto inserted code:
    public static register(): any {
        console.log("SB register AutoInsertClassName as <" + this.htmlTagName + "/>");
        window.customElements.define(this.htmlTagName, AutoInsertClassName);
        return this;
    }

    constructor() {
        super(); // auto inserted
        // console.log("Sample constructor");
    }
    // AutoInsertClassBody

} // auto remove