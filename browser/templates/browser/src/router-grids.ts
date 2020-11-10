
export class RouterGrids {

    private static samples = new Map<string, any>();

    public static async get(route: string): Promise<any>  {

        if (this.samples.has(route)) {
            console.log("SB cashed sample: " + route)
            return this.samples.get(route);
        }
        // DATA GRID
        if (route.indexOf("/data-grid-type-comparison-table") >= 0) {
            let sample = await import("./data-grid/DataGridTypeComparisonTable");
            this.samples.set(route, sample.DataGridTypeComparisonTable.register());
        }
        else if (route.indexOf("/data-grid-type-heatmap-table") >= 0) {
            let sample = await import("./data-grid/DataGridTypeHeatmapTable");
            this.samples.set(route, sample.DataGridTypeHeatmapTable.register());
        }
        else if (route.indexOf("/data-grid-type-matrix-table") >= 0) {
            let sample = await import("./data-grid/DataGridTypeMatrixTable");
            this.samples.set(route, sample.DataGridTypeMatrixTable.register());
        }
        else if (route.indexOf("/data-grid-type-periodic-table") >= 0) {
            let sample = await import("./data-grid/DataGridTypePeriodicTable");
            this.samples.set(route, sample.DataGridTypePeriodicTable.register());
        }
        else if (route.indexOf("/data-grid-binding-data-service") >= 0) {
            let sample = await import("./data-grid/DataGridBindingDataService");
            this.samples.set(route, sample.DataGridBindingDataService.register());
        }
        else if (route.indexOf("/data-grid-binding-local-data") >= 0) {
            let sample = await import("./data-grid/DataGridBindingLocalData");
            this.samples.set(route, sample.DataGridBindingLocalData.register());
        }
        else if (route.indexOf("/data-grid-binding-remote-data") >= 0) {
            let sample = await import("./data-grid/DataGridBindingRemoteData");
            this.samples.set(route, sample.DataGridBindingRemoteData.register());
        }
        else if (route.indexOf("/data-grid-binding-live-data") >= 0) {
            let sample = await import("./data-grid/DataGridBindingLiveData");
            this.samples.set(route, sample.DataGridBindingLiveData.register());
        }
        else if (route.indexOf("/data-grid-cell-activation") >= 0) {
            let sample = await import("./data-grid/DataGridCellActivation");
            this.samples.set(route, sample.DataGridCellActivation.register());
        }
        else if (route.indexOf("/data-grid-cell-selection") >= 0) {
            let sample = await import("./data-grid/DataGridCellSelection");
            this.samples.set(route, sample.DataGridCellSelection.register());
        }

        else if (route.indexOf("/data-grid-column-animation") >= 0) {
            let sample = await import("./data-grid/DataGridColumnAnimation");
            this.samples.set(route, sample.DataGridColumnAnimation.register());
        }
        else if (route.indexOf("/data-grid-column-filtering") >= 0) {
            let sample = await import("./data-grid/DataGridColumnFiltering");
            this.samples.set(route, sample.DataGridColumnFiltering.register());
        }
        else if (route.indexOf("/data-grid-column-moving") >= 0) {
            let sample = await import("./data-grid/DataGridColumnMoving");
            this.samples.set(route, sample.DataGridColumnMoving.register());
        }
        else if (route.indexOf("/data-grid-column-chooser-toolbar") >= 0) {
            let sample = await import("./data-grid/DataGridColumnChooserToolbar");
            this.samples.set(route, sample.DataGridColumnChooserToolbarUI.register());
        }
        else if (route.indexOf("/data-grid-column-chooser-picker") >= 0) {
            let sample = await import("./data-grid/DataGridColumnChooserPicker");
            this.samples.set(route, sample.DataGridColumnChooserPicker.register());
        }
        else if (route.indexOf("/data-grid-column-pinning-picker") >= 0) {
            let sample = await import("./data-grid/DataGridColumnPinningPicker");
            this.samples.set(route, sample.DataGridColumnPinningPicker.register());
        }
        else if (route.indexOf("/data-grid-column-pinning-toolbar") >= 0) {
            let sample = await import("./data-grid/DataGridColumnPinningToolbar");
            this.samples.set(route, sample.DataGridColumnPinningToolbar.register());
        }
        else if (route.indexOf("/data-grid-column-options") >= 0) {
            let sample = await import("./data-grid/DataGridColumnOptions");
            this.samples.set(route, sample.DataGridColumnOptions.register());
        }
        else if (route.indexOf("/data-grid-column-resizing") >= 0) {
            let sample = await import("./data-grid/DataGridColumnResizing");
            this.samples.set(route, sample.DataGridColumnResizing.register());
        }
        else if (route.indexOf("/data-grid-column-sorting") >= 0) {
            let sample = await import("./data-grid/DataGridColumnSorting");
            this.samples.set(route, sample.DataGridColumnSorting.register());
        }
        else if (route.indexOf("/data-grid-column-summaries") >= 0) {
            let sample = await import("./data-grid/DataGridColumnSummaries");
            this.samples.set(route, sample.DataGridColumnSummaries.register());
        }
        else if (route.indexOf("/data-grid-column-types") >= 0) {
            let sample = await import("./data-grid/DataGridColumnTypes");
            this.samples.set(route, sample.DataGridColumnTypes.register());
        }
        else if (route.indexOf("/data-grid-column-scrolling") >= 0) {
            let sample = await import("./data-grid/DataGridHorizontalScrolling");
            this.samples.set(route, sample.DataGridHorizontalScrolling.register());
        }
        else if (route.indexOf("/data-grid-performance") >= 0) {
            let sample = await import("./data-grid/DataGridPerformance");
            this.samples.set(route, sample.DataGridPerformance.register());
        }
        else if (route.indexOf("/data-grid-row-grouping") >= 0) {
            let sample = await import("./data-grid/DataGridRowGrouping");
            this.samples.set(route, sample.DataGridRowGrouping.register());
        }
        else if (route.indexOf("/data-grid-row-pinning") >= 0) {
            let sample = await import("./data-grid/DataGridRowPinning");
            this.samples.set(route, sample.DataGridRowPinning.register());
        }
        else if (route.indexOf("/data-grid-row-paging") >= 0) {
            let sample = await import("./data-grid/DataGridRowPaging");
            this.samples.set(route, sample.DataGridRowPaging.register());
        }
        else if (route.indexOf("/data-grid-overview") >= 0) {
            let sample = await import("./data-grid/DataGridOverview");
            this.samples.set(route, sample.DataGridOverview.register());
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