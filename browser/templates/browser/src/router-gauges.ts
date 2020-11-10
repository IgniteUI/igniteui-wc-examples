
export class RouterGauges {

    private static samples = new Map<string, any>();

    public static async get(route: string): Promise<any>  {

        if (this.samples.has(route)) {
            console.log("SB cashed sample: " + route)
            return this.samples.get(route);
        }

        // radial-gauge features
        if (route.indexOf("/radial-gauge-animation") > 0) {
            let sample = await import("./radial-gauge/RadialGaugeAnimation");
            this.samples.set(route, sample.RadialGaugeAnimation.register());
        }
        else if (route.indexOf("/radial-gauge-backing") > 0) {
            let sample = await import("./radial-gauge/RadialGaugeBacking");
            this.samples.set(route, sample.RadialGaugeBacking.register());
        }
        else if (route.indexOf("/radial-gauge-labels") > 0) {
            let sample = await import("./radial-gauge/RadialGaugeLabels");
            this.samples.set(route, sample.RadialGaugeLabels.register());
        }
        else if (route.indexOf("/radial-gauge-needle") > 0) {
            let sample = await import("./radial-gauge/RadialGaugeNeedle");
            this.samples.set(route, sample.RadialGaugeNeedle.register());
        }
        else if (route.indexOf("/radial-gauge-ranges") > 0) {
            let sample = await import("./radial-gauge/RadialGaugeRanges");
            this.samples.set(route, sample.RadialGaugeRanges.register());
        }
        else if (route.indexOf("/radial-gauge-scale") > 0) {
            let sample = await import("./radial-gauge/RadialGaugeScale");
            this.samples.set(route, sample.RadialGaugeScale.register());
        }
        else if (route.indexOf("/radial-gauge-tickmarks") > 0) {
            let sample = await import("./radial-gauge/RadialGaugeTickmarks");
            this.samples.set(route, sample.RadialGaugeTickmarks.register());
        }
        // radial-gauge types
        else if (route.indexOf("/radial-gauge-type-curved") > 0) {
            let sample = await import("./radial-gauge/RadialGaugeTypeCurved");
            this.samples.set(route, sample.RadialGaugeTypeCurved.register());
        }
        else if (route.indexOf("/radial-gauge-type-column") > 0) {
            let sample = await import("./radial-gauge/RadialGaugeTypeColumn");
            this.samples.set(route, sample.RadialGaugeTypeColumn.register());
        }
        else if (route.indexOf("/radial-gauge-type-ring") > 0) {
            let sample = await import("./radial-gauge/RadialGaugeTypeRing");
            this.samples.set(route, sample.RadialGaugeTypeRing.register());
        }
        else if (route.indexOf("/radial-gauge-type-segmented") > 0) {
            let sample = await import("./radial-gauge/RadialGaugeTypeSegmented");
            this.samples.set(route, sample.RadialGaugeTypeSegmented.register());
        }
        else if (route.indexOf("/radial-gauge-type-direction") > 0) {
            let sample = await import("./radial-gauge/RadialGaugeTypeDirection");
            this.samples.set(route, sample.RadialGaugeTypeDirection.register());
        }
        else if (route.indexOf("/radial-gauge-type-full") > 0) {
            let sample = await import("./radial-gauge/RadialGaugeTypeFull");
            this.samples.set(route, sample.RadialGaugeTypeFull.register());
        }
        else if (route.indexOf("/radial-gauge-type-semi") > 0) {
            let sample = await import("./radial-gauge/RadialGaugeTypeSemi");
            this.samples.set(route, sample.RadialGaugeTypeSemi.register());
        }
        else if (route.indexOf("/radial-gauge-type-half") > 0) {
            let sample = await import("./radial-gauge/RadialGaugeTypeHalf");
            this.samples.set(route, sample.RadialGaugeTypeHalf.register());
        }
        else if (route.indexOf("/radial-gauge-type-quatre") > 0) {
            let sample = await import("./radial-gauge/RadialGaugeTypeQuatre");
            this.samples.set(route, sample.RadialGaugeTypeQuatre.register());
        }


        // linear-gauge features
        if (route.indexOf("/linear-gauge-animation") > 0) {
            let sample = await import("./linear-gauge/LinearGaugeAnimation");
            this.samples.set(route, sample.LinearGaugeAnimation.register());
        }
        else if (route.indexOf("/linear-gauge-backing") > 0) {
            let sample = await import("./linear-gauge/LinearGaugeBacking");
            this.samples.set(route, sample.LinearGaugeBacking.register());
        }
        else if (route.indexOf("/linear-gauge-labels") > 0) {
            let sample = await import("./linear-gauge/LinearGaugeLabels");
            this.samples.set(route, sample.LinearGaugeLabels.register());
        }
        else if (route.indexOf("/linear-gauge-needle") > 0) {
            let sample = await import("./linear-gauge/LinearGaugeNeedle");
            this.samples.set(route, sample.LinearGaugeNeedle.register());
        }
        else if (route.indexOf("/linear-gauge-ranges") > 0) {
            let sample = await import("./linear-gauge/LinearGaugeRanges");
            this.samples.set(route, sample.LinearGaugeRanges.register());
        }
        else if (route.indexOf("/linear-gauge-scale") > 0) {
            let sample = await import("./linear-gauge/LinearGaugeScale");
            this.samples.set(route, sample.LinearGaugeScale.register());
        }
        else if (route.indexOf("/linear-gauge-tickmarks") > 0) {
            let sample = await import("./linear-gauge/LinearGaugeTickmarks");
            this.samples.set(route, sample.LinearGaugeTickmarks.register());
        }
        // linear-gauge types
        else if (route.indexOf("/linear-gauge-type-curved") > 0) {
            let sample = await import("./linear-gauge/LinearGaugeTypeCurve");
            this.samples.set(route, sample.LinearGaugeTypeCurve.register());
        }
        else if (route.indexOf("/linear-gauge-type-filled") > 0) {
            let sample = await import("./linear-gauge/LinearGaugeTypeFilled");
            this.samples.set(route, sample.LinearGaugeTypeFilled.register());
        }
        else if (route.indexOf("/linear-gauge-type-horizontal") > 0) {
            let sample = await import("./linear-gauge/LinearGaugeTypeHorizontal");
            this.samples.set(route, sample.LinearGaugeTypeHorizontal.register());
        }
        else if (route.indexOf("/linear-gauge-type-segmented") > 0) {
            let sample = await import("./linear-gauge/LinearGaugeTypeSegmented");
            this.samples.set(route, sample.LinearGaugeTypeSegmented.register());
        }
        else if (route.indexOf("/linear-gauge-type-multi-range") > 0) {
            let sample = await import("./linear-gauge/LinearGaugeTypeMultiRange");
            this.samples.set(route, sample.LinearGaugeTypeMultiRange.register());
        }
        else if (route.indexOf("/linear-gauge-type-multi-scale") > 0) {
            let sample = await import("./linear-gauge/LinearGaugeTypeMultiScale");
            this.samples.set(route, sample.LinearGaugeTypeMultiScale.register());
        }
        else if (route.indexOf("/linear-gauge-type-standard") > 0) {
            let sample = await import("./linear-gauge/LinearGaugeTypeStandard");
            this.samples.set(route, sample.LinearGaugeTypeStandard.register());
        }
        else if (route.indexOf("/linear-gauge-type-vertical") > 0) {
            let sample = await import("./linear-gauge/LinearGaugeTypeVertical");
            this.samples.set(route, sample.LinearGaugeTypeVertical.register());
        }

        // bullet-graph features
        if (route.indexOf("/bullet-graph-animation") > 0) {
            let sample = await import("./bullet-graph/BulletGraphAnimation");
            this.samples.set(route, sample.BulletGraphAnimation.register());
        }
        else if (route.indexOf("/bullet-graph-background") > 0) {
            let sample = await import("./bullet-graph/BulletGraphBackground");
            this.samples.set(route, sample.BulletGraphBackground.register());
        }
        else if (route.indexOf("/bullet-graph-labels") > 0) {
            let sample = await import("./bullet-graph/BulletGraphLabels");
            this.samples.set(route, sample.BulletGraphLabels.register());
        }
        else if (route.indexOf("/bullet-graph-measures") > 0) {
            let sample = await import("./bullet-graph/BulletGraphMeasures");
            this.samples.set(route, sample.BulletGraphMeasures.register());
        }
        else if (route.indexOf("/bullet-graph-ranges") > 0) {
            let sample = await import("./bullet-graph/BulletGraphRanges");
            this.samples.set(route, sample.BulletGraphRanges.register());
        }
        else if (route.indexOf("/bullet-graph-scale") > 0) {
            let sample = await import("./bullet-graph/BulletGraphScale");
            this.samples.set(route, sample.BulletGraphScale.register());
        }
        else if (route.indexOf("/bullet-graph-tickmarks") > 0) {
            let sample = await import("./bullet-graph/BulletGraphTickmarks");
            this.samples.set(route, sample.BulletGraphTickmarks.register());
        }
        // bullet-graph types
        else if (route.indexOf("/bullet-graph-type-horizontal") > 0) {
            let sample = await import("./bullet-graph/BulletGraphTypeHorizontal");
            this.samples.set(route, sample.BulletGraphTypeHorizontal.register());
        }
        else if (route.indexOf("/bullet-graph-type-vertical") > 0) {
            let sample = await import("./bullet-graph/BulletGraphTypeVertical");
            this.samples.set(route, sample.BulletGraphTypeVertical.register());
        }
        else if (route.indexOf("/bullet-graph-type-filled") > 0) {
            let sample = await import("./bullet-graph/BulletGraphTypeFilled");
            this.samples.set(route, sample.BulletGraphTypeFilled.register());
        }
        else if (route.indexOf("/bullet-graph-type-segmented") > 0) {
            let sample = await import("./bullet-graph/BulletGraphTypeSegmented");
            this.samples.set(route, sample.BulletGraphTypeSegmented.register());
        }
        else if (route.indexOf("/bullet-graph-type-reversed") > 0) {
            let sample = await import("./bullet-graph/BulletGraphTypeReversed");
            this.samples.set(route, sample.BulletGraphTypeReversed.register());
        }

        if (this.samples.has(route)) {
            console.log("SB imported sample: " + route)
            return this.samples.get(route);
        } else {
            console.log("SB import missing for sample: " + route)
        }

        // return new Promise<any>(resolve => {
        //     if (route === "/category-chart") {
        //         if (!this.categoryChartSample) {
        //             let sample = await import("./category-chart-sample");
        //             this.categoryChartSample = sample.CategoryChartSampleComponent;
        //             sample.CategoryChartSampleComponent.register();
        //         }
        //         return resolve(this.categoryChartSample);
        //     }
        // });

    }
}