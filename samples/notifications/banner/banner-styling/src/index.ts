import { defineComponents, registerIconFromText, IgcBannerComponent, IgcIconComponent, IgcCardComponent, IgcNavbarComponent, IgcButtonComponent, IgcRippleComponent, IgcToastComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./BannerStyling.css";

defineComponents(IgcBannerComponent, IgcNavbarComponent, IgcIconComponent, IgcCardComponent, IgcButtonComponent, IgcRippleComponent, IgcToastComponent);

const wifiOnIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"/></svg>';

const wifiOffIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M23.64 7c-.45-.34-4.93-4-11.64-4-1.5 0-2.89.19-4.15.48L18.18 13.8 23.64 7zm-6.6 8.22L3.27 1.44 2 2.72l2.05 2.06C1.91 5.76.59 6.82.36 7l11.63 14.49.01.01.01-.01 3.9-4.86 3.32 3.32 1.27-1.27-3.46-3.46z"/></svg>';

export class BannerStylingSample {
    private banner: IgcBannerComponent;
    private icon: IgcIconComponent;
    private button: IgcButtonComponent;
    private toast: IgcToastComponent;

    private wifiState: boolean = false;

    constructor() {
        registerIconFromText('signal_wifi_off', wifiOffIcon);
        registerIconFromText('signal_wifi_4_bar', wifiOnIcon);

        this.banner = document.getElementById('banner') as IgcBannerComponent;
        this.icon = document.getElementById('icon') as IgcIconComponent;
        this.button = document.getElementById('button') as IgcButtonComponent;
        this.toast = document.getElementById('toast') as IgcToastComponent;

        this.banner.open = true;

        this.button.addEventListener('click', () => this.refreshBanner());
        this.icon.addEventListener('click', () => this.refreshBanner());
    }

    public refreshBanner() {
        if (!this.wifiState) {
            this.icon.name = 'signal_wifi_4_bar';
            this.banner.hide();
        } else {
            this.icon.name = 'signal_wifi_off';
            this.banner.show();
        }

        this.wifiState = !this.wifiState;
        this.showToast();
    }

    public showToast() {
        this.toast.open = false;
        this.toast.textContent = `Wifi is now ${this.wifiState ? 'on' : 'off'}`;
        this.toast.show();
    }
}

new BannerStylingSample();
