export class PivotSalesDataItem {
  public constructor(init: Partial<PivotSalesDataItem>) {
    Object.assign(this, init);
  }

  public Country: string;
  public Product: string;
  public UnitsSold: number;
  public ManufacturingPrice: number;
  public SalePrice: number;
  public GrossSales: number;
  public Discounts: number;
  public Sales: number;
  public COGS: number;
  public Profit: number;
  public Date: string;
  public MonthName: string;
  public Year: number;

}
export class PivotSalesData extends Array<PivotSalesDataItem> {
  public constructor() {
    super();
    this.push(new PivotSalesDataItem(
      {
        Country: `UK`,
        Product: `Vermont`,
        UnitsSold: 501,
        ManufacturingPrice: 15,
        SalePrice: 23,
        GrossSales: 26440,
        Discounts: null,
        Sales: 26440,
        COGS: 16185,
        Profit: 11255,
        Date: `1/1/20`,
        MonthName: `January`,
        Year: 2020
      }));
    this.push(new PivotSalesDataItem(
      {
        Country: `Japan`,
        Product: `Kensington`,
        UnitsSold: 1372,
        ManufacturingPrice: 3,
        SalePrice: 20,
        GrossSales: 27440,
        Discounts: null,
        Sales: 27440,
        COGS: 16185,
        Profit: 11255,
        Date: `1/1/20`,
        MonthName: `January`,
        Year: 2020
      }));
    this.push(new PivotSalesDataItem(
      {
        Country: `India`,
        Product: `Kensington`,
        UnitsSold: 2762,
        ManufacturingPrice: 3,
        SalePrice: 20,
        GrossSales: 55240,
        Discounts: null,
        Sales: 55240,
        COGS: 13210,
        Profit: 42030,
        Date: `1/1/20`,
        MonthName: `January`,
        Year: 2020
      }));
    this.push(new PivotSalesDataItem(
      {
        Country: `UK`,
        Product: `Kensington`,
        UnitsSold: 1464,
        ManufacturingPrice: 3,
        SalePrice: 15,
        GrossSales: 21960,
        Discounts: null,
        Sales: 21960,
        COGS: 21780,
        Profit: 180,
        Date: `6/1/20`,
        MonthName: `June`,
        Year: 2020
      }));
    this.push(new PivotSalesDataItem(
      {
        Country: `India`,
        Product: `Kensington`,
        UnitsSold: 719,
        ManufacturingPrice: 3,
        SalePrice: 15,
        GrossSales: 10785,
        Discounts: null,
        Sales: 10785,
        COGS: 8880,
        Profit: 1905,
        Date: `6/1/20`,
        MonthName: `June`,
        Year: 2020
      }));
    this.push(new PivotSalesDataItem(
      {
        Country: `Brazil`,
        Product: `Kensington`,
        UnitsSold: 3576,
        ManufacturingPrice: 3,
        SalePrice: 15,
        GrossSales: 53640,
        Discounts: null,
        Sales: 53640,
        COGS: 24700,
        Profit: 28940,
        Date: `6/1/20`,
        MonthName: `June`,
        Year: 2020
      }));
    this.push(new PivotSalesDataItem(
      {
        Country: `USA`,
        Product: `Vermont`,
        UnitsSold: 3576,
        ManufacturingPrice: 3,
        SalePrice: 15,
        GrossSales: 53640,
        Discounts: null,
        Sales: 53640,
        COGS: 24700,
        Profit: 28940,
        Date: `6/1/20`,
        MonthName: `June`,
        Year: 2020
      }));
    this.push(new PivotSalesDataItem(
      {
        Country: `Brazil`,
        Product: `Vermont`,
        UnitsSold: 3576,
        ManufacturingPrice: 3,
        SalePrice: 15,
        GrossSales: 53640,
        Discounts: null,
        Sales: 53640,
        COGS: 24700,
        Profit: 28940,
        Date: `6/1/20`,
        MonthName: `June`,
        Year: 2020
      }));
    this.push(new PivotSalesDataItem(
      {
        Country: `India`,
        Product: `Kensington`,
        UnitsSold: 4422,
        ManufacturingPrice: 3,
        SalePrice: 350,
        GrossSales: 1547700,
        Discounts: null,
        Sales: 1547700,
        COGS: 393380,
        Profit: 1154320,
        Date: `12/1/20`,
        MonthName: `December`,
        Year: 2020
      }));
    this.push(new PivotSalesDataItem(
      {
        Country: `India`,
        Product: `Royal Oak`,
        UnitsSold: 3649,
        ManufacturingPrice: 5,
        SalePrice: 15,
        GrossSales: 54735,
        Discounts: null,
        Sales: 54735,
        COGS: 9210,
        Profit: 45525,
        Date: `3/1/20`,
        MonthName: `March`,
        Year: 2020
      }));
    this.push(new PivotSalesDataItem(
      {
        Country: `Japan`,
        Product: `Royal Oak`,
        UnitsSold: 4172,
        ManufacturingPrice: 5,
        SalePrice: 12,
        GrossSales: 50064,
        Discounts: null,
        Sales: 50064,
        COGS: 7554,
        Profit: 42510,
        Date: `6/1/20`,
        MonthName: `June`,
        Year: 2020
      }));
    this.push(new PivotSalesDataItem(
      {
        Country: `UK`,
        Product: `Royal Oak`,
        UnitsSold: 3841,
        ManufacturingPrice: 5,
        SalePrice: 20,
        GrossSales: 76820,
        Discounts: null,
        Sales: 76820,
        COGS: 18990,
        Profit: 57830,
        Date: `6/1/20`,
        MonthName: `June`,
        Year: 2020
      }));
    this.push(new PivotSalesDataItem(
      {
        Country: `India`,
        Product: `Royal Oak`,
        UnitsSold: 3726,
        ManufacturingPrice: 5,
        SalePrice: 12,
        GrossSales: 44712,
        Discounts: null,
        Sales: 44712,
        COGS: 4635,
        Profit: 40077,
        Date: `6/1/20`,
        MonthName: `June`,
        Year: 2020
      }));
    this.push(new PivotSalesDataItem(
      {
        Country: `Brazil`,
        Product: `Royal Oak`,
        UnitsSold: 2625,
        ManufacturingPrice: 5,
        SalePrice: 15,
        GrossSales: 39375,
        Discounts: null,
        Sales: 39375,
        COGS: 24700,
        Profit: 14675,
        Date: `6/1/20`,
        MonthName: `June`,
        Year: 2020
      }));
    this.push(new PivotSalesDataItem(
      {
        Country: `Japan`,
        Product: `Royal Oak`,
        UnitsSold: 1958,
        ManufacturingPrice: 5,
        SalePrice: 125,
        GrossSales: 244750,
        Discounts: null,
        Sales: 244750,
        COGS: 319860,
        Profit: 75110,
        Date: `7/1/20`,
        MonthName: `July`,
        Year: 2020
      }));
    this.push(new PivotSalesDataItem(
      {
        Country: `Japan`,
        Product: `Burlington`,
        UnitsSold: 4307,
        ManufacturingPrice: 250,
        SalePrice: 300,
        GrossSales: 1292100,
        Discounts: null,
        Sales: 1292100,
        COGS: 500250,
        Profit: 791850,
        Date: `2/1/20`,
        MonthName: `February`,
        Year: 2020
      }));
    this.push(new PivotSalesDataItem(
      {
        Country: `India`,
        Product: `Burlington`,
        UnitsSold: 3649,
        ManufacturingPrice: 5,
        SalePrice: 15,
        GrossSales: 54735,
        Discounts: null,
        Sales: 54735,
        COGS: 9210,
        Profit: 45525,
        Date: `3/1/20`,
        MonthName: `March`,
        Year: 2020
      }));
    this.push(new PivotSalesDataItem(
      {
        Country: `Japan`,
        Product: `Burlington`,
        UnitsSold: 4172,
        ManufacturingPrice: 5,
        SalePrice: 12,
        GrossSales: 50064,
        Discounts: null,
        Sales: 50064,
        COGS: 7554,
        Profit: 42510,
        Date: `6/1/20`,
        MonthName: `June`,
        Year: 2020
      }));
    this.push(new PivotSalesDataItem(
      {
        Country: `UK`,
        Product: `Burlington`,
        UnitsSold: 3841,
        ManufacturingPrice: 5,
        SalePrice: 20,
        GrossSales: 76820,
        Discounts: null,
        Sales: 76820,
        COGS: 18990,
        Profit: 57830,
        Date: `6/1/20`,
        MonthName: `June`,
        Year: 2020
      }));
    this.push(new PivotSalesDataItem(
      {
        Country: `Brazil`,
        Product: `Burlington`,
        UnitsSold: 4172,
        ManufacturingPrice: 5,
        SalePrice: 12,
        GrossSales: 50064,
        Discounts: null,
        Sales: 50064,
        COGS: 7554,
        Profit: 42510,
        Date: `6/1/20`,
        MonthName: `June`,
        Year: 2020
      }));
    this.push(new PivotSalesDataItem(
      {
        Country: `USA`,
        Product: `Burlington`,
        UnitsSold: 3841,
        ManufacturingPrice: 5,
        SalePrice: 20,
        GrossSales: 76820,
        Discounts: null,
        Sales: 76820,
        COGS: 18990,
        Profit: 57830,
        Date: `6/1/20`,
        MonthName: `June`,
        Year: 2020
      }));
  }
}