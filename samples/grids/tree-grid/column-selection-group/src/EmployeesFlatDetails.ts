export class EmployeesFlatDetailsItem {
    public constructor(init: Partial<EmployeesFlatDetailsItem>) {
        Object.assign(this, init);
    }

    public address: string;
    public age: number;
    public city: string;
    public country: string;
    public fax: string;
    public hireDate: string;
    public iD: number;
    public name: string;
    public parentID: number;
    public phone: string;
    public postalCode: string;
    public title: string;

}
export class EmployeesFlatDetails extends Array<EmployeesFlatDetailsItem> {
    public constructor() {
        super();
        this.push(new EmployeesFlatDetailsItem(
        {
            address: `Obere Str. 57`,
            age: 55,
            city: `Berlin`,
            country: `Germany`,
            fax: `030-0076545`,
            hireDate: `2008, 3, 20`,
            iD: 1,
            name: `Johnathan Winchester`,
            parentID: -1,
            phone: `030-0074321`,
            postalCode: `12209`,
            title: `Development Manager`
        }));
        this.push(new EmployeesFlatDetailsItem(
        {
            address: `Avda. de la Constitución 2222`,
            age: 42,
            city: `México D.F.`,
            country: `Mexico`,
            fax: `(5) 555-3745`,
            hireDate: `2014, 1, 22`,
            iD: 4,
            name: `Ana Sanders`,
            parentID: -1,
            phone: `(5) 555-4729`,
            postalCode: `05021`,
            title: `CEO`
        }));
        this.push(new EmployeesFlatDetailsItem(
        {
            address: `Mataderos 2312`,
            age: 49,
            city: `México D.F.`,
            country: `Mexico`,
            fax: `(5) 555-3995`,
            hireDate: `2014, 1, 22`,
            iD: 18,
            name: `Victoria Lincoln`,
            parentID: -1,
            phone: `(5) 555-3932`,
            postalCode: `05023`,
            title: `Accounting Manager`
        }));
        this.push(new EmployeesFlatDetailsItem(
        {
            address: `120 Hanover Sq.`,
            age: 61,
            city: `London`,
            country: `UK`,
            fax: `(171) 555-6750`,
            hireDate: `2010, 1, 1`,
            iD: 10,
            name: `Yang Wang`,
            parentID: -1,
            phone: `(171) 555-7788`,
            postalCode: `WA1 1DP`,
            title: `Localization Manager`
        }));
        this.push(new EmployeesFlatDetailsItem(
        {
            address: `Berguvsvägen 8`,
            age: 43,
            city: `Luleå`,
            country: `Sweden`,
            fax: `0921-12 34 67`,
            hireDate: `2011, 6, 3`,
            iD: 3,
            name: `Michael Burke`,
            parentID: 1,
            phone: `0921-12 34 65`,
            postalCode: `S-958 22`,
            title: `Senior Software Developer`
        }));
        this.push(new EmployeesFlatDetailsItem(
        {
            address: `Forsterstr. 57`,
            age: 29,
            city: `Mannheim`,
            country: `Germany`,
            fax: `0621-08924`,
            hireDate: `2009, 6, 19`,
            iD: 2,
            name: `Thomas Anderson`,
            parentID: 1,
            phone: `0621-08460`,
            postalCode: `68306`,
            title: `Senior Software Developer`
        }));
        this.push(new EmployeesFlatDetailsItem(
        {
            address: `24, place Kléber`,
            age: 31,
            city: `Strasbourg`,
            country: `France`,
            fax: `88.60.15.32`,
            hireDate: `2014, 8, 18`,
            iD: 11,
            name: `Monica Reyes`,
            parentID: 1,
            phone: `88.60.15.31`,
            postalCode: `67000`,
            title: `Software Development Team Lead`
        }));
        this.push(new EmployeesFlatDetailsItem(
        {
            address: `C/ Araquil, 67`,
            age: 35,
            city: `Madrid`,
            country: `Spain`,
            fax: `(91) 555 91 99`,
            hireDate: `2015, 9, 17`,
            iD: 6,
            name: `Roland Mendel`,
            parentID: 11,
            phone: `(91) 555 22 82`,
            postalCode: `28023`,
            title: `Senior Software Developer`
        }));
        this.push(new EmployeesFlatDetailsItem(
        {
            address: `12, rue des Bouchers`,
            age: 44,
            city: `Marseille`,
            country: `France`,
            fax: `91.24.45.41`,
            hireDate: `2009, 10, 11`,
            iD: 12,
            name: `Sven Cooper`,
            parentID: 11,
            phone: `91.24.45.40`,
            postalCode: `13008`,
            title: `Senior Software Developer`
        }));
        this.push(new EmployeesFlatDetailsItem(
        {
            address: `23 Tsawassen Blvd.`,
            age: 44,
            city: `Tsawassen`,
            country: `Canada`,
            fax: `(604) 555-3745`,
            hireDate: `2014, 4, 4`,
            iD: 14,
            name: `Laurence Johnson`,
            parentID: 4,
            phone: `(604) 555-4729`,
            postalCode: `T2F 8M4`,
            title: `Director`
        }));
        this.push(new EmployeesFlatDetailsItem(
        {
            address: `Fauntleroy Circus`,
            age: 25,
            city: `London`,
            country: `UK`,
            fax: `(5) 555-3798`,
            hireDate: `2017, 11, 9`,
            iD: 5,
            name: `Elizabeth Richards`,
            parentID: 4,
            phone: `(171) 555-1212`,
            postalCode: `EC2 5NT`,
            title: `Vice President`
        }));
        this.push(new EmployeesFlatDetailsItem(
        {
            address: `Cerrito 333`,
            age: 39,
            city: `Buenos Aires`,
            country: `Argentina`,
            fax: `(1) 135-4892`,
            hireDate: `2010, 3, 22`,
            iD: 13,
            name: `Trevor Ashworth`,
            parentID: 5,
            phone: `(1) 135-5555`,
            postalCode: `1010`,
            title: `Director`
        }));
        this.push(new EmployeesFlatDetailsItem(
        {
            address: `Sierras de Granada 9993`,
            age: 44,
            city: `México D.F.`,
            country: `Mexico`,
            fax: `(5) 555-7293`,
            hireDate: `2014, 4, 4`,
            iD: 17,
            name: `Antonio Moreno`,
            parentID: 18,
            phone: `(5) 555-3392`,
            postalCode: `05022`,
            title: `Senior Accountant`
        }));
        this.push(new EmployeesFlatDetailsItem(
        {
            address: `Hauptstr. 29`,
            age: 50,
            city: `Sao Paulo`,
            country: `Brazil`,
            fax: `(5) 555-6691`,
            hireDate: `2007, 11, 18`,
            iD: 7,
            name: `Pedro Rodriguez`,
            parentID: 10,
            phone: `0452-076545`,
            postalCode: `3012`,
            title: `Senior Localization Developer`
        }));
        this.push(new EmployeesFlatDetailsItem(
        {
            address: `Av. dos Lusíadas, 23`,
            age: 27,
            city: `Bern`,
            country: `Switzerland`,
            fax: ``,
            hireDate: `2016, 2, 19`,
            iD: 8,
            name: `Casey Harper`,
            parentID: 10,
            phone: `(11) 555-7647`,
            postalCode: `05432-043`,
            title: `Senior Localization`
        }));
        this.push(new EmployeesFlatDetailsItem(
        {
            address: `Berkeley Gardens 12`,
            age: 25,
            city: `London`,
            country: `UK`,
            fax: `(171) 555-9199`,
            hireDate: `2017, 11, 9`,
            iD: 15,
            name: `Patricia Simpson`,
            parentID: 7,
            phone: `(171) 555-2282`,
            postalCode: `WX1 6LT`,
            title: `Localization Intern`
        }));
        this.push(new EmployeesFlatDetailsItem(
        {
            address: `Walserweg 21`,
            age: 39,
            city: `Aachen`,
            country: `Germany`,
            fax: `0241-059428`,
            hireDate: `2010, 3, 22`,
            iD: 9,
            name: `Francisco Chang`,
            parentID: 7,
            phone: `0241-039123`,
            postalCode: `52066`,
            title: `Localization Intern`
        }));
        this.push(new EmployeesFlatDetailsItem(
        {
            address: `35 King George`,
            age: 25,
            city: `London`,
            country: `UK`,
            fax: `(171) 555-3373`,
            hireDate: `2018, 3, 18`,
            iD: 16,
            name: `Peter Lewis`,
            parentID: 7,
            phone: `(171) 555-0297`,
            postalCode: `WX3 6FW`,
            title: `Localization Intern`
        }));
    }
}
