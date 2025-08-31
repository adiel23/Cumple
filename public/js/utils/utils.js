export function createURLWithParams(baseURL, filters) {
    const params = new URLSearchParams();

    for (const filter in filters) {
        if (filters[filter]) params.append(filter, filters[filter]);
    }

    if (params.toString()) baseURL += '?' + params.toString();

    return baseURL;
}