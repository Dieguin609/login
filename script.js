let selectedGender = null;
const audio = document.getElementById('myAudio');
const musicIcon = document.getElementById('musicIcon');

// --- CONTROLE DE MÚSICA ---
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

window.onload = () => {
    audio.play().then(() => {
        musicIcon.classList.add('fa-pause');
    }).catch(() => {
        musicIcon.classList.add('fa-play');
    });
};

document.body.addEventListener('click', () => {
    if (audio.paused && musicIcon.classList.contains('fa-play')) {
        audio.play();
        musicIcon.classList.remove('fa-play');
        musicIcon.classList.add('fa-pause');
    }
}, { once: true });

// --- NAVEGAÇÃO ---
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

// --- COMUNICAÇÃO COM O SERVIDOR (SAMP) ---

function login() {
    const pass = document.getElementById('login-pass').value;
    if (pass.length > 0) {
        if (typeof cef !== 'undefined') cef.emit("server:onPlayerLogin", pass);
    } else {
        showError("Por favor, digite sua senha.");
    }
}

function register() {
    const pass = document.getElementById('reg-pass').value;
    if (pass.length > 0 && selectedGender) {
        if (typeof cef !== 'undefined') cef.emit("server:onPlayerRegister", pass, selectedGender);
        setTimeout(() => { toggleForm('log'); }, 200);
    } else {
        showError("Preencha a senha e selecione o gênero.");
    }
}

// --- RECEBER ERRO DO SERVIDOR (NOVIDADE) ---

if (typeof cef !== 'undefined') {
    // Escuta o grito do servidor: cef_emit(playerid, "client:showLoginError", ...)
    cef.on("client:showLoginError", (mensagem) => {
        showError(mensagem);
    });
}

// Função para mostrar erro de forma elegante
function showError(msg) {
    const inputGroup = document.querySelector('.input-group');
    const input = document.getElementById('login-pass');
    
    // Altera o placeholder para mostrar o erro
    input.value = "";
    input.placeholder = msg;
    inputGroup.style.borderColor = "#ff4444";
    inputGroup.style.boxShadow = "0 0 10px rgba(255, 68, 68, 0.2)";

    // Efeito de "sacudir" (opcional, requer CSS)
    inputGroup.classList.add('shake');
    
    // Reseta o estilo após 3 segundos
    setTimeout(() => {
        inputGroup.style.borderColor = "rgba(255, 255, 255, 0.1)";
        inputGroup.style.boxShadow = "none";
        input.placeholder = "SUA SENHA";
        inputGroup.classList.remove('shake');
    }, 3000);
}
