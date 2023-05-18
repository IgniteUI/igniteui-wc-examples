export class StocksUtility {

    public static priceStart: number = 200;
    public static priceRange: number = 1;
    public static volumeRange: number = 1000;
    public static volumeStart: number = 20000000;

    public static getStocksFrom(dateEnd: Date, years: number): any {
        const dateStart: Date = this.addYears(dateEnd, -years);
        return this.getStocksBetween(dateStart, dateEnd, true);
    }

    public static getStocksItems(points: number, intervalMinutes?: number): any {

        if (intervalMinutes === undefined || intervalMinutes <= 0) {
            intervalMinutes = 60;
        }

        const today: Date = new Date();
        const year: number = today.getFullYear();
        const dateEnd: Date = new Date(year, 11, 1);
        const dateStart: Date = this.addHours(dateEnd, -points);
        return this.getStocksBetween(dateStart, dateEnd, false, intervalMinutes);
    }

    // generates stocks data for specified number of months, with each item separated by specified interval in minutes
    public static getStocksForMonths(rangeInMonths?: number, intervalMinutes?: number, stockName?: string): any {

        if (rangeInMonths === undefined) {
            rangeInMonths = 6;
        }

        const dateEnd: Date = new Date();
        const dateStart: Date = this.addMonths(dateEnd, -rangeInMonths);

        return this.getStocksBetween(dateStart, dateEnd, true, intervalMinutes, stockName);
    }

    public static getStocksBetween(dateStart: Date, dateEnd: Date, useRounding?:
        boolean, intervalMinutes?: number, stockName?: string): any {

        if (intervalMinutes === undefined || intervalMinutes <= 0) {
            intervalMinutes = 60;
        }

        let time: Date = this.addDays(dateStart, 0);
        let v: number = this.volumeStart;
        let o: number = this.priceStart;
        let h: number = o + (Math.random() * this.priceRange);
        let l: number = o - (Math.random() * this.priceRange);
        let c: number = l + (Math.random() * (h - l));

        const stock: any[] = [];
        while (time.getTime() < dateEnd.getTime()) {
            stock.push({ date: time, open: o, high: h, low: l, close: c, volume: v });

            o = c + ((Math.random() - 0.5) * this.priceRange);
            if (o < 0) {
                o = Math.abs(o) + 10;
            }
            h = o + (Math.random() * this.priceRange);
            l = o - (Math.random() * this.priceRange);
            c = l + (Math.random() * (h - l));
            v = v + ((Math.random() - 0.5) * this.volumeRange);
            if (v < 0) {
                v = Math.abs(v) + 10000;
            }

            if (useRounding === undefined || useRounding) {
                o = Math.round(o * 100) / 100;
                h = Math.round(h * 100) / 100;
                l = Math.round(l * 100) / 100;
                c = Math.round(c * 100) / 100;
                v = Math.round(v * 100) / 100;
            }
            time = this.addMinutes(time, intervalMinutes);
        }
        if (stockName === undefined) {
            stockName = "Stock Prices";
        }
        // setting data intent for Series Title
        (stock as any).__dataIntents = {
            close: ["SeriesTitle/" + stockName]
        };
        // console.log("start " + this.ToString(dateStart));
        // console.log("end " + this.ToString(dateEnd));
        console.log("stocks " + stock.length);
        return stock;
    }

    public static addMinutes(date: Date, minutes: number): Date {
        return new Date(date.getTime() + minutes * 60 * 1000);
    }

    public static addHours(date: Date, hours: number): Date {
        return this.addMinutes(date, hours * 60);
    }

    public static addDays(date: Date, days: number): Date {
        return this.addHours(date, days * 24);
    }

    public static addMonths(date: Date, months: number): Date {
        return this.addDays(date, 31 * months);
    }

    public static addYears(date: Date, years: number): Date {
        return new Date(date.getFullYear() + years, date.getMonth(), date.getDate());
    }

    public static toShortString(largeValue: number): string {
        let roundValue: number;

        if (largeValue >= 1000000) {
            roundValue = Math.round(largeValue / 100000) / 10;
            return roundValue + "M";
        }
        if (largeValue >= 1000) {
            roundValue = Math.round(largeValue / 100) / 10;
            return roundValue + "K";
        }

        roundValue = Math.round(largeValue);
        return roundValue + "";
    }

    public static getYear(date: Date): number {
        return date.getFullYear();
    }

    public static getQuarter(date: Date): number {
        return Math.round((date.getMonth() + 2) / 3);
    }

    public static getLastItem(array: any[]): any {
        if (array.length === 0) {
            return null;
        }
        return array[array.length - 1];
    }

    public static getNewItem(array: any[], interval?: number): any {
        const lastItem: any = this.getLastItem(array);

        if (interval === undefined || interval <= 0) {
            interval = 60;
        }

        const time: Date = this.addMinutes(lastItem.date, interval);
        let v: number = lastItem.volume;
        let o: number = lastItem.open;
        let h: number = lastItem.high;
        let l: number = lastItem.low;
        let c: number = lastItem.close;

        o = c + ((Math.random() - 0.5) * this.priceRange);
        if (o < 0) {
            o = Math.abs(o) + 2;
        }
        h = o + (Math.random() * this.priceRange);
        l = o - (Math.random() * this.priceRange);
        c = l + (Math.random() * (h - l));
        v = v + ((Math.random() - 0.5) * this.volumeRange);
        if (v < 0) {
            v = Math.abs(v) + 10000;
        }

        return { date: time, open: o, high: h, low: l, close: c, volume: v };
    }

    public static toString(date: Date): string {
        const months: string[] = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const index: number = date.getMonth();
        return months[index] + " " + date.getDay() + " " +  date.getFullYear();
    }
}
