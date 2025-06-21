document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");

    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("signupName").value;
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;

            const user = { name, email, password };
            localStorage.setItem("user", JSON.stringify(user));
            alert("Signup successful! You can now login.");
            window.location.href = "login.html";
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser && storedUser.email === email && storedUser.password === password) {
                alert("Login successful!");
                localStorage.setItem("isLoggedIn", "true");
                window.location.href = "index.html";
            } else {
                alert("Invalid credentials. Try again.");
            }
        });
    }
});
function applyDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', isDark);
    const toggleBtn = document.getElementById('toggleMode');
    if (toggleBtn) toggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
}

document.addEventListener('DOMContentLoaded', () => {
    applyDarkMode();

    const toggleBtn = document.getElementById('toggleMode');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', isDark);
            toggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    // Mobile nav toggle
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("show");
        });
    }

    // Include dark mode from earlier
    applyDarkMode?.();
});
document.addEventListener("DOMContentLoaded", () => {
    // Load previously submitted questions
    const questionForm = document.getElementById("questionForm");
    const questionList = document.getElementById("questionList");

    function renderQuestions() {
        const questions = JSON.parse(localStorage.getItem("questions")) || [];
        questionList.innerHTML = "";
        questions.forEach(q => {
            const div = document.createElement("div");
            div.className = "question-box";
            div.innerHTML = `<strong>${q.name}</strong> asked:<br><p>${q.question}</p><hr>`;
            questionList.appendChild(div);
        });
    }

    if (questionForm) {
        questionForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const question = document.getElementById("question").value;

            const questions = JSON.parse(localStorage.getItem("questions")) || [];
            questions.push({ name, email, question });
            localStorage.setItem("questions", JSON.stringify(questions));

            alert("Question submitted!");
            questionForm.reset();
            renderQuestions();
        });
        renderQuestions();
    }
});
