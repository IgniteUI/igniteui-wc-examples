export class EmployeesFlatDataItem {
    public constructor(init: Partial<EmployeesFlatDataItem>) {
        Object.assign(this, init);
    }

    public Age: number;
    public HireDate: string;
    public ID: number;
    public Name: string;
    public Phone: string;
    public OnPTO: boolean;
    public ParentID: number;
    public Title: string;
    public hasEmployees: boolean;

}
export class EmployeesFlatData extends Array<EmployeesFlatDataItem> {
    public constructor() {
        super();
        this.push(new EmployeesFlatDataItem(
        {
            Age: 55,
            HireDate: `2008, 3, 20`,
            ID: 1,
            Name: `Johnathan Winchester`,
            Phone: `0251-031259`,
            OnPTO: false,
            ParentID: -1,
            Title: `Development Manager`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            Age: 42,
            HireDate: `2014, 1, 22`,
            ID: 4,
            Name: `Ana Sanders`,
            Phone: `(21) 555-0091`,
            OnPTO: true,
            ParentID: -1,
            Title: `CEO`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            Age: 49,
            HireDate: `2014, 1, 22`,
            ID: 18,
            Name: `Victoria Lincoln`,
            Phone: `(071) 23 67 22 20`,
            OnPTO: true,
            ParentID: -1,
            Title: `Accounting Manager`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            Age: 61,
            HireDate: `2010, 1, 1`,
            ID: 10,
            Name: `Yang Wang`,
            Phone: `(21) 555-0091`,
            OnPTO: false,
            ParentID: -1,
            Title: `Localization Manager`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            Age: 43,
            HireDate: `2011, 6, 3`,
            ID: 3,
            Name: `Michael Burke`,
            Phone: `0452-076545`,
            OnPTO: true,
            ParentID: 1,
            Title: `Senior Software Developer`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            Age: 29,
            HireDate: `2009, 6, 19`,
            ID: 2,
            Name: `Thomas Anderson`,
            Phone: `(14) 555-8122`,
            OnPTO: false,
            ParentID: 1,
            Title: `Senior Software Developer`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            Age: 31,
            HireDate: `2014, 8, 18`,
            ID: 11,
            Name: `Monica Reyes`,
            Phone: `7675-3425`,
            OnPTO: false,
            ParentID: 1,
            Title: `Software Development Team Lead`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            Age: 35,
            HireDate: `2015, 9, 17`,
            ID: 6,
            Name: `Roland Mendel`,
            Phone: `(505) 555-5939`,
            OnPTO: false,
            ParentID: 11,
            Title: `Senior Software Developer`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            Age: 44,
            HireDate: `2009, 10, 11`,
            ID: 12,
            Name: `Sven Cooper`,
            Phone: `0695-34 67 21`,
            OnPTO: true,
            ParentID: 11,
            Title: `Senior Software Developer`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            Age: 44,
            HireDate: `2014, 4, 4`,
            ID: 14,
            Name: `Laurence Johnson`,
            Phone: `981-443655`,
            OnPTO: false,
            ParentID: 4,
            Title: `Director`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            Age: 25,
            HireDate: `2017, 11, 9`,
            ID: 5,
            Name: `Elizabeth Richards`,
            Phone: `(2) 283-2951`,
            OnPTO: true,
            ParentID: 4,
            Title: `Vice President`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            Age: 39,
            HireDate: `2010, 3, 22`,
            ID: 13,
            Name: `Trevor Ashworth`,
            Phone: `981-443655`,
            OnPTO: true,
            ParentID: 5,
            Title: `Director`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            Age: 44,
            HireDate: `2014, 4, 4`,
            ID: 17,
            Name: `Antonio Moreno`,
            Phone: `(505) 555-5939`,
            OnPTO: false,
            ParentID: 18,
            Title: `Senior Accountant`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            Age: 50,
            HireDate: `2007, 11, 18`,
            ID: 7,
            Name: `Pedro Rodriguez`,
            Phone: `035-640230`,
            OnPTO: false,
            ParentID: 10,
            Title: `Senior Localization Developer`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            Age: 27,
            HireDate: `2016, 2, 19`,
            ID: 8,
            Name: `Casey Harper`,
            Phone: `0342-023176`,
            OnPTO: true,
            ParentID: 10,
            Title: `Senior Localization`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            Age: 25,
            HireDate: `2017, 11, 9`,
            ID: 15,
            Name: `Patricia Simpson`,
            Phone: `069-0245984`,
            OnPTO: false,
            ParentID: 7,
            Title: `Localization Intern`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            Age: 39,
            HireDate: `2010, 3, 22`,
            ID: 9,
            Name: `Francisco Chang`,
            Phone: `(91) 745 6200`,
            OnPTO: false,
            ParentID: 7,
            Title: `Localization Intern`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            Age: 25,
            HireDate: `2018, 3, 18`,
            ID: 16,
            Name: `Peter Lewis`,
            Phone: `069-0245984`,
            OnPTO: true,
            ParentID: 7,
            Title: `Localization Intern`
        }));
    }
}
