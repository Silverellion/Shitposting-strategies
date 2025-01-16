const captchaCheckbox = document.getElementById('captchaCheckbox');
const captchaOverlay = document.getElementById('captchaOverlay');
const captchaSpinner = document.getElementById('captchaSpinner');

captchaCheckbox.addEventListener('change', () => {
    if (captchaCheckbox.checked) {
        captchaCheckbox.classList.add('spinner')
        captchaSpinner.classList.add('active')
        setTimeout(() => {
            captchaOverlay.classList.add('active');
        }, 500) 
    }
});

captchaOverlay.addEventListener('click', (e) => {
    if (e.target === captchaOverlay) {
        captchaCheckbox.checked = false;
        closePopup();
        captchaCheckbox.checked = false; 
        setTimeout(() => {
            captchaCheckbox.classList.remove('spinner')
            captchaSpinner.classList.remove('active');
        }, 200)
    }
});

function closePopup() {
    captchaOverlay.classList.add('closing'); 
    captchaOverlay.addEventListener('transitionend', () => {
        captchaOverlay.classList.remove('active', 'closing');
    }, { once: true });
}

const verificationImages = document.querySelectorAll('#verificationImages img')
const verifyButton = document.getElementById('verifyButton');
const questionMarkIcon = document.getElementById('questionMarkIcon');
const tryAgainText = document.getElementById('tryAgainText');
const verifiedMark = document.getElementById('verifiedMark');

var selectedImage = 0;
var verified = false;

verificationImages.forEach(image => {
    image.addEventListener('click', () => {
        if(image.style.transform === 'scale(0.8)') {
            image.style.transform = 'scale(1)';
            selectedImage--;
        }
        else {
            image.style.transform = 'scale(0.8)';
            selectedImage++;
        }
    })
})

verifyButton.addEventListener('click', () => {
    if(selectedImage != 3) {
        verificationImages.forEach(image => {
            image.style.transform = 'scale(1)';
            selectedImage = 0;
        })
        tryAgainText.classList.add('active');
    }
    else {
        closePopup();
        captchaSpinner.classList.remove('active');
        verifiedMark.classList.add('active');

        captchaCheckbox.checked = true;
        verified = true;
    }
})

questionMarkIcon.addEventListener('click', () => {
    alert('Fuck you');
})