const URL = `https://data-northwind.indigo.design/`;



export function getData(dataState: any, index?: number, perPage?: number): any {
    return fetch(buildUrl(dataState, index, perPage))
        .then((result) => result.json());
}

function buildUrl(dataState: any, index?: number, perPage?: number) {
    let qS = "";
    if (dataState) {
        if (dataState.rootLevel) {
            qS += `${dataState.key}`;
        } else {
            qS += `${dataState.parentKey}/${dataState.parentID}/${dataState.key}`;
        }
    }

    // Add index and perPage to the query string if they are defined
    if (index !== undefined) {
        qS += `?index=${index}`;
        if (perPage !== undefined) {
            qS += `&perPage=${perPage}`;
        }
    } else if (perPage !== undefined) {
        qS += `?perPage=${perPage}`;
    }

    return `${URL}${qS}`;
}

export function getDataLength(dataState: any): Promise<number> {
    return fetch(buildUrl(dataState))
        .then((result) => result.json())
        .then((data) => data.length);
}