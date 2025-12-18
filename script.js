let selectedGender = null;
const audio = document.getElementById('myAudio');
const musicIcon = document.getElementById('musicIcon');

// Função para tocar/pausar a música
function togglePlay() {
    if (audio.paused) {
        audio.play();
        musicIcon.classList.remove('fa-play');
        musicIcon.classList.add('fa-pause');
    } else {
        audio.pause();
        musicIcon.classList.remove('fa-pause');
        musicIcon.classList.add('fa-play');
    }
}

// Tenta iniciar a música ao carregar
window.onload = () => {
    audio.play().then(() => {
        musicIcon.classList.add('fa-pause');
    }).catch(() => {
        musicIcon.classList.add('fa-play');
        console.log("Auto-play bloqueado pelo navegador.");
    });
};

// Garante que o play funcione no primeiro clique na tela (regra dos navegadores)
document.body.addEventListener('click', () => {
    if (audio.paused && musicIcon.classList.contains('fa-play')) {
        audio.play();
        musicIcon.classList.remove('fa-play');
        musicIcon.classList.add('fa-pause');
    }
}, { once: true });

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

// Enviar para o SAMP (Login)
function login() {
    const pass = document.getElementById('login-pass').value;
    if (pass.length > 0) {
        if (typeof cef !== 'undefined') cef.emit("server:onPlayerLogin", pass);
    } else {
        alert("Digite sua senha!");
    }
}

// Enviar para o SAMP (Registro)
function register() {
    const pass = document.getElementById('reg-pass').value;
    if (pass.length > 0 && selectedGender) {
        if (typeof cef !== 'undefined') cef.emit("server:onPlayerRegister", pass, selectedGender);
        
        // Pequeno delay para garantir o envio antes de trocar a tela
        setTimeout(() => {
            toggleForm('log');
        }, 200);
    } else {
        alert("Preencha todos os campos!");
    }
}
