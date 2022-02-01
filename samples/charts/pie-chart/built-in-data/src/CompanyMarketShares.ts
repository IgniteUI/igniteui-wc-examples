export class CompanyMarketSharesItem {
    public constructor(init: Partial<CompanyMarketSharesItem>) {
        Object.assign(this, init);
    }
    
    public marketShare: number;
    public category: string;
    public summary: string;

}
export class CompanyMarketShares extends Array<CompanyMarketSharesItem> {
    public constructor() {
        super();
        this.push(new CompanyMarketSharesItem(
        {
            marketShare: 30,
            category: `Google`,
            summary: `Google 30%`
        }));
        this.push(new CompanyMarketSharesItem(
        {
            marketShare: 25,
            category: `Apple`,
            summary: `Apple 25%`
        }));
        this.push(new CompanyMarketSharesItem(
        {
            marketShare: 20,
            category: `Microsoft`,
            summary: `Microsoft 20%`
        }));
        this.push(new CompanyMarketSharesItem(
        {
            marketShare: 15,
            category: `Samsung`,
            summary: `Samsung 15%`
        }));
        this.push(new CompanyMarketSharesItem(
        {
            marketShare: 10,
            category: `Other`,
            summary: `Other 10%`
        }));
    }
}
