export class SolarDaysInfo {
    public constructor(init: Partial<SolarDaysInfo>) {
        Object.assign(this, init);
    }

    public latitude: string;
    public dayLength: number;

}
export class SolarDaysData extends Array<SolarDaysInfo> {
    public constructor() {
        super(0);
        // if (Array.isArray(items)) {
        //     super(...items);
        // } else {
            super.push(new SolarDaysInfo({ latitude: ` 90`, dayLength: 0  }));
            const newItems = [
                // new SolarDaysInfo({ latitude: ` 90`, dayLength: 0  }),
                new SolarDaysInfo({ latitude: ` 85`, dayLength: 1  }),
                new SolarDaysInfo({ latitude: ` 80`, dayLength: 3  }),
                new SolarDaysInfo({ latitude: ` 75`, dayLength: 6  }),
                new SolarDaysInfo({ latitude: ` 60`, dayLength: 11 }),
                new SolarDaysInfo({ latitude: ` 45`, dayLength: 12 }),
                new SolarDaysInfo({ latitude: ` 30`, dayLength: 13 }),
                new SolarDaysInfo({ latitude: ` 15`, dayLength: 14 }),
                new SolarDaysInfo({ latitude: `  0`, dayLength: 16 }),
                new SolarDaysInfo({ latitude: `-15`, dayLength: 17 }),
                new SolarDaysInfo({ latitude: `-30`, dayLength: 18 }),
                new SolarDaysInfo({ latitude: `-45`, dayLength: 19 }),
                new SolarDaysInfo({ latitude: `-60`, dayLength: 20 }),
                new SolarDaysInfo({ latitude: `-75`, dayLength: 22 }),
                new SolarDaysInfo({ latitude: `-80`, dayLength: 24 }),
                new SolarDaysInfo({ latitude: `-85`, dayLength: 24 }),
                // new SolarDaysInfo({ latitude: `-90`, dayLength: 24 }),
            ];
            for (const item of newItems) {
                super.push(item);
            }
            super.push(new SolarDaysInfo({ latitude: `-90`, dayLength: 24  }));
            // super(...newItems.slice(0));
            newItems.reverse();
            for (const item of newItems) {
                super.push(item);
            }
            // super(...newItems.slice(0));
        // }
    }

    // calculate length of day based on latitude and day of the year
    // https://www.google.com/search?q=calculate+length+of+day+based+on+latitude+and+day+of+the+year&sca_esv=d145af582a4b3e8b&rlz=1C1GCEA_enUS1109US1109&sxsrf=ANbL-n4wRXZATHT-Qg0INhtt9yGuKRFzQQ%3A1769357603457&ei=I0F2aZK_G8GlwbkPnYOgEA&oq=calculate+length+of+day+based+on+latitude+and+day+of+t&gs_lp=Egxnd3Mtd2l6LXNlcnAiNmNhbGN1bGF0ZSBsZW5ndGggb2YgZGF5IGJhc2VkIG9uIGxhdGl0dWRlIGFuZCBkYXkgb2YgdCoCCAEyBRAhGKABMgUQIRigATIFECEYoAEyBRAhGKsCMgUQIRirAkiihwFQvAdYjHFwA3gBkAEAmAGJAaAB5hSqAQQ5LjE2uAEDyAEA-AEBmAIboALdFMICChAAGLADGNYEGEfCAgYQABgNGB7CAgsQABiABBiGAxiKBcICCBAAGIAEGKIEwgIKECEYoAEYwwQYCsICCBAhGKABGMMEwgIFECEYnwXCAgcQIRigARgKmAMAiAYBkAYIkgcEOS4xOKAHrLkBsgcENi4xOLgH0hTCBwY0LjIwLjPIBzaACAA&sclient=gws-wiz-serp

    // https://joe-antognini.github.io/astronomy/daylight#:~:text=Putting%20this%20all%20together%2C%20if,T365d))hr.

    // compare table
    // https://aa.usno.navy.mil/faq/longest_day 
    public static calcDayLength(latitude: number): number {
        // Simplified calculation of day length based on latitude
        // This is just a placeholder for the actual calculation

// To calculate the day length at \(40^{\circ }\text{N}\) (\(\phi =40\)) on the Summer Solstice (\(N\approx 172\)):


        return Math.max(0, 24 - Math.abs(latitude) / 90 * 24);

        
    }
}
