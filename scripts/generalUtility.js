const closeButtons = document.querySelectorAll('.close-button');

closeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const closableBox = document.getElementById(button.getAttribute('data-target'));
        if(closableBox.style.display !== 'none')
            closableBox.style.display = 'none';
    });
});