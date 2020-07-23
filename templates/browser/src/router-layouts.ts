
export class RouterLayouts {

    private static samples = new Map<string, any>();

    public static async get(route: string): Promise<any>  {

        if (this.samples.has(route)) {
            console.log("SB cashed sample: " + route)
            return this.samples.get(route);
        }

        // dock-manager
        if (route.indexOf("/dock-manager-overview") > 0) {
            let sample = await import("./dock-manager/DockManagerOverview");
            this.samples.set(route, sample.DockManagerOverview.register());
        } else if (route.indexOf("/dock-manager-embedding-frames") > 0) {
            let sample = await import("./dock-manager/DockManagerEmbeddingFrames");
            this.samples.set(route, sample.DockManagerEmbeddingFrames.register());
        } else if (route.indexOf("/dock-manager-updating-panes") > 0) {
            let sample = await import("./dock-manager/DockManagerUpdatingPanes");
            this.samples.set(route, sample.DockManagerUpdatingPanes.register());
        }

        if (this.samples.has(route)) {
            console.log("SB imported sample: " + route)
            return this.samples.get(route);
        } else {
            console.log("SB import missing for sample: " + route)
        }

    }
}