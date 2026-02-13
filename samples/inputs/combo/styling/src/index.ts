import { defineComponents, registerIconFromText, IgcComboComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./ComboStyle.css";

defineComponents(IgcComboComponent);

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

const placeSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z"/></svg>';
registerIconFromText("place", placeSvg, "material");

export class ComboStyling {
    private combo: IgcComboComponent<City>;

    constructor() {
        this.combo = document.getElementById("combo") as IgcComboComponent<City>;
        this.combo.data = cities;
    }
}

export function initialize() {
  return new ComboStyling();
}