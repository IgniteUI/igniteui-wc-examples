

export abstract class SampleBase extends HTMLElement {

    public static tag(className: string): string {
        return className.replace(/([A-Z])/g, "-$1").replace(/^./, "").toLowerCase();
    }

    public static tag2(classObject: any): string {
        let className = classObject.name;
        return className.replace(/([A-Z])/g, "-$1").replace(/^./, "").toLowerCase();
    }
    // public static register2(sample: any): any {
    //     let sampleName = sample.name;
    //     let sampleHtmlTag = SampleBase.tag(sampleName);

    //     console.log("SampleBase register2=" + sampleName + " >> " + sampleHtmlTag)
    //     window.customElements.define(sampleHtmlTag, sample);
    //     return sample;
    // }

    // public static reg() {
    //     const instance = new HTMLElement();
    //     console.log("SampleBase parent=" + instance.constructor.name); // HTMLElement
    // }
}