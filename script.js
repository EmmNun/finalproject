// Volleyball World - script.js

document.addEventListener('DOMContentLoaded', function () {
    const colors = ["#E2E2E2", "#FFD166", "#06D6A0"]; // grey, yellow, green

    let userName = localStorage.getItem('userName');
    let theme = localStorage.getItem('theme');
    let colorIndex = localStorage.getItem('colorIndex');

    if (!userName || !theme || colorIndex === null) {
        userName = prompt("Welcome to Volleyball World! What is your name?");
        if (userName) {
            localStorage.setItem('userName', userName);

            theme = prompt(`${userName}, would you like 'light' or 'dark' mode? (Type light or dark)`).toLowerCase();
            if (theme !== 'dark') theme = 'light'; // fallback
            localStorage.setItem('theme', theme);

            let choice;
            while (true) {
                choice = prompt(`${userName}, choose a background color:\n0 for grey\n1 for yellow\n2 for green`);
                if (choice === null) break;
                choice = parseInt(choice);
                if (!isNaN(choice) && choice >= 0 && choice <= 2) {
                    localStorage.setItem('colorIndex', choice);
                    break;
                }
                alert("Please enter a number between 0 and 2.");
            }
        }
    }

    // Apply stored preferences
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    if (colorIndex !== null) {
        document.body.style.backgroundColor = colors[colorIndex];
    }

    if (userName) {
        showWelcomeMessage(userName);
    }

    setupNavigation();
    setupPlayerCards();
});

// Shows a welcome message
function showWelcomeMessage(name) {
    const welcomeMsg = document.createElement('div');
    welcomeMsg.className = 'welcome-message';
    welcomeMsg.innerHTML = `
        <h3>Welcome, ${name}!</h3>
        <p>Enjoy exploring volleyball!</p>
        <button class="close-btn">×</button>
    `;
    document.body.prepend(welcomeMsg);
    welcomeMsg.querySelector('.close-btn').addEventListener('click', () => {
        welcomeMsg.style.display = 'none';
    });
}

// Highlight current page
function setupNavigation() {
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Setup player cards interaction
function setupPlayerCards() {
    const playerCards = document.querySelectorAll('.player-card');

    playerCards.forEach(card => {
        card.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') return;
            document.querySelectorAll('.player-card.expanded').forEach(c => {
                if (c !== this) c.classList.remove('expanded');
            });
            this.classList.toggle('expanded');
        });
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.player-card')) {
            playerCards.forEach(card => card.classList.remove('expanded'));
        }
    });

    animateCards();
}

// Animate cards on load
function animateCards() {
    const cards = document.querySelectorAll('.card, .player-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// For debug
console.log("Script loaded!");

// Alternar entre dark e light mode manualmente
document.getElementById('toggle-theme')?.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
});

// Mudar o nome do usuário
document.getElementById('change-name')?.addEventListener('click', () => {
    const newName = prompt("Qual é o seu novo nome?");
    if (newName && newName.trim()) {
        localStorage.setItem('userName', newName.trim());
        location.reload();
    }
});

// Redefinir tudo
document.getElementById('reset-preferences')?.addEventListener('click', () => {
    if (confirm("Tem certeza que deseja redefinir suas preferências?")) {
        localStorage.clear();
        location.reload();
    }
});
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('toggleBtn');
    const content = document.getElementById('toggleContent');
  
    btn.addEventListener('click', function () {
      if (content.style.display === 'none') {
        content.style.display = 'block';
        btn.textContent = 'Hide Info';
      } else {
        content.style.display = 'none';
        btn.textContent = 'Show Info';
      }
    });
  });
  