export class EmployeesNestedDataItem {
    public constructor(init: Partial<EmployeesNestedDataItem>) {
        Object.assign(this, init);
    }

    public iD: number;
    public age: number;
    public salary: number;
    public productivity: number;
    public city: string;
    public country: string;
    public phone: string;
    public hireDate: string;
    public name: string;
    public title: string;
    public employees: EmployeesNestedDataItem_EmployeesItem[];

}
export class EmployeesNestedDataItem_EmployeesItem {
    public constructor(init: Partial<EmployeesNestedDataItem_EmployeesItem>) {
        Object.assign(this, init);
    }

    public age: number;
    public salary: number;
    public productivity: number;
    public city: string;
    public country: string;
    public phone: string;
    public hireDate: string;
    public iD: number;
    public name: string;
    public title: string;

}
export class EmployeesNestedData extends Array<EmployeesNestedDataItem> {
    public constructor() {
        super();
        this.push(new EmployeesNestedDataItem(
        {
            iD: 1,
            age: 55,
            salary: 80000,
            productivity: 90,
            city: `Berlin`,
            country: `Germany`,
            phone: `609-202-505`,
            hireDate: `2008, 3, 20`,
            name: `John Winchester`,
            title: `Development Manager`,
            employees: [
                new EmployeesNestedDataItem_EmployeesItem(
                {
                    age: 43,
                    salary: 70000,
                    productivity: 80,
                    city: `Hamburg`,
                    country: `Germany`,
                    phone: `609-444-555`,
                    hireDate: `2011, 6, 3`,
                    iD: 3,
                    name: `Michael Burke`,
                    title: `Senior Software Developer`
                }),
                new EmployeesNestedDataItem_EmployeesItem(
                {
                    age: 29,
                    salary: 60000,
                    productivity: 80,
                    city: `Munich`,
                    country: `Germany`,
                    phone: `609-333-444`,
                    hireDate: `2009, 6, 19`,
                    iD: 2,
                    name: `Thomas Anderson`,
                    title: `Senior Software Developer`
                }),
                new EmployeesNestedDataItem_EmployeesItem(
                {
                    age: 31,
                    salary: 90000,
                    productivity: 80,
                    city: `Warasw`,
                    country: `Poland`,
                    phone: `609-222-205`,
                    hireDate: `2014, 8, 18`,
                    iD: 11,
                    name: `Monica Reyes`,
                    title: `Software Development Team Lead`
                }),
                new EmployeesNestedDataItem_EmployeesItem(
                {
                    age: 35,
                    salary: 70000,
                    productivity: 70,
                    city: `Koln`,
                    country: `Germany`,
                    phone: `609-502-525`,
                    hireDate: `2015, 9, 17`,
                    iD: 6,
                    name: `Roland Mendel`,
                    title: `Senior Software Developer`
                })]

        }));
        this.push(new EmployeesNestedDataItem(
        {
            iD: 4,
            age: 42,
            salary: 90000,
            productivity: 80,
            city: `Kielce`,
            country: `Poland`,
            phone: `609-202-505`,
            hireDate: `2014, 1, 22`,
            name: `Ana Sanders`,
            title: `CEO`,
            employees: [
                new EmployeesNestedDataItem_EmployeesItem(
                {
                    age: 44,
                    salary: 80000,
                    productivity: 80,
                    city: `Warasw`,
                    country: `Poland`,
                    phone: `609-202-505`,
                    hireDate: `2014, 4, 4`,
                    iD: 14,
                    name: `Laurence Johnson`,
                    title: `Director`
                }),
                new EmployeesNestedDataItem_EmployeesItem(
                {
                    age: 25,
                    salary: 85000,
                    productivity: 55,
                    city: `Paris`,
                    country: `France`,
                    phone: `609-202-505`,
                    hireDate: `2017, 11, 9`,
                    iD: 5,
                    name: `Elizabeth Richards`,
                    title: `Vice President`
                }),
                new EmployeesNestedDataItem_EmployeesItem(
                {
                    age: 39,
                    salary: 88000,
                    productivity: 88,
                    city: `London`,
                    country: `UK`,
                    phone: `609-202-505`,
                    hireDate: `2010, 3, 22`,
                    iD: 13,
                    name: `Trevor Ashworth`,
                    title: `Director`
                })]

        }));
        this.push(new EmployeesNestedDataItem(
        {
            iD: 18,
            age: 49,
            salary: 77000,
            productivity: 70,
            city: `Manchester`,
            country: `UK`,
            phone: `222-555-577`,
            hireDate: `2014, 1, 22`,
            name: `Victoria Lincoln`,
            title: `Senior Accountant`,
            employees: [
                new EmployeesNestedDataItem_EmployeesItem(
                {
                    age: 43,
                    salary: 70000,
                    productivity: 80,
                    city: `Hamburg`,
                    country: `Germany`,
                    phone: `609-444-555`,
                    hireDate: `2011, 6, 3`,
                    iD: 23,
                    name: `Thomas Burke`,
                    title: `Senior Accountant`
                }),
                new EmployeesNestedDataItem_EmployeesItem(
                {
                    age: 29,
                    salary: 60000,
                    productivity: 80,
                    city: `Munich`,
                    country: `Germany`,
                    phone: `609-333-444`,
                    hireDate: `2009, 6, 19`,
                    iD: 22,
                    name: `Michael Anderson`,
                    title: `Junior Accountant`
                }),
                new EmployeesNestedDataItem_EmployeesItem(
                {
                    age: 31,
                    salary: 90000,
                    productivity: 80,
                    city: `Warasw`,
                    country: `Poland`,
                    phone: `609-222-205`,
                    hireDate: `2014, 8, 18`,
                    iD: 21,
                    name: `Roland Reyes`,
                    title: `Accountant Team Lead`
                }),
                new EmployeesNestedDataItem_EmployeesItem(
                {
                    age: 35,
                    salary: 70000,
                    productivity: 70,
                    city: `Koln`,
                    country: `Germany`,
                    phone: `609-502-525`,
                    hireDate: `2015, 9, 17`,
                    iD: 24,
                    name: `Monica Mendel`,
                    title: `Senior Software Developer`
                })]

        }));
        this.push(new EmployeesNestedDataItem(
        {
            iD: 10,
            age: 61,
            salary: 85000,
            productivity: 890,
            city: `Lyon`,
            country: `France`,
            phone: `259-266-887`,
            hireDate: `2010, 1, 1`,
            name: `Yang Wang`,
            title: `Localization Developer`,
            employees: [
                new EmployeesNestedDataItem_EmployeesItem(
                {
                    age: 31,
                    salary: 90000,
                    productivity: 80,
                    city: `Warasw`,
                    country: `Poland`,
                    phone: `609-222-205`,
                    hireDate: `2014, 8, 18`,
                    iD: 11,
                    name: `Monica Reyes`,
                    title: `Software Development Team Lead`
                }),
                new EmployeesNestedDataItem_EmployeesItem(
                {
                    age: 35,
                    salary: 70000,
                    productivity: 70,
                    city: `Koln`,
                    country: `Germany`,
                    phone: `609-502-525`,
                    hireDate: `2015, 9, 17`,
                    iD: 6,
                    name: `Roland Mendel`,
                    title: `Senior Software Developer`
                })]

        }));
        this.push(new EmployeesNestedDataItem(
        {
            iD: 35,
            age: 35,
            salary: 75000,
            productivity: 75,
            city: `Warasw`,
            country: `Poland`,
            phone: `688-244-844`,
            hireDate: `2014, 1, 22`,
            name: `Janine Munoz`,
            title: `HR`,
            employees: [
                new EmployeesNestedDataItem_EmployeesItem(
                {
                    age: 43,
                    salary: 70000,
                    productivity: 80,
                    city: `Hamburg`,
                    country: `Germany`,
                    phone: `609-444-555`,
                    hireDate: `2011, 6, 3`,
                    iD: 3,
                    name: `Michael Burke`,
                    title: `Senior Software Developer`
                }),
                new EmployeesNestedDataItem_EmployeesItem(
                {
                    age: 31,
                    salary: 90000,
                    productivity: 80,
                    city: `Warasw`,
                    country: `Poland`,
                    phone: `609-222-205`,
                    hireDate: `2014, 8, 18`,
                    iD: 11,
                    name: `Monica Reyes`,
                    title: `Software Development Team Lead`
                })]

        }));
        this.push(new EmployeesNestedDataItem(
        {
            iD: 10,
            age: 49,
            salary: 95000,
            productivity: 80,
            city: `Krakow`,
            country: `Poland`,
            phone: `677-266-555`,
            hireDate: `2010, 1, 1`,
            name: `Yang Wang`,
            title: `Sales Manager`,
            employees: [
                new EmployeesNestedDataItem_EmployeesItem(
                {
                    age: 29,
                    salary: 60000,
                    productivity: 80,
                    city: `Munich`,
                    country: `Germany`,
                    phone: `609-333-444`,
                    hireDate: `2009, 6, 19`,
                    iD: 2,
                    name: `Thomas Anderson`,
                    title: `Senior Software Developer`
                }),
                new EmployeesNestedDataItem_EmployeesItem(
                {
                    age: 35,
                    salary: 70000,
                    productivity: 70,
                    city: `Koln`,
                    country: `Germany`,
                    phone: `609-502-525`,
                    hireDate: `2015, 9, 17`,
                    iD: 6,
                    name: `Roland Mendel`,
                    title: `Senior Software Developer`
                })]

        }));
    }
}
