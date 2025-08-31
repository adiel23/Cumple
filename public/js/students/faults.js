import { createURLWithParams } from "../utils/utils.js";

const filters = {
    startDate: null,
    endDate: null
}

const tbody = document.getElementById('tbody');

const title = document.getElementById('title');

const params = new URLSearchParams(window.location.search);
const studentId = params.get('studentId');

const filterForm = document.getElementById('filter-form');

filterForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    filters.startDate = document.getElementById('start-date-input').value;
    filters.endDate = document.getElementById('end-date-input').value;

    try {
        await renderTableContent(createURLWithParams(`/students/${studentId}/faults`, filters));
    } catch (error) {
        console.error(error);
    }
});

await renderTableContent(`/students/${studentId}/faults`);

async function renderTableContent(route) {
    try {
        const response = await fetch(route);

        const data = await response.json();

        if (!response.ok) {
            table.style.display = 'none';
            title.textContent = 'No se encontraron faltas';
            return;
        }
            
        table.style.display = '';

        tbody.innerHTML = ``;

        const fragment = document.createDocumentFragment();

        const faults = data.faults;

        title.textContent = `faltas de ${faults[0].student.name}`

        faults.forEach(fault => {
            console.log(fault)
            const row = document.createElement('tr');
            row.classList.add('table__row');
            row.dataset.id = fault.id;

            const values = [fault.fault.type, fault.fault.description, fault.timestamp];

            console.log(typeof fault.timestamp)

            values.forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            });

            fragment.appendChild(row);
        });

        tbody.appendChild(fragment);
    } catch (error) {
        console.error(error);
    }

};

// boton para descargar reporte

const downloadBtn = document.getElementById('download-btn');

downloadBtn.addEventListener('click', async () => {
    const url = createURLWithParams(`/reports/students/${studentId}/faults`, filters);

    window.location.href = url;
});