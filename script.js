// Volleyball World - Enhanced script.js
document.addEventListener('DOMContentLoaded', function() {
    
    initUserPreferences();
    setupNavigation();
    setupPlayerCards();
    
   
    initColorSelection();
});


function getUserPreferences() {
    return {
        name: localStorage.getItem('userName'),
        theme: localStorage.getItem('userTheme'),
        color: localStorage.getItem('userColor')
    };
}

function applyTheme(theme) {
    document.body.className = ''; 
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.add('light-theme');
    }
}

function applyColor(colorIndex) {
    const colors = ["#E2E2E2", "#FFD166", "#06D6A0"];
    if (colorIndex >= 0 && colorIndex <= 2) {
        document.body.style.backgroundColor = colors[colorIndex];
        localStorage.setItem('userColor', colorIndex);
    }
}

function savePreferences(name, theme, color) {
    localStorage.setItem('userName', name);
    localStorage.setItem('userTheme', theme);
    if (color !== undefined) {
        localStorage.setItem('userColor', color);
    }
}

function initUserPreferences() {
    const preferences = getUserPreferences();
    
    if (!preferences.name || !preferences.theme) {
        
        const name = prompt('Welcome to Volleyball World! What is your name?') || 'Guest';
        
        let theme;
        do {
            theme = prompt(`${name}, do you prefer dark or light mode? (dark/light)`).toLowerCase();
        } while (theme !== 'dark' && theme !== 'light');
        
        savePreferences(name, theme);
        applyTheme(theme);
        
        
        showWelcomeMessage(name, true);
        
        // Keep your existing color selection
        initColorSelection();
    } else {
        // Returning user flow
        applyTheme(preferences.theme);
        if (preferences.color) {
            applyColor(parseInt(preferences.color));
        }
        showWelcomeMessage(preferences.name, false);
    }
}

function showWelcomeMessage(name, isNewUser) {
    const welcomeMsg = document.createElement('div');
    welcomeMsg.className = 'welcome-message';
    welcomeMsg.innerHTML = `
        <h3>${isNewUser ? 'Welcome' : 'Welcome back'}, ${name}!</h3>
        <p>Enjoy exploring volleyball!</p>
        <div class="theme-toggle">
            <button class="theme-btn dark">Dark Mode</button>
            <button class="theme-btn light">Light Mode</button>
        </div>
        <button class="close-btn">×</button>
    `;
    
    document.body.prepend(welcomeMsg);
    
   
    welcomeMsg.querySelector('.close-btn').addEventListener('click', function() {
        welcomeMsg.style.display = 'none';
    });
    
    
    welcomeMsg.querySelector('.dark').addEventListener('click', function() {
        applyTheme('dark');
        savePreferences(name, 'dark');
    });
    
    welcomeMsg.querySelector('.light').addEventListener('click', function() {
        applyTheme('light');
        savePreferences(name, 'light');
    });
}


function initColorSelection() {
    const preferences = getUserPreferences();
    if (!preferences.color) {
        const colors = ["#E2E2E2", "#FFD166", "#06D6A0"];
        let colorChoice;
        
        while (true) {
            colorChoice = prompt(`Choose a background color:\n0 for grey\n1 for yellow\n2 for green`);
            
            if (colorChoice === null) break;
            colorChoice = parseInt(colorChoice);
            
            if (!isNaN(colorChoice) && colorChoice >= 0 && colorChoice <= 2) {
                applyColor(colorChoice);
                break;
            }
            alert("Please enter a number between 0-2");
        }
    }
}

