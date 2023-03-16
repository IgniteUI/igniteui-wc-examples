export class EmployeesFlatDataItem {
    public constructor(init: Partial<EmployeesFlatDataItem>) {
        Object.assign(this, init);
    }

    public age: number;
    public hireDate: string;
    public iD: number;
    public name: string;
    public phone: string;
    public onPTO: boolean;
    public parentID: number;
    public title: string;

}
export class EmployeesFlatData extends Array<EmployeesFlatDataItem> {
    public constructor() {
        super();
        this.push(new EmployeesFlatDataItem(
        {
            age: 55,
            hireDate: `2008, 3, 20`,
            iD: 1,
            name: `Johnathan Winchester`,
            phone: `0251-031259`,
            onPTO: false,
            parentID: -1,
            title: `Development Manager`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            age: 42,
            hireDate: `2014, 1, 22`,
            iD: 4,
            name: `Ana Sanders`,
            phone: `(21) 555-0091`,
            onPTO: true,
            parentID: -1,
            title: `CEO`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            age: 49,
            hireDate: `2014, 1, 22`,
            iD: 18,
            name: `Victoria Lincoln`,
            phone: `(071) 23 67 22 20`,
            onPTO: true,
            parentID: -1,
            title: `Accounting Manager`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            age: 61,
            hireDate: `2010, 1, 1`,
            iD: 10,
            name: `Yang Wang`,
            phone: `(21) 555-0091`,
            onPTO: false,
            parentID: -1,
            title: `Localization Manager`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            age: 43,
            hireDate: `2011, 6, 3`,
            iD: 3,
            name: `Michael Burke`,
            phone: `0452-076545`,
            onPTO: true,
            parentID: 1,
            title: `Senior Software Developer`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            age: 29,
            hireDate: `2009, 6, 19`,
            iD: 2,
            name: `Thomas Anderson`,
            phone: `(14) 555-8122`,
            onPTO: false,
            parentID: 1,
            title: `Senior Software Developer`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            age: 31,
            hireDate: `2014, 8, 18`,
            iD: 11,
            name: `Monica Reyes`,
            phone: `7675-3425`,
            onPTO: false,
            parentID: 1,
            title: `Software Development Team Lead`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            age: 35,
            hireDate: `2015, 9, 17`,
            iD: 6,
            name: `Roland Mendel`,
            phone: `(505) 555-5939`,
            onPTO: false,
            parentID: 11,
            title: `Senior Software Developer`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            age: 44,
            hireDate: `2009, 10, 11`,
            iD: 12,
            name: `Sven Cooper`,
            phone: `0695-34 67 21`,
            onPTO: true,
            parentID: 11,
            title: `Senior Software Developer`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            age: 44,
            hireDate: `2014, 4, 4`,
            iD: 14,
            name: `Laurence Johnson`,
            phone: `981-443655`,
            onPTO: false,
            parentID: 4,
            title: `Director`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            age: 25,
            hireDate: `2017, 11, 9`,
            iD: 5,
            name: `Elizabeth Richards`,
            phone: `(2) 283-2951`,
            onPTO: true,
            parentID: 4,
            title: `Vice President`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            age: 39,
            hireDate: `2010, 3, 22`,
            iD: 13,
            name: `Trevor Ashworth`,
            phone: `981-443655`,
            onPTO: true,
            parentID: 5,
            title: `Director`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            age: 44,
            hireDate: `2014, 4, 4`,
            iD: 17,
            name: `Antonio Moreno`,
            phone: `(505) 555-5939`,
            onPTO: false,
            parentID: 18,
            title: `Senior Accountant`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            age: 50,
            hireDate: `2007, 11, 18`,
            iD: 7,
            name: `Pedro Rodriguez`,
            phone: `035-640230`,
            onPTO: false,
            parentID: 10,
            title: `Senior Localization Developer`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            age: 27,
            hireDate: `2016, 2, 19`,
            iD: 8,
            name: `Casey Harper`,
            phone: `0342-023176`,
            onPTO: true,
            parentID: 10,
            title: `Senior Localization`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            age: 25,
            hireDate: `2017, 11, 9`,
            iD: 15,
            name: `Patricia Simpson`,
            phone: `069-0245984`,
            onPTO: false,
            parentID: 7,
            title: `Localization Intern`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            age: 39,
            hireDate: `2010, 3, 22`,
            iD: 9,
            name: `Francisco Chang`,
            phone: `(91) 745 6200`,
            onPTO: false,
            parentID: 7,
            title: `Localization Intern`
        }));
        this.push(new EmployeesFlatDataItem(
        {
            age: 25,
            hireDate: `2018, 3, 18`,
            iD: 16,
            name: `Peter Lewis`,
            phone: `069-0245984`,
            onPTO: true,
            parentID: 7,
            title: `Localization Intern`
        }));
    }
}
