export function createURLWithParams(baseURL, filters) {
    const params = new URLSearchParams();

    for (const filter in filters) {
        if (filters[filter]) params.append(filter, filters[filter]);
    }

    if (params.toString()) baseURL += '?' + params.toString();

    return baseURL;
}

export function renderTableContent(objects, createRowFn) { // se encarga de crear un fragmento con todas las filas creadas por la funcion createRowFn
    const fragment = document.createDocumentFragment();

    objects.forEach(object => {
        const row = createRowFn(object); // aqui se crean las filas

        fragment.appendChild(row);
    });

    return fragment;
}

export async function getObjects(url, key) {
    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
        alert(data.error);
        return false;
    }

    return data[key];
}