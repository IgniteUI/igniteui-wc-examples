import { defineComponents, IgcComboComponent, IgcButtonComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import './index.css';

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

defineComponents(IgcComboComponent, IgcButtonComponent);
export class ComboSelection {
    private combo: IgcComboComponent<City>;

    public selectCities() {
        this.combo.select(["UK01", "UK02", "UK03", "UK04", "UK05"]);
    }

    public deselectCities() {
        this.combo.deselect(["UK01", "UK02", "UK03", "UK04", "UK05"]);
    }

    public selectAll() {
        this.combo.select();
    }

    public deselectAll() {
        this.combo.deselect();
    }

    constructor() {
        this.combo = document.getElementById("combo") as IgcComboComponent<City>;
        this.combo.data = cities;

        let selectBtn = document.getElementById("select") as IgcButtonComponent;
        selectBtn.addEventListener("click", this.selectCities.bind(this));

        let selectAllBtn = document.getElementById("selectAll") as IgcButtonComponent;
        selectAllBtn.addEventListener("click", this.selectAll.bind(this));

        let deselectBtn = document.getElementById("deselect") as IgcButtonComponent;
        deselectBtn.addEventListener("click", this.deselectCities.bind(this));

        let deselectAllBtn = document.getElementById("deselectAll") as IgcButtonComponent;
        deselectAllBtn.addEventListener("click", this.deselectAll.bind(this));
    }
}

new ComboSelection();
