export class NwindDataItem {
    public constructor(init: Partial<NwindDataItem>) {
        Object.assign(this, init);
    }
    
    public productID: number;
    public productName: string;
    public supplierID: number;
    public categoryID: number;
    public quantityPerUnit: string;
    public unitPrice: number;
    public unitsInStock: number;
    public unitsOnOrder: number;
    public reorderLevel: number;
    public discontinued: boolean;
    public orderDate: string;
    public rating: number;
    public locations: NwindDataItem_LocationsItem[];

}
export class NwindDataItem_LocationsItem {
    public constructor(init: Partial<NwindDataItem_LocationsItem>) {
        Object.assign(this, init);
    }
    
    public shop: string;
    public lastInventory: string;

}
export class NwindData extends Array<NwindDataItem> {
    public constructor() {
        super();
        this.push(new NwindDataItem(
        {
            productID: 1,
            productName: `Chai`,
            supplierID: 1,
            categoryID: 1,
            quantityPerUnit: `10 boxes x 20 bags`,
            unitPrice: 18,
            unitsInStock: 39,
            unitsOnOrder: 30,
            reorderLevel: 10,
            discontinued: false,
            orderDate: `2012-02-12`,
            rating: 5,
            locations: [
                new NwindDataItem_LocationsItem(
                {
                    shop: `Fun-Tasty Co.`,
                    lastInventory: `06/12/2018`
                }),
                new NwindDataItem_LocationsItem(
                {
                    shop: `Farmer Market`,
                    lastInventory: `04/04/2018`
                })]
            
        }));
        this.push(new NwindDataItem(
        {
            productID: 2,
            productName: `Chang`,
            supplierID: 1,
            categoryID: 1,
            quantityPerUnit: `24 - 12 oz bottles`,
            unitPrice: 19,
            unitsInStock: 17,
            unitsOnOrder: 40,
            reorderLevel: 25,
            discontinued: true,
            orderDate: `2003-03-17`,
            rating: 5,
            locations: [
                new NwindDataItem_LocationsItem(
                {
                    shop: `Super Market`,
                    lastInventory: `09/09/2018`
                })]
            
        }));
        this.push(new NwindDataItem(
        {
            productID: 3,
            productName: `Aniseed Syrup`,
            supplierID: 1,
            categoryID: 2,
            quantityPerUnit: `12 - 550 ml bottles`,
            unitPrice: 10,
            unitsInStock: 13,
            unitsOnOrder: 70,
            reorderLevel: 25,
            discontinued: false,
            orderDate: `2006-03-17`,
            rating: 3,
            locations: [
                new NwindDataItem_LocationsItem(
                {
                    shop: `Farmer Market`,
                    lastInventory: `04/04/2018`
                }),
                new NwindDataItem_LocationsItem(
                {
                    shop: `Street Market`,
                    lastInventory: `12/12/2018`
                }),
                new NwindDataItem_LocationsItem(
                {
                    shop: `24/7 Market`,
                    lastInventory: `11/11/2018`
                })]
            
        }));
        this.push(new NwindDataItem(
        {
            productID: 4,
            productName: `Chef Antons Cajun Seasoning`,
            supplierID: 2,
            categoryID: 2,
            quantityPerUnit: `48 - 6 oz jars`,
            unitPrice: 22,
            unitsInStock: 53,
            unitsOnOrder: 30,
            reorderLevel: 0,
            discontinued: false,
            orderDate: `2016-03-17`,
            rating: 3,
            locations: [
                new NwindDataItem_LocationsItem(
                {
                    shop: `Fun-Tasty Co.`,
                    lastInventory: `06/12/2018`
                }),
                new NwindDataItem_LocationsItem(
                {
                    shop: `Farmer Market`,
                    lastInventory: `04/04/2018`
                }),
                new NwindDataItem_LocationsItem(
                {
                    shop: `Street Market`,
                    lastInventory: `12/12/2018`
                })]
            
        }));
        this.push(new NwindDataItem(
        {
            productID: 5,
            productName: `Chef Antons Gumbo Mix`,
            supplierID: 2,
            categoryID: 2,
            quantityPerUnit: `36 boxes`,
            unitPrice: 21.35,
            unitsInStock: 0,
            unitsOnOrder: 30,
            reorderLevel: 0,
            discontinued: true,
            orderDate: `2011-11-11`,
            rating: 5,
            locations: [
                new NwindDataItem_LocationsItem(
                {
                    shop: `Super Market`,
                    lastInventory: `09/09/2018`
                })]
            
        }));
        this.push(new NwindDataItem(
        {
            productID: 6,
            productName: `Grandmas Boysenberry Spread`,
            supplierID: 3,
            categoryID: 2,
            quantityPerUnit: `12 - 8 oz jars`,
            unitPrice: 25,
            unitsInStock: 0,
            unitsOnOrder: 30,
            reorderLevel: 25,
            discontinued: false,
            orderDate: `2017-12-17`,
            rating: 4,
            locations: [
                new NwindDataItem_LocationsItem(
                {
                    shop: `Super Market`,
                    lastInventory: `09/09/2018`
                })]
            
        }));
        this.push(new NwindDataItem(
        {
            productID: 7,
            productName: `Uncle Bobs Organic Dried Pears`,
            supplierID: 3,
            categoryID: 7,
            quantityPerUnit: `12 - 1 lb pkgs.`,
            unitPrice: 30,
            unitsInStock: 150,
            unitsOnOrder: 30,
            reorderLevel: 10,
            discontinued: false,
            orderDate: `2016-07-17`,
            rating: 5,
            locations: [
                new NwindDataItem_LocationsItem(
                {
                    shop: `Fun-Tasty Co.`,
                    lastInventory: `06/12/2018`
                }),
                new NwindDataItem_LocationsItem(
                {
                    shop: `Farmer Market`,
                    lastInventory: `04/04/2018`
                }),
                new NwindDataItem_LocationsItem(
                {
                    shop: `Street Market`,
                    lastInventory: `12/12/2018`
                })]
            
        }));
        this.push(new NwindDataItem(
        {
            productID: 8,
            productName: `Northwoods Cranberry Sauce`,
            supplierID: 3,
            categoryID: 2,
            quantityPerUnit: `12 - 12 oz jars`,
            unitPrice: 40,
            unitsInStock: 6,
            unitsOnOrder: 30,
            reorderLevel: 0,
            discontinued: false,
            orderDate: `2018-01-17`,
            rating: 4,
            locations: [
                new NwindDataItem_LocationsItem(
                {
                    shop: `Fun-Tasty Co.`,
                    lastInventory: `06/12/2018`
                }),
                new NwindDataItem_LocationsItem(
                {
                    shop: `Farmer Market`,
                    lastInventory: `04/04/2018`
                })]
            
        }));
        this.push(new NwindDataItem(
        {
            productID: 9,
            productName: `Mishi Kobe Niku`,
            supplierID: 4,
            categoryID: 6,
            quantityPerUnit: `18 - 500 g pkgs.`,
            unitPrice: 97,
            unitsInStock: 29,
            unitsOnOrder: 30,
            reorderLevel: 0,
            discontinued: true,
            orderDate: `2010-02-17`,
            rating: 4,
            locations: [
                new NwindDataItem_LocationsItem(
                {
                    shop: `Farmer Market`,
                    lastInventory: `04/04/2018`
                })]
            
        }));
        this.push(new NwindDataItem(
        {
            productID: 10,
            productName: `Ikura`,
            supplierID: 4,
            categoryID: 8,
            quantityPerUnit: `12 - 200 ml jars`,
            unitPrice: 31,
            unitsInStock: 31,
            unitsOnOrder: 30,
            reorderLevel: 0,
            discontinued: false,
            orderDate: `2008-05-17`,
            rating: 3,
            locations: [
                new NwindDataItem_LocationsItem(
                {
                    shop: `Wall Market`,
                    lastInventory: `12/06/2018`
                })]
            
        }));
        this.push(new NwindDataItem(
        {
            productID: 11,
            productName: `Queso Cabrales`,
            supplierID: 5,
            categoryID: 4,
            quantityPerUnit: `1 kg pkg.`,
            unitPrice: 21,
            unitsInStock: 22,
            unitsOnOrder: 30,
            reorderLevel: 30,
            discontinued: false,
            orderDate: `2009-01-17`,
            rating: 5,
            locations: [
                new NwindDataItem_LocationsItem(
                {
                    shop: `Fun-Tasty Co.`,
                    lastInventory: `06/12/2018`
                }),
                new NwindDataItem_LocationsItem(
                {
                    shop: `Farmer Market`,
                    lastInventory: `04/04/2018`
                })]
            
        }));
        this.push(new NwindDataItem(
        {
            productID: 12,
            productName: `Queso Manchego La Pastora`,
            supplierID: 5,
            categoryID: 4,
            quantityPerUnit: `10 - 500 g pkgs.`,
            unitPrice: 38,
            unitsInStock: 86,
            unitsOnOrder: 30,
            reorderLevel: 0,
            discontinued: false,
            orderDate: `2015-11-17`,
            rating: 3,
            locations: [
                new NwindDataItem_LocationsItem(
                {
                    shop: `Farmer Market`,
                    lastInventory: `04/04/2018`
                })]
            
        }));
        this.push(new NwindDataItem(
        {
            productID: 13,
            productName: `Konbu`,
            supplierID: 6,
            categoryID: 8,
            quantityPerUnit: `2 kg box`,
            unitPrice: 6,
            unitsInStock: 24,
            unitsOnOrder: 30,
            reorderLevel: 5,
            discontinued: false,
            orderDate: `2015-03-17`,
            rating: 2,
            locations: [
                new NwindDataItem_LocationsItem(
                {
                    shop: `Super Market`,
                    lastInventory: `09/09/2018`
                })]
            
        }));
        this.push(new NwindDataItem(
        {
            productID: 14,
            productName: `Tofu`,
            supplierID: 6,
            categoryID: 7,
            quantityPerUnit: `40 - 100 g pkgs.`,
            unitPrice: 23.25,
            unitsInStock: 35,
            unitsOnOrder: 30,
            reorderLevel: 0,
            discontinued: false,
            orderDate: `2017-06-17`,
            rating: 4,
            locations: [
                new NwindDataItem_LocationsItem(
                {
                    shop: `Farmer Market`,
                    lastInventory: `04/04/2018`
                }),
                new NwindDataItem_LocationsItem(
                {
                    shop: `Street Market`,
                    lastInventory: `12/12/2018`
                })]
            
        }));
        this.push(new NwindDataItem(
        {
            productID: 15,
            productName: `Genen Shouyu`,
            supplierID: 6,
            categoryID: 2,
            quantityPerUnit: `24 - 250 ml bottles`,
            unitPrice: 15.5,
            unitsInStock: 39,
            unitsOnOrder: 30,
            reorderLevel: 5,
            discontinued: false,
            orderDate: `2014-03-17`,
            rating: 4,
            locations: [
                new NwindDataItem_LocationsItem(
                {
                    shop: `Local Market`,
                    lastInventory: `07/03/2018`
                }),
                new NwindDataItem_LocationsItem(
                {
                    shop: `Wall Market`,
                    lastInventory: `12/06/2018`
                })]
            
        }));
        this.push(new NwindDataItem(
        {
            productID: 16,
            productName: `Pavlova`,
            supplierID: 7,
            categoryID: 3,
            quantityPerUnit: `32 - 500 g boxes`,
            unitPrice: 17.45,
            unitsInStock: 29,
            unitsOnOrder: 30,
            reorderLevel: 10,
            discontinued: false,
            orderDate: `2018-03-28`,
            rating: 2,
            locations: [
                new NwindDataItem_LocationsItem(
                {
                    shop: `Farmer Market`,
                    lastInventory: `04/04/2018`
                }),
                new NwindDataItem_LocationsItem(
                {
                    shop: `Street Market`,
                    lastInventory: `12/12/2018`
                }),
                new NwindDataItem_LocationsItem(
                {
                    shop: `24/7 Market`,
                    lastInventory: `11/11/2018`
                })]
            
        }));
        this.push(new NwindDataItem(
        {
            productID: 17,
            productName: `Alice Mutton`,
            supplierID: 7,
            categoryID: 6,
            quantityPerUnit: `20 - 1 kg tins`,
            unitPrice: 39,
            unitsInStock: 0,
            unitsOnOrder: 30,
            reorderLevel: 0,
            discontinued: true,
            orderDate: `2015-08-17`,
            rating: 2,
            locations: [
                new NwindDataItem_LocationsItem(
                {
                    shop: `Farmer Market`,
                    lastInventory: `04/04/2018`
                })]
            
        }));
        this.push(new NwindDataItem(
        {
            productID: 18,
            productName: `Carnarvon Tigers`,
            supplierID: 7,
            categoryID: 8,
            quantityPerUnit: `16 kg pkg.`,
            unitPrice: 62.5,
            unitsInStock: 42,
            unitsOnOrder: 30,
            reorderLevel: 0,
            discontinued: false,
            orderDate: `2005-09-27`,
            rating: 2,
            locations: [
                new NwindDataItem_LocationsItem(
                {
                    shop: `24/7 Market`,
                    lastInventory: `11/11/2018`
                }),
                new NwindDataItem_LocationsItem(
                {
                    shop: `Super Market`,
                    lastInventory: `09/09/2018`
                })]
            
        }));
        this.push(new NwindDataItem(
        {
            productID: 19,
            productName: `Teatime Chocolate Biscuits`,
            supplierID: 8,
            categoryID: 3,
            quantityPerUnit: ``,
            unitPrice: 9.2,
            unitsInStock: 25,
            unitsOnOrder: 30,
            reorderLevel: 5,
            discontinued: false,
            orderDate: `2001-03-17`,
            rating: 2,
            locations: [
                new NwindDataItem_LocationsItem(
                {
                    shop: `Local Market`,
                    lastInventory: `07/03/2018`
                })]
            
        }));
        this.push(new NwindDataItem(
        {
            productID: 20,
            productName: `Sir Rodneys Marmalade`,
            supplierID: 8,
            categoryID: 3,
            quantityPerUnit: `4 - 100 ml jars`,
            unitPrice: 4.5,
            unitsInStock: 40,
            unitsOnOrder: 30,
            reorderLevel: 0,
            discontinued: false,
            orderDate: `2005-03-17`,
            rating: 5,
            locations: [
                new NwindDataItem_LocationsItem(
                {
                    shop: `Super Market`,
                    lastInventory: `09/09/2018`
                })]
            
        }));
    }
}
