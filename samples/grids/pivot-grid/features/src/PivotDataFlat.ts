export class PivotDataFlatItem {
    public constructor(init: Partial<PivotDataFlatItem>) {
        Object.assign(this, init);
    }

    public ProductName: string;
    public ProductUnitPrice: number;
    public SellerName: string;
    public SellerCity: string;
    public Date: string;
    public Value: number;
    public NumberOfUnits: number;

}
export class PivotDataFlat extends Array<PivotDataFlatItem> {
    public constructor(items: Array<PivotDataFlatItem> | number = -1) {
        if (Array.isArray(items)) {
            super(...items);
        } else {
            const newItems = [
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 12.8,
                    SellerName: `Stanley Brooker`,
                    SellerCity: `Seattle`,
                    Date: `2007-01-01T00:00:00`,
                    Value: 94.4,
                    NumberOfUnits: 282
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 49.6,
                    SellerName: `Elisa Longbottom`,
                    SellerCity: `Sofia`,
                    Date: `2007-01-05T00:00:00`,
                    Value: 70.8,
                    NumberOfUnits: 296
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 3.6,
                    SellerName: `Lydia Burson`,
                    SellerCity: `Tokyo`,
                    Date: `2007-01-06T00:00:00`,
                    Value: 35.8,
                    NumberOfUnits: 68
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 85.6,
                    SellerName: `David Haley`,
                    SellerCity: `London`,
                    Date: `2007-01-07T00:00:00`,
                    Value: 41.4,
                    NumberOfUnits: 293
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 18.2,
                    SellerName: `John Smith`,
                    SellerCity: `Seattle`,
                    Date: `2007-01-08T00:00:00`,
                    Value: 60.6,
                    NumberOfUnits: 240
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 68.4,
                    SellerName: `Larry Lieb`,
                    SellerCity: `Tokyo`,
                    Date: `2007-01-12T00:00:00`,
                    Value: 38,
                    NumberOfUnits: 456
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 16.2,
                    SellerName: `Walter Pang`,
                    SellerCity: `Sofia`,
                    Date: `2007-02-09T00:00:00`,
                    Value: 89.2,
                    NumberOfUnits: 492
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 35.2,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `Tokyo`,
                    Date: `2007-02-16T00:00:00`,
                    Value: 2,
                    NumberOfUnits: 78
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 73.2,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `Mellvile`,
                    Date: `2007-02-17T00:00:00`,
                    Value: 4.6,
                    NumberOfUnits: 150
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 73.6,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `London`,
                    Date: `2007-02-19T00:00:00`,
                    Value: 36.2,
                    NumberOfUnits: 262
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 47.2,
                    SellerName: `Monica Freitag`,
                    SellerCity: `Sofia`,
                    Date: `2007-02-21T00:00:00`,
                    Value: 18.8,
                    NumberOfUnits: 125
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 51.4,
                    SellerName: `Kathe Pettel`,
                    SellerCity: `Sofia`,
                    Date: `2007-03-04T00:00:00`,
                    Value: 11.6,
                    NumberOfUnits: 42
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 27.6,
                    SellerName: `David Haley`,
                    SellerCity: `Tokyo`,
                    Date: `2007-03-04T00:00:00`,
                    Value: 41.4,
                    NumberOfUnits: 282
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 22.4,
                    SellerName: `Antonio Charbonneau`,
                    SellerCity: `Berlin`,
                    Date: `2007-03-17T00:00:00`,
                    Value: 59.8,
                    NumberOfUnits: 305
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 85.4,
                    SellerName: `Glenn Landeros`,
                    SellerCity: `Tokyo`,
                    Date: `2007-03-23T00:00:00`,
                    Value: 31.4,
                    NumberOfUnits: 265
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 80.8,
                    SellerName: `Elisa Longbottom`,
                    SellerCity: `Mellvile`,
                    Date: `2007-03-25T00:00:00`,
                    Value: 90.4,
                    NumberOfUnits: 350
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 64.6,
                    SellerName: `Glenn Landeros`,
                    SellerCity: `Mellvile`,
                    Date: `2007-03-27T00:00:00`,
                    Value: 95.4,
                    NumberOfUnits: 82
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 50,
                    SellerName: `Harry Tyler`,
                    SellerCity: `New York`,
                    Date: `2007-04-02T00:00:00`,
                    Value: 1.4,
                    NumberOfUnits: 67
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 16.4,
                    SellerName: `Brandon Mckim`,
                    SellerCity: `Mellvile`,
                    Date: `2007-04-04T00:00:00`,
                    Value: 25.4,
                    NumberOfUnits: 370
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 50,
                    SellerName: `Monica Freitag`,
                    SellerCity: `Berlin`,
                    Date: `2007-04-12T00:00:00`,
                    Value: 46.4,
                    NumberOfUnits: 228
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 44.8,
                    SellerName: `Bryan Culver`,
                    SellerCity: `Tokyo`,
                    Date: `2007-04-15T00:00:00`,
                    Value: 82.2,
                    NumberOfUnits: 272
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 44.4,
                    SellerName: `Russell Shorter`,
                    SellerCity: `Berlin`,
                    Date: `2007-04-18T00:00:00`,
                    Value: 84,
                    NumberOfUnits: 227
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 39.4,
                    SellerName: `Stanley Brooker`,
                    SellerCity: `Mellvile`,
                    Date: `2007-04-18T00:00:00`,
                    Value: 94.4,
                    NumberOfUnits: 248
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 36.6,
                    SellerName: `Benjamin Meekins`,
                    SellerCity: `Tokyo`,
                    Date: `2007-04-21T00:00:00`,
                    Value: 45.8,
                    NumberOfUnits: 414
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 75.8,
                    SellerName: `Walter Pang`,
                    SellerCity: `London`,
                    Date: `2007-04-25T00:00:00`,
                    Value: 97.6,
                    NumberOfUnits: 43
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 57.8,
                    SellerName: `Antonio Charbonneau`,
                    SellerCity: `Mellvile`,
                    Date: `2007-04-26T00:00:00`,
                    Value: 21,
                    NumberOfUnits: 71
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 40.2,
                    SellerName: `Stanley Brooker`,
                    SellerCity: `New York`,
                    Date: `2007-05-14T00:00:00`,
                    Value: 72,
                    NumberOfUnits: 321
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 49.6,
                    SellerName: `Elisa Longbottom`,
                    SellerCity: `London`,
                    Date: `2007-05-17T00:00:00`,
                    Value: 49.6,
                    NumberOfUnits: 329
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 56.6,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `London`,
                    Date: `2007-05-17T00:00:00`,
                    Value: 72.8,
                    NumberOfUnits: 88
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 67.2,
                    SellerName: `Glenn Landeros`,
                    SellerCity: `New York`,
                    Date: `2007-05-26T00:00:00`,
                    Value: 56.2,
                    NumberOfUnits: 366
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 14.6,
                    SellerName: `Walter Pang`,
                    SellerCity: `Sofia`,
                    Date: `2007-06-02T00:00:00`,
                    Value: 81.4,
                    NumberOfUnits: 450
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 89.4,
                    SellerName: `Howard Sprouse`,
                    SellerCity: `Seattle`,
                    Date: `2007-06-06T00:00:00`,
                    Value: 19,
                    NumberOfUnits: 475
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 33.8,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `Seattle`,
                    Date: `2007-06-11T00:00:00`,
                    Value: 55,
                    NumberOfUnits: 195
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 54.2,
                    SellerName: `Harold Garvin`,
                    SellerCity: `Sofia`,
                    Date: `2007-06-17T00:00:00`,
                    Value: 71.6,
                    NumberOfUnits: 458
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 18.4,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `Sofia`,
                    Date: `2007-07-04T00:00:00`,
                    Value: 24.2,
                    NumberOfUnits: 7
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 96.2,
                    SellerName: `Elisa Longbottom`,
                    SellerCity: `New York`,
                    Date: `2007-07-08T00:00:00`,
                    Value: 57.6,
                    NumberOfUnits: 158
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 23,
                    SellerName: `Benjamin Meekins`,
                    SellerCity: `Tokyo`,
                    Date: `2007-07-09T00:00:00`,
                    Value: 58.8,
                    NumberOfUnits: 34
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 52.8,
                    SellerName: `Larry Lieb`,
                    SellerCity: `Seattle`,
                    Date: `2007-07-10T00:00:00`,
                    Value: 32.4,
                    NumberOfUnits: 412
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 62.2,
                    SellerName: `John Smith`,
                    SellerCity: `Sofia`,
                    Date: `2007-07-15T00:00:00`,
                    Value: 85,
                    NumberOfUnits: 10
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 10.8,
                    SellerName: `Antonio Charbonneau`,
                    SellerCity: `New York`,
                    Date: `2007-07-16T00:00:00`,
                    Value: 52.2,
                    NumberOfUnits: 466
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 4.8,
                    SellerName: `Stanley Brooker`,
                    SellerCity: `London`,
                    Date: `2007-07-20T00:00:00`,
                    Value: 34.2,
                    NumberOfUnits: 248
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 43.8,
                    SellerName: `Brandon Mckim`,
                    SellerCity: `Mellvile`,
                    Date: `2007-07-24T00:00:00`,
                    Value: 45.6,
                    NumberOfUnits: 307
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 76.4,
                    SellerName: `Glenn Landeros`,
                    SellerCity: `London`,
                    Date: `2007-07-26T00:00:00`,
                    Value: 26.2,
                    NumberOfUnits: 445
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 34.4,
                    SellerName: `Bryan Culver`,
                    SellerCity: `New York`,
                    Date: `2007-08-01T00:00:00`,
                    Value: 89.2,
                    NumberOfUnits: 480
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 68.6,
                    SellerName: `Howard Sprouse`,
                    SellerCity: `Berlin`,
                    Date: `2007-08-02T00:00:00`,
                    Value: 38.2,
                    NumberOfUnits: 390
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 65.2,
                    SellerName: `Larry Lieb`,
                    SellerCity: `Mellvile`,
                    Date: `2007-08-05T00:00:00`,
                    Value: 23.2,
                    NumberOfUnits: 388
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 45,
                    SellerName: `Russell Shorter`,
                    SellerCity: `Seattle`,
                    Date: `2007-08-19T00:00:00`,
                    Value: 23.4,
                    NumberOfUnits: 37
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 93.6,
                    SellerName: `John Smith`,
                    SellerCity: `New York`,
                    Date: `2007-08-24T00:00:00`,
                    Value: 17.4,
                    NumberOfUnits: 237
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 94.4,
                    SellerName: `Harry Tyler`,
                    SellerCity: `Seattle`,
                    Date: `2007-08-26T00:00:00`,
                    Value: 54.6,
                    NumberOfUnits: 396
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 72.4,
                    SellerName: `David Haley`,
                    SellerCity: `Tokyo`,
                    Date: `2007-08-26T00:00:00`,
                    Value: 61,
                    NumberOfUnits: 3
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 80.6,
                    SellerName: `Russell Shorter`,
                    SellerCity: `New York`,
                    Date: `2007-09-02T00:00:00`,
                    Value: 85.2,
                    NumberOfUnits: 330
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 65.4,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `London`,
                    Date: `2007-09-04T00:00:00`,
                    Value: 51.2,
                    NumberOfUnits: 143
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 30.6,
                    SellerName: `Bryan Culver`,
                    SellerCity: `Seattle`,
                    Date: `2007-09-05T00:00:00`,
                    Value: 55.2,
                    NumberOfUnits: 318
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 7.6,
                    SellerName: `Alfredo Fetuchini`,
                    SellerCity: `Seattle`,
                    Date: `2007-09-06T00:00:00`,
                    Value: 41.8,
                    NumberOfUnits: 393
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 47,
                    SellerName: `Harold Garvin`,
                    SellerCity: `Seattle`,
                    Date: `2007-09-10T00:00:00`,
                    Value: 9.2,
                    NumberOfUnits: 129
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 38,
                    SellerName: `Glenn Landeros`,
                    SellerCity: `London`,
                    Date: `2007-09-17T00:00:00`,
                    Value: 25.6,
                    NumberOfUnits: 426
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 2.6,
                    SellerName: `Harry Tyler`,
                    SellerCity: `London`,
                    Date: `2007-09-18T00:00:00`,
                    Value: 36.4,
                    NumberOfUnits: 217
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 77.6,
                    SellerName: `John Smith`,
                    SellerCity: `New York`,
                    Date: `2007-09-20T00:00:00`,
                    Value: 28,
                    NumberOfUnits: 152
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 97.2,
                    SellerName: `Benjamin Meekins`,
                    SellerCity: `Seattle`,
                    Date: `2007-09-25T00:00:00`,
                    Value: 21.8,
                    NumberOfUnits: 452
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 19.8,
                    SellerName: `Carl Costello`,
                    SellerCity: `Seattle`,
                    Date: `2007-10-02T00:00:00`,
                    Value: 98.4,
                    NumberOfUnits: 499
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 32.8,
                    SellerName: `Mark Slater`,
                    SellerCity: `Seattle`,
                    Date: `2007-10-06T00:00:00`,
                    Value: 79.6,
                    NumberOfUnits: 169
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 22,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `Berlin`,
                    Date: `2007-10-14T00:00:00`,
                    Value: 69.6,
                    NumberOfUnits: 386
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 35.6,
                    SellerName: `Russell Shorter`,
                    SellerCity: `Sofia`,
                    Date: `2007-10-14T00:00:00`,
                    Value: 27.8,
                    NumberOfUnits: 454
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 47,
                    SellerName: `Elisa Longbottom`,
                    SellerCity: `New York`,
                    Date: `2007-10-25T00:00:00`,
                    Value: 82.2,
                    NumberOfUnits: 334
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 41.2,
                    SellerName: `Lydia Burson`,
                    SellerCity: `Tokyo`,
                    Date: `2007-10-26T00:00:00`,
                    Value: 54.4,
                    NumberOfUnits: 107
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 13.8,
                    SellerName: `Mark Slater`,
                    SellerCity: `Sofia`,
                    Date: `2007-11-07T00:00:00`,
                    Value: 86.2,
                    NumberOfUnits: 275
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 64.2,
                    SellerName: `Monica Freitag`,
                    SellerCity: `London`,
                    Date: `2007-11-09T00:00:00`,
                    Value: 37.8,
                    NumberOfUnits: 241
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 1.2,
                    SellerName: `Larry Lieb`,
                    SellerCity: `London`,
                    Date: `2007-11-11T00:00:00`,
                    Value: 75.2,
                    NumberOfUnits: 177
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 57.8,
                    SellerName: `Monica Freitag`,
                    SellerCity: `Sofia`,
                    Date: `2007-11-13T00:00:00`,
                    Value: 58.6,
                    NumberOfUnits: 494
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 39.6,
                    SellerName: `Lydia Burson`,
                    SellerCity: `Mellvile`,
                    Date: `2007-11-19T00:00:00`,
                    Value: 40.8,
                    NumberOfUnits: 451
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 5.2,
                    SellerName: `Stanley Brooker`,
                    SellerCity: `Tokyo`,
                    Date: `2008-01-01T00:00:00`,
                    Value: 91.8,
                    NumberOfUnits: 125
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 53.4,
                    SellerName: `Kathe Pettel`,
                    SellerCity: `London`,
                    Date: `2008-01-02T00:00:00`,
                    Value: 31,
                    NumberOfUnits: 103
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 52.2,
                    SellerName: `Larry Lieb`,
                    SellerCity: `New York`,
                    Date: `2008-01-03T00:00:00`,
                    Value: 43,
                    NumberOfUnits: 224
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 17.8,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `Mellvile`,
                    Date: `2008-01-07T00:00:00`,
                    Value: 47.6,
                    NumberOfUnits: 498
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 80.8,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `London`,
                    Date: `2008-01-08T00:00:00`,
                    Value: 15.6,
                    NumberOfUnits: 142
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 95.4,
                    SellerName: `Larry Lieb`,
                    SellerCity: `Berlin`,
                    Date: `2008-01-21T00:00:00`,
                    Value: 87.2,
                    NumberOfUnits: 487
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 21.8,
                    SellerName: `David Haley`,
                    SellerCity: `Mellvile`,
                    Date: `2008-01-27T00:00:00`,
                    Value: 14.6,
                    NumberOfUnits: 331
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 30,
                    SellerName: `Glenn Landeros`,
                    SellerCity: `London`,
                    Date: `2008-02-03T00:00:00`,
                    Value: 99.2,
                    NumberOfUnits: 418
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 39.8,
                    SellerName: `Benjamin Meekins`,
                    SellerCity: `New York`,
                    Date: `2008-02-04T00:00:00`,
                    Value: 61,
                    NumberOfUnits: 214
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 40.4,
                    SellerName: `Elisa Longbottom`,
                    SellerCity: `Mellvile`,
                    Date: `2008-02-05T00:00:00`,
                    Value: 81.8,
                    NumberOfUnits: 229
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 35.2,
                    SellerName: `Alfredo Fetuchini`,
                    SellerCity: `London`,
                    Date: `2008-02-05T00:00:00`,
                    Value: 54.4,
                    NumberOfUnits: 16
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 41.8,
                    SellerName: `Harry Tyler`,
                    SellerCity: `Sofia`,
                    Date: `2008-02-08T00:00:00`,
                    Value: 18,
                    NumberOfUnits: 216
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 0.8,
                    SellerName: `Harry Tyler`,
                    SellerCity: `Sofia`,
                    Date: `2008-02-09T00:00:00`,
                    Value: 85,
                    NumberOfUnits: 486
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 37.6,
                    SellerName: `Elisa Longbottom`,
                    SellerCity: `Tokyo`,
                    Date: `2008-02-13T00:00:00`,
                    Value: 45.2,
                    NumberOfUnits: 172
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 20.8,
                    SellerName: `Antonio Charbonneau`,
                    SellerCity: `New York`,
                    Date: `2008-02-21T00:00:00`,
                    Value: 60.6,
                    NumberOfUnits: 102
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 70.8,
                    SellerName: `Kathe Pettel`,
                    SellerCity: `Seattle`,
                    Date: `2008-02-24T00:00:00`,
                    Value: 43,
                    NumberOfUnits: 36
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 53.4,
                    SellerName: `Alfredo Fetuchini`,
                    SellerCity: `Mellvile`,
                    Date: `2008-02-25T00:00:00`,
                    Value: 11,
                    NumberOfUnits: 71
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 25,
                    SellerName: `Alfredo Fetuchini`,
                    SellerCity: `Mellvile`,
                    Date: `2008-02-25T00:00:00`,
                    Value: 17,
                    NumberOfUnits: 53
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 64.6,
                    SellerName: `Antonio Charbonneau`,
                    SellerCity: `Tokyo`,
                    Date: `2008-02-25T00:00:00`,
                    Value: 99,
                    NumberOfUnits: 104
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 9.6,
                    SellerName: `Brandon Mckim`,
                    SellerCity: `Tokyo`,
                    Date: `2008-02-26T00:00:00`,
                    Value: 96.2,
                    NumberOfUnits: 294
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 41.2,
                    SellerName: `Antonio Charbonneau`,
                    SellerCity: `Sofia`,
                    Date: `2008-03-03T00:00:00`,
                    Value: 93.8,
                    NumberOfUnits: 454
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 37,
                    SellerName: `Stanley Brooker`,
                    SellerCity: `Berlin`,
                    Date: `2008-03-05T00:00:00`,
                    Value: 82.8,
                    NumberOfUnits: 492
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 16.8,
                    SellerName: `Harry Tyler`,
                    SellerCity: `New York`,
                    Date: `2008-03-08T00:00:00`,
                    Value: 0.8,
                    NumberOfUnits: 132
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 24.8,
                    SellerName: `Alfredo Fetuchini`,
                    SellerCity: `New York`,
                    Date: `2008-03-09T00:00:00`,
                    Value: 88.6,
                    NumberOfUnits: 225
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 65.6,
                    SellerName: `David Haley`,
                    SellerCity: `Tokyo`,
                    Date: `2008-03-10T00:00:00`,
                    Value: 69.2,
                    NumberOfUnits: 422
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 70.6,
                    SellerName: `Glenn Landeros`,
                    SellerCity: `London`,
                    Date: `2008-03-12T00:00:00`,
                    Value: 97.2,
                    NumberOfUnits: 303
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 65.2,
                    SellerName: `Carl Costello`,
                    SellerCity: `London`,
                    Date: `2008-03-13T00:00:00`,
                    Value: 46.4,
                    NumberOfUnits: 319
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 39.6,
                    SellerName: `Harold Garvin`,
                    SellerCity: `London`,
                    Date: `2008-03-14T00:00:00`,
                    Value: 48.6,
                    NumberOfUnits: 262
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 50.8,
                    SellerName: `Harold Garvin`,
                    SellerCity: `Berlin`,
                    Date: `2008-03-23T00:00:00`,
                    Value: 91.8,
                    NumberOfUnits: 345
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 88.4,
                    SellerName: `David Haley`,
                    SellerCity: `Tokyo`,
                    Date: `2008-04-03T00:00:00`,
                    Value: 87.4,
                    NumberOfUnits: 407
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 47.4,
                    SellerName: `Walter Pang`,
                    SellerCity: `Berlin`,
                    Date: `2008-04-04T00:00:00`,
                    Value: 15.2,
                    NumberOfUnits: 121
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 30.4,
                    SellerName: `Larry Lieb`,
                    SellerCity: `Seattle`,
                    Date: `2008-04-06T00:00:00`,
                    Value: 44.4,
                    NumberOfUnits: 30
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 88.2,
                    SellerName: `Harold Garvin`,
                    SellerCity: `Berlin`,
                    Date: `2008-04-11T00:00:00`,
                    Value: 25.4,
                    NumberOfUnits: 293
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 16.6,
                    SellerName: `David Haley`,
                    SellerCity: `Sofia`,
                    Date: `2008-04-12T00:00:00`,
                    Value: 55.2,
                    NumberOfUnits: 271
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 95.2,
                    SellerName: `Howard Sprouse`,
                    SellerCity: `Sofia`,
                    Date: `2008-04-18T00:00:00`,
                    Value: 25.8,
                    NumberOfUnits: 107
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 7.8,
                    SellerName: `Bryan Culver`,
                    SellerCity: `Mellvile`,
                    Date: `2008-04-18T00:00:00`,
                    Value: 54.6,
                    NumberOfUnits: 87
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 94.8,
                    SellerName: `David Haley`,
                    SellerCity: `Tokyo`,
                    Date: `2008-04-23T00:00:00`,
                    Value: 79,
                    NumberOfUnits: 319
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 37.2,
                    SellerName: `Lydia Burson`,
                    SellerCity: `New York`,
                    Date: `2008-04-24T00:00:00`,
                    Value: 21.6,
                    NumberOfUnits: 346
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 99.4,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `London`,
                    Date: `2008-05-07T00:00:00`,
                    Value: 77.8,
                    NumberOfUnits: 382
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 96.2,
                    SellerName: `Larry Lieb`,
                    SellerCity: `New York`,
                    Date: `2008-05-11T00:00:00`,
                    Value: 35.4,
                    NumberOfUnits: 334
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 26.2,
                    SellerName: `Harold Garvin`,
                    SellerCity: `Tokyo`,
                    Date: `2008-05-13T00:00:00`,
                    Value: 28.8,
                    NumberOfUnits: 176
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 80.8,
                    SellerName: `Mark Slater`,
                    SellerCity: `Berlin`,
                    Date: `2008-05-19T00:00:00`,
                    Value: 8.4,
                    NumberOfUnits: 125
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 78.4,
                    SellerName: `Russell Shorter`,
                    SellerCity: `Mellvile`,
                    Date: `2008-05-19T00:00:00`,
                    Value: 15,
                    NumberOfUnits: 458
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 94,
                    SellerName: `Benjamin Meekins`,
                    SellerCity: `Berlin`,
                    Date: `2008-05-25T00:00:00`,
                    Value: 68.6,
                    NumberOfUnits: 331
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 96.6,
                    SellerName: `Stanley Brooker`,
                    SellerCity: `Mellvile`,
                    Date: `2008-05-27T00:00:00`,
                    Value: 71,
                    NumberOfUnits: 39
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 37.6,
                    SellerName: `Claudia Kobayashi`,
                    SellerCity: `London`,
                    Date: `2008-06-06T00:00:00`,
                    Value: 97.2,
                    NumberOfUnits: 238
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 47,
                    SellerName: `Walter Pang`,
                    SellerCity: `London`,
                    Date: `2008-06-07T00:00:00`,
                    Value: 5.8,
                    NumberOfUnits: 84
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 80.2,
                    SellerName: `Mark Slater`,
                    SellerCity: `Tokyo`,
                    Date: `2008-06-08T00:00:00`,
                    Value: 24.8,
                    NumberOfUnits: 363
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 43.6,
                    SellerName: `Harry Tyler`,
                    SellerCity: `New York`,
                    Date: `2008-06-08T00:00:00`,
                    Value: 59,
                    NumberOfUnits: 479
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 56.4,
                    SellerName: `Kathe Pettel`,
                    SellerCity: `Sofia`,
                    Date: `2008-06-11T00:00:00`,
                    Value: 87.6,
                    NumberOfUnits: 404
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 81.8,
                    SellerName: `Glenn Landeros`,
                    SellerCity: `London`,
                    Date: `2008-06-18T00:00:00`,
                    Value: 80.4,
                    NumberOfUnits: 478
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 90.2,
                    SellerName: `Benjamin Meekins`,
                    SellerCity: `Sofia`,
                    Date: `2008-06-19T00:00:00`,
                    Value: 2.4,
                    NumberOfUnits: 285
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 99.4,
                    SellerName: `Kathe Pettel`,
                    SellerCity: `Sofia`,
                    Date: `2008-06-22T00:00:00`,
                    Value: 82.6,
                    NumberOfUnits: 15
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 30.8,
                    SellerName: `Brandon Mckim`,
                    SellerCity: `Berlin`,
                    Date: `2008-06-26T00:00:00`,
                    Value: 77.8,
                    NumberOfUnits: 245
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 99.4,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `Mellvile`,
                    Date: `2008-07-01T00:00:00`,
                    Value: 8.2,
                    NumberOfUnits: 376
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 73.4,
                    SellerName: `Claudia Kobayashi`,
                    SellerCity: `New York`,
                    Date: `2008-07-02T00:00:00`,
                    Value: 48.6,
                    NumberOfUnits: 40
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 43.6,
                    SellerName: `Larry Lieb`,
                    SellerCity: `London`,
                    Date: `2008-07-10T00:00:00`,
                    Value: 38,
                    NumberOfUnits: 112
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 16.4,
                    SellerName: `Antonio Charbonneau`,
                    SellerCity: `New York`,
                    Date: `2008-07-15T00:00:00`,
                    Value: 9.8,
                    NumberOfUnits: 224
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 71.4,
                    SellerName: `Stanley Brooker`,
                    SellerCity: `Tokyo`,
                    Date: `2008-07-16T00:00:00`,
                    Value: 66.4,
                    NumberOfUnits: 145
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 94.6,
                    SellerName: `Stanley Brooker`,
                    SellerCity: `Mellvile`,
                    Date: `2008-07-21T00:00:00`,
                    Value: 46.6,
                    NumberOfUnits: 272
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 50.8,
                    SellerName: `Claudia Kobayashi`,
                    SellerCity: `London`,
                    Date: `2008-07-27T00:00:00`,
                    Value: 90.2,
                    NumberOfUnits: 278
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 12.8,
                    SellerName: `Harry Tyler`,
                    SellerCity: `Seattle`,
                    Date: `2008-07-27T00:00:00`,
                    Value: 89.2,
                    NumberOfUnits: 253
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 35.8,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `New York`,
                    Date: `2008-08-01T00:00:00`,
                    Value: 28.4,
                    NumberOfUnits: 255
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 17.2,
                    SellerName: `David Haley`,
                    SellerCity: `Seattle`,
                    Date: `2008-08-02T00:00:00`,
                    Value: 0.6,
                    NumberOfUnits: 46
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 22.2,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `Tokyo`,
                    Date: `2008-08-08T00:00:00`,
                    Value: 58.6,
                    NumberOfUnits: 279
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 63,
                    SellerName: `Russell Shorter`,
                    SellerCity: `Sofia`,
                    Date: `2008-08-08T00:00:00`,
                    Value: 91.8,
                    NumberOfUnits: 89
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 83.8,
                    SellerName: `Larry Lieb`,
                    SellerCity: `Sofia`,
                    Date: `2008-08-14T00:00:00`,
                    Value: 52.6,
                    NumberOfUnits: 17
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 14.2,
                    SellerName: `Lydia Burson`,
                    SellerCity: `Sofia`,
                    Date: `2008-08-21T00:00:00`,
                    Value: 54,
                    NumberOfUnits: 470
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 34.6,
                    SellerName: `Elisa Longbottom`,
                    SellerCity: `Mellvile`,
                    Date: `2008-08-25T00:00:00`,
                    Value: 1.8,
                    NumberOfUnits: 195
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 86.8,
                    SellerName: `Lydia Burson`,
                    SellerCity: `New York`,
                    Date: `2008-08-27T00:00:00`,
                    Value: 23.8,
                    NumberOfUnits: 173
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 42.2,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `New York`,
                    Date: `2008-09-01T00:00:00`,
                    Value: 51.2,
                    NumberOfUnits: 472
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 25.8,
                    SellerName: `Larry Lieb`,
                    SellerCity: `Seattle`,
                    Date: `2008-09-06T00:00:00`,
                    Value: 88.4,
                    NumberOfUnits: 148
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 23.2,
                    SellerName: `Walter Pang`,
                    SellerCity: `Mellvile`,
                    Date: `2008-09-06T00:00:00`,
                    Value: 94.6,
                    NumberOfUnits: 314
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 83.8,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `Seattle`,
                    Date: `2008-09-07T00:00:00`,
                    Value: 66.8,
                    NumberOfUnits: 431
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 84.4,
                    SellerName: `Walter Pang`,
                    SellerCity: `Mellvile`,
                    Date: `2008-09-07T00:00:00`,
                    Value: 27.6,
                    NumberOfUnits: 347
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 7.4,
                    SellerName: `Harry Tyler`,
                    SellerCity: `Berlin`,
                    Date: `2008-09-11T00:00:00`,
                    Value: 2.8,
                    NumberOfUnits: 27
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 9.6,
                    SellerName: `Elisa Longbottom`,
                    SellerCity: `Berlin`,
                    Date: `2008-09-12T00:00:00`,
                    Value: 12,
                    NumberOfUnits: 5
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 50.8,
                    SellerName: `Larry Lieb`,
                    SellerCity: `Mellvile`,
                    Date: `2008-09-19T00:00:00`,
                    Value: 16.6,
                    NumberOfUnits: 191
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 80,
                    SellerName: `Bryan Culver`,
                    SellerCity: `New York`,
                    Date: `2008-09-25T00:00:00`,
                    Value: 84.4,
                    NumberOfUnits: 421
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 62.2,
                    SellerName: `Carl Costello`,
                    SellerCity: `Seattle`,
                    Date: `2008-10-03T00:00:00`,
                    Value: 29,
                    NumberOfUnits: 297
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 96.2,
                    SellerName: `Glenn Landeros`,
                    SellerCity: `New York`,
                    Date: `2008-10-04T00:00:00`,
                    Value: 15.8,
                    NumberOfUnits: 128
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 47,
                    SellerName: `Howard Sprouse`,
                    SellerCity: `Mellvile`,
                    Date: `2008-10-13T00:00:00`,
                    Value: 37.4,
                    NumberOfUnits: 210
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 35.8,
                    SellerName: `Russell Shorter`,
                    SellerCity: `London`,
                    Date: `2008-10-14T00:00:00`,
                    Value: 27,
                    NumberOfUnits: 315
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 79,
                    SellerName: `Benjamin Meekins`,
                    SellerCity: `New York`,
                    Date: `2008-10-19T00:00:00`,
                    Value: 69.8,
                    NumberOfUnits: 489
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 84.4,
                    SellerName: `Walter Pang`,
                    SellerCity: `Mellvile`,
                    Date: `2008-10-21T00:00:00`,
                    Value: 61.4,
                    NumberOfUnits: 47
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 25.6,
                    SellerName: `John Smith`,
                    SellerCity: `Mellvile`,
                    Date: `2008-10-22T00:00:00`,
                    Value: 69.4,
                    NumberOfUnits: 92
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 24,
                    SellerName: `Alfredo Fetuchini`,
                    SellerCity: `Mellvile`,
                    Date: `2008-11-01T00:00:00`,
                    Value: 81.2,
                    NumberOfUnits: 30
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 53.6,
                    SellerName: `Stanley Brooker`,
                    SellerCity: `Berlin`,
                    Date: `2008-11-01T00:00:00`,
                    Value: 15,
                    NumberOfUnits: 132
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 68.2,
                    SellerName: `Bryan Culver`,
                    SellerCity: `London`,
                    Date: `2008-11-10T00:00:00`,
                    Value: 6.2,
                    NumberOfUnits: 368
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 60,
                    SellerName: `Kathe Pettel`,
                    SellerCity: `New York`,
                    Date: `2008-11-11T00:00:00`,
                    Value: 39.2,
                    NumberOfUnits: 482
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 5.8,
                    SellerName: `Antonio Charbonneau`,
                    SellerCity: `Mellvile`,
                    Date: `2008-11-11T00:00:00`,
                    Value: 48.8,
                    NumberOfUnits: 22
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 96,
                    SellerName: `Claudia Kobayashi`,
                    SellerCity: `London`,
                    Date: `2008-11-20T00:00:00`,
                    Value: 87.2,
                    NumberOfUnits: 159
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 59.2,
                    SellerName: `Alfredo Fetuchini`,
                    SellerCity: `Berlin`,
                    Date: `2008-11-25T00:00:00`,
                    Value: 88.6,
                    NumberOfUnits: 52
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 94,
                    SellerName: `Harry Tyler`,
                    SellerCity: `Tokyo`,
                    Date: `2009-01-05T00:00:00`,
                    Value: 79.8,
                    NumberOfUnits: 194
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 12.8,
                    SellerName: `David Haley`,
                    SellerCity: `Berlin`,
                    Date: `2009-01-08T00:00:00`,
                    Value: 43,
                    NumberOfUnits: 100
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 38,
                    SellerName: `Benjamin Meekins`,
                    SellerCity: `Berlin`,
                    Date: `2009-01-10T00:00:00`,
                    Value: 48.4,
                    NumberOfUnits: 252
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 79.4,
                    SellerName: `Kathe Pettel`,
                    SellerCity: `Tokyo`,
                    Date: `2009-01-13T00:00:00`,
                    Value: 68.6,
                    NumberOfUnits: 116
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 91,
                    SellerName: `Elisa Longbottom`,
                    SellerCity: `London`,
                    Date: `2009-01-14T00:00:00`,
                    Value: 27.6,
                    NumberOfUnits: 259
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 100,
                    SellerName: `Glenn Landeros`,
                    SellerCity: `London`,
                    Date: `2009-01-19T00:00:00`,
                    Value: 56.8,
                    NumberOfUnits: 217
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 43.4,
                    SellerName: `Bryan Culver`,
                    SellerCity: `Seattle`,
                    Date: `2009-01-22T00:00:00`,
                    Value: 36.6,
                    NumberOfUnits: 48
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 0.8,
                    SellerName: `Stanley Brooker`,
                    SellerCity: `New York`,
                    Date: `2009-02-02T00:00:00`,
                    Value: 71.4,
                    NumberOfUnits: 445
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 60.6,
                    SellerName: `Kathe Pettel`,
                    SellerCity: `Mellvile`,
                    Date: `2009-02-03T00:00:00`,
                    Value: 44.6,
                    NumberOfUnits: 90
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 13.8,
                    SellerName: `Harry Tyler`,
                    SellerCity: `Sofia`,
                    Date: `2009-02-07T00:00:00`,
                    Value: 36.2,
                    NumberOfUnits: 453
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 44.2,
                    SellerName: `Harry Tyler`,
                    SellerCity: `Mellvile`,
                    Date: `2009-02-07T00:00:00`,
                    Value: 85.6,
                    NumberOfUnits: 450
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 94.4,
                    SellerName: `Lydia Burson`,
                    SellerCity: `Sofia`,
                    Date: `2009-02-07T00:00:00`,
                    Value: 48.2,
                    NumberOfUnits: 152
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 8.8,
                    SellerName: `Harry Tyler`,
                    SellerCity: `Berlin`,
                    Date: `2009-02-16T00:00:00`,
                    Value: 46.6,
                    NumberOfUnits: 119
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 79.2,
                    SellerName: `Kathe Pettel`,
                    SellerCity: `Tokyo`,
                    Date: `2009-02-16T00:00:00`,
                    Value: 29.2,
                    NumberOfUnits: 463
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 18.6,
                    SellerName: `Howard Sprouse`,
                    SellerCity: `Tokyo`,
                    Date: `2009-02-17T00:00:00`,
                    Value: 19.8,
                    NumberOfUnits: 150
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 28,
                    SellerName: `Walter Pang`,
                    SellerCity: `Berlin`,
                    Date: `2009-02-19T00:00:00`,
                    Value: 17.6,
                    NumberOfUnits: 210
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 67.2,
                    SellerName: `Kathe Pettel`,
                    SellerCity: `Tokyo`,
                    Date: `2009-02-20T00:00:00`,
                    Value: 36.4,
                    NumberOfUnits: 150
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 36,
                    SellerName: `Benjamin Meekins`,
                    SellerCity: `London`,
                    Date: `2009-02-21T00:00:00`,
                    Value: 74,
                    NumberOfUnits: 97
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 34.2,
                    SellerName: `Stanley Brooker`,
                    SellerCity: `Berlin`,
                    Date: `2009-02-22T00:00:00`,
                    Value: 86.4,
                    NumberOfUnits: 256
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 66.4,
                    SellerName: `Russell Shorter`,
                    SellerCity: `London`,
                    Date: `2009-02-24T00:00:00`,
                    Value: 53,
                    NumberOfUnits: 172
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 15,
                    SellerName: `Monica Freitag`,
                    SellerCity: `Mellvile`,
                    Date: `2009-02-24T00:00:00`,
                    Value: 5.2,
                    NumberOfUnits: 489
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 52,
                    SellerName: `Claudia Kobayashi`,
                    SellerCity: `Sofia`,
                    Date: `2009-02-27T00:00:00`,
                    Value: 9.2,
                    NumberOfUnits: 222
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 98.4,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `Berlin`,
                    Date: `2009-03-03T00:00:00`,
                    Value: 81.4,
                    NumberOfUnits: 300
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 72.8,
                    SellerName: `Harry Tyler`,
                    SellerCity: `London`,
                    Date: `2009-03-03T00:00:00`,
                    Value: 1.4,
                    NumberOfUnits: 270
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 16.4,
                    SellerName: `Claudia Kobayashi`,
                    SellerCity: `London`,
                    Date: `2009-03-07T00:00:00`,
                    Value: 81.4,
                    NumberOfUnits: 263
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 93.6,
                    SellerName: `Elisa Longbottom`,
                    SellerCity: `Mellvile`,
                    Date: `2009-03-10T00:00:00`,
                    Value: 22.8,
                    NumberOfUnits: 28
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 42.2,
                    SellerName: `Howard Sprouse`,
                    SellerCity: `London`,
                    Date: `2009-03-15T00:00:00`,
                    Value: 20.4,
                    NumberOfUnits: 237
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 55,
                    SellerName: `Claudia Kobayashi`,
                    SellerCity: `Tokyo`,
                    Date: `2009-03-16T00:00:00`,
                    Value: 64,
                    NumberOfUnits: 171
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 97.4,
                    SellerName: `Kathe Pettel`,
                    SellerCity: `New York`,
                    Date: `2009-03-27T00:00:00`,
                    Value: 24,
                    NumberOfUnits: 251
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 51,
                    SellerName: `Antonio Charbonneau`,
                    SellerCity: `London`,
                    Date: `2009-04-01T00:00:00`,
                    Value: 32.4,
                    NumberOfUnits: 275
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 4.8,
                    SellerName: `Brandon Mckim`,
                    SellerCity: `London`,
                    Date: `2009-04-06T00:00:00`,
                    Value: 42,
                    NumberOfUnits: 311
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 71,
                    SellerName: `Monica Freitag`,
                    SellerCity: `New York`,
                    Date: `2009-04-07T00:00:00`,
                    Value: 82.8,
                    NumberOfUnits: 217
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 96.8,
                    SellerName: `Claudia Kobayashi`,
                    SellerCity: `London`,
                    Date: `2009-04-09T00:00:00`,
                    Value: 62.2,
                    NumberOfUnits: 360
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 83.6,
                    SellerName: `Howard Sprouse`,
                    SellerCity: `Berlin`,
                    Date: `2009-04-12T00:00:00`,
                    Value: 51.6,
                    NumberOfUnits: 35
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 96.4,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `New York`,
                    Date: `2009-04-15T00:00:00`,
                    Value: 81,
                    NumberOfUnits: 294
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 70.8,
                    SellerName: `Howard Sprouse`,
                    SellerCity: `Seattle`,
                    Date: `2009-04-16T00:00:00`,
                    Value: 36,
                    NumberOfUnits: 436
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 94.6,
                    SellerName: `Kathe Pettel`,
                    SellerCity: `London`,
                    Date: `2009-04-20T00:00:00`,
                    Value: 82.6,
                    NumberOfUnits: 78
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 29.6,
                    SellerName: `David Haley`,
                    SellerCity: `Tokyo`,
                    Date: `2009-04-22T00:00:00`,
                    Value: 94,
                    NumberOfUnits: 301
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 70.6,
                    SellerName: `Mark Slater`,
                    SellerCity: `New York`,
                    Date: `2009-05-02T00:00:00`,
                    Value: 92.6,
                    NumberOfUnits: 24
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 71.8,
                    SellerName: `Howard Sprouse`,
                    SellerCity: `Seattle`,
                    Date: `2009-05-04T00:00:00`,
                    Value: 19.4,
                    NumberOfUnits: 332
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 14.6,
                    SellerName: `Mark Slater`,
                    SellerCity: `Berlin`,
                    Date: `2009-05-11T00:00:00`,
                    Value: 56.4,
                    NumberOfUnits: 307
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 36.8,
                    SellerName: `Harold Garvin`,
                    SellerCity: `Seattle`,
                    Date: `2009-05-11T00:00:00`,
                    Value: 34.4,
                    NumberOfUnits: 375
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 62.8,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `Mellvile`,
                    Date: `2009-05-12T00:00:00`,
                    Value: 2,
                    NumberOfUnits: 499
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 13.8,
                    SellerName: `Russell Shorter`,
                    SellerCity: `London`,
                    Date: `2009-05-21T00:00:00`,
                    Value: 42.6,
                    NumberOfUnits: 337
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 46.2,
                    SellerName: `Larry Lieb`,
                    SellerCity: `London`,
                    Date: `2009-05-24T00:00:00`,
                    Value: 55.4,
                    NumberOfUnits: 284
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 95.4,
                    SellerName: `Howard Sprouse`,
                    SellerCity: `Berlin`,
                    Date: `2009-05-26T00:00:00`,
                    Value: 94.8,
                    NumberOfUnits: 292
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 78.2,
                    SellerName: `Howard Sprouse`,
                    SellerCity: `Sofia`,
                    Date: `2009-05-26T00:00:00`,
                    Value: 60.2,
                    NumberOfUnits: 424
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 99.4,
                    SellerName: `Mark Slater`,
                    SellerCity: `Mellvile`,
                    Date: `2009-06-05T00:00:00`,
                    Value: 29,
                    NumberOfUnits: 271
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 87,
                    SellerName: `Howard Sprouse`,
                    SellerCity: `Mellvile`,
                    Date: `2009-06-10T00:00:00`,
                    Value: 94,
                    NumberOfUnits: 6
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 13.6,
                    SellerName: `Elisa Longbottom`,
                    SellerCity: `Sofia`,
                    Date: `2009-06-12T00:00:00`,
                    Value: 95,
                    NumberOfUnits: 44
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 99.8,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `Seattle`,
                    Date: `2009-06-12T00:00:00`,
                    Value: 74.2,
                    NumberOfUnits: 277
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 17,
                    SellerName: `Brandon Mckim`,
                    SellerCity: `Seattle`,
                    Date: `2009-06-13T00:00:00`,
                    Value: 65.2,
                    NumberOfUnits: 98
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 42.4,
                    SellerName: `Elisa Longbottom`,
                    SellerCity: `Mellvile`,
                    Date: `2009-06-22T00:00:00`,
                    Value: 68.6,
                    NumberOfUnits: 443
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 79.6,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `Seattle`,
                    Date: `2009-06-26T00:00:00`,
                    Value: 81.4,
                    NumberOfUnits: 409
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 26.4,
                    SellerName: `Walter Pang`,
                    SellerCity: `New York`,
                    Date: `2009-07-02T00:00:00`,
                    Value: 68.2,
                    NumberOfUnits: 240
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 34.2,
                    SellerName: `Kathe Pettel`,
                    SellerCity: `Seattle`,
                    Date: `2009-07-10T00:00:00`,
                    Value: 95.6,
                    NumberOfUnits: 23
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 29.4,
                    SellerName: `Larry Lieb`,
                    SellerCity: `Mellvile`,
                    Date: `2009-07-12T00:00:00`,
                    Value: 36,
                    NumberOfUnits: 109
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 86.8,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `Berlin`,
                    Date: `2009-07-13T00:00:00`,
                    Value: 30,
                    NumberOfUnits: 117
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 58.4,
                    SellerName: `Mark Slater`,
                    SellerCity: `New York`,
                    Date: `2009-07-15T00:00:00`,
                    Value: 34.4,
                    NumberOfUnits: 336
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 39.8,
                    SellerName: `Antonio Charbonneau`,
                    SellerCity: `Seattle`,
                    Date: `2009-07-18T00:00:00`,
                    Value: 92.4,
                    NumberOfUnits: 372
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 10.2,
                    SellerName: `Larry Lieb`,
                    SellerCity: `Berlin`,
                    Date: `2009-07-19T00:00:00`,
                    Value: 90.4,
                    NumberOfUnits: 403
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 17.8,
                    SellerName: `Harry Tyler`,
                    SellerCity: `Seattle`,
                    Date: `2009-07-19T00:00:00`,
                    Value: 66.2,
                    NumberOfUnits: 144
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 21.6,
                    SellerName: `Lydia Burson`,
                    SellerCity: `Seattle`,
                    Date: `2009-07-19T00:00:00`,
                    Value: 41.8,
                    NumberOfUnits: 395
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 33.6,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `New York`,
                    Date: `2009-07-20T00:00:00`,
                    Value: 16.6,
                    NumberOfUnits: 236
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 48.8,
                    SellerName: `Larry Lieb`,
                    SellerCity: `Seattle`,
                    Date: `2009-07-20T00:00:00`,
                    Value: 86.8,
                    NumberOfUnits: 160
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 81.8,
                    SellerName: `David Haley`,
                    SellerCity: `Sofia`,
                    Date: `2009-07-20T00:00:00`,
                    Value: 65.8,
                    NumberOfUnits: 157
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 9.8,
                    SellerName: `Glenn Landeros`,
                    SellerCity: `Sofia`,
                    Date: `2009-07-25T00:00:00`,
                    Value: 0.2,
                    NumberOfUnits: 255
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 88.6,
                    SellerName: `Mark Slater`,
                    SellerCity: `London`,
                    Date: `2009-08-16T00:00:00`,
                    Value: 43,
                    NumberOfUnits: 284
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 89.4,
                    SellerName: `Walter Pang`,
                    SellerCity: `Tokyo`,
                    Date: `2009-08-17T00:00:00`,
                    Value: 15.8,
                    NumberOfUnits: 333
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 24,
                    SellerName: `Monica Freitag`,
                    SellerCity: `Seattle`,
                    Date: `2009-08-17T00:00:00`,
                    Value: 51.6,
                    NumberOfUnits: 48
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 19.4,
                    SellerName: `Kathe Pettel`,
                    SellerCity: `New York`,
                    Date: `2009-08-18T00:00:00`,
                    Value: 82.6,
                    NumberOfUnits: 399
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 9.4,
                    SellerName: `Mark Slater`,
                    SellerCity: `Berlin`,
                    Date: `2009-08-24T00:00:00`,
                    Value: 68.6,
                    NumberOfUnits: 413
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 1.2,
                    SellerName: `Monica Freitag`,
                    SellerCity: `Sofia`,
                    Date: `2009-09-06T00:00:00`,
                    Value: 72,
                    NumberOfUnits: 182
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 77,
                    SellerName: `Russell Shorter`,
                    SellerCity: `Mellvile`,
                    Date: `2009-09-06T00:00:00`,
                    Value: 45,
                    NumberOfUnits: 156
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 80.8,
                    SellerName: `Antonio Charbonneau`,
                    SellerCity: `Mellvile`,
                    Date: `2009-09-09T00:00:00`,
                    Value: 92.4,
                    NumberOfUnits: 293
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 22.8,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `Berlin`,
                    Date: `2009-10-01T00:00:00`,
                    Value: 100,
                    NumberOfUnits: 16
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 78.2,
                    SellerName: `Benjamin Meekins`,
                    SellerCity: `Seattle`,
                    Date: `2009-10-01T00:00:00`,
                    Value: 16,
                    NumberOfUnits: 106
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 73,
                    SellerName: `Glenn Landeros`,
                    SellerCity: `Tokyo`,
                    Date: `2009-10-06T00:00:00`,
                    Value: 91.6,
                    NumberOfUnits: 16
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 22.2,
                    SellerName: `John Smith`,
                    SellerCity: `Tokyo`,
                    Date: `2009-10-07T00:00:00`,
                    Value: 1.8,
                    NumberOfUnits: 187
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 42.8,
                    SellerName: `Harry Tyler`,
                    SellerCity: `Seattle`,
                    Date: `2009-10-10T00:00:00`,
                    Value: 21.8,
                    NumberOfUnits: 137
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 46.2,
                    SellerName: `Mark Slater`,
                    SellerCity: `Seattle`,
                    Date: `2009-10-14T00:00:00`,
                    Value: 15,
                    NumberOfUnits: 138
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 14.4,
                    SellerName: `Mark Slater`,
                    SellerCity: `Seattle`,
                    Date: `2009-10-24T00:00:00`,
                    Value: 65,
                    NumberOfUnits: 256
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 40.2,
                    SellerName: `Antonio Charbonneau`,
                    SellerCity: `London`,
                    Date: `2009-10-24T00:00:00`,
                    Value: 11.2,
                    NumberOfUnits: 353
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 17.2,
                    SellerName: `Lydia Burson`,
                    SellerCity: `Tokyo`,
                    Date: `2009-11-01T00:00:00`,
                    Value: 95,
                    NumberOfUnits: 359
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 52,
                    SellerName: `Walter Pang`,
                    SellerCity: `Tokyo`,
                    Date: `2009-11-04T00:00:00`,
                    Value: 43.2,
                    NumberOfUnits: 134
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 91,
                    SellerName: `Larry Lieb`,
                    SellerCity: `Seattle`,
                    Date: `2009-11-09T00:00:00`,
                    Value: 25.2,
                    NumberOfUnits: 263
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 88.6,
                    SellerName: `Monica Freitag`,
                    SellerCity: `Seattle`,
                    Date: `2009-11-11T00:00:00`,
                    Value: 41,
                    NumberOfUnits: 313
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 46.6,
                    SellerName: `Stanley Brooker`,
                    SellerCity: `Mellvile`,
                    Date: `2009-11-16T00:00:00`,
                    Value: 20.4,
                    NumberOfUnits: 115
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 20.4,
                    SellerName: `Claudia Kobayashi`,
                    SellerCity: `Berlin`,
                    Date: `2009-11-17T00:00:00`,
                    Value: 33,
                    NumberOfUnits: 414
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 70.8,
                    SellerName: `Kathe Pettel`,
                    SellerCity: `New York`,
                    Date: `2009-11-21T00:00:00`,
                    Value: 3,
                    NumberOfUnits: 53
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 81.6,
                    SellerName: `John Smith`,
                    SellerCity: `New York`,
                    Date: `2009-11-22T00:00:00`,
                    Value: 86.8,
                    NumberOfUnits: 472
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 9.8,
                    SellerName: `Harry Tyler`,
                    SellerCity: `Mellvile`,
                    Date: `2009-11-23T00:00:00`,
                    Value: 53.6,
                    NumberOfUnits: 199
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 29.8,
                    SellerName: `Harold Garvin`,
                    SellerCity: `Sofia`,
                    Date: `2009-11-24T00:00:00`,
                    Value: 27.4,
                    NumberOfUnits: 241
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 33.2,
                    SellerName: `Glenn Landeros`,
                    SellerCity: `New York`,
                    Date: `2009-11-24T00:00:00`,
                    Value: 1.2,
                    NumberOfUnits: 320
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 65.6,
                    SellerName: `David Haley`,
                    SellerCity: `London`,
                    Date: `2010-01-02T00:00:00`,
                    Value: 20.6,
                    NumberOfUnits: 299
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 62.2,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `London`,
                    Date: `2010-01-08T00:00:00`,
                    Value: 35.4,
                    NumberOfUnits: 366
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 78.6,
                    SellerName: `John Smith`,
                    SellerCity: `New York`,
                    Date: `2010-01-10T00:00:00`,
                    Value: 27.8,
                    NumberOfUnits: 290
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 11.6,
                    SellerName: `Lydia Burson`,
                    SellerCity: `Sofia`,
                    Date: `2010-01-11T00:00:00`,
                    Value: 61.8,
                    NumberOfUnits: 350
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 33.4,
                    SellerName: `Russell Shorter`,
                    SellerCity: `Sofia`,
                    Date: `2010-01-14T00:00:00`,
                    Value: 33.8,
                    NumberOfUnits: 469
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 96.2,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `Sofia`,
                    Date: `2010-01-21T00:00:00`,
                    Value: 75.6,
                    NumberOfUnits: 352
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 92.2,
                    SellerName: `Larry Lieb`,
                    SellerCity: `Seattle`,
                    Date: `2010-01-25T00:00:00`,
                    Value: 38.8,
                    NumberOfUnits: 47
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 93.2,
                    SellerName: `Russell Shorter`,
                    SellerCity: `Tokyo`,
                    Date: `2010-02-02T00:00:00`,
                    Value: 66.4,
                    NumberOfUnits: 153
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 39,
                    SellerName: `Antonio Charbonneau`,
                    SellerCity: `Berlin`,
                    Date: `2010-02-02T00:00:00`,
                    Value: 28.6,
                    NumberOfUnits: 211
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 99.4,
                    SellerName: `Russell Shorter`,
                    SellerCity: `Sofia`,
                    Date: `2010-02-04T00:00:00`,
                    Value: 67,
                    NumberOfUnits: 267
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 94.4,
                    SellerName: `Antonio Charbonneau`,
                    SellerCity: `New York`,
                    Date: `2010-02-04T00:00:00`,
                    Value: 71.4,
                    NumberOfUnits: 91
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 19.8,
                    SellerName: `Claudia Kobayashi`,
                    SellerCity: `Tokyo`,
                    Date: `2010-02-05T00:00:00`,
                    Value: 46,
                    NumberOfUnits: 84
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 87.2,
                    SellerName: `Howard Sprouse`,
                    SellerCity: `Mellvile`,
                    Date: `2010-02-11T00:00:00`,
                    Value: 66.8,
                    NumberOfUnits: 270
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 76.2,
                    SellerName: `Alfredo Fetuchini`,
                    SellerCity: `Berlin`,
                    Date: `2010-02-12T00:00:00`,
                    Value: 87,
                    NumberOfUnits: 496
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 52,
                    SellerName: `John Smith`,
                    SellerCity: `Seattle`,
                    Date: `2010-02-16T00:00:00`,
                    Value: 47.4,
                    NumberOfUnits: 24
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 21.8,
                    SellerName: `Walter Pang`,
                    SellerCity: `Mellvile`,
                    Date: `2010-02-17T00:00:00`,
                    Value: 72.8,
                    NumberOfUnits: 41
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 15.8,
                    SellerName: `John Smith`,
                    SellerCity: `Mellvile`,
                    Date: `2010-02-22T00:00:00`,
                    Value: 65.6,
                    NumberOfUnits: 365
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 2.8,
                    SellerName: `Brandon Mckim`,
                    SellerCity: `Sofia`,
                    Date: `2010-03-01T00:00:00`,
                    Value: 68.6,
                    NumberOfUnits: 202
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 52.4,
                    SellerName: `Howard Sprouse`,
                    SellerCity: `Seattle`,
                    Date: `2010-03-01T00:00:00`,
                    Value: 79.4,
                    NumberOfUnits: 225
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 0.4,
                    SellerName: `Stanley Brooker`,
                    SellerCity: `Mellvile`,
                    Date: `2010-03-03T00:00:00`,
                    Value: 70.2,
                    NumberOfUnits: 206
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 22.4,
                    SellerName: `Larry Lieb`,
                    SellerCity: `Sofia`,
                    Date: `2010-03-11T00:00:00`,
                    Value: 54.8,
                    NumberOfUnits: 158
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 94.8,
                    SellerName: `Benjamin Meekins`,
                    SellerCity: `London`,
                    Date: `2010-03-14T00:00:00`,
                    Value: 70.4,
                    NumberOfUnits: 169
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 1.2,
                    SellerName: `John Smith`,
                    SellerCity: `New York`,
                    Date: `2010-03-15T00:00:00`,
                    Value: 19,
                    NumberOfUnits: 4
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 12.2,
                    SellerName: `Monica Freitag`,
                    SellerCity: `New York`,
                    Date: `2010-03-15T00:00:00`,
                    Value: 12.8,
                    NumberOfUnits: 232
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 58.8,
                    SellerName: `Mark Slater`,
                    SellerCity: `Berlin`,
                    Date: `2010-03-16T00:00:00`,
                    Value: 78.8,
                    NumberOfUnits: 421
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 44,
                    SellerName: `David Haley`,
                    SellerCity: `Seattle`,
                    Date: `2010-03-25T00:00:00`,
                    Value: 89.6,
                    NumberOfUnits: 260
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 54.6,
                    SellerName: `Brandon Mckim`,
                    SellerCity: `Seattle`,
                    Date: `2010-04-02T00:00:00`,
                    Value: 92,
                    NumberOfUnits: 194
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 94.6,
                    SellerName: `Walter Pang`,
                    SellerCity: `Tokyo`,
                    Date: `2010-04-05T00:00:00`,
                    Value: 35.4,
                    NumberOfUnits: 491
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 11.2,
                    SellerName: `Harold Garvin`,
                    SellerCity: `London`,
                    Date: `2010-04-14T00:00:00`,
                    Value: 30,
                    NumberOfUnits: 256
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 18.2,
                    SellerName: `Alfredo Fetuchini`,
                    SellerCity: `Mellvile`,
                    Date: `2010-04-15T00:00:00`,
                    Value: 84.6,
                    NumberOfUnits: 279
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 8.4,
                    SellerName: `Carl Costello`,
                    SellerCity: `Berlin`,
                    Date: `2010-04-15T00:00:00`,
                    Value: 99.6,
                    NumberOfUnits: 287
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 78,
                    SellerName: `Carl Costello`,
                    SellerCity: `New York`,
                    Date: `2010-04-22T00:00:00`,
                    Value: 59,
                    NumberOfUnits: 363
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 55.6,
                    SellerName: `Mark Slater`,
                    SellerCity: `Berlin`,
                    Date: `2010-04-22T00:00:00`,
                    Value: 16.4,
                    NumberOfUnits: 499
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 39.4,
                    SellerName: `Lydia Burson`,
                    SellerCity: `Berlin`,
                    Date: `2010-04-24T00:00:00`,
                    Value: 0.2,
                    NumberOfUnits: 109
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 7.8,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `Berlin`,
                    Date: `2010-05-04T00:00:00`,
                    Value: 99.6,
                    NumberOfUnits: 25
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 62.4,
                    SellerName: `Alfredo Fetuchini`,
                    SellerCity: `Mellvile`,
                    Date: `2010-05-05T00:00:00`,
                    Value: 48,
                    NumberOfUnits: 64
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 38.8,
                    SellerName: `Howard Sprouse`,
                    SellerCity: `London`,
                    Date: `2010-05-06T00:00:00`,
                    Value: 57.8,
                    NumberOfUnits: 256
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 17.8,
                    SellerName: `Benjamin Meekins`,
                    SellerCity: `Mellvile`,
                    Date: `2010-05-07T00:00:00`,
                    Value: 15.4,
                    NumberOfUnits: 50
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 57.8,
                    SellerName: `Bryan Culver`,
                    SellerCity: `Berlin`,
                    Date: `2010-05-07T00:00:00`,
                    Value: 58.6,
                    NumberOfUnits: 437
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 21.4,
                    SellerName: `Bryan Culver`,
                    SellerCity: `Sofia`,
                    Date: `2010-05-19T00:00:00`,
                    Value: 41,
                    NumberOfUnits: 253
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 10.2,
                    SellerName: `Monica Freitag`,
                    SellerCity: `London`,
                    Date: `2010-05-22T00:00:00`,
                    Value: 24,
                    NumberOfUnits: 312
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 87.8,
                    SellerName: `Claudia Kobayashi`,
                    SellerCity: `London`,
                    Date: `2010-05-24T00:00:00`,
                    Value: 12.6,
                    NumberOfUnits: 82
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 42.6,
                    SellerName: `Harold Garvin`,
                    SellerCity: `New York`,
                    Date: `2010-06-01T00:00:00`,
                    Value: 32.2,
                    NumberOfUnits: 467
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 79.8,
                    SellerName: `Alfredo Fetuchini`,
                    SellerCity: `Sofia`,
                    Date: `2010-06-05T00:00:00`,
                    Value: 69.6,
                    NumberOfUnits: 74
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 1.8,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `Seattle`,
                    Date: `2010-06-10T00:00:00`,
                    Value: 14.8,
                    NumberOfUnits: 81
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 15,
                    SellerName: `Kathe Pettel`,
                    SellerCity: `Berlin`,
                    Date: `2010-06-25T00:00:00`,
                    Value: 18.8,
                    NumberOfUnits: 88
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 43.4,
                    SellerName: `Antonio Charbonneau`,
                    SellerCity: `Mellvile`,
                    Date: `2010-06-26T00:00:00`,
                    Value: 44.4,
                    NumberOfUnits: 126
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 16.2,
                    SellerName: `Elisa Longbottom`,
                    SellerCity: `Sofia`,
                    Date: `2010-06-27T00:00:00`,
                    Value: 77.8,
                    NumberOfUnits: 112
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 59.2,
                    SellerName: `Antonio Charbonneau`,
                    SellerCity: `Sofia`,
                    Date: `2010-06-27T00:00:00`,
                    Value: 15.4,
                    NumberOfUnits: 47
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 40,
                    SellerName: `Claudia Kobayashi`,
                    SellerCity: `Sofia`,
                    Date: `2010-07-05T00:00:00`,
                    Value: 29.4,
                    NumberOfUnits: 218
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 27,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `New York`,
                    Date: `2010-07-05T00:00:00`,
                    Value: 30,
                    NumberOfUnits: 34
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 14.4,
                    SellerName: `Bryan Culver`,
                    SellerCity: `Sofia`,
                    Date: `2010-07-13T00:00:00`,
                    Value: 83.4,
                    NumberOfUnits: 492
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 53.4,
                    SellerName: `Harry Tyler`,
                    SellerCity: `Sofia`,
                    Date: `2010-07-16T00:00:00`,
                    Value: 41.6,
                    NumberOfUnits: 464
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 21.4,
                    SellerName: `Harry Tyler`,
                    SellerCity: `Seattle`,
                    Date: `2010-07-17T00:00:00`,
                    Value: 83.4,
                    NumberOfUnits: 118
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 24,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `Seattle`,
                    Date: `2010-07-18T00:00:00`,
                    Value: 94.2,
                    NumberOfUnits: 442
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 37.6,
                    SellerName: `Benjamin Meekins`,
                    SellerCity: `London`,
                    Date: `2010-07-23T00:00:00`,
                    Value: 59.6,
                    NumberOfUnits: 248
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 60.8,
                    SellerName: `Lydia Burson`,
                    SellerCity: `London`,
                    Date: `2010-07-23T00:00:00`,
                    Value: 83.6,
                    NumberOfUnits: 472
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 78,
                    SellerName: `Alfredo Fetuchini`,
                    SellerCity: `New York`,
                    Date: `2010-07-24T00:00:00`,
                    Value: 84,
                    NumberOfUnits: 140
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 47.6,
                    SellerName: `Lydia Burson`,
                    SellerCity: `Tokyo`,
                    Date: `2010-07-26T00:00:00`,
                    Value: 86.6,
                    NumberOfUnits: 118
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 58.2,
                    SellerName: `Harry Tyler`,
                    SellerCity: `Sofia`,
                    Date: `2010-07-27T00:00:00`,
                    Value: 64,
                    NumberOfUnits: 176
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 98.4,
                    SellerName: `Russell Shorter`,
                    SellerCity: `Mellvile`,
                    Date: `2010-08-01T00:00:00`,
                    Value: 23.4,
                    NumberOfUnits: 77
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 3,
                    SellerName: `Glenn Landeros`,
                    SellerCity: `Sofia`,
                    Date: `2010-08-08T00:00:00`,
                    Value: 74.4,
                    NumberOfUnits: 105
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 98.2,
                    SellerName: `Alfredo Fetuchini`,
                    SellerCity: `Tokyo`,
                    Date: `2010-08-21T00:00:00`,
                    Value: 60.8,
                    NumberOfUnits: 160
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 79,
                    SellerName: `Stanley Brooker`,
                    SellerCity: `Seattle`,
                    Date: `2010-08-26T00:00:00`,
                    Value: 67,
                    NumberOfUnits: 186
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 17.8,
                    SellerName: `Harold Garvin`,
                    SellerCity: `Seattle`,
                    Date: `2010-09-04T00:00:00`,
                    Value: 29,
                    NumberOfUnits: 380
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 38.8,
                    SellerName: `John Smith`,
                    SellerCity: `Tokyo`,
                    Date: `2010-09-11T00:00:00`,
                    Value: 41.6,
                    NumberOfUnits: 470
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 75.2,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `Mellvile`,
                    Date: `2010-09-13T00:00:00`,
                    Value: 42.8,
                    NumberOfUnits: 348
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 55.4,
                    SellerName: `Carl Costello`,
                    SellerCity: `London`,
                    Date: `2010-09-14T00:00:00`,
                    Value: 29.4,
                    NumberOfUnits: 151
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 51.4,
                    SellerName: `Kathe Pettel`,
                    SellerCity: `New York`,
                    Date: `2010-09-24T00:00:00`,
                    Value: 86.6,
                    NumberOfUnits: 7
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 31.4,
                    SellerName: `Monica Freitag`,
                    SellerCity: `New York`,
                    Date: `2010-10-07T00:00:00`,
                    Value: 39,
                    NumberOfUnits: 123
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 80,
                    SellerName: `Mark Slater`,
                    SellerCity: `Seattle`,
                    Date: `2010-10-08T00:00:00`,
                    Value: 8.8,
                    NumberOfUnits: 374
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 94.8,
                    SellerName: `Kathe Pettel`,
                    SellerCity: `Mellvile`,
                    Date: `2010-10-11T00:00:00`,
                    Value: 96.8,
                    NumberOfUnits: 178
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 42,
                    SellerName: `Bryan Culver`,
                    SellerCity: `Sofia`,
                    Date: `2010-10-22T00:00:00`,
                    Value: 31.4,
                    NumberOfUnits: 354
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 46.6,
                    SellerName: `Elisa Longbottom`,
                    SellerCity: `New York`,
                    Date: `2010-10-25T00:00:00`,
                    Value: 85.6,
                    NumberOfUnits: 459
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 27.2,
                    SellerName: `Mark Slater`,
                    SellerCity: `London`,
                    Date: `2010-11-02T00:00:00`,
                    Value: 46.4,
                    NumberOfUnits: 78
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 30.2,
                    SellerName: `Walter Pang`,
                    SellerCity: `Berlin`,
                    Date: `2010-11-03T00:00:00`,
                    Value: 52.2,
                    NumberOfUnits: 417
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 82.2,
                    SellerName: `Walter Pang`,
                    SellerCity: `Seattle`,
                    Date: `2010-11-12T00:00:00`,
                    Value: 15.4,
                    NumberOfUnits: 208
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 13.2,
                    SellerName: `Harold Garvin`,
                    SellerCity: `Seattle`,
                    Date: `2010-11-19T00:00:00`,
                    Value: 48.6,
                    NumberOfUnits: 359
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 8.8,
                    SellerName: `Russell Shorter`,
                    SellerCity: `New York`,
                    Date: `2010-11-25T00:00:00`,
                    Value: 24.6,
                    NumberOfUnits: 392
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 78.4,
                    SellerName: `John Smith`,
                    SellerCity: `London`,
                    Date: `2011-01-01T00:00:00`,
                    Value: 37.6,
                    NumberOfUnits: 241
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 50.6,
                    SellerName: `Claudia Kobayashi`,
                    SellerCity: `Seattle`,
                    Date: `2011-01-04T00:00:00`,
                    Value: 27.2,
                    NumberOfUnits: 62
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 6.4,
                    SellerName: `Elisa Longbottom`,
                    SellerCity: `Tokyo`,
                    Date: `2011-01-06T00:00:00`,
                    Value: 89.6,
                    NumberOfUnits: 485
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 47.4,
                    SellerName: `Bryan Culver`,
                    SellerCity: `Sofia`,
                    Date: `2011-01-14T00:00:00`,
                    Value: 5,
                    NumberOfUnits: 470
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 6.2,
                    SellerName: `Harry Tyler`,
                    SellerCity: `Seattle`,
                    Date: `2011-01-23T00:00:00`,
                    Value: 78.6,
                    NumberOfUnits: 197
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 57.6,
                    SellerName: `Larry Lieb`,
                    SellerCity: `Berlin`,
                    Date: `2011-01-26T00:00:00`,
                    Value: 59.8,
                    NumberOfUnits: 353
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 37.6,
                    SellerName: `Benjamin Meekins`,
                    SellerCity: `Mellvile`,
                    Date: `2011-02-01T00:00:00`,
                    Value: 39.6,
                    NumberOfUnits: 338
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 21,
                    SellerName: `Claudia Kobayashi`,
                    SellerCity: `New York`,
                    Date: `2011-02-08T00:00:00`,
                    Value: 93,
                    NumberOfUnits: 17
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 11.8,
                    SellerName: `Antonio Charbonneau`,
                    SellerCity: `Berlin`,
                    Date: `2011-02-12T00:00:00`,
                    Value: 61.4,
                    NumberOfUnits: 429
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 65,
                    SellerName: `Alfredo Fetuchini`,
                    SellerCity: `Tokyo`,
                    Date: `2011-02-14T00:00:00`,
                    Value: 24.4,
                    NumberOfUnits: 385
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 20,
                    SellerName: `Claudia Kobayashi`,
                    SellerCity: `New York`,
                    Date: `2011-02-20T00:00:00`,
                    Value: 35.4,
                    NumberOfUnits: 166
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 3.2,
                    SellerName: `Lydia Burson`,
                    SellerCity: `Seattle`,
                    Date: `2011-02-20T00:00:00`,
                    Value: 52.6,
                    NumberOfUnits: 137
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 18.2,
                    SellerName: `Russell Shorter`,
                    SellerCity: `New York`,
                    Date: `2011-02-24T00:00:00`,
                    Value: 8.2,
                    NumberOfUnits: 443
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 20.4,
                    SellerName: `Carl Costello`,
                    SellerCity: `Seattle`,
                    Date: `2011-02-26T00:00:00`,
                    Value: 87.4,
                    NumberOfUnits: 40
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 20.6,
                    SellerName: `Glenn Landeros`,
                    SellerCity: `London`,
                    Date: `2011-03-05T00:00:00`,
                    Value: 7.4,
                    NumberOfUnits: 138
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 23.8,
                    SellerName: `Lydia Burson`,
                    SellerCity: `Tokyo`,
                    Date: `2011-03-09T00:00:00`,
                    Value: 18.2,
                    NumberOfUnits: 15
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 76.4,
                    SellerName: `Antonio Charbonneau`,
                    SellerCity: `Mellvile`,
                    Date: `2011-03-09T00:00:00`,
                    Value: 74.6,
                    NumberOfUnits: 469
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 93.4,
                    SellerName: `Russell Shorter`,
                    SellerCity: `London`,
                    Date: `2011-03-11T00:00:00`,
                    Value: 89,
                    NumberOfUnits: 426
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 63,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `Seattle`,
                    Date: `2011-03-16T00:00:00`,
                    Value: 32.6,
                    NumberOfUnits: 208
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 58.6,
                    SellerName: `Brandon Mckim`,
                    SellerCity: `Seattle`,
                    Date: `2011-03-21T00:00:00`,
                    Value: 51,
                    NumberOfUnits: 155
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 82.4,
                    SellerName: `Stanley Brooker`,
                    SellerCity: `Seattle`,
                    Date: `2011-03-23T00:00:00`,
                    Value: 33.4,
                    NumberOfUnits: 381
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 19.2,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `Tokyo`,
                    Date: `2011-04-12T00:00:00`,
                    Value: 75.2,
                    NumberOfUnits: 5
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 53.6,
                    SellerName: `Walter Pang`,
                    SellerCity: `London`,
                    Date: `2011-04-12T00:00:00`,
                    Value: 14.6,
                    NumberOfUnits: 221
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 97.4,
                    SellerName: `Howard Sprouse`,
                    SellerCity: `Sofia`,
                    Date: `2011-04-14T00:00:00`,
                    Value: 84.8,
                    NumberOfUnits: 39
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 74.2,
                    SellerName: `Mark Slater`,
                    SellerCity: `New York`,
                    Date: `2011-04-16T00:00:00`,
                    Value: 51.4,
                    NumberOfUnits: 468
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 8.2,
                    SellerName: `Claudia Kobayashi`,
                    SellerCity: `Seattle`,
                    Date: `2011-04-17T00:00:00`,
                    Value: 0.8,
                    NumberOfUnits: 44
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 59.2,
                    SellerName: `John Smith`,
                    SellerCity: `Mellvile`,
                    Date: `2011-04-22T00:00:00`,
                    Value: 47.6,
                    NumberOfUnits: 287
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 96.8,
                    SellerName: `Russell Shorter`,
                    SellerCity: `Sofia`,
                    Date: `2011-04-24T00:00:00`,
                    Value: 78.6,
                    NumberOfUnits: 463
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 76.8,
                    SellerName: `Walter Pang`,
                    SellerCity: `Seattle`,
                    Date: `2011-04-24T00:00:00`,
                    Value: 63,
                    NumberOfUnits: 335
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 73.4,
                    SellerName: `Walter Pang`,
                    SellerCity: `Berlin`,
                    Date: `2011-04-24T00:00:00`,
                    Value: 30.6,
                    NumberOfUnits: 211
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 66.4,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `Seattle`,
                    Date: `2011-05-03T00:00:00`,
                    Value: 87.4,
                    NumberOfUnits: 291
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 37,
                    SellerName: `John Smith`,
                    SellerCity: `Sofia`,
                    Date: `2011-05-05T00:00:00`,
                    Value: 40.2,
                    NumberOfUnits: 1
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 21.4,
                    SellerName: `Alfredo Fetuchini`,
                    SellerCity: `Seattle`,
                    Date: `2011-05-06T00:00:00`,
                    Value: 46,
                    NumberOfUnits: 120
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 20,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `Berlin`,
                    Date: `2011-05-06T00:00:00`,
                    Value: 72.6,
                    NumberOfUnits: 382
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 16.6,
                    SellerName: `Harry Tyler`,
                    SellerCity: `Seattle`,
                    Date: `2011-05-07T00:00:00`,
                    Value: 7.8,
                    NumberOfUnits: 63
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 41.8,
                    SellerName: `Stanley Brooker`,
                    SellerCity: `Seattle`,
                    Date: `2011-05-12T00:00:00`,
                    Value: 94.4,
                    NumberOfUnits: 230
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 5,
                    SellerName: `Larry Lieb`,
                    SellerCity: `Tokyo`,
                    Date: `2011-05-13T00:00:00`,
                    Value: 31,
                    NumberOfUnits: 362
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 10.8,
                    SellerName: `Monica Freitag`,
                    SellerCity: `New York`,
                    Date: `2011-05-17T00:00:00`,
                    Value: 59.8,
                    NumberOfUnits: 430
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 66.2,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `Seattle`,
                    Date: `2011-05-23T00:00:00`,
                    Value: 91.2,
                    NumberOfUnits: 204
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 61,
                    SellerName: `Antonio Charbonneau`,
                    SellerCity: `Berlin`,
                    Date: `2011-05-24T00:00:00`,
                    Value: 86.2,
                    NumberOfUnits: 118
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 68.8,
                    SellerName: `Walter Pang`,
                    SellerCity: `Sofia`,
                    Date: `2011-06-01T00:00:00`,
                    Value: 14.6,
                    NumberOfUnits: 17
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 40.8,
                    SellerName: `Walter Pang`,
                    SellerCity: `New York`,
                    Date: `2011-06-03T00:00:00`,
                    Value: 9,
                    NumberOfUnits: 312
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 97,
                    SellerName: `Lydia Burson`,
                    SellerCity: `Seattle`,
                    Date: `2011-06-12T00:00:00`,
                    Value: 95,
                    NumberOfUnits: 283
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 67,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `Seattle`,
                    Date: `2011-06-13T00:00:00`,
                    Value: 27.6,
                    NumberOfUnits: 460
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 67.2,
                    SellerName: `Howard Sprouse`,
                    SellerCity: `New York`,
                    Date: `2011-06-14T00:00:00`,
                    Value: 66.2,
                    NumberOfUnits: 295
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 28.2,
                    SellerName: `Alfredo Fetuchini`,
                    SellerCity: `Mellvile`,
                    Date: `2011-06-15T00:00:00`,
                    Value: 50.6,
                    NumberOfUnits: 49
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 7.4,
                    SellerName: `Russell Shorter`,
                    SellerCity: `Tokyo`,
                    Date: `2011-06-24T00:00:00`,
                    Value: 8,
                    NumberOfUnits: 127
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 39.2,
                    SellerName: `Mark Slater`,
                    SellerCity: `Seattle`,
                    Date: `2011-06-27T00:00:00`,
                    Value: 98.8,
                    NumberOfUnits: 244
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 53.4,
                    SellerName: `Harold Garvin`,
                    SellerCity: `Tokyo`,
                    Date: `2011-07-01T00:00:00`,
                    Value: 11.2,
                    NumberOfUnits: 188
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 25.6,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `Seattle`,
                    Date: `2011-07-06T00:00:00`,
                    Value: 56.2,
                    NumberOfUnits: 458
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 70.4,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `Mellvile`,
                    Date: `2011-07-08T00:00:00`,
                    Value: 82.4,
                    NumberOfUnits: 448
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 7.6,
                    SellerName: `Harold Garvin`,
                    SellerCity: `Berlin`,
                    Date: `2011-07-27T00:00:00`,
                    Value: 30.6,
                    NumberOfUnits: 226
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 21.6,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `London`,
                    Date: `2011-08-01T00:00:00`,
                    Value: 69.6,
                    NumberOfUnits: 474
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 37.6,
                    SellerName: `David Haley`,
                    SellerCity: `Sofia`,
                    Date: `2011-08-02T00:00:00`,
                    Value: 62.8,
                    NumberOfUnits: 338
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 99.4,
                    SellerName: `Benjamin Meekins`,
                    SellerCity: `London`,
                    Date: `2011-08-02T00:00:00`,
                    Value: 75.2,
                    NumberOfUnits: 88
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 72.2,
                    SellerName: `Carl Costello`,
                    SellerCity: `Berlin`,
                    Date: `2011-08-04T00:00:00`,
                    Value: 86.4,
                    NumberOfUnits: 436
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 34.4,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `Mellvile`,
                    Date: `2011-08-06T00:00:00`,
                    Value: 9.2,
                    NumberOfUnits: 297
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 47,
                    SellerName: `Russell Shorter`,
                    SellerCity: `London`,
                    Date: `2011-08-07T00:00:00`,
                    Value: 5.2,
                    NumberOfUnits: 240
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 26.4,
                    SellerName: `Stanley Brooker`,
                    SellerCity: `Sofia`,
                    Date: `2011-08-07T00:00:00`,
                    Value: 80.2,
                    NumberOfUnits: 415
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 49.2,
                    SellerName: `David Haley`,
                    SellerCity: `Mellvile`,
                    Date: `2011-08-08T00:00:00`,
                    Value: 61.2,
                    NumberOfUnits: 435
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 95.2,
                    SellerName: `Monica Freitag`,
                    SellerCity: `Berlin`,
                    Date: `2011-08-16T00:00:00`,
                    Value: 73.8,
                    NumberOfUnits: 64
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 74.2,
                    SellerName: `John Smith`,
                    SellerCity: `Seattle`,
                    Date: `2011-08-23T00:00:00`,
                    Value: 40.8,
                    NumberOfUnits: 21
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 82.6,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `London`,
                    Date: `2011-08-25T00:00:00`,
                    Value: 55,
                    NumberOfUnits: 467
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 42.8,
                    SellerName: `Lydia Burson`,
                    SellerCity: `Sofia`,
                    Date: `2011-09-02T00:00:00`,
                    Value: 28.2,
                    NumberOfUnits: 98
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 83.6,
                    SellerName: `Russell Shorter`,
                    SellerCity: `Mellvile`,
                    Date: `2011-09-04T00:00:00`,
                    Value: 72.6,
                    NumberOfUnits: 370
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 41.6,
                    SellerName: `Walter Pang`,
                    SellerCity: `Berlin`,
                    Date: `2011-09-05T00:00:00`,
                    Value: 81,
                    NumberOfUnits: 94
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 74.2,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `London`,
                    Date: `2011-09-09T00:00:00`,
                    Value: 95,
                    NumberOfUnits: 106
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 75.4,
                    SellerName: `Claudia Kobayashi`,
                    SellerCity: `Sofia`,
                    Date: `2011-09-11T00:00:00`,
                    Value: 10,
                    NumberOfUnits: 261
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 10.2,
                    SellerName: `Howard Sprouse`,
                    SellerCity: `Seattle`,
                    Date: `2011-09-17T00:00:00`,
                    Value: 29.4,
                    NumberOfUnits: 307
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 73,
                    SellerName: `Harry Tyler`,
                    SellerCity: `New York`,
                    Date: `2011-09-17T00:00:00`,
                    Value: 57,
                    NumberOfUnits: 362
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 85.2,
                    SellerName: `Benjamin Meekins`,
                    SellerCity: `Tokyo`,
                    Date: `2011-09-24T00:00:00`,
                    Value: 24,
                    NumberOfUnits: 330
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 77.6,
                    SellerName: `Walter Pang`,
                    SellerCity: `New York`,
                    Date: `2011-09-26T00:00:00`,
                    Value: 91.8,
                    NumberOfUnits: 23
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 50.4,
                    SellerName: `David Haley`,
                    SellerCity: `Berlin`,
                    Date: `2011-09-27T00:00:00`,
                    Value: 66.8,
                    NumberOfUnits: 392
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 32.4,
                    SellerName: `Larry Lieb`,
                    SellerCity: `Seattle`,
                    Date: `2011-10-13T00:00:00`,
                    Value: 81.6,
                    NumberOfUnits: 16
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 63,
                    SellerName: `Lydia Burson`,
                    SellerCity: `New York`,
                    Date: `2011-10-13T00:00:00`,
                    Value: 31,
                    NumberOfUnits: 100
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 13.4,
                    SellerName: `Carl Costello`,
                    SellerCity: `Berlin`,
                    Date: `2011-10-22T00:00:00`,
                    Value: 85.6,
                    NumberOfUnits: 132
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 0.4,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `Seattle`,
                    Date: `2011-10-22T00:00:00`,
                    Value: 74.4,
                    NumberOfUnits: 22
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 66.2,
                    SellerName: `Walter Pang`,
                    SellerCity: `New York`,
                    Date: `2011-11-02T00:00:00`,
                    Value: 88.2,
                    NumberOfUnits: 96
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 50.2,
                    SellerName: `Elisa Longbottom`,
                    SellerCity: `Berlin`,
                    Date: `2011-11-03T00:00:00`,
                    Value: 31.4,
                    NumberOfUnits: 76
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 68,
                    SellerName: `Stanley Brooker`,
                    SellerCity: `Mellvile`,
                    Date: `2011-11-04T00:00:00`,
                    Value: 91.2,
                    NumberOfUnits: 492
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 6.6,
                    SellerName: `Harry Tyler`,
                    SellerCity: `Berlin`,
                    Date: `2011-11-08T00:00:00`,
                    Value: 51.6,
                    NumberOfUnits: 49
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 35.6,
                    SellerName: `Russell Shorter`,
                    SellerCity: `Mellvile`,
                    Date: `2011-11-12T00:00:00`,
                    Value: 21,
                    NumberOfUnits: 197
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 60,
                    SellerName: `Howard Sprouse`,
                    SellerCity: `Tokyo`,
                    Date: `2011-11-12T00:00:00`,
                    Value: 70.4,
                    NumberOfUnits: 484
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 67.4,
                    SellerName: `Russell Shorter`,
                    SellerCity: `Tokyo`,
                    Date: `2011-11-13T00:00:00`,
                    Value: 14.4,
                    NumberOfUnits: 182
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 52,
                    SellerName: `Alfredo Fetuchini`,
                    SellerCity: `London`,
                    Date: `2011-11-15T00:00:00`,
                    Value: 18.4,
                    NumberOfUnits: 42
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 66.8,
                    SellerName: `Brandon Mckim`,
                    SellerCity: `New York`,
                    Date: `2011-11-19T00:00:00`,
                    Value: 52.8,
                    NumberOfUnits: 109
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 56.2,
                    SellerName: `Harold Garvin`,
                    SellerCity: `Mellvile`,
                    Date: `2011-11-23T00:00:00`,
                    Value: 40.2,
                    NumberOfUnits: 310
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 93.6,
                    SellerName: `Monica Freitag`,
                    SellerCity: `Sofia`,
                    Date: `2012-01-03T00:00:00`,
                    Value: 53.4,
                    NumberOfUnits: 306
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 9.6,
                    SellerName: `Harold Garvin`,
                    SellerCity: `Seattle`,
                    Date: `2012-01-06T00:00:00`,
                    Value: 83,
                    NumberOfUnits: 290
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 41.2,
                    SellerName: `Monica Freitag`,
                    SellerCity: `Tokyo`,
                    Date: `2012-01-10T00:00:00`,
                    Value: 29.8,
                    NumberOfUnits: 499
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 9.8,
                    SellerName: `Kathe Pettel`,
                    SellerCity: `Berlin`,
                    Date: `2012-01-11T00:00:00`,
                    Value: 10.8,
                    NumberOfUnits: 7
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 64.6,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `Sofia`,
                    Date: `2012-01-14T00:00:00`,
                    Value: 35,
                    NumberOfUnits: 220
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 47.4,
                    SellerName: `Elisa Longbottom`,
                    SellerCity: `New York`,
                    Date: `2012-01-15T00:00:00`,
                    Value: 50.2,
                    NumberOfUnits: 395
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 14.6,
                    SellerName: `Lydia Burson`,
                    SellerCity: `Sofia`,
                    Date: `2012-01-18T00:00:00`,
                    Value: 100,
                    NumberOfUnits: 219
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 10.8,
                    SellerName: `Larry Lieb`,
                    SellerCity: `Mellvile`,
                    Date: `2012-01-18T00:00:00`,
                    Value: 92,
                    NumberOfUnits: 229
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 65,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `Mellvile`,
                    Date: `2012-01-22T00:00:00`,
                    Value: 55.8,
                    NumberOfUnits: 111
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 48,
                    SellerName: `Alfredo Fetuchini`,
                    SellerCity: `London`,
                    Date: `2012-02-01T00:00:00`,
                    Value: 20.6,
                    NumberOfUnits: 237
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 87.8,
                    SellerName: `Claudia Kobayashi`,
                    SellerCity: `Berlin`,
                    Date: `2012-02-13T00:00:00`,
                    Value: 17.2,
                    NumberOfUnits: 114
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 55.4,
                    SellerName: `Bryan Culver`,
                    SellerCity: `London`,
                    Date: `2012-02-23T00:00:00`,
                    Value: 76.8,
                    NumberOfUnits: 329
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 40.8,
                    SellerName: `Howard Sprouse`,
                    SellerCity: `Seattle`,
                    Date: `2012-02-24T00:00:00`,
                    Value: 1.2,
                    NumberOfUnits: 135
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 57.8,
                    SellerName: `Harold Garvin`,
                    SellerCity: `New York`,
                    Date: `2012-03-02T00:00:00`,
                    Value: 46.8,
                    NumberOfUnits: 187
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 14.8,
                    SellerName: `David Haley`,
                    SellerCity: `Tokyo`,
                    Date: `2012-03-10T00:00:00`,
                    Value: 17.6,
                    NumberOfUnits: 286
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 13,
                    SellerName: `Antonio Charbonneau`,
                    SellerCity: `Mellvile`,
                    Date: `2012-03-11T00:00:00`,
                    Value: 18.2,
                    NumberOfUnits: 468
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 26,
                    SellerName: `Monica Freitag`,
                    SellerCity: `Tokyo`,
                    Date: `2012-03-18T00:00:00`,
                    Value: 93.2,
                    NumberOfUnits: 71
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 72.6,
                    SellerName: `Bryan Culver`,
                    SellerCity: `Mellvile`,
                    Date: `2012-03-21T00:00:00`,
                    Value: 62,
                    NumberOfUnits: 251
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 44.4,
                    SellerName: `Monica Freitag`,
                    SellerCity: `Berlin`,
                    Date: `2012-03-25T00:00:00`,
                    Value: 57.2,
                    NumberOfUnits: 297
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 68.2,
                    SellerName: `Alfredo Fetuchini`,
                    SellerCity: `Berlin`,
                    Date: `2012-03-25T00:00:00`,
                    Value: 4.2,
                    NumberOfUnits: 248
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 35.4,
                    SellerName: `Elisa Longbottom`,
                    SellerCity: `Sofia`,
                    Date: `2012-03-26T00:00:00`,
                    Value: 45.2,
                    NumberOfUnits: 488
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 41.2,
                    SellerName: `Alfredo Fetuchini`,
                    SellerCity: `Sofia`,
                    Date: `2012-04-06T00:00:00`,
                    Value: 59.6,
                    NumberOfUnits: 211
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 29.4,
                    SellerName: `Stanley Brooker`,
                    SellerCity: `Seattle`,
                    Date: `2012-04-14T00:00:00`,
                    Value: 3.2,
                    NumberOfUnits: 149
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 52,
                    SellerName: `Lydia Burson`,
                    SellerCity: `Berlin`,
                    Date: `2012-04-14T00:00:00`,
                    Value: 9.8,
                    NumberOfUnits: 99
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 57.8,
                    SellerName: `Benjamin Meekins`,
                    SellerCity: `Seattle`,
                    Date: `2012-04-16T00:00:00`,
                    Value: 14,
                    NumberOfUnits: 225
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 26,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `Seattle`,
                    Date: `2012-04-27T00:00:00`,
                    Value: 95.4,
                    NumberOfUnits: 408
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 5,
                    SellerName: `Benjamin Meekins`,
                    SellerCity: `Sofia`,
                    Date: `2012-05-09T00:00:00`,
                    Value: 40.2,
                    NumberOfUnits: 417
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 3,
                    SellerName: `Alfredo Fetuchini`,
                    SellerCity: `London`,
                    Date: `2012-05-24T00:00:00`,
                    Value: 67.8,
                    NumberOfUnits: 221
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 57.6,
                    SellerName: `Mark Slater`,
                    SellerCity: `New York`,
                    Date: `2012-06-02T00:00:00`,
                    Value: 45.4,
                    NumberOfUnits: 288
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 72.4,
                    SellerName: `Bryan Culver`,
                    SellerCity: `Berlin`,
                    Date: `2012-06-03T00:00:00`,
                    Value: 92.8,
                    NumberOfUnits: 372
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 82.6,
                    SellerName: `Kathe Pettel`,
                    SellerCity: `Seattle`,
                    Date: `2012-06-03T00:00:00`,
                    Value: 51.4,
                    NumberOfUnits: 408
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 91.6,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `Mellvile`,
                    Date: `2012-06-04T00:00:00`,
                    Value: 28.6,
                    NumberOfUnits: 13
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 94.8,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `Mellvile`,
                    Date: `2012-06-05T00:00:00`,
                    Value: 31.6,
                    NumberOfUnits: 487
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 46.4,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `Sofia`,
                    Date: `2012-06-11T00:00:00`,
                    Value: 86,
                    NumberOfUnits: 276
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 18.2,
                    SellerName: `Howard Sprouse`,
                    SellerCity: `New York`,
                    Date: `2012-06-16T00:00:00`,
                    Value: 40.2,
                    NumberOfUnits: 490
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 48.8,
                    SellerName: `Harold Garvin`,
                    SellerCity: `London`,
                    Date: `2012-06-18T00:00:00`,
                    Value: 55.6,
                    NumberOfUnits: 238
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 94.4,
                    SellerName: `David Haley`,
                    SellerCity: `Tokyo`,
                    Date: `2012-06-23T00:00:00`,
                    Value: 92,
                    NumberOfUnits: 170
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 48.8,
                    SellerName: `Brandon Mckim`,
                    SellerCity: `Mellvile`,
                    Date: `2012-07-04T00:00:00`,
                    Value: 72.8,
                    NumberOfUnits: 132
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 82.8,
                    SellerName: `Mark Slater`,
                    SellerCity: `Mellvile`,
                    Date: `2012-07-05T00:00:00`,
                    Value: 56.8,
                    NumberOfUnits: 443
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 38.2,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `New York`,
                    Date: `2012-07-05T00:00:00`,
                    Value: 27.6,
                    NumberOfUnits: 368
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 24.2,
                    SellerName: `Harold Garvin`,
                    SellerCity: `New York`,
                    Date: `2012-07-11T00:00:00`,
                    Value: 38.6,
                    NumberOfUnits: 39
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 4,
                    SellerName: `Alfredo Fetuchini`,
                    SellerCity: `Tokyo`,
                    Date: `2012-07-13T00:00:00`,
                    Value: 43.2,
                    NumberOfUnits: 95
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 81.8,
                    SellerName: `Benjamin Meekins`,
                    SellerCity: `Berlin`,
                    Date: `2012-07-14T00:00:00`,
                    Value: 42.6,
                    NumberOfUnits: 42
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 75,
                    SellerName: `Brandon Mckim`,
                    SellerCity: `Seattle`,
                    Date: `2012-07-16T00:00:00`,
                    Value: 61.4,
                    NumberOfUnits: 200
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 85.6,
                    SellerName: `Monica Freitag`,
                    SellerCity: `Seattle`,
                    Date: `2012-07-16T00:00:00`,
                    Value: 10.6,
                    NumberOfUnits: 221
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 96.4,
                    SellerName: `Larry Lieb`,
                    SellerCity: `New York`,
                    Date: `2012-07-21T00:00:00`,
                    Value: 99.6,
                    NumberOfUnits: 54
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 46.2,
                    SellerName: `Lydia Burson`,
                    SellerCity: `Tokyo`,
                    Date: `2012-07-21T00:00:00`,
                    Value: 56,
                    NumberOfUnits: 173
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 99.8,
                    SellerName: `Lydia Burson`,
                    SellerCity: `London`,
                    Date: `2012-07-23T00:00:00`,
                    Value: 10.8,
                    NumberOfUnits: 47
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 42.4,
                    SellerName: `Kathe Pettel`,
                    SellerCity: `Mellvile`,
                    Date: `2012-07-26T00:00:00`,
                    Value: 91.6,
                    NumberOfUnits: 173
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 52.2,
                    SellerName: `Claudia Kobayashi`,
                    SellerCity: `Mellvile`,
                    Date: `2012-08-05T00:00:00`,
                    Value: 98.8,
                    NumberOfUnits: 323
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 45.6,
                    SellerName: `Russell Shorter`,
                    SellerCity: `Sofia`,
                    Date: `2012-08-07T00:00:00`,
                    Value: 26,
                    NumberOfUnits: 264
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 56.8,
                    SellerName: `Mark Slater`,
                    SellerCity: `Sofia`,
                    Date: `2012-08-09T00:00:00`,
                    Value: 11.6,
                    NumberOfUnits: 385
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 3.6,
                    SellerName: `Harry Tyler`,
                    SellerCity: `London`,
                    Date: `2012-08-10T00:00:00`,
                    Value: 26,
                    NumberOfUnits: 56
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 34.6,
                    SellerName: `Benjamin Dupree`,
                    SellerCity: `Berlin`,
                    Date: `2012-08-12T00:00:00`,
                    Value: 96.2,
                    NumberOfUnits: 267
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 92.4,
                    SellerName: `Monica Freitag`,
                    SellerCity: `Seattle`,
                    Date: `2012-08-14T00:00:00`,
                    Value: 95,
                    NumberOfUnits: 109
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 34.8,
                    SellerName: `Mark Slater`,
                    SellerCity: `Berlin`,
                    Date: `2012-08-17T00:00:00`,
                    Value: 62.4,
                    NumberOfUnits: 478
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 23.4,
                    SellerName: `Claudia Kobayashi`,
                    SellerCity: `Berlin`,
                    Date: `2012-08-21T00:00:00`,
                    Value: 57.8,
                    NumberOfUnits: 184
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 79.6,
                    SellerName: `Brandon Mckim`,
                    SellerCity: `Seattle`,
                    Date: `2012-08-21T00:00:00`,
                    Value: 35.4,
                    NumberOfUnits: 132
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 30.8,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `Sofia`,
                    Date: `2012-08-22T00:00:00`,
                    Value: 96,
                    NumberOfUnits: 142
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 90,
                    SellerName: `Carl Costello`,
                    SellerCity: `Seattle`,
                    Date: `2012-08-27T00:00:00`,
                    Value: 27.6,
                    NumberOfUnits: 46
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 83.2,
                    SellerName: `Walter Pang`,
                    SellerCity: `Seattle`,
                    Date: `2012-09-03T00:00:00`,
                    Value: 68.6,
                    NumberOfUnits: 102
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 0.2,
                    SellerName: `Russell Shorter`,
                    SellerCity: `Berlin`,
                    Date: `2012-09-09T00:00:00`,
                    Value: 96.6,
                    NumberOfUnits: 21
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 36.6,
                    SellerName: `Monica Freitag`,
                    SellerCity: `Sofia`,
                    Date: `2012-09-10T00:00:00`,
                    Value: 5,
                    NumberOfUnits: 442
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 92.4,
                    SellerName: `Harry Tyler`,
                    SellerCity: `New York`,
                    Date: `2012-09-13T00:00:00`,
                    Value: 99.2,
                    NumberOfUnits: 254
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 28,
                    SellerName: `Nicholas Carmona`,
                    SellerCity: `Sofia`,
                    Date: `2012-09-13T00:00:00`,
                    Value: 50,
                    NumberOfUnits: 251
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 60.4,
                    SellerName: `Antonio Charbonneau`,
                    SellerCity: `New York`,
                    Date: `2012-09-15T00:00:00`,
                    Value: 44,
                    NumberOfUnits: 119
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Bikes`,
                    ProductUnitPrice: 33,
                    SellerName: `Claudia Kobayashi`,
                    SellerCity: `New York`,
                    Date: `2012-09-19T00:00:00`,
                    Value: 32.4,
                    NumberOfUnits: 256
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 99,
                    SellerName: `John Smith`,
                    SellerCity: `New York`,
                    Date: `2012-09-23T00:00:00`,
                    Value: 35.8,
                    NumberOfUnits: 456
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 16.2,
                    SellerName: `Kathe Pettel`,
                    SellerCity: `London`,
                    Date: `2012-10-01T00:00:00`,
                    Value: 16.4,
                    NumberOfUnits: 430
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 73,
                    SellerName: `David Haley`,
                    SellerCity: `Berlin`,
                    Date: `2012-10-02T00:00:00`,
                    Value: 57,
                    NumberOfUnits: 248
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 21.8,
                    SellerName: `Harold Garvin`,
                    SellerCity: `Berlin`,
                    Date: `2012-10-18T00:00:00`,
                    Value: 28.2,
                    NumberOfUnits: 440
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 28.4,
                    SellerName: `Howard Sprouse`,
                    SellerCity: `New York`,
                    Date: `2012-10-19T00:00:00`,
                    Value: 66.6,
                    NumberOfUnits: 234
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 80.6,
                    SellerName: `Benjamin Meekins`,
                    SellerCity: `New York`,
                    Date: `2012-10-25T00:00:00`,
                    Value: 5.4,
                    NumberOfUnits: 36
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Accessories`,
                    ProductUnitPrice: 97.8,
                    SellerName: `Harry Tyler`,
                    SellerCity: `London`,
                    Date: `2012-10-26T00:00:00`,
                    Value: 41.2,
                    NumberOfUnits: 46
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 88.8,
                    SellerName: `Elisa Longbottom`,
                    SellerCity: `London`,
                    Date: `2012-11-02T00:00:00`,
                    Value: 64.6,
                    NumberOfUnits: 211
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Clothing`,
                    ProductUnitPrice: 67.4,
                    SellerName: `Walter Pang`,
                    SellerCity: `New York`,
                    Date: `2012-11-17T00:00:00`,
                    Value: 14.2,
                    NumberOfUnits: 408
                }),
                new PivotDataFlatItem(
                {
                    ProductName: `Components`,
                    ProductUnitPrice: 7.2,
                    SellerName: `Walter Pang`,
                    SellerCity: `New York`,
                    Date: `2012-11-20T00:00:00`,
                    Value: 72.8,
                    NumberOfUnits: 376
                }),
            ];
            super(...newItems.slice(0));
        }
    }
}
