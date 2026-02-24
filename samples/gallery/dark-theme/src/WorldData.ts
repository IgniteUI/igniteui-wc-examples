
import { IgcShapeDataSource } from 'igniteui-webcomponents-core';
import { WorldUtils2 } from './WorldUtils2';

export class WorldDataGroup {
    public constructor(init: Partial<WorldDataGroup>) {
        Object.assign(this, init);
    }
    public name: string = '';
    public code: string = '';
    public parent: any = null;
    public index: number = 0; 
    public population: number = 0;
    public populationAbbr: string = '';
    public populationPercent: string = '';
    public gdpTotal: number = 0;
    public gdpTotalAbbr: string = '';
    public gdpPerPerson: number = 0; 
    public gdpPerPersonAbbr: string = '';
    public points: any[][] = [];
    public countries: WorldDataCountry[] = [];
}

export class WorldTreeNode {
    public constructor(init: Partial<WorldTreeNode>) {
        Object.assign(this, init);
    }
    
    public name: string = '';
    public code: string = '';
    public parent: any = null;
    
    public population: number | undefined = 0;
    // public populationAbbr: string = '';
    public gdpTotal: number | undefined = 0;
    // public gdpTotalAbbr: string = '';
    public gdpPerPerson: number | undefined = 0; 
    // public gdpPerPersonAbbr: string = '';
}

export class WorldDataCountry {
    public constructor(init: Partial<WorldDataCountry>) {
        Object.assign(this, init);
    }
    public name: string = '';
    public code: string = ''; 
    public parent: any = null;
    public region: string = '';
    public index: number = 0; 
    public continent: string = '';
    public population: number = 0;
    public populationAbbr: string = '';
    public populationPercent: string = '';
    public gdpTotal: number = 0;
    public gdpTotalAbbr: string = '';
    public gdpPerPerson: number = 0;
    public gdpPerPersonAbbr: string = '';
    public y: number = 0;
    public x: number = 0; 
    public points: any[][] = [];
}

export class WorldOlympicResult {
    public constructor(init: Partial<WorldOlympicResult>) {
        Object.assign(this, init);
    }
    public year: number = 2000; 
    public medalsUSA: number = 100; 
    public medalsCHN: number = 100; 
    public medalsRUS: number = 100; 
    public medalsSPA: number = 100; 
    public medalsGER: number = 100; 
    public medalsFRA: number = 100; 
}

export class WorldData {
    public static countries: WorldDataCountry[] = [];
    public static regions: WorldDataGroup[] = [];
    public static continents: WorldDataGroup[] = [];

    public static olympicResult: WorldOlympicResult[] = [];

    public static top10EuroCountries: WorldDataCountry[] = [];
    public static top10AsiaCountries: WorldDataCountry[] = [];
    public static top10AfricaCountries: WorldDataCountry[] = [];
    public static top10NorthAmericaCountries: WorldDataCountry[] = [];
    public static top10SouthAmericaCountries: WorldDataCountry[] = [];
    public static top10OceaniaCountries: WorldDataCountry[] = [];

    public static regionTreeNodes: WorldTreeNode[] = [];
    public static continentTreeNodes: WorldTreeNode[] = [];

    // custom loaded event 
    public static loaded: ((sds: IgcShapeDataSource, e: any) => void) | null = null;

