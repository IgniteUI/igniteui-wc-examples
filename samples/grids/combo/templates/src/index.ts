import { defineComponents, registerIconFromText, IgcComboComponent, ComboItemTemplate } from "igniteui-webcomponents";
import { html } from "lit-html";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

interface City {
    id: string;
    name: string;
    country: string;
}

const cities: City[] = [
    { name: "London", id: "UK01", country: "UK" },
    { name: "Manchester", id: "UK02", country: "UK" },
    { name: "Birmingham", id: "UK03", country: "UK" },
    { name: "Glasgow", id: "UK04", country: "UK" },
    { name: "Liverpool", id: "UK05", country: "UK" },
    { name: "New York", id: "US01", country: "USA" },
    { name: "Miami", id: "US02", country: "USA" },
    { name: "Philadelphia", id: "US03", country: "USA" },
    { name: "Chicago", id: "US04", country: "USA" },
    { name: "Springfield", id: "US05", country: "USA" },
    { name: "Los Angeles", id: "US06", country: "USA" },
    { name: "Houston", id: "US07", country: "USA" },
    { name: "Phoenix", id: "US08", country: "USA" },
    { name: "San Diego", id: "US09", country: "USA" },
    { name: "Dallas", id: "US010", country: "USA" },
    { name: "Sofia", id: "BG01", country: "Bulgaria" },
    { name: "Plovdiv", id: "BG02", country: "Bulgaria" },
    { name: "Varna", id: "BG03", country: "Bulgaria" },
    { name: "Burgas", id: "BG04", country: "Bulgaria" },
    { name: "Rome", id: "IT01", country: "Italy" },
    { name: "Milan", id: "IT02", country: "Italy" },
    { name: "Naples", id: "IT03", country: "Italy" },
    { name: "Turin", id: "IT04", country: "Italy" },
    { name: "Palermo", id: "IT05", country: "Italy" },
    { name: "Florence", id: "IT06", country: "Italy" }
];

const toggleIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>';
const clearIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';

defineComponents(IgcComboComponent);

export class ComboTemplates {
    private combo: IgcComboComponent<City>;
    protected itemTemplate: ComboItemTemplate<City> = ({ item }) => {
        return html` <span><b>${item.name}</b> [${item.id}]</span>`;
    };

    protected groupHeaderTemplate: ComboItemTemplate<City> = ({ item }) => {
        return html`<span>Country of ${item.country}</span>`;
    };

    constructor() {
        registerIconFromText("clear", clearIcon);
        registerIconFromText("down", toggleIcon);

        this.combo = document.getElementById("combo") as IgcComboComponent<City>;
        this.combo.data = cities;
        this.combo.itemTemplate = this.itemTemplate;
        this.combo.groupHeaderTemplate = this.groupHeaderTemplate;
    }
}

new ComboTemplates();
