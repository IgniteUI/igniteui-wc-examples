import { RouterCharts } from "./samples/charts/router";
import { RouterGauges } from "./samples/gauges/router";
import { RouterGrids } from "./samples/grids/router";
import { RouterMaps } from "./samples/maps/router";
import { RouterExcel } from "./samples/excel/router";
import { RouterLayouts } from "./samples/layouts/router";
import { RouterEditors } from "./samples/editors/router";
import { RouterInputs } from "./samples/inputs/router";

export class Router {

    private static _instance: Router = null;
    public static get instance(): Router {
        if (this._instance === null) {
            this._instance = new Router()
        }

        return this._instance;
    }

    private _targetEle: HTMLElement;

    constructor() {
    }

    public async connect(targetEle: HTMLElement) {
        this._targetEle = targetEle;

        let pathName = window.location.pathname;

        console.log("SB connect " + pathName);
        await this.navigateToRoute(pathName);

        window.onpopstate = () => {
            this.navigateToRoute(window.location.pathname);
        }
    }

    public async navigateTo(route: string) {
        console.log("SB navigateTo " + route);
        window.history.pushState(
            {},
            this.public_url + route,
            window.location.origin + this.public_url + route
        );
        await this.navigateToRoute(this.public_url + route);
    }

    private displaySample(sample: any) {
        let tagName = sample.htmlTagName;
        this._targetEle.innerHTML = `<${tagName} class="sample-content"></${tagName}>`;
    }

    private public_url = "";

    public async navigateToRoute(route: string) {
        let navBarIsHidden: boolean = true;

        if (route.indexOf("/webcomponents-demos") === 0) {
            this.public_url = "/webcomponents-demos";
            route = route.substring("/webcomponents-demos".length);
        }

        if (route === "" || route === "/") {
            navBarIsHidden = false;
        } else if (route.indexOf("/samples") === 0) {
            route = route.substring("/samples".length);
            navBarIsHidden = false;
        }

        let navBar = document.getElementById("nav-bar");
        if (navBarIsHidden) {
            navBar.setAttribute("style", "display: none; width: 0px");
            // navBar.classList.remove("nav-bar-expanded");
            this._targetEle.classList.remove("with-nav-bar");
        } else {
            navBar.setAttribute("style", "display: block; width: 270px");
            // navBar.classList.add("nav-bar-expanded");
            this._targetEle.classList.add("with-nav-bar");
        }

        console.log("SB matching " + route);

        if (route.indexOf("/maps/") >= 0) {
            this.displaySample(await RouterMaps.get(route));
        }
        if (route.indexOf("/grids/") >= 0) {
            this.displaySample(await RouterGrids.get(route));
        }
        if (route.indexOf("/excel/") >= 0) {
            this.displaySample(await RouterExcel.get(route));
        }
        if (route.indexOf("/gauges/") >= 0) {
            this.displaySample(await RouterGauges.get(route));
        }
        if (route.indexOf("/charts/") >= 0) {
            this.displaySample(await RouterCharts.get(route));
        }
        if (route.indexOf("/layouts/") >= 0) {
            this.displaySample(await RouterLayouts.get(route));
        }
        if (route.indexOf("/editors/") >= 0) {
            this.displaySample(await RouterEditors.get(route));
        }

        else if (route !== "/" && route !== "/index") {
            console.log("SB missing router for " + route)
            // this.navigateToRoute(""); // TODO add fallback
        }

        if (route.indexOf("/inputs/") >= 0) {
            this.displaySample(await RouterInputs.get(route));
        }

        // switch (route) {
        //     //NOTE! this is spelled out explicitly on purpose. I'm not sure the bundlers would like it if you
        //     //tried to make this more dynamic.
        //     // case "":
        //     //     this.navigateToRoute("");
        //     //     break;
        //     case "/category-chart":
        //         this.displaySample(await RouterCharts.get("./category-chart-sample"));
        //         // if (!this.categoryChartSample) {
        //         //     let sample = await import("./category-chart-sample");
        //         //     this.categoryChartSample = sample.CategoryChartSampleComponent;
        //         //     sample.CategoryChartSampleComponent.register();
        //         // }
        //         // this.displaySample(this.categoryChartSample);
        //         break;
        //     case "":
        //     case "/radial-gauge":
        //         if (!this.radialGaugeSample) {
        //             let sample = await import("./radial-gauge-sample");
        //             this.radialGaugeSample = sample.RadialGaugeSampleComponent;
        //             sample.RadialGaugeSampleComponent.register();
        //         }
        //         this.displaySample(this.radialGaugeSample);
        //         break;
        //     default:
        //         this.navigateToRoute("");
        //         break;
        // }
    }

}