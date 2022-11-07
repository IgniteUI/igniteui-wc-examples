export class CustomersDataItem {
    public constructor(init: Partial<CustomersDataItem>) {
        Object.assign(this, init);
    }
    
    public iD: string;
    public companyName: string;
    public contactName: string;
    public contactTitle: string;
    public address: string;
    public city: string;
    public region: string;
    public postalCode: string;
    public country: string;
    public phone: string;
    public fax: string;

}
export class CustomersData extends Array<CustomersDataItem> {
    public constructor() {
        super();
        this.push(new CustomersDataItem(
        {
            iD: `ALFKI`,
            companyName: `Alfreds Futterkiste`,
            contactName: `Maria Anders`,
            contactTitle: `Sales Representative`,
            address: `Obere Str. 57`,
            city: `Berlin`,
            region: `East`,
            postalCode: `12209`,
            country: `Germany`,
            phone: `030-0074321`,
            fax: `030-0076545`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `ANATR`,
            companyName: `Ana Trujillo Emparedados y helados`,
            contactName: `Ana Trujillo`,
            contactTitle: `Owner`,
            address: `Avda. de la Constitución 2222`,
            city: `México D.F.`,
            region: `South`,
            postalCode: `05021`,
            country: `Mexico`,
            phone: `(5) 555-4729`,
            fax: `(5) 555-3745`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `ANTON`,
            companyName: `Antonio Moreno Taquería`,
            contactName: `Antonio Moreno`,
            contactTitle: `Owner`,
            address: `Mataderos 2312`,
            city: `México D.F.`,
            region: `South`,
            postalCode: `05023`,
            country: `Mexico`,
            phone: `(5) 555-3932`,
            fax: `(5) 555-3745`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `AROUT`,
            companyName: `Around the Horn`,
            contactName: `Thomas Hardy`,
            contactTitle: `Sales Representative`,
            address: `120 Hanover Sq.`,
            city: `London`,
            region: `East`,
            postalCode: `WA1 1DP`,
            country: `UK`,
            phone: `(171) 555-7788`,
            fax: `(171) 555-6750`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `BERGS`,
            companyName: `Berglunds snabbköp`,
            contactName: `Christina Berglund`,
            contactTitle: `Order Administrator`,
            address: `Berguvsvägen 8`,
            city: `Luleå`,
            region: `South`,
            postalCode: `S-958 22`,
            country: `Sweden`,
            phone: `0921-12 34 65`,
            fax: `0921-12 34 67`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `BLAUS`,
            companyName: `Blauer See Delikatessen`,
            contactName: `Hanna Moos`,
            contactTitle: `Sales Representative`,
            address: `Forsterstr. 57`,
            city: `Mannheim`,
            region: `East`,
            postalCode: `68306`,
            country: `Germany`,
            phone: `0621-08460`,
            fax: `0621-08924`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `BLONP`,
            companyName: `Blondesddsl père et fils`,
            contactName: `Frédérique Citeaux`,
            contactTitle: `Marketing Manager`,
            address: `24, place Kléber`,
            city: `Strasbourg`,
            region: `East`,
            postalCode: `67000`,
            country: `France`,
            phone: `88.60.15.31`,
            fax: `88.60.15.32`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `BOLID`,
            companyName: `Bólido Comidas preparadas`,
            contactName: `Martín Sommer`,
            contactTitle: `Owner`,
            address: `C/ Araquil, 67`,
            city: `Madrid`,
            region: `East`,
            postalCode: `28023`,
            country: `Spain`,
            phone: `(91) 555 22 82`,
            fax: `(91) 555 91 99`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `BONAP`,
            companyName: `Bon app'`,
            contactName: `Laurence Lebihan`,
            contactTitle: `Owner`,
            address: `12, rue des Bouchers`,
            city: `Marseille`,
            region: `West`,
            postalCode: `13008`,
            country: `France`,
            phone: `91.24.45.40`,
            fax: `91.24.45.41`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `BOTTM`,
            companyName: `Bottom-Dollar Markets`,
            contactName: `Elizabeth Lincoln`,
            contactTitle: `Accounting Manager`,
            address: `23 Tsawassen Blvd.`,
            city: `Tsawassen`,
            region: `BC`,
            postalCode: `T2F 8M4`,
            country: `Canada`,
            phone: `(604) 555-4729`,
            fax: `(604) 555-3745`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `BSBEV`,
            companyName: `B's Beverages`,
            contactName: `Victoria Ashworth`,
            contactTitle: `Sales Representative`,
            address: `Fauntleroy Circus`,
            city: `London`,
            region: `South`,
            postalCode: `EC2 5NT`,
            country: `UK`,
            phone: `(171) 555-1212`,
            fax: `(5) 555-3745`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `CACTU`,
            companyName: `Cactus Comidas para llevar`,
            contactName: `Patricio Simpson`,
            contactTitle: `Sales Agent`,
            address: `Cerrito 333`,
            city: `Buenos Aires`,
            region: `East`,
            postalCode: `1010`,
            country: `Argentina`,
            phone: `(1) 135-5555`,
            fax: `(1) 135-4892`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `CENTC`,
            companyName: `Centro comercial Moctezuma`,
            contactName: `Francisco Chang`,
            contactTitle: `Marketing Manager`,
            address: `Sierras de Granada 9993`,
            city: `México D.F.`,
            region: `South`,
            postalCode: `05022`,
            country: `Mexico`,
            phone: `(5) 555-3392`,
            fax: `(5) 555-7293`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `CHOPS`,
            companyName: `Chop-suey Chinese`,
            contactName: `Yang Wang`,
            contactTitle: `Owner`,
            address: `Hauptstr. 29`,
            city: `Bern`,
            region: `East`,
            postalCode: `3012`,
            country: `Switzerland`,
            phone: `0452-076545`,
            fax: `(5) 555-3745`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `COMMI`,
            companyName: `Comércio Mineiro`,
            contactName: `Pedro Afonso`,
            contactTitle: `Sales Associate`,
            address: `Av. dos Lusíadas, 23`,
            city: `Sao Paulo`,
            region: `SP`,
            postalCode: `05432-043`,
            country: `Brazil`,
            phone: `(11) 555-7647`,
            fax: `(5) 555-3745`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `CONSH`,
            companyName: `Consolidated Holdings`,
            contactName: `Elizabeth Brown`,
            contactTitle: `Sales Representative`,
            address: `Berkeley Gardens 12 Brewery`,
            city: `London`,
            region: `South`,
            postalCode: `WX1 6LT`,
            country: `UK`,
            phone: `(171) 555-2282`,
            fax: `(171) 555-9199`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `DRACD`,
            companyName: `Drachenblut Delikatessen`,
            contactName: `Sven Ottlieb`,
            contactTitle: `Order Administrator`,
            address: `Walserweg 21`,
            city: `Aachen`,
            region: `South`,
            postalCode: `52066`,
            country: `Germany`,
            phone: `0241-039123`,
            fax: `0241-059428`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `DUMON`,
            companyName: `Du monde entier`,
            contactName: `Janine Labrune`,
            contactTitle: `Owner`,
            address: `67, rue des Cinquante Otages`,
            city: `Nantes`,
            region: `East`,
            postalCode: `44000`,
            country: `France`,
            phone: `40.67.88.88`,
            fax: `40.67.89.89`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `EASTC`,
            companyName: `Eastern Connection`,
            contactName: `Ann Devon`,
            contactTitle: `Sales Agent`,
            address: `35 King George`,
            city: `London`,
            region: `East`,
            postalCode: `WX3 6FW`,
            country: `UK`,
            phone: `(171) 555-0297`,
            fax: `(171) 555-3373`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `ERNSH`,
            companyName: `Ernst Handel`,
            contactName: `Roland Mendel`,
            contactTitle: `Sales Manager`,
            address: `Kirchgasse 6`,
            city: `Graz`,
            region: `South`,
            postalCode: `8010`,
            country: `Austria`,
            phone: `7675-3425`,
            fax: `7675-3426`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `FAMIA`,
            companyName: `Familia Arquibaldo`,
            contactName: `Aria Cruz`,
            contactTitle: `Marketing Assistant`,
            address: `Rua Orós, 92`,
            city: `Sao Paulo`,
            region: `SP`,
            postalCode: `05442-030`,
            country: `Brazil`,
            phone: `(11) 555-9857`,
            fax: `(5) 555-3745`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `FISSA`,
            companyName: `FISSA Fabrica Inter. Salchichas S.A.`,
            contactName: `Diego Roel`,
            contactTitle: `Accounting Manager`,
            address: `C/ Moralzarzal, 86`,
            city: `Madrid`,
            region: `East`,
            postalCode: `28034`,
            country: `Spain`,
            phone: `(91) 555 94 44`,
            fax: `(91) 555 55 93`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `FOLIG`,
            companyName: `Folies gourmandes`,
            contactName: `Martine Rancé`,
            contactTitle: `Assistant Sales Agent`,
            address: `184, chaussée de Tournai`,
            city: `Lille`,
            region: `South`,
            postalCode: `59000`,
            country: `France`,
            phone: `20.16.10.16`,
            fax: `20.16.10.17`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `FOLKO`,
            companyName: `Folk och fä HB`,
            contactName: `Maria Larsson`,
            contactTitle: `Owner`,
            address: `Åkergatan 24`,
            city: `Bräcke`,
            region: `East`,
            postalCode: `S-844 67`,
            country: `Sweden`,
            phone: `0695-34 67 21`,
            fax: `0695 33-4455`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `FRANK`,
            companyName: `Frankenversand`,
            contactName: `Peter Franken`,
            contactTitle: `Marketing Manager`,
            address: `Berliner Platz 43`,
            city: `München`,
            region: `East`,
            postalCode: `80805`,
            country: `Germany`,
            phone: `089-0877310`,
            fax: `089-0877451`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `FRANR`,
            companyName: `France restauration`,
            contactName: `Carine Schmitt`,
            contactTitle: `Marketing Manager`,
            address: `54, rue Royale`,
            city: `Nantes`,
            region: `South`,
            postalCode: `44000`,
            country: `France`,
            phone: `40.32.21.21`,
            fax: `40.32.21.20`
        }));
        this.push(new CustomersDataItem(
        {
            iD: `FRANS`,
            companyName: `Franchi S.p.A.`,
            contactName: `Paolo Accorti`,
            contactTitle: `Sales Representative`,
            address: `Via Monte Bianco 34`,
            city: `Torino`,
            region: `East`,
            postalCode: `10100`,
            country: `Italy`,
            phone: `011-4988260`,
            fax: `011-4988261`
        }));
    }
}
