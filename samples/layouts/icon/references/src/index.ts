import { defineComponents, IgcIconComponent, registerIcon, setIconRef } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcIconComponent);

export class IconReferences {
    private playing = false;

    constructor() {
        const icon = document.querySelector("igc-icon[name='control']");
        icon?.addEventListener("click", this.togglePlayer.bind(this));
        this.setIcon();
    }

    public static async build() {
        await registerIcon("rewind", "https://cdn.jsdelivr.net/npm/material-design-icons@3.0.1/av/svg/production/ic_fast_rewind_24px.svg", "material");
        await registerIcon("forward", "https://cdn.jsdelivr.net/npm/material-design-icons@3.0.1/av/svg/production/ic_fast_forward_24px.svg", "material");
        await registerIcon("play", "https://cdn.jsdelivr.net/npm/material-design-icons@3.0.1/av/svg/production/ic_play_circle_filled_24px.svg", "material");
        await registerIcon("pause", "https://cdn.jsdelivr.net/npm/material-design-icons@3.0.1/av/svg/production/ic_pause_circle_filled_24px.svg", "material");

        setIconRef("rewind", "player", {
            name: "rewind",
            collection: "material"
        });

        setIconRef("forward", "player", {
            name: "forward",
            collection: "material"
        });

        return new IconReferences();
    }

    private setIcon() {
        setIconRef("control", "player", {
            name: this.playing ? "pause" : "play",
            collection: "material"
        });
    }

    private togglePlayer() {
        this.playing = !this.playing;
        this.setIcon();
    }
}

(async () => {
    await IconReferences.build();
})();
