

export class WorldUtils2 {

    // calculate geo-paths between two locations using great circle formula
    public static calcPaths(origin: any, dest: any): any[] {
        let interval = 200;
        // let interval = 800;
        let paths: any[] = [[]];
        let pathID = 0;
        let distance = this.calcDistance(origin, dest);
        if (distance <= interval) {
            paths[pathID].push({ x: origin.lon, y: origin.lat });
            paths[pathID].push({ x: dest.lon, y: dest.lat });
        } else {
            let current = origin;
            let previous = origin;

            for (let dist = interval; dist <= distance; dist += interval)
            {
                previous = current
                paths[pathID].push({ x: current.lon, y: current.lat });

                let bearing = this.calcBearing(current, dest);
                current = this.calcDestination(current, bearing, interval);
                // ensure geo-path wrap around the world through the new date-line
                if (previous.lon > 150 && current.lon < -150) {
                    paths[pathID].push({ x: 180, y: current.lat });
                    paths.push([]);
                    pathID++;
                    current = { lon: -180, lat: current.lat };
                } else if (previous.lon < -150 && current.lon > 150) {
                    paths[pathID].push({ x: -180, y: current.lat });
                    paths.push([]);
                    pathID++;
                    current = { lon: 180, lat: current.lat };
                }
            }
            paths[pathID].push({ x: dest.lon, y: dest.lat });
        }
        return paths;
    }

    // calculate bearing angle between two locations
    public static calcBearing(origin: any, dest: any): number
    {
        origin = this.toRadianLocation(origin);
        dest = this.toRadianLocation(dest);
        let range = (dest.lon - origin.lon);
        let y = Math.sin(range) * Math.cos(dest.lat);
        let x = Math.cos(origin.lat) * Math.sin(dest.lat) -
                Math.sin(origin.lat) * Math.cos(dest.lat) * Math.cos(range);
        let angle = Math.atan2(y, x);
        return this.toDegreesNormalized(angle);
    }

    // calculate destination for origin location and travel distance
    public static calcDestination(origin: any, bearing: number, distance: number): any {
        let radius = 6371.0;
        origin = this.toRadianLocation(origin);
        bearing = this.toRadians(bearing);
        distance = distance / radius; // angular distance in radians

        let lat = Math.asin(Math.sin(origin.lat) * Math.cos(distance) +
                       Math.cos(origin.lat) * Math.sin(distance) * Math.cos(bearing));
        let x = Math.sin(bearing) * Math.sin(distance) * Math.cos(origin.lat);
        let y = Math.cos(distance) - Math.sin(origin.lat) * Math.sin(origin.lat);
        let lon = origin.lon + Math.atan2(x, y);
        // normalize lon to coordinate between -180º and +180º
        lon = (lon + 3 * Math.PI) % (2 * Math.PI) - Math.PI;

        lon = this.toDegrees(lon);
        lat = this.toDegrees(lat);

        return { lon: lon, lat: lat };
    }

    // calculate distance between two locations
    public static calcDistance(origin: any, dest: any): number {
        origin = this.toRadianLocation(origin);
        dest = this.toRadianLocation(dest);
        let sinProd = Math.sin(origin.lat) * Math.sin(dest.lat);
        let cosProd = Math.cos(origin.lat) * Math.cos(dest.lat);
        let lonDelta = (dest.lon - origin.lon);

        let angle = Math.acos(sinProd + cosProd * Math.cos(lonDelta));
        let distance = angle * 6371.0;
        return distance; // * 6371.0; // in km
    }

    public static toRadianLocation(geoPoint: any): any {
        let x = this.toRadians(geoPoint.lon);
        let y = this.toRadians(geoPoint.lat);
        return { lon: x, lat: y };
    }

    public static toRadians(degrees: number): number
    {
        return degrees * Math.PI / 180;
    }

    public static toDegrees(radians: number): number {
        return (radians * 180.0 / Math.PI);
    }

    public static toDegreesNormalized(radians: number): number
    {
        let degrees = this.toDegrees(radians);
        degrees = (degrees + 360) % 360;
        return degrees;
    }

    // converts latitude coordinate to a string
    public static toStringLat(latitude: number): string {
        let str = Math.abs(latitude).toFixed(1) + "°";
        return latitude > 0 ? str + "N" : str + "S";
    }

    // converts longitude coordinate to a string
    public static toStringLon(coordinate: number): string {
        let val = Math.abs(coordinate);
        let str = val < 100 ? val.toFixed(1) : val.toFixed(0);
        return coordinate > 0 ? str + "°E" : str + "°W";
    }

