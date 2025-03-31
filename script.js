// Volleyball World - script.js
document.addEventListener('DOMContentLoaded', function() {
    // Color Selection System
    const colors = ["#E2E2E2", "#FFD166", "#06D6A0"]; // grey, yellow, green
    
    // Get user input
    const userName = prompt("Welcome to Volleyball World! What is your name?");
    
    if (userName !== null) { // Only proceed if user didn't cancel name prompt
        let colorChoice;
        
        // Keep asking until valid color choice or cancel
        while (true) {
            colorChoice = prompt(`${userName}, choose a background color:\n0 for grey\n1 for yellow\n2 for green`);
            
            if (colorChoice === null) break; // User clicked cancel
            colorChoice = parseInt(colorChoice);
            
            if (!isNaN(colorChoice) && colorChoice >= 0 && colorChoice <= 2) {
                document.body.style.backgroundColor = colors[colorChoice];
                break;
            }
            
            alert("Please enter a number between 0-2");
        }
        
        // Show welcome message if name was provided
        if (userName.trim() !== '') {
            showWelcomeMessage(userName);
        }
    }
    
    // Set up page functionality
    setupNavigation();
    setupPlayerCards();
});

function showWelcomeMessage(name) {
    const welcomeMsg = document.createElement('div');
    welcomeMsg.className = 'welcome-message';
    welcomeMsg.innerHTML = `
        <h3>Welcome, ${name}!</h3>
        <p>Enjoy exploring volleyball!</p>
        <button class="close-btn">×</button>
    `;
    
    document.body.prepend(welcomeMsg);
    
    // Close button functionality
    welcomeMsg.querySelector('.close-btn').addEventListener('click', function() {
        welcomeMsg.style.display = 'none';
    });
}

function setupNavigation() {
    // Highlight current page in nav
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

function setupPlayerCards() {
    // Make player cards interactive
    const playerCards = document.querySelectorAll('.player-card');
    
    playerCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link inside the card
            if (e.target.tagName === 'A') return;
            
            // Close all other expanded cards first
            document.querySelectorAll('.player-card.expanded').forEach(c => {
                if (c !== this) c.classList.remove('expanded');
            });
            
            // Toggle this card's expanded state
            this.classList.toggle('expanded');
        });
    });
    
    // Close expanded cards when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.player-card')) {
            playerCards.forEach(card => card.classList.remove('expanded'));
        }
    });
    
    // Animate cards on page load
    animateCards();
}

function animateCards() {
    // Fade-in animation for cards
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