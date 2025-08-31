let studentId = null;

const searchContainer = document.getElementById('search-container');

const searchInput = document.getElementById('search-input');

const searchResults = document.getElementById('search-results');

const studentContainer = document.getElementById('chosen-student');

searchInput.addEventListener('input', async () => {
    searchResults.innerHTML = '';

    const NIE = searchInput.value;

    if (NIE !== '') {
        try {
            const response = await fetch(`/students?NIE=${NIE}`);

            const data = await response.json();

            if (!response.ok) {
                const container = document.createElement('div');
                container.classList.add('fault-form__result');

                container.textContent = data.error;
                searchResults.appendChild(container);

                return;
            }

            const students = data.students;

            students.forEach(student => {
                const result = document.createElement('div');
                result.dataset.id = student.id;
                result.classList.add('fault-form__result');

                const p = document.createElement('p');

                p.textContent = `${student.name} ${student.lastname} || ${student.group.level} ${student.group.modality} ${student.group.section}`;

                result.appendChild(p);

                searchResults.appendChild(result);
            });

        // const response = await fetch('/faults', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: 
        // })
        } catch (error) {
            console.error(error);
        }
    };

});

searchContainer.addEventListener('click', async (e) => {
    const element = e.target;

    const result = element.closest('.fault-form__result');

    if (element.classList.contains('fault-form__icon--delete')) {
        studentContainer.innerHTML = '';
        searchInput.style.display = 'block';
    } else if (result) {
        studentId = result.dataset.id;

        const response = await fetch(`/students/${studentId}`);

        const data = await response.json();

        if (!response.ok) return alert(data.error);

        const student = data.student;

        studentContainer.innerHTML = `
            <div class='fault-form__student-info'> 
                <p>${student.name} ${student.lastname}</p>
            </div>
            <i class="fa-solid fa-trash fault-form__icon--delete"></i>
        `;

        searchInput.value = '';
        searchInput.style.display = 'none';
        searchResults.innerHTML = '';
    } 

});

// renderizar las faltas existentes.

const faultSelect = document.getElementById('fault-select');

await loadFaults();

// enviar formulario

const faultForm = document.getElementById('fault-form');

faultForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!studentId) return alert('selecciona un estudiante');

    const payload = {
        studentId,
        faultId: faultSelect.value
    };

    console.log(payload)

    try {
        const response = await fetch('/student-faults', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) return alert(data.error);

        alert(data.message);

        window.location.reload();
    } catch (error) {
        console.error(error);
    }

});

// funciones

async function loadFaults() {
    try {
        const response = await fetch('/faults');

        const data = await response.json();

        if (!response.ok) alert(data.error);

        const fragment = document.createDocumentFragment();

        data.faults.forEach(fault => {
            const option = document.createElement('option');
            option.value = fault.id;
            option.textContent = fault.description;

            fragment.appendChild(option);
        });

        faultSelect.appendChild(fragment);
    } catch (error) {
        console.error(error);
    }
    
}