export class RouterCharts {

    private static samples = new Map<string, any>();

    public static async get(route: string): Promise<any>  {

        if (this.samples.has(route)) {
            console.log("SB cashed sample: " + route)
            return this.samples.get(route);
        }

        if (route.indexOf("/category-chart-overview") > 0) {
            let sample = await import("./category-chart/CategoryChartOverview");
            this.samples.set(route, sample.CategoryChartOverview.register());
        }
        else if (route.indexOf("/category-chart-annotations") > 0) {
            let sample = await import("./category-chart/CategoryChartAnnotations");
            this.samples.set(route, sample.CategoryChartAnnotations.register());
        }
        else if (route.indexOf("/category-chart-axis-options") > 0) {
            let sample = await import("./category-chart/CategoryChartAxisOptions");
            this.samples.set(route, sample.CategoryChartAxisOptions.register());
        }
        else if (route.indexOf("/category-chart-highlighting") > 0) {
            let sample = await import("./category-chart/CategoryChartHighlighting");
            this.samples.set(route, sample.CategoryChartHighlighting.register());
        }
        else if (route.indexOf("/category-chart-high-frequency") > 0) {
            let sample = await import("./category-chart/CategoryChartHighFrequency");
            this.samples.set(route, sample.CategoryChartHighFrequency.register());
        }
        else if (route.indexOf("/category-chart-high-volume") > 0) {
            let sample = await import("./category-chart/CategoryChartHighVolume");
            this.samples.set(route, sample.CategoryChartHighVolume.register());
        }
        else if (route.indexOf("/category-chart-marker-options") > 0) {
            let sample = await import("./category-chart/CategoryChartMarkers");
            this.samples.set(route, sample.CategoryChartMarkers.register());
        }
        else if (route.indexOf("/category-chart-stack-columns") > 0) {
            let sample = await import("./category-chart/CategoryChartStackColumns");
            this.samples.set(route, sample.CategoryChartStackColumns.register());
        }
        else if (route.indexOf("/category-chart-tooltip-types") > 0) {
            let sample = await import("./category-chart/CategoryChartTooltipTypes");
            this.samples.set(route, sample.CategoryChartTooltipTypes.register());
        }
        else if (route.indexOf("/category-chart-trendline") > 0) {
            let sample = await import("./category-chart/CategoryChartTrendline");
            this.samples.set(route, sample.CategoryChartTrendline.register());
        }


        else if (route.indexOf("/doughnut-chart-overview") > 0) {
            let sample = await import("./doughnut-chart/DoughnutChartOverview");
            this.samples.set(route, sample.DoughnutChartOverview.register());
        }
        else if (route.indexOf("/doughnut-chart-explosion") > 0) {
            let sample = await import("./doughnut-chart/DoughnutChartExplosion");
            this.samples.set(route, sample.DoughnutChartExplosion.register());
        }
        else if (route.indexOf("/doughnut-chart-selection") > 0) {
            let sample = await import("./doughnut-chart/DoughnutChartSelection");
            this.samples.set(route, sample.DoughnutChartSelection.register());
        }
        else if (route.indexOf("/doughnut-chart-legend") > 0) {
            let sample = await import("./doughnut-chart/DoughnutChartLegend");
            this.samples.set(route, sample.DoughnutChartLegend.register());
        }
        else if (route.indexOf("/doughnut-chart-rings") > 0) {
            let sample = await import("./doughnut-chart/DoughnutChartRings");
            this.samples.set(route, sample.DoughnutChartRings.register());
        }
        else if (route.indexOf("/doughnut-chart-animation") > 0) {
            let sample = await import("./doughnut-chart/DoughnutChartAnimation");
            this.samples.set(route, sample.DoughnutChartAnimation.register());
        }


        else if (route.indexOf("/pie-chart-overview") > 0) {
            let sample = await import("./pie-chart/PieChartOverview");
            this.samples.set(route, sample.PieChartOverview.register());
        }
        else if (route.indexOf("/pie-chart-legend") > 0) {
            let sample = await import("./pie-chart/PieChartLegend");
            this.samples.set(route, sample.PieChartLegend.register());
        }
        else if (route.indexOf("/pie-chart-explosion") > 0) {
            let sample = await import("./pie-chart/PieChartExplosion");
            this.samples.set(route, sample.PieChartExplosion.register());
        }
        else if (route.indexOf("/pie-chart-selection") > 0) {
            let sample = await import("./pie-chart/PieChartSelection");
            this.samples.set(route, sample.PieChartSelection.register());
        }
        else if (route.indexOf("/pie-chart-others") > 0) {
            let sample = await import("./pie-chart/PieChartOthers");
            this.samples.set(route, sample.PieChartOthers.register());
        }
        else if (route.indexOf("/pie-chart-animation") > 0) {
            let sample = await import("./pie-chart/PieChartAnimation");
            this.samples.set(route, sample.PieChartAnimation.register());
        }


        else if (route.indexOf("/financial-chart-overview") > 0) {
            let sample = await import("./financial-chart/FinancialChartOverview");
            this.samples.set(route, sample.FinancialChartOverview.register());
        }
        else if (route.indexOf("/financial-chart-axis-types") > 0) {
            let sample = await import("./financial-chart/FinancialChartAxisTypes");
            this.samples.set(route, sample.FinancialChartAxisTypes.register());
        }
        else if (route.indexOf("/financial-chart-annotations") > 0) {
            let sample = await import("./financial-chart/FinancialChartAnnotations");
            this.samples.set(route, sample.FinancialChartAnnotations.register());
        }
        else if (route.indexOf("/financial-chart-panes") > 0) {
            let sample = await import("./financial-chart/FinancialChartPanes");
            this.samples.set(route, sample.FinancialChartPanes.register());
        }
        else if (route.indexOf("/financial-chart-performance") > 0) {
            let sample = await import("./financial-chart/FinancialChartPerformance");
            this.samples.set(route, sample.FinancialChartPerformance.register());
        }
        else if (route.indexOf("/financial-chart-titles") > 0) {
            let sample = await import("./financial-chart/FinancialChartTitles");
            this.samples.set(route, sample.FinancialChartTitles.register());
        }
        else if (route.indexOf("/financial-chart-indicator-types") > 0) {
            let sample = await import("./financial-chart/FinancialChartIndicatorTypes");
            this.samples.set(route, sample.FinancialChartIndicatorTypes.register());
        }
        else if (route.indexOf("/financial-chart-custom-indicators") > 0) {
            let sample = await import("./financial-chart/FinancialChartIndicatorCustom");
            this.samples.set(route, sample.FinancialChartIndicatorCustom.register());
        }
        else if (route.indexOf("/financial-chart-high-frequency") > 0) {
            let sample = await import("./financial-chart/FinancialChartHighFrequency");
            this.samples.set(route, sample.FinancialChartHighFrequency.register());
        }
        else if (route.indexOf("/financial-chart-high-volume") > 0) {
            let sample = await import("./financial-chart/FinancialChartHighVolume");
            this.samples.set(route, sample.FinancialChartHighVolume.register());
        }
        else if (route.indexOf("/financial-chart-multiple-data") > 0) {
            let sample = await import("./financial-chart/FinancialChartMultipleData");
            this.samples.set(route, sample.FinancialChartMultipleData.register());
        }
        else if (route.indexOf("/financial-chart-tooltip-types") > 0) {
            let sample = await import("./financial-chart/FinancialChartTooltipTypes");
            this.samples.set(route, sample.FinancialChartTooltipTypes.register());
        }
        else if (route.indexOf("/financial-chart-trendlines") > 0) {
            let sample = await import("./financial-chart/FinancialChartTrendlines");
            this.samples.set(route, sample.FinancialChartTrendlines.register());
        }
        else if (route.indexOf("/financial-chart-volume-type") > 0) {
            let sample = await import("./financial-chart/FinancialChartVolumeTypes");
            this.samples.set(route, sample.FinancialChartVolumeTypes.register());
        }



        else if (route.indexOf("/sparkline-display-types") > 0) {
            let sample = await import("./sparkline/SparklineDisplayTypes");
            this.samples.set(route, sample.SparklineDisplayTypes.register());
        }
        else if (route.indexOf("/sparkline-display-area") > 0) {
            let sample = await import("./sparkline/SparklineDisplayArea");
            this.samples.set(route, sample.SparklineDisplayArea.register());
        }
        else if (route.indexOf("/sparkline-display-column") > 0) {
            let sample = await import("./sparkline/SparklineDisplayColumn");
            this.samples.set(route, sample.SparklineDisplayColumn.register());
        }
        else if (route.indexOf("/sparkline-display-line") > 0) {
            let sample = await import("./sparkline/SparklineDisplayLines");
            this.samples.set(route, sample.SparklineDisplayLines.register());
        }
        else if (route.indexOf("/sparkline-display-winloss") > 0) {
            let sample = await import("./sparkline/SparklineDisplayWinLoss");
            this.samples.set(route, sample.SparklineDisplayWinLoss.register());
        }
        else if (route.indexOf("/sparkline-grid") > 0) {
            let sample = await import("./sparkline/SparklineGrid");
            this.samples.set(route, sample.SparklineGrid.register());
        }
        else if (route.indexOf("/sparkline-markers") > 0) {
            let sample = await import("./sparkline/SparklineMarkers");
            this.samples.set(route, sample.SparklineMarkers.register());
        }
        else if (route.indexOf("/sparkline-normal-range") > 0) {
            let sample = await import("./sparkline/SparklineNormalRange");
            this.samples.set(route, sample.SparklineNormalRange.register());
        }
        else if (route.indexOf("/sparkline-trendlines") > 0) {
            let sample = await import("./sparkline/SparklineTrendlines");
            this.samples.set(route, sample.SparklineTrendlines.register());
        }
        else if (route.indexOf("/sparkline-unknown-values") > 0) {
            let sample = await import("./sparkline/SparklineUnknownValues");
            this.samples.set(route, sample.SparklineUnknownValues.register());
        }

        else if (route.indexOf("/zoomslider-overview") > 0) {
            let sample = await import("./zoomslider/ZoomSliderOverview");
            this.samples.set(route, sample.ZoomSliderOverview.register());
        }



        else if (route.indexOf("/data-chart-axis-annotations") > 0) {
            let sample = await import("./data-chart/axes/DataChartAxisAnnotations");
            this.samples.set(route, sample.DataChartAxisAnnotations.register());
        }
        else if (route.indexOf("/data-chart-axis-locations") > 0) {
            let sample = await import("./data-chart/axes/DataChartAxisLocations");
            this.samples.set(route, sample.DataChartAxisLocations.register());
        }
        else if (route.indexOf("/data-chart-axis-scales") > 0) {
            let sample = await import("./data-chart/axes/DataChartAxisScales");
            this.samples.set(route, sample.DataChartAxisScales.register());
        }
        else if (route.indexOf("/data-chart-axis-settings") > 0) {
            let sample = await import("./data-chart/axes/DataChartAxisSettings");
            this.samples.set(route, sample.DataChartAxisSettings.register());
        }
        else if (route.indexOf("/data-chart-axis-sharing") > 0) {
            let sample = await import("./data-chart/axes/DataChartAxisSharing");
            this.samples.set(route, sample.DataChartAxisSharing.register());
        }
        else if (route.indexOf("/data-chart-axis-types") > 0) {
            let sample = await import("./data-chart/axes/DataChartAxisTypes");
            this.samples.set(route, sample.DataChartAxisTypes.register());
        }


        else if (route.indexOf("/data-chart-legends") > 0) {
            let sample = await import("./data-chart/features/DataChartLegends");
            this.samples.set(route, sample.DataChartLegends.register());
        }
        else if (route.indexOf("/data-chart-chart-navigation") > 0) {
            let sample = await import("./data-chart/features/DataChartNavigation");
            this.samples.set(route, sample.DataChartNavigation.register());
        }
        else if (route.indexOf("/data-chart-overview") > 0) {
            let sample = await import("./data-chart/features/DataChartOverview");
            this.samples.set(route, sample.DataChartOverview.register());
        }
        else if (route.indexOf("/data-chart-chart-performance") > 0) {
            let sample = await import("./data-chart/features/DataChartPerformance");
            this.samples.set(route, sample.DataChartPerformance.register());
        }

        else if (route.indexOf("/data-chart-chart-synchronization") > 0) {
            let sample = await import("./data-chart/features/DataChartSynchronization");
            this.samples.set(route, sample.DataChartSynchronization.register());
        }
        else if (route.indexOf("/data-chart-chart-titles") > 0) {
            let sample = await import("./data-chart/features/DataChartTitles");
            this.samples.set(route, sample.DataChartTitles.register());
        }
        else if (route.indexOf("/data-chart-series-value-overlay") > 0) {
            let sample = await import("./data-chart/features/DataChartValueOverlay");
            this.samples.set(route, sample.DataChartValueOverlay.register());
        }

        // series features:
        else if (route.indexOf("/data-chart-series-animations") > 0) {
            let sample = await import("./data-chart/features/DataChartSeriesAnimations");
            this.samples.set(route, sample.DataChartSeriesAnimations.register());
        }
        else if (route.indexOf("/data-chart-series-annotations") > 0) {
            let sample = await import("./data-chart/features/DataChartSeriesAnnotations");
            this.samples.set(route, sample.DataChartSeriesAnnotations.register());
        }
        else if (route.indexOf("/data-chart-series-errorbars") > 0) {
            let sample = await import("./data-chart/features/DataChartSeriesErrorBars");
            this.samples.set(route, sample.DataChartSeriesErrorBars.register());
        }
        else if (route.indexOf("/data-chart-series-highlighting") > 0) {
            let sample = await import("./data-chart/features/DataChartSeriesHighlighting");
            this.samples.set(route, sample.DataChartSeriesHighlighting.register());
        }
        else if (route.indexOf("/data-chart-series-markers") > 0) {
            let sample = await import("./data-chart/features/DataChartSeriesMarkers");
            this.samples.set(route, sample.DataChartSeriesMarkers.register());
        }
        else if (route.indexOf("/data-chart-series-tooltips") > 0) {
            let sample = await import("./data-chart/features/DataChartSeriesTooltips");
            this.samples.set(route, sample.DataChartSeriesTooltips.register());
        }
        else if (route.indexOf("/data-chart-series-trendlines") > 0) {
            let sample = await import("./data-chart/features/DataChartSeriesTrendlines");
            this.samples.set(route, sample.DataChartSeriesTrendlines.register());
        }

        else if (route.indexOf("/data-chart-type-category-area-series") > 0) {
            let sample = await import("./data-chart/category/DataChartTypeCategoryAreaSeries");
            this.samples.set(route, sample.DataChartTypeCategoryAreaSeries.register());
        }
        else if (route.indexOf("/data-chart-type-category-bar-series") > 0) {
            let sample = await import("./data-chart/category/DataChartTypeCategoryBarSeries");
            this.samples.set(route, sample.DataChartTypeCategoryBarSeries.register());
        }
        else if (route.indexOf("/data-chart-type-category-column-series") > 0) {
            let sample = await import("./data-chart/category/DataChartTypeCategoryColumnSeries");
            this.samples.set(route, sample.DataChartTypeCategoryColumnSeries.register());
        }
        else if (route.indexOf("/data-chart-type-category-line-series") > 0) {
            let sample = await import("./data-chart/category/DataChartTypeCategoryLineSeries");
            this.samples.set(route, sample.DataChartTypeCategoryLineSeries.register());
        }
        else if (route.indexOf("/data-chart-type-category-point-series") > 0) {
            let sample = await import("./data-chart/category/DataChartTypeCategoryPointSeries");
            this.samples.set(route, sample.DataChartTypeCategoryPointSeries.register());
        }
        else if (route.indexOf("/data-chart-type-category-series") > 0) {
            let sample = await import("./data-chart/category/DataChartTypeCategorySeries");
            this.samples.set(route, sample.DataChartTypeCategorySeries.register());
        }
        else if (route.indexOf("/data-chart-type-category-spline-area-series") > 0) {
            let sample = await import("./data-chart/category/DataChartTypeCategorySplineAreaSeries");
            this.samples.set(route, sample.DataChartTypeCategorySplineAreaSeries.register());
        }
        else if (route.indexOf("/data-chart-type-category-spline-series") > 0) {
            let sample = await import("./data-chart/category/DataChartTypeCategorySplineSeries");
            this.samples.set(route, sample.DataChartTypeCategorySplineSeries.register());
        }
        else if (route.indexOf("/data-chart-type-category-step-area-series") > 0) {
            let sample = await import("./data-chart/category/DataChartTypeCategoryStepAreaSeries");
            this.samples.set(route, sample.DataChartTypeCategoryStepAreaSeries.register());
        }
        else if (route.indexOf("/data-chart-type-category-step-line-series") > 0) {
            let sample = await import("./data-chart/category/DataChartTypeCategoryStepLineSeries");
            this.samples.set(route, sample.DataChartTypeCategoryStepLineSeries.register());
        }
        else if (route.indexOf("/data-chart-type-category-waterfall-series") > 0) {
            let sample = await import("./data-chart/category/DataChartTypeCategoryWaterfallSeries");
            this.samples.set(route, sample.DataChartTypeCategoryWaterfallSeries.register());
        }







        else if (route.indexOf("/data-chart-type-financial-candlestick-series") > 0) {
            let sample = await import("./data-chart/financial/DataChartTypeFinancialCandlestickSeries");
            this.samples.set(route, sample.DataChartTypeFinancialCandlestickSeries.register());
        }
        else if (route.indexOf("/data-chart-type-financial-area-indicators") > 0) {
            let sample = await import("./data-chart/financial/DataChartTypeFinancialIndicatorArea");
            this.samples.set(route, sample.DataChartTypeFinancialIndicatorArea.register());
        }
        else if (route.indexOf("/data-chart-type-financial-column-indicators") > 0) {
            let sample = await import("./data-chart/financial/DataChartTypeFinancialIndicatorColumn");
            this.samples.set(route, sample.DataChartTypeFinancialIndicatorColumn.register());
        }
        else if (route.indexOf("/data-chart-type-financial-line-indicators") > 0) {
            let sample = await import("./data-chart/financial/DataChartTypeFinancialIndicatorLine");
            this.samples.set(route, sample.DataChartTypeFinancialIndicatorLine.register());
        }
        else if (route.indexOf("/data-chart-type-financial-ohlc-series") > 0) {
            let sample = await import("./data-chart/financial/DataChartTypeFinancialOhlcSeries");
            this.samples.set(route, sample.DataChartTypeFinancialOhlcSeries.register());
        }
        else if (route.indexOf("/data-chart-type-financial-overlays") > 0) {
            let sample = await import("./data-chart/financial/DataChartTypeFinancialOverlays");
            this.samples.set(route, sample.DataChartTypeFinancialOverlays.register());
        }
        else if (route.indexOf("/data-chart-type-financial-series") > 0) {
            let sample = await import("./data-chart/financial/DataChartTypeFinancialSeries");
            this.samples.set(route, sample.DataChartTypeFinancialSeries.register());
        }


        else if (route.indexOf("/data-chart-type-polar-area-series") > 0) {
            let sample = await import("./data-chart/polar/DataChartTypePolarAreaSeries");
            this.samples.set(route, sample.DataChartTypePolarAreaSeries.register());
        }
        else if (route.indexOf("/data-chart-type-polar-line-series") > 0) {
            let sample = await import("./data-chart/polar/DataChartTypePolarLineSeries");
            this.samples.set(route, sample.DataChartTypePolarLineSeries.register());
        }
        else if (route.indexOf("/data-chart-type-polar-scatter-series") > 0) {
            let sample = await import("./data-chart/polar/DataChartTypePolarScatterSeries");
            this.samples.set(route, sample.DataChartTypePolarScatterSeries.register());
        }
        else if (route.indexOf("/data-chart-type-polar-series") > 0) {
            let sample = await import("./data-chart/polar/DataChartTypePolarSeries");
            this.samples.set(route, sample.DataChartTypePolarSeries.register());
        }
        else if (route.indexOf("/data-chart-type-polar-spline-area-series") > 0) {
            let sample = await import("./data-chart/polar/DataChartTypePolarSplineAreaSeries");
            this.samples.set(route, sample.DataChartTypePolarSplineAreaSeries.register());
        }
        else if (route.indexOf("/data-chart-type-polar-spline-series") > 0) {
            let sample = await import("./data-chart/polar/DataChartTypePolarSplineSeries");
            this.samples.set(route, sample.DataChartTypePolarSplineSeries.register());
        }


        else if (route.indexOf("/data-chart-type-radial-area-series") > 0) {
            let sample = await import("./data-chart/radial/DataChartTypeRadialAreaSeries");
            this.samples.set(route, sample.DataChartTypeRadialAreaSeries.register());
        }
        else if (route.indexOf("/data-chart-type-radial-column-series") > 0) {
            let sample = await import("./data-chart/radial/DataChartTypeRadialColumnSeries");
            this.samples.set(route, sample.DataChartTypeRadialColumnSeries.register());
        }
        else if (route.indexOf("/data-chart-type-radial-line-series") > 0) {
            let sample = await import("./data-chart/radial/DataChartTypeRadialLineSeries");
            this.samples.set(route, sample.DataChartTypeRadialLineSeries.register());
        }
        else if (route.indexOf("/data-chart-type-radial-pie-series") > 0) {
            let sample = await import("./data-chart/radial/DataChartTypeRadialPieSeries");
            this.samples.set(route, sample.DataChartTypeRadialPieSeries.register());
        }
        else if (route.indexOf("/data-chart-type-radial-series") > 0) {
            let sample = await import("./data-chart/radial/DataChartTypeRadialSeries");
            this.samples.set(route, sample.DataChartTypeRadialSeries.register());
        }


        else if (route.indexOf("/data-chart-type-range-area-series") > 0) {
            let sample = await import("./data-chart/range/DataChartTypeRangeAreaSeries");
            this.samples.set(route, sample.DataChartTypeRangeAreaSeries.register());
        }
        else if (route.indexOf("/data-chart-type-range-column-series") > 0) {
            let sample = await import("./data-chart/range/DataChartTypeRangeColumnSeries");
            this.samples.set(route, sample.DataChartTypeRangeColumnSeries.register());
        }
        else if (route.indexOf("/data-chart-type-range-series") > 0) {
            let sample = await import("./data-chart/range/DataChartTypeRangeSeries");
            this.samples.set(route, sample.DataChartTypeRangeSeries.register());
        }


        else if (route.indexOf("/data-chart-type-scatter-area-series") > 0) {
            let sample = await import("./data-chart/scatter/DataChartTypeScatterAreaSeries");
            this.samples.set(route, sample.DataChartTypeScatterAreaSeries.register());
        }
        else if (route.indexOf("/data-chart-type-scatter-bubble-series") > 0) {
            let sample = await import("./data-chart/scatter/DataChartTypeScatterBubbleSeries");
            this.samples.set(route, sample.DataChartTypeScatterBubbleSeries.register());
        }
        else if (route.indexOf("/data-chart-type-scatter-contour-series") > 0) {
            let sample = await import("./data-chart/scatter/DataChartTypeScatterContourSeries");
            this.samples.set(route, sample.DataChartTypeScatterContourSeries.register());
        }
        else if (route.indexOf("/data-chart-type-scatter-hd-series") > 0) {
            let sample = await import("./data-chart/scatter/DataChartTypeScatterDensitySeries");
            this.samples.set(route, sample.DataChartTypeScatterDensitySeries.register());
        }
        else if (route.indexOf("/data-chart-type-scatter-line-series") > 0) {
            let sample = await import("./data-chart/scatter/DataChartTypeScatterLineSeries");
            this.samples.set(route, sample.DataChartTypeScatterLineSeries.register());
        }
        else if (route.indexOf("/data-chart-type-scatter-point-series") > 0) {
            let sample = await import("./data-chart/scatter/DataChartTypeScatterPointSeries");
            this.samples.set(route, sample.DataChartTypeScatterPointSeries.register());
        }
        else if (route.indexOf("/data-chart-type-scatter-spline-series") > 0) {
            let sample = await import("./data-chart/scatter/DataChartTypeScatterSplineSeries");
            this.samples.set(route, sample.DataChartTypeScatterSplineSeries.register());
        }
        else if (route.indexOf("/data-chart-type-scatter-polygon-series") > 0) {
            let sample = await import("./data-chart/scatter/DataChartTypeScatterPolygonSeries");
            this.samples.set(route, sample.DataChartTypeScatterPolygonSeries.register());
        }
        else if (route.indexOf("/data-chart-type-scatter-polyline-series") > 0) {
            let sample = await import("./data-chart/scatter/DataChartTypeScatterPolylineSeries");
            this.samples.set(route, sample.DataChartTypeScatterPolylineSeries.register());
        }
        else if (route.indexOf("/data-chart-type-shape-series") > 0) {
            let sample = await import("./data-chart/scatter/DataChartTypeShapeSeries");
            this.samples.set(route, sample.DataChartTypeShapeSeries.register());
        }
        else if (route.indexOf("/data-chart-type-scatter-series") > 0) {
            let sample = await import("./data-chart/scatter/DataChartTypeScatterSeries");
            this.samples.set(route, sample.DataChartTypeScatterSeries.register());
        }



        else if (route.indexOf("/data-chart-type-stacked-series") > 0) {
            let sample = await import("./data-chart/stacked/DataChartTypeStackedSeries");
            this.samples.set(route, sample.DataChartTypeStackedSeries.register());
        }
        else if (route.indexOf("/data-chart-type-stacked-area-series") > 0) {
            let sample = await import("./data-chart/stacked/DataChartTypeStackedAreaSeries");
            this.samples.set(route, sample.DataChartTypeStackedAreaSeries.register());
        }
        else if (route.indexOf("/data-chart-type-stacked-bar-series") > 0) {
            let sample = await import("./data-chart/stacked/DataChartTypeStackedBarSeries");
            this.samples.set(route, sample.DataChartTypeStackedBarSeries.register());
        }
        else if (route.indexOf("/data-chart-type-stacked-column-series") > 0) {
            let sample = await import("./data-chart/stacked/DataChartTypeStackedColumnSeries");
            this.samples.set(route, sample.DataChartTypeStackedColumnSeries.register());
        }
        else if (route.indexOf("/data-chart-type-stacked-line-series") > 0) {
            let sample = await import("./data-chart/stacked/DataChartTypeStackedLineSeries");
            this.samples.set(route, sample.DataChartTypeStackedLineSeries.register());
        }
        else if (route.indexOf("/data-chart-type-stacked-spline-series") > 0) {
            let sample = await import("./data-chart/stacked/DataChartTypeStackedSplineSeries");
            this.samples.set(route, sample.DataChartTypeStackedSplineSeries.register());
        }
        else if (route.indexOf("/data-chart-type-stacked-spline-area-series") > 0) {
            let sample = await import("./data-chart/stacked/DataChartTypeStackedSplineAreaSeries");
            this.samples.set(route, sample.DataChartTypeStackedSplineAreaSeries.register());
        }


        else if (route.indexOf("/data-chart-type-stacked-100-area-series") > 0) {
            let sample = await import("./data-chart/stacked/DataChartTypeStacked100AreaSeries");
            this.samples.set(route, sample.DataChartTypeStacked100AreaSeries.register());
        }
        else if (route.indexOf("/data-chart-type-stacked-100-bar-series") > 0) {
            let sample = await import("./data-chart/stacked/DataChartTypeStacked100BarSeries");
            this.samples.set(route, sample.DataChartTypeStacked100BarSeries.register());
        }
        else if (route.indexOf("/data-chart-type-stacked-100-column-series") > 0) {
            let sample = await import("./data-chart/stacked/DataChartTypeStacked100ColumnSeries");
            this.samples.set(route, sample.DataChartTypeStacked100ColumnSeries.register());
        }
        else if (route.indexOf("/data-chart-type-stacked-100-line-series") > 0) {
            let sample = await import("./data-chart/stacked/DataChartTypeStacked100LineSeries");
            this.samples.set(route, sample.DataChartTypeStacked100LineSeries.register());
        }
        else if (route.indexOf("/data-chart-type-stacked-100-spline-series") > 0) {
            let sample = await import("./data-chart/stacked/DataChartTypeStacked100SplineSeries");
            this.samples.set(route, sample.DataChartTypeStacked100SplineSeries.register());
        }
        else if (route.indexOf("/data-chart-type-stacked-100-spline-area-series") > 0) {
            let sample = await import("./data-chart/stacked/DataChartTypeStacked100SplineAreaSeries");
            this.samples.set(route, sample.DataChartTypeStacked100SplineAreaSeries.register());
        }
        // TREE MAP
        else if (route.indexOf("/tree-map-overview") >= 0) {
            let sample = await import("./tree-map/TreeMapOverview");
            this.samples.set(route, sample.TreeMapOverview.register());
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