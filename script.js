let estados = ["Lavagem", "Enxague", "Centrifugacao", "Secagem"];
let estadoAtual = 0;
let portaAberta = false;
let cicloAtivo = false;
let cicloInterval;

function atualizarLEDs() {
    estados.forEach((estado, index) => {
        let led = document.getElementById(`led-${estado.toLowerCase()}`);
        if (led) {  // Verifica se o LED existe
            if (index === estadoAtual) {
                led.classList.add('active'); // Ativa o LED atual
            } else {
                led.classList.remove('active'); // Desativa outros LEDs
            }
        }
    });
}

function startMachine() {
    if (portaAberta) return;  // Não inicia se a porta estiver aberta

    estadoAtual = 0;
    maquinaIniciada = true;
    document.getElementById("start-button").disabled = true;
    document.getElementById("skip-button").disabled = false;
    atualizarLEDs();
    executarProximaTarefa();
}

function executarProximaTarefa() {
    if (portaAberta) return;  // Se a porta estiver aberta, não faz nada

    if (estadoAtual < estados.length) {
        atualizarLEDs();
        intervalo = setTimeout(() => {
            estadoAtual++;
            executarProximaTarefa();
        }, 10000); // Transição após 10 segundos
    } else {
        finalizarCiclo();
    }
}

function skipTask() {
    if (portaAberta || !maquinaIniciada || estadoAtual >= estados.length) return;

    clearTimeout(intervalo);
    estadoAtual++;
    if (estadoAtual < estados.length) {
        executarProximaTarefa();
    } else {
        finalizarCiclo();
    }
}

function toggleDoor() {
    portaAberta = !portaAberta;
    document.getElementById("door-status").innerText = `Porta: ${portaAberta ? 'Aberta' : 'Fechada'}`;
    document.getElementById("door-button").innerText = portaAberta ? 'Fechar Porta' : 'Abrir Porta';
    document.getElementById("door-button").classList.toggle('open', portaAberta);

    if (portaAberta) {
        clearTimeout(intervalo);  // Pausa a máquina
        document.getElementById("skip-button").disabled = true;
    } else {
        if (maquinaIniciada) {
            document.getElementById("skip-button").disabled = false;
            executarProximaTarefa();  // Retoma a máquina
        }
    }
}

function finalizarCiclo() {
    maquinaIniciada = false;
    document.getElementById("start-button").disabled = false;
    document.getElementById("skip-button").disabled = true;
    estados.forEach(estado => {
        let led = document.getElementById(`led-${estado.toLowerCase()}`);
        led.classList.remove('active');
    });
}