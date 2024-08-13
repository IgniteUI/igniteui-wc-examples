import { defineComponents, registerIconFromText, IgcBannerComponent, IgcIconComponent, IgcCardComponent, IgcNavbarComponent, IgcButtonComponent, IgcRippleComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./BannerStyling.css";

defineComponents(IgcBannerComponent, IgcNavbarComponent, IgcIconComponent, IgcCardComponent, IgcButtonComponent, IgcRippleComponent);

const refreshIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>';

const wifiOffIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M23.64 7c-.45-.34-4.93-4-11.64-4-1.5 0-2.89.19-4.15.48L18.18 13.8 23.64 7zm-6.6 8.22L3.27 1.44 2 2.72l2.05 2.06C1.91 5.76.59 6.82.36 7l11.63 14.49.01.01.01-.01 3.9-4.86 3.32 3.32 1.27-1.27-3.46-3.46z"/></svg>';

export class BannerSample2 {
    constructor() {
        registerIconFromText('refresh', refreshIcon);
        registerIconFromText('signal_wifi_off', wifiOffIcon);

        const banner = document.getElementById('banner') as IgcBannerComponent;
        banner.open = true;
    }
}

new BannerSample2();