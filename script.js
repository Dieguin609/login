let selectedGender = null;
const audio = document.getElementById('myAudio');
const musicIcon = document.getElementById('musicIcon');

// Tocar música ao carregar
window.onload = () => {
    audio.play().catch(() => {
        musicIcon.className = "fas fa-play";
    });
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        musicIcon.className = "fas fa-pause";
    } else {
        audio.pause();
        musicIcon.className = "fas fa-play";
    }
}

function toggleForm(type) {
    if(type === 'reg') {
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('register-box').style.display = 'block';
    } else {
        document.getElementById('register-box').style.display = 'none';
        document.getElementById('login-box').style.display = 'block';
    }
}

function selectGender(gender) {
    selectedGender = gender;
    document.getElementById('m-btn').classList.remove('active');
    document.getElementById('f-btn').classList.remove('active');
    if(gender === 'M') document.getElementById('m-btn').classList.add('active');
    else document.getElementById('f-btn').classList.add('active');
}

function login() {
    const pass = document.getElementById('login-pass').value;
    if(pass.length > 0 && typeof cef !== 'undefined') {
        cef.emit("server:onPlayerLogin", pass);
    }
}

function register() {
    const pass = document.getElementById('reg-pass').value;
    if(pass.length > 0 && selectedGender && typeof cef !== 'undefined') {
        cef.emit("server:onPlayerRegister", pass, selectedGender);
        toggleForm('log');
    }
}