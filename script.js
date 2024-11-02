let tape = [];
let currentState = 'J';
let headPosition = 0;

function iniciarMultiplicacion() {
    const input1 = document.getElementById('input1').value;
    const input2 = document.getElementById('input2').value;

    // Reiniciar la cinta y el estado
    tape = (input1 + '0' + input2).split('');
    currentState = 'J';
    headPosition = 0;

    renderTape();
    ejecutarPaso();
}

function renderTape() {
    const tapeContainer = document.getElementById('tape');
    tapeContainer.innerHTML = '';
    tape.forEach((symbol, index) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        if (index === headPosition) {
            cell.classList.add('active');
        }
        if (currentState === '@' && index === headPosition) {
            cell.classList.add('accepted');
        }
        cell.innerText = symbol;
        tapeContainer.appendChild(cell);
    });

    // Posicionar la flecha sobre la celda activa
    const arrow = document.getElementById('arrow');
    const activeCell = document.querySelector('.cell.active');
    if (activeCell) {
        const rect = activeCell.getBoundingClientRect();
        const containerRect = tapeContainer.getBoundingClientRect();
        arrow.style.left = `${rect.left - containerRect.left + rect.width / 2 - 15}px`;
    }
}

function agregarCeldaSiEsNecesario() {
    // Agrega una nueva celda de '0' al final de la cinta
    if (headPosition >= tape.length) {
        tape.push('0'); // Añade una celda al final si la cabeza está en el último índice
        renderTape(); // Renderiza la cinta con la nueva celda
    }
}

function actualizarMensajeTransicion(symbol, nextState, direction) {
    const messageElement = document.getElementById('transitionMessage');
    messageElement.innerText = `Estado: ${currentState}, Símbolo: ${symbol}, Siguiente Estado: ${nextState}`;
}

function ejecutarPaso() {
    setTimeout(() => {
        if (headPosition < 0 || headPosition >= tape.length) {
            alert('Error: Cabeza fuera de los límites de la cinta');
            return;
        }

        const symbol = tape[headPosition];
        let nextState = currentState; // Variable para el próximo estado
        let direction = '';

        // Transiciones basadas en la tabla proporcionada
        switch (currentState) {
            case 'J':
                if (symbol === '0') {
                    headPosition++; // Se deja el 0, gira a la derecha
                    nextState = 'J';
                } else if (symbol === '1') {
                    tape[headPosition] = '0'; // Cambia 1 por 0
                    nextState = 'K'; // Cambia a estado K
                    headPosition++; // Gira a la izquierda
                }
                break;
            case 'K':
                if (symbol === '0') {
                    headPosition++; // Se deja el 0, gira a la derecha
                    nextState = 'A'; // Cambia a estado A
                } else if (symbol === '1') {
                    nextState = 'K'; // Permanece en K
                    headPosition++; // Gira a la derecha
                }
                break;
            case 'A':
                if (symbol === '0') {
                    nextState = 'A'; // Cambia a estado A
                    headPosition++; // Gira a la derecha
                } else if (symbol === '1') {
                    tape[headPosition] = '0';
                    nextState = 'B'; // Cambia a estado B
                    headPosition++; // Gira a la derecha
                }
                break;
            case 'B':
                if (symbol === '0') {
                    nextState = 'C'; // Cambia a estado C
                    headPosition++; // Gira a la derecha
                    agregarCeldaSiEsNecesario();
                } else if (symbol === '1') {
                    nextState = 'B'; // Permanece en B
                    headPosition++; // Gira a la derecha
                    agregarCeldaSiEsNecesario();
                }
                break;
            case 'C':
                if (symbol === '0') {
                    tape[headPosition] = '1';
                    nextState = 'D'; // Cambia a estado D
                    headPosition--; // Gira a la derecha
                } else if (symbol === '1') {
                    nextState = 'C'; // Permanece en C
                    headPosition++; // Gira a la izquierda
                    agregarCeldaSiEsNecesario();
                }
                break;
            case 'D':
                if (symbol === '0') {
                    nextState = 'E'; // Cambia a estado E
                    headPosition--; // Gira a la izquierda
                } else if (symbol === '1') {
                    nextState = 'D'; // Permanece en D
                    headPosition--; // Gira a la izquierda
                }
                break;
            case 'E':
                if (symbol === '0') {
                    tape[headPosition] = '1';
                    nextState = 'H'; // Cambia a estado H
                    headPosition--; // Gira a la derecha
                } else if (symbol === '1') {
                    nextState = 'F'; // Permanece en E
                    headPosition--; // Gira a la derecha
                }
                break;
            case 'F':
                if (symbol === '0') {
                    tape[headPosition] = '1';
                    nextState = 'G'; // Cambia a estado G
                    headPosition++; // Gira a la derecha
                } else if (symbol === '1') {
                    nextState = 'F'; // Permanece en F
                    headPosition--; // Gira a la izquierda
                }
                break;
            case 'G':
                if (symbol === '0') {
                    nextState = 'A'; // Cambia a estado A
                } else if (symbol === '1') {
                    nextState = 'A'; // Cambia a estado A
                }
                break;
            case 'H':
                if (symbol === '1') {
                    nextState = 'I'; // Cambia a estado I
                    headPosition++; // Gira a la derecha
                }
                break;
            case 'I':
                if (symbol === '0') {
                    nextState = 'L'; // Cambia a estado L
                    headPosition--; // Gira a la izquierda
                } else if (symbol === '1') {
                    nextState = 'I'; // Permanece en I
                    headPosition--; // Gira a la izquierda
                }
                break;
            case 'L':
                if (symbol === '0') {
                    tape[headPosition] = '1'; // Cambia 0 a 1
                    nextState = 'O'; // Cambia a estado de aceptación
                    headPosition--;
                } else if (symbol === '1') {
                    nextState = 'M';
                    headPosition--;
                }
                break;
            case 'M':
                if (symbol === '0') {
                    tape[headPosition] = '1';
                    nextState = 'N'; // Cambia a estado N
                    headPosition++; // Gira a la derecha
                } else if (symbol === '1') {
                    nextState = 'M'; // Permanece en M
                    headPosition--; // Gira a la izquierda
                }
                break;
            case 'N':
                if (symbol === '1') {
                    tape[headPosition] = '0';
                    nextState = 'K'; // Cambia a estado K
                    headPosition++; // Gira a la derecha
                }
                break;
            case 'O': // Estado O
                if (symbol === '0') {
                    tape[headPosition] = '1'; // Cambia 0 a 1
                    nextState = '@'; // Cambia al estado de aceptación
                    agregarResultado(); // Agregar resultado a la cinta
                } else if (symbol === '1') {
                    nextState = '@'; // Permanece 1 y cambia al estado de aceptación
                    agregarResultado(); // Agregar resultado a la cinta
                }
                break;
            case '@':
                // Estado de aceptación, ya no se hacen más cambios
                break;
            default:
                return;
        }

        // Actualizamos el mensaje de transición antes de cambiar el estado actual
        actualizarMensajeTransicion(symbol, nextState);

        // Cambiamos al siguiente estado
        currentState = nextState;

        renderTape();

        if (currentState !== '@') {
            ejecutarPaso();
        }
    }, 500);
}

