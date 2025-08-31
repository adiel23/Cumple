const loginForm = document.getElementById('login-form');

const usernameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error);
            window.location.reload();
        }

        const role = data.role;

        if (role === 'docente') {
            window.location.href = '/students/add-fault-view';
        } else if (role === 'admin') {
            window.location.href = '/admin/dashboard';
        }
    } catch (error) {
        console.error(error);
    }
})