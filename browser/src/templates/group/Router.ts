// auto generate class by script:
export class RouterGroupName {

    private static cachedSamples = new Map<string, any>();

    public static async get(route: string): Promise<any>  {

        if (this.cachedSamples.has(route)) {
            console.log("SB sample cashed: " + route);
            return this.cachedSamples.get(route);
        } else {
            console.log("SB sample loading: " + route);
        }

        // auto generate conditions by script:
        // ------------------------------------
        // {AutoInsertRoutingConditions}
        // ------------------------------------

        // if (route.indexOf("/category-chart-overview") >= 0) {
            // console.log("SB found sample: " + route)
            //let sample = await import("./componet/overview/CategoryChartOverview");
            //let sample = await import("./category-chart/overview/CategoryChartOverview");
            // this.samples.set(route, sample.CategoryChartOverview.register());
        // }

        if (this.cachedSamples.has(route)) {
            console.log("SB sample imported: " + route)
            return this.cachedSamples.get(route);
        } else {
            console.log("SB is missing router: " + route)
        }
    }

}