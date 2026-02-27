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
}
