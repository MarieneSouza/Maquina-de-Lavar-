let estados = ["Lavagem", "Enxágue", "Centrifugação", "Secagem"];
let estadoAtual = 0;
let portaAberta = false;

function atualizarLEDs() {
    estados.forEach((estado, index) => {
        let led = document.getElementById(`led-${estado.toLowerCase()}`);
        led.classList.remove('active');
        if (index === estadoAtual) {
            led.classList.add('active');
        }
    });
}

function startMachine() {
    estadoAtual = 0;
    document.getElementById("start-button").disabled = true;
    document.getElementById("skip-button").disabled = false;
    atualizarLEDs();
    executarProximaTarefa();
}

function executarProximaTarefa() {
    if (estadoAtual < estados.length) {
        atualizarLEDs();
        setTimeout(() => {
            estadoAtual++;
            executarProximaTarefa();
        }, 3000);
    } else {
        document.getElementById("start-button").disabled = false;
        document.getElementById("skip-button").disabled = true;
        estados.forEach(estado => document.getElementById(`led-${estado.toLowerCase()}`).classList.remove('active'));
    }
}

function skipTask() {
    if (estadoAtual < estados.length) {
        estadoAtual++;
        atualizarLEDs();
        if (estadoAtual === estados.length) {
            document.getElementById("start-button").disabled = false;
            document.getElementById("skip-button").disabled = true;
        }
    }
}

function toggleDoor() {
    portaAberta = !portaAberta;
    document.getElementById("door-status").innerText = `Porta: ${portaAberta ? 'Aberta' : 'Fechada'}`;
    document.getElementById("door-button").innerText = portaAberta ? 'Fechar Porta' : 'Abrir Porta';
    document.getElementById("door-button").classList.toggle('open', portaAberta);
    if (portaAberta) {
        document.getElementById("start-button").disabled = true;
    } else if (estadoAtual === estados.length) {
        document.getElementById("start-button").disabled = false;
    }
}
