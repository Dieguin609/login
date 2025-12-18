let selectedGender = null;
const audio = document.getElementById('myAudio');
const musicIcon = document.getElementById('musicIcon');

// Função para tocar música assim que carregar ou no primeiro clique
function startMusic() {
    audio.play().then(() => {
        musicIcon.className = "fas fa-pause";
    }).catch(() => {
        musicIcon.className = "fas fa-play";
    });
}

window.onload = startMusic;

// Tenta dar play ao clicar em qualquer lugar (contorno de bloqueio de áudio)
document.body.onclick = () => {
    if (audio.paused && musicIcon.className === "fas fa-play") {
        startMusic();
    }
};

function togglePlay() {
    if (audio.paused) {
        audio.play();
        musicIcon.className = "fas fa-pause";
    } else {
        audio.pause();
        musicIcon.className = "fas fa-play";
    }
}

// Alternar entre Login e Registro
function toggleForm(type) {
    if(type === 'reg') {
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('register-box').style.display = 'block';
    } else {
        document.getElementById('register-box').style.display = 'none';
        document.getElementById('login-box').style.display = 'block';
    }
}

// Selecionar Gênero
function selectGender(gender) {
    selectedGender = gender;
    document.getElementById('m-btn').classList.remove('active');
    document.getElementById('f-btn').classList.remove('active');
    
    if(gender === 'M') {
        document.getElementById('m-btn').classList.add('active');
    } else {
        document.getElementById('f-btn').classList.add('active');
    }
}

// --- INTEGRAÇÃO COM CEF EMIT (SAMP) ---

function login() {
    const pass = document.getElementById('login-pass').value;
    if (pass.length > 0) {
        // Envia para o seu SkyPixel.pwn
        cef.emit("server:onPlayerLogin", pass);
    } else {
        alert("Digite sua senha!");
    }
}

function register() {
    const pass = document.getElementById('reg-pass').value;
    if (pass.length > 0 && selectedGender) {
        // Envia senha e gênero para o seu SkyPixel.pwn
        cef.emit("server:onPlayerRegister", pass, selectedGender);
        
        // Volta para o login após registrar, como você pediu
        setTimeout(() => {
            toggleForm('log');
        }, 500);
    } else {
        alert("Preencha todos os campos!");
    }
}
