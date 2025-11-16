import { createURLWithParams, renderTableContent, getObjects} from "../utils/utils.js";

// filtros:

const filters = {
    groupId: null,
    startDate: null,
    endDate: null
}

const title = document.getElementById('title');

// obtener todos los grupos

const filterForm = document.getElementById('filter-form');

const groupSelect = document.getElementById('group-select');

const groups = await getObjects('/groups', 'groups');

if (groups) {
    const body = renderGroupSelectContent(groups);
    groupSelect.appendChild(body);
} 

const startDateInput = document.querySelector('input[name="startDate"]');
const endDateInput = document.querySelector('input[name="endDate"]');

filterForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    filters.groupId = groupSelect.value;
    filters.startDate = startDateInput.value;
    filters.endDate = endDateInput.value;

    try {
        const url = createURLWithParams('/student-faults', filters);

        const faults = await getObjects(url, 'faults');

        if (faults) {
            title.textContent = 'FALTAS ENCONTRADAS';
            table.style.display = '';
            tbody.innerHTML = '';
            const body = renderTableContent(faults, createFaultRow);
            tbody.appendChild(body);
        } else {
            table.style.display = 'none';
            title.textContent = 'NO SE ENCONTRARON FALTAS QUE COINCIDAN CON LOS FILTROS ESPECIFICADOS';
        }
    } catch (error) {
        console.error(error);
    }
});

const table = document.getElementById('table');

const tbody = document.getElementById('tbody');

table.addEventListener('click', (e) => {
    const element = e.target;

    if (element.classList.contains('table__btn')) {
        const row = element.closest('.table__row');

        const studentId = row.dataset.id;

        window.location.href = `/students/faults-view?studentId=${studentId}`;
    };
});

// obteniendo el dia actual para mostrar las faltas de hoy.

const today = new Date();
const year = today.getFullYear();
const month = String((today.getMonth() + 1)).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const todayString = `${year}-${month}-${day}`;

filters.startDate = todayString;
filters.endDate = todayString;

startDateInput.value = todayString;
endDateInput.value = todayString;

const url = createURLWithParams(`/student-faults`, filters);

const todayFaults = await getObjects(url, 'faults') // obtiene todas las faltas del dia de hoy

if (todayFaults) {
    const body = renderTableContent(todayFaults, createFaultRow);
    tbody.appendChild(body);
    title.textContent = 'FALTAS REALIZADAS EL DIA DE HOY';
} else {
    title.textContent = 'NO SE HAN REGISTRADO FALTAS EL DIA DE HOY';
}

function createFaultRow(fault) {
    const row = document.createElement('tr');
    row.classList.add('table__row');
    row.dataset.id = fault.student.id;

    const student = fault.student;

    const studentFullName = `${student.name} ${student.lastname}`;
    const groupText = `${student.group.level} ${student.group.modality} ${student.group.section}`;

    const values = [student.NIE, studentFullName, groupText, fault.fault.description, fault.timestamp];

    values.forEach(value => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
    });

    const cell = document.createElement('td');
    const historyBtn = document.createElement('button');
    historyBtn.textContent = 'Ver Historial';

    historyBtn.classList.add('table__btn');
    cell.appendChild(historyBtn);

    row.appendChild(cell);

    return row;
}

function renderGroupSelectContent(groups) {
    const fragment = document.createDocumentFragment();

    groups.forEach(group => {
        const option = createGroupOption(group);
        fragment.appendChild(option);
    });

    return fragment;
};

function createGroupOption(group) {
    const option = document.createElement('option');
    option.value = group.id;
    option.textContent = `${group.level} ${group.modality} ${group.section}`;
    return option;
}

// function clearTableBody(tbody) {
//     tbody.innerHTML = '';
// }

// boton para descargar pdf

const downloadBtn = document.getElementById('download-btn');

downloadBtn.addEventListener('click', async () => {
    const url = createURLWithParams('/reports/faults', filters);

    window.location.href = url;
});

