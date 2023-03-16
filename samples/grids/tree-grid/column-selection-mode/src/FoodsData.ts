export class FoodsDataItem {
    public constructor(init: Partial<FoodsDataItem>) {
        Object.assign(this, init);
    }

    public iD: number;
    public parentID: number;
    public name: string;
    public unitPrice: number;
    public addedDate: string;
    public discontinued: boolean;

}
export class FoodsData extends Array<FoodsDataItem> {
    public constructor() {
        super();
        this.push(new FoodsDataItem(
        {
            iD: 1,
            parentID: -1,
            name: `Foods`,
            unitPrice: 0,
            addedDate: `2009-06-19`,
            discontinued: false
        }));
        this.push(new FoodsDataItem(
        {
            iD: 101,
            parentID: 1,
            name: `Chef Antons Gumbo Mix`,
            unitPrice: 21.35,
            addedDate: `2011-11-11`,
            discontinued: true
        }));
        this.push(new FoodsDataItem(
        {
            iD: 102,
            parentID: 1,
            name: `Grandmas Boysenberry Spread`,
            unitPrice: 25,
            addedDate: `2017-12-17`,
            discontinued: false
        }));
        this.push(new FoodsDataItem(
        {
            iD: 103,
            parentID: 1,
            name: `Uncle Bobs Organic Dried Pears`,
            unitPrice: 30,
            addedDate: `2016-07-17`,
            discontinued: false
        }));
        this.push(new FoodsDataItem(
        {
            iD: 104,
            parentID: 1,
            name: `Mishi Kobe Niku`,
            unitPrice: 97,
            addedDate: `2010-02-17`,
            discontinued: true
        }));
        this.push(new FoodsDataItem(
        {
            iD: 105,
            parentID: 1,
            name: `Queso Cabrales`,
            unitPrice: 21,
            addedDate: `2009-11-17`,
            discontinued: false
        }));
        this.push(new FoodsDataItem(
        {
            iD: 106,
            parentID: 1,
            name: `Queso Manchego La Pastora`,
            unitPrice: 38,
            addedDate: `2015-11-17`,
            discontinued: false
        }));
        this.push(new FoodsDataItem(
        {
            iD: 107,
            parentID: 1,
            name: `Konbu`,
            unitPrice: 6,
            addedDate: `2025-03-17`,
            discontinued: false
        }));
        this.push(new FoodsDataItem(
        {
            iD: 108,
            parentID: 1,
            name: `Tofu`,
            unitPrice: 23.25,
            addedDate: `2019-06-17`,
            discontinued: false
        }));
        this.push(new FoodsDataItem(
        {
            iD: 109,
            parentID: 1,
            name: `Ikura`,
            unitPrice: 31,
            addedDate: `2010-05-17`,
            discontinued: false
        }));
        this.push(new FoodsDataItem(
        {
            iD: 110,
            parentID: 1,
            name: `Pavlova`,
            unitPrice: 17.45,
            addedDate: `2018-03-28`,
            discontinued: false
        }));
        this.push(new FoodsDataItem(
        {
            iD: 111,
            parentID: 1,
            name: `Alice Mutton`,
            unitPrice: 39,
            addedDate: `2015-08-17`,
            discontinued: true
        }));
        this.push(new FoodsDataItem(
        {
            iD: 112,
            parentID: 1,
            name: `Carnarvon Tigers`,
            unitPrice: 62.5,
            addedDate: `2015-09-27`,
            discontinued: false
        }));
        this.push(new FoodsDataItem(
        {
            iD: 113,
            parentID: 1,
            name: `Teatime Chocolate Biscuits`,
            unitPrice: 9.2,
            addedDate: `2011-03-17`,
            discontinued: false
        }));
        this.push(new FoodsDataItem(
        {
            iD: 2,
            parentID: -1,
            name: `Beverages`,
            unitPrice: 0,
            addedDate: `2009-06-19`,
            discontinued: false
        }));
        this.push(new FoodsDataItem(
        {
            iD: 201,
            parentID: 2,
            name: `Chai`,
            unitPrice: 18,
            addedDate: `2012-02-12`,
            discontinued: false
        }));
        this.push(new FoodsDataItem(
        {
            iD: 202,
            parentID: 2,
            name: `Chang`,
            unitPrice: 19,
            addedDate: `2013-03-17`,
            discontinued: false
        }));
        this.push(new FoodsDataItem(
        {
            iD: 3,
            parentID: -1,
            name: `Sauces`,
            unitPrice: 0,
            addedDate: `2009-06-19`,
            discontinued: false
        }));
        this.push(new FoodsDataItem(
        {
            iD: 301,
            parentID: 3,
            name: `Aniseed Syrup`,
            unitPrice: 10,
            addedDate: `2016-03-17`,
            discontinued: false
        }));
        this.push(new FoodsDataItem(
        {
            iD: 302,
            parentID: 3,
            name: `Chef Antons Cajun Seasoning`,
            unitPrice: 22,
            addedDate: `2012-03-17`,
            discontinued: true
        }));
        this.push(new FoodsDataItem(
        {
            iD: 303,
            parentID: 3,
            name: `Northwoods Cranberry Sauce`,
            unitPrice: 40,
            addedDate: `2012-01-17`,
            discontinued: false
        }));
        this.push(new FoodsDataItem(
        {
            iD: 304,
            parentID: 3,
            name: `Genen Shouyu`,
            unitPrice: 15.5,
            addedDate: `2010-03-17`,
            discontinued: false
        }));
        this.push(new FoodsDataItem(
        {
            iD: 305,
            parentID: 3,
            name: `Sir Rodneys Marmalade`,
            unitPrice: 18,
            addedDate: `2015-03-17`,
            discontinued: false
        }));
    }
}
