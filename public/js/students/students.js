import { createURLWithParams, getObjects, renderTableContent} from "../utils/utils.js";

const filters = {
    NIE: null,
    name: null
}

const title = document.getElementById('title');

const filterForm = document.getElementById('filter-form');

const tbody = document.getElementById('tbody');

const NIEInput = document.getElementById('NIE-input');
const nameInput = document.getElementById('name-input');

filterForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    filters.NIE = NIEInput.value;
    filters.name = nameInput.value;

    const url = createURLWithParams('/students', filters);;

    try {
        const students = await getObjects(url, 'students');

        if (students) {
            title.textContent = 'ESTUDIANTES ENCONTRADOS';
            table.style.display = '';
            tbody.innerHTML = '';
            const body = renderTableContent(students, createStudentRow);
            tbody.appendChild(body);
        } else {
            title.textContent = 'NO SE ENCONTRARON ESTUDIANTES CON LOS FILTROS SELECCIONADOS';
            table.style.display = 'none';
        }
    } catch (error) {
        console.error(error);
    }
})

const table = document.getElementById('table');

table.addEventListener('click', (e) => {
    const element = e.target;

    if (element.classList.contains('table__btn')) {
        const row = element.closest('.table__row');

        const studentId = row.dataset.id;

        window.location.href = `/students/faults-view?studentId=${studentId}`;
    };
});

const students = await getObjects('/students', 'students');

if (students) {
    title.textContent = 'Estudiantes';
    const body = renderTableContent(students, createStudentRow);
    tbody.appendChild(body);
}

function createStudentRow(student) {
    const row = document.createElement('tr');
    row.classList.add('table__row');
    row.dataset.id = student.id;

    const groupText = `${student.group.level} ${student.group.modality} ${student.group.section}`;

    const values = [student.NIE, student.name, student.lastname, groupText];

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