    public static sds: IgcShapeDataSource; 
    public static loadData() {
        
        this.olympicResult.push(new WorldOlympicResult({ year: 2000, medalsUSA: 123, medalsCHN: 58,  medalsRUS: 88, medalsSPA: 20, medalsFRA: 50, medalsGER: 65 }));
        this.olympicResult.push(new WorldOlympicResult({ year: 2004, medalsUSA: 121, medalsCHN: 63,  medalsRUS: 95, medalsSPA: 25, medalsFRA: 55, medalsGER: 62 }));
        this.olympicResult.push(new WorldOlympicResult({ year: 2008, medalsUSA: 125, medalsCHN: 100, medalsRUS: 62, medalsSPA: 14, medalsFRA: 60, medalsGER: 60 }));
        this.olympicResult.push(new WorldOlympicResult({ year: 2012, medalsUSA: 124, medalsCHN: 88,  medalsRUS: 52, medalsSPA: 22, medalsFRA: 66, medalsGER: 65 }));
        this.olympicResult.push(new WorldOlympicResult({ year: 2016, medalsUSA: 121, medalsCHN: 78,  medalsRUS: 56, medalsSPA: 10, medalsFRA: 68, medalsGER: 60 }));
        this.olympicResult.push(new WorldOlympicResult({ year: 2020, medalsUSA: 125, medalsCHN: 82,  medalsRUS: 53, medalsSPA: 24, medalsFRA: 70, medalsGER: 64 }));
        this.olympicResult.push(new WorldOlympicResult({ year: 2024, medalsUSA: 124, medalsCHN: 88,  medalsRUS: 52, medalsSPA: 18, medalsFRA: 75, medalsGER: 68 }));
        
        

        this.onShapeLoaded = this.onShapeLoaded.bind(this);
        console.log("WorldData loadData");

        this.sds = new IgcShapeDataSource();
        this.sds.importCompleted = this.onShapeLoaded;
        this.sds.shapefileSource = 'https://static.infragistics.com/xplatform/shapes/world_countries_all.shp';
        this.sds.databaseSource  = 'https://static.infragistics.com/xplatform/shapes/world_countries_all.dbf';
        this.sds.dataBind();
    }

    public static onShapeLoaded(sds: IgcShapeDataSource, e: any) {
        // console.log("WorldData onShapeLoaded");
        
        const shapeRecords = this.sds.getPointData(); 

        let regionsLookup: any = {};
        let continentsLookup: any = {};

        // parsing shapefile data
        for (const record of shapeRecords) {
            // using field/column names from .DBF file
            const country: WorldDataCountry = new WorldDataCountry({
                points: record.points,
                name: record.fieldValues.Name,
                region: record.fieldValues.Region,  
                continent: record.fieldValues.Continent, 
                code: record.fieldValues.Code,  
                population: record.fieldValues.Population,
                gdpTotal: record.fieldValues.GDP * 1000000,
            });
            country.gdpPerPerson = Math.round(country.gdpTotal / country.population);
            country.gdpPerPersonAbbr = WorldUtils2.toStringAbbr(country.gdpPerPerson );
            country.gdpTotalAbbr = WorldUtils2.toStringAbbr(country.gdpTotal);
            country.populationAbbr = WorldUtils2.toStringAbbr(country.population);

            if (country.continent !== "Antarctica") {
                this.countries.push(country);
            };
        }
        
        this.countries.sort((a, b) => a.population < b.population ? 1 : -1);
       
        for (let country of this.countries) {
            
            let region = country.region;
            if (!regionsLookup[region]) {
                 regionsLookup[region] = new WorldDataGroup({ name: region});
            }
            regionsLookup[region].population += country.population;
            regionsLookup[region].gdpTotal += country.gdpTotal;
            // regionsLookup[region].points = [ ...regionsLookup[region].points, ...country.points];
            regionsLookup[region].points.push(country.points);
            regionsLookup[region].countries.push(country);
            
            let continent = country.continent;
            if (!continentsLookup[continent]) {
                 continentsLookup[continent] = new WorldDataGroup({ name: continent });
                if (continent === "Europe") {
                    continentsLookup[continent].code = "EU";
                } else if (continent === "Asia") {
                    continentsLookup[continent].code = "AS"; 
                } else if (continent === "Africa") {
                    continentsLookup[continent].code = "AF";
                } else if (continent === "North America") {
                    continentsLookup[continent].code = "NA";
                } else if (continent === "South America") {   
                    continentsLookup[continent].code = "SA";
                } else if (continent === "Oceania") {
                    continentsLookup[continent].code = "OC";
                } else {
                    continentsLookup[continent].code = "ANT";
                }
                 
            }

            continentsLookup[continent].population += country.population;
            continentsLookup[continent].gdpTotal += country.gdpTotal;
            continentsLookup[continent].points = [ ...continentsLookup[continent].points, ...country.points];
            // continentsLookup[continent].points.push(country.points);
            continentsLookup[continent].countries.push(country);
        }

        for (let name of Object.keys(regionsLookup)) {
            let region = regionsLookup[name];
            region.gdpPerPerson = Math.round(region.gdpTotal / region.population);
            region.gdpPerPersonAbbr = WorldUtils2.toStringAbbr(region.gdpPerPerson);
            region.gdpTotalAbbr = WorldUtils2.toStringAbbr(region.gdpTotal);
            region.populationAbbr = WorldUtils2.toStringAbbr(region.population);
            // console.log("Region: " + name + ", population: " + region.population + ", gdp: " + region.gdpTotal + ", gdp per person: " + region.gdpPerPerson);
            this.regions.push(region);
        }

        for (let name of Object.keys(continentsLookup)) {
            let continent = continentsLookup[name];
            continent.gdpPerPerson = Math.round(continent.gdpTotal / continent.population);
            continent.gdpPerPersonAbbr = WorldUtils2.toStringAbbr(continent.gdpPerPerson);
            continent.gdpTotalAbbr = WorldUtils2.toStringAbbr(continent.gdpTotal);
            continent.populationAbbr = (continent.population / 1000000).toFixed(0) + "M";
            // console.log("Continent: " + name + ", population: " + continent.population + ", gdp: " + continent.gdpTotal + ", gdp per person: " + continent.gdpPerPerson);
            this.continents.push(continent);

            this.continentTreeNodes.push(new WorldTreeNode({
                name: continent.name,
                code: continent.name,  
                population: undefined,
                gdpPerPerson: undefined,
                gdpTotal: undefined
            }));
        }

        var populationTotal = 0;
        for (let name of Object.keys(continentsLookup)) {
            let continent = continentsLookup[name];
            populationTotal += continent.population;

            for (const country of continent.countries) {
                 this.continentTreeNodes.push(new WorldTreeNode({
                    name: country.name,
                    code: country.name,  
                    parent: country.continent,
                    population: country.population,
                    gdpPerPerson: country.gdpPerPerson,
                    gdpTotal: country.gdpTotal
                }));
            }

            if (continent.name === "Europe") {
                this.top10EuroCountries = continent.countries.slice(0, 10);
            } else if (continent.name === "Asia") {
                this.top10AsiaCountries = continent.countries.slice(0, 10);
            } else if (continent.name === "Africa") {
                this.top10AfricaCountries = continent.countries.slice(0, 10);
            } else if (continent.name === "North America") {
                this.top10NorthAmericaCountries = continent.countries.slice(0, 10);
            } else if (continent.name === "South America") {   
                this.top10SouthAmericaCountries = continent.countries.slice(0, 10);
            } else if (continent.name === "Oceania") {
                this.top10OceaniaCountries = continent.countries.slice(0, 10);
            }
        }

        this.regions.sort((a, b) => a.population < b.population ? 1 : -1);
        this.continents.sort((a, b) => a.population < b.population ? 1 : -1);

        for (let i = 0; i < this.regions.length; i++) {
            this.regions[i].populationPercent = ((this.regions[i].population / populationTotal) * 100).toFixed(1) + "%";
            this.regions[i].index = i;
        }

        for (let i = 0; i < this.continents.length; i++) {
            this.continents[i].populationPercent = ((this.continents[i].population / populationTotal) * 100).toFixed(1) + "%";
            this.continents[i].index = i;
        }

        for (let i = 0; i < this.countries.length; i++) {
            this.countries[i].populationPercent = ((this.countries[i].population / populationTotal) * 100).toFixed(1) + "%";
            this.countries[i].index = i;
        }

        // raise custom loaded event if assigned
        if (typeof this.loaded === "function") {
            this.loaded(sds, e);
        }
    }
}

  