    public static toStringAbbr(value: number): string {
        if (value > 1000000000000) {
            return (value / 1000000000000).toFixed(1) + " T"
        } else if (value > 1000000000) {
            return (value / 1000000000).toFixed(1) + " B"
        } else if (value > 1000000) {
            return (value / 1000000).toFixed(1) + " M"
        } else if (value > 1000) {
            return (value / 1000).toFixed(1) + " K"
        }
        return value.toFixed(0);
    }

    public static getLongitude(location: any): number {
        if (location.x) return location.x;
        if (location.lon) return location.lon;
        if (location.longitude) return location.longitude;
        return Number.NaN;
    }

    public static getLatitude(location: any): number {
        if (location.y) return location.y;
        if (location.lat) return location.lat;
        if (location.latitude) return location.latitude;
        return Number.NaN;
    }
 
    public static getBounds(locations: any[]): any {
        let minLat = 90;
        let maxLat = -90;
        let minLon = 180;
        let maxLon = -180;

        for (const location of locations) {
            const crrLon = this.getLongitude(location);
            if (!Number.isNaN(crrLon)) {
                minLon = Math.min(minLon, crrLon);
                maxLon = Math.max(maxLon, crrLon);
            }

            const crrLat = this.getLatitude(location);
            if (!Number.isNaN(crrLat)) {
                minLat = Math.min(minLat, crrLat);
                maxLat = Math.max(maxLat, crrLat);
            }

            // if (location.x) {
            //     minLon = Math.min(minLon, location.x);
            //     maxLon = Math.max(maxLon, location.x);
            // } else if (location.lon) {
            //     minLon = Math.min(minLon, location.lon);
            //     maxLon = Math.max(maxLon, location.lon);
            // } else if (location.longitude) {
            //     minLon = Math.min(minLon, location.longitude);
            //     maxLon = Math.max(maxLon, location.longitude);
            // }
            // if (location.y) {
            //     minLat = Math.min(minLat, location.y);
            //     maxLat = Math.max(maxLat, location.y);
            // } else if (location.lat) {
            //     minLat = Math.min(minLat, location.lat);
            //     maxLat = Math.max(maxLat, location.lat);
            // } else if (location.latitude) {
            //     minLat = Math.min(minLat, location.latitude);
            //     maxLat = Math.max(maxLat, location.latitude);
            // }
        }

        const geoBounds = {
            left: minLon,
            top: minLat,
            width: Math.abs(maxLon - minLon),
            height: Math.abs(maxLat - minLat)
        };
        return geoBounds;
    }

    public static getNightShapes(): any[] {
        let nightShape = [];

        let line: any[] = [];

        for (let lon = -180; lon <= 180; lon += 1) {

            // let line: any[] = [{x: lon, y: -90}, {x: lon, y: 90}];
            let x = lon;
            let y = 75 * Math.cos(lon * Math.PI / 180);
            line.push({x: x, y: y});
        }
        // line.push({x: 180, y: 90});
        // line.push({x: -180, y: 90});
        // line.push({x: -180, y: -90});

        let coordinateLine = {points: [line]};

        nightShape.push(coordinateLine);

        return nightShape;
    }

    public static getFlight(origin: any, dest: any, minDistance?: number, maxDistance?: number): any {
        if (!minDistance) minDistance = 200;
        if (!maxDistance) maxDistance = 9000;
    
        // let route = [origin.name, dest.name].sort().join('-');
        let route = [origin.name, dest.name].join('-');
        // let routeIsValid = this.flightsLookup.indexOf(route) === -1;
        let distance = Math.round(WorldUtils2.calcDistance(origin, dest));
        // let distanceIsValid = distance > minDistance && distance < maxDistance;
        let pass = Math.round((Math.random() * 200)) + 150;
        let time = distance / 800;
        // let isValid = origin.pop > 1 && dest.pop > 1.0;
        let paths = WorldUtils2.calcPaths(origin, dest);
    
        // let id = origin.name.substring(0, 3).toUpperCase();
        let id = route.toUpperCase().split(' ').join('-');
        let flight = { 
            id: id, name: id, origin: origin, dest: dest, time: time, route: route, 
            passengers: pass, distance: distance, points: paths, progress: 0,
        };
    
        return flight;
    }

    public static round(num: number, decimalPlaces?: number): number {
        if (!decimalPlaces) decimalPlaces = 4;
        const factor = Math.pow(10, decimalPlaces);
        return Math.round(num * factor) / factor;
    }

    public static toFixed(num: number, decimalPlaces?: number): string {
        if (!decimalPlaces) decimalPlaces = 4;
        return this.round(num, decimalPlaces).toFixed(decimalPlaces);
    }

    public static sortBy(arr: any[], prop: string): void {
        // arr.sort(this.comparePopulation);
        // arr.sort((a, b) => a[prop].localeCompare(b[prop]));
        arr.sort((a, b) => a[prop] < b[prop] ? 1 : -1);
    }

}
