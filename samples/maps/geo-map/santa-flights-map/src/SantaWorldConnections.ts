import { SantaWorldLocations } from "./SantaWorldLocations";
import { SantaWorldUtils } from "./SantaWorldUtils"

export class SantaWorldConnections {

    public static airports: any[] = [];
    public static airportsLookup = new Map<string, any>();

    public static flights: any[] = [];
    public static flightsLookup: string[] = [];

    public static connections: any = {};

    public static getFlights(): any[] {
        if (this.flights.length === 0) this.init();
        return this.flights;
    }

    public static getAirportLocations(): any[] {
        if (this.airports.length === 0) this.init();
        return this.airports;
    }

    public static getAirportConnections(): any[] {
        if (!this.connections) this.init();
        return this.connections;
    }

    public static init(): void {

        const cities: any[] = SantaWorldLocations.getAll();
        // cities.sort(this.comparePopulation);
        SantaWorldUtils.sortBy(cities, 'pop');

        // let count = cities.length;
        let minDistance = 200;
        let maxDistance = 9000;
        let flightsLimit = 2000;
        let flightsCount  = 0;

        for (let i = 0; i < cities.length; i++) {
            let origin = cities[i];
            let connectionsCount = 0;
            // let connectionsMax = Math.min(20, Math.round(origin.pop * 4));
            let connectionsMax = Math.min(20, Math.round(origin.pop * 2));

            for (let ii = 0; ii < cities.length; ii++)
            {
                let dest = cities[ii];
                if (origin.name !== dest.name)
                {
                    let flight = SantaWorldUtils.getFlight(origin, dest);

                    let route = [origin.name, dest.name].sort().join('-');
                    let routeIsValid = this.flightsLookup.indexOf(route) === -1;
                    // let distance = Math.round(SantaWorldUtils.calcDistance(origin, dest));
                    let distanceIsValid = flight.distance > minDistance && flight.distance < maxDistance;
                    // let pass = Math.round((Math.random() * 200)) + 150;
                    // let time = flight.distance / 800;
                    let trafficIsValid = origin.pop > 1 && dest.pop > 1.0;

                    // if (origin.country === 'Sweden') {
                    //     console.log(route + ' routeIsValid=' + routeIsValid + ' trafficIsValid=' + trafficIsValid);
                    // }
                    // else {
                    //     // console.log(route + ' routeIsValid=' + routeIsValid + ' trafficIsValid=' + trafficIsValid);
                    // }

                    if (routeIsValid && distanceIsValid && trafficIsValid) {
                        this.flightsLookup.push(route);

                        flightsCount++;
                        connectionsCount++;
                        flight.id += " #" + flightsCount;
                        flight.index = this.flights.length;
                        // let flight = { id: id, origin: origin, dest: dest, time: time, passengers: pass, distance: distance, points: paths };
                        this.flights.push(flight);

                        if (!this.connections[origin.name]) {
                             this.connections[origin.name] = [];
                        }
                        this.connections[origin.name].push(flight);

                        // if (!this.connections[dest.name]) {
                        //      this.connections[dest.name] = [];
                        // }

                        // let returnFlight = SantaWorldUtils.getFlight(dest, origin);
                        // this.connections[dest.name].push(returnFlight);
                       
                        if (this.connections[origin.name].length > connectionsMax) {
                            break;
                        }
                        // if (connectionsCount > connectionsMax) {
                        //     break;
                        // }
                    }

                }
            }
            if (flightsCount > flightsLimit)  {
                console.log("flightsCount > flightsLimit: " + flightsCount + " " + flightsLimit);
                break;
            }
        }

        for (const flight of this.flights) {
                // console.log("flight " + flight.origin.name + " -> " + flight.dest.name);
            this.addAirport(flight.origin);
            this.addAirport(flight.dest);
        }

        this.airports = Array.from(this.airportsLookup.values());
    }

    public static addAirport(city: any): void {
        if (this.airportsLookup.has(city.name)) {
            this.airportsLookup.get(city.name).flights += 1;
        } else {
            let airport = Object.assign({flights: 1}, city );
            this.airportsLookup.set(city.name, airport);
        }
    }

    public static getGridlines(): any[] {
        let gridlines = [];
        // longitude lines
        for (let lon = -180; lon <= 180; lon += 30) {

            let line: any[] = [{x: lon, y: -90}, {x: lon, y: 90}];
            let points: any[] = [line];

            let coordinateLine = {points: points,
                degree: lon,
                direction: lon > 0 ? "E" : "W"
              };
              gridlines.push(coordinateLine);
        }
        // latitude lines
        for (let lat = -90; lat <= 90; lat += 30) {

            let line: any[] = [{x: -180, y: lat}, {x: 180, y: lat}];
            let points: any[] = [line];
            let coordinateLine = {points: points,
                degree: lat,
                direction: lat > 0 ? "N" : "S"
              };
              gridlines.push(coordinateLine);
        }
        return gridlines;
    }
}
