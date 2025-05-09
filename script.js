// Add these functions to your script.js
function initBackgroundColors() {
    const savedColor = localStorage.getItem('bgColor');
    if (savedColor) {
      document.documentElement.style.setProperty(
        document.documentElement.getAttribute('data-theme') === 'dark' 
          ? '--custom-bg-dark' 
          : '--custom-bg-light', 
        savedColor
      );
    }
  }
  
  function setupColorPicker() {
    const colors = {
      light: {
        default: '#F7FFF7',
        warm: '#FFF5E6',
        cool: '#F0F8FF'
      },
      dark: {
        default: '#121212',
        warm: '#1A120B',
        cool: '#0A192F'
      }
    };
  
    document.querySelectorAll('.bg-color-option').forEach(option => {
      option.addEventListener('click', function() {
        const theme = document.documentElement.getAttribute('data-theme');
        const color = this.getAttribute('data-color');
        const colorValue = colors[theme][color];
        
        // Update CSS variable
        document.documentElement.style.setProperty(
          `--custom-bg-${theme}`,
          colorValue
        );
        
        // Save to localStorage
        localStorage.setItem('bgColor', colorValue);
        
        // Update selection indicator
        document.querySelectorAll('.bg-color-option').forEach(opt => {
          opt.classList.remove('selected');
        });
        this.classList.add('selected');
      });
    });
  }
  
  // Add to your DOMContentLoaded listener:
  document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initBackgroundColors();
    setupColorPicker();
    // ... your existing code
  });