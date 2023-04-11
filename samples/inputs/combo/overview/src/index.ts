import { defineComponents, IgcComboComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";

interface City {
    id: string;
    name: string;
}

const cities: City[] = [
    { name: "London", id: "UK01" },
    { name: "Sofia", id: "BG01" },
    { name: "New York", id: "NY01" }
];

defineComponents(IgcComboComponent);
export class ComboOverview {
    private combo: IgcComboComponent<City>;

    constructor() {
        this.combo = document.getElementById("combo") as IgcComboComponent<City>;
        this.combo.data = cities;
    }
}

new ComboOverview();
