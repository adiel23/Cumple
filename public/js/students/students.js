const filterForm = document.getElementById('filter-form');

const tbody = document.getElementById('tbody');

filterForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const NIE = document.getElementById('NIE-input').value;
    const name = document.getElementById('name-input').value;

    try {
        await renderTableContent(`/students?NIE=${NIE}&name=${name}`);
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

await renderTableContent(`/students`);

async function renderTableContent(route) {
    const response = await fetch(route);

    const data = await response.json();

    if (!response.ok) return alert(data.error);

    console.log(data.students)

    tbody.innerHTML = ``;

    const fragment = document.createDocumentFragment();

    data.students.forEach(student => {
        const row = document.createElement('tr');
        row.classList.add('table__row');
        row.dataset.id = student.id;

        const groupText = `${student.group.level} ${student.group.modality} ${student.group.section}`;

        const values = [student.id, student.NIE, student.name, student.lastname, groupText];

        values.forEach((value, index) => {
            if (index === 0) return;
            
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

        fragment.appendChild(row);
    });

    tbody.appendChild(fragment);

}