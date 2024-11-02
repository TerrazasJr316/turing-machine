from IPython.display import display, HTML
import time

def multiply(cadena1, cadena2):
    tape = list(cadena1 + '0' + cadena2 + '0')
    head_position = 0
    current_state = 'J'
    
    transitions = {
        'A': {'0': ('A', '0', 'R'), '1': ('B', '0', 'R')},
        'B': {'0': ('C', '0', 'R'), '1': ('B', '1', 'R')},
        'C': {'0': ('D', '1', 'L'), '1': ('C', '1', 'R')},
        'D': {'0': ('E', '0', 'L'), '1': ('D', '1', 'L')},
        'E': {'0': ('H', '1', 'L'), '1': ('F', '1', 'L')},
        'F': {'0': ('G', '1', 'R'), '1': ('F', '1', 'L')},
        'G': {'0': ('A', '0', 'R'), '1': ('A', '1', 'R')},
        'H': {'0': ('-', '-', '-'), '1': ('I', '1', 'R')},
        'I': {'0': ('L', '0', 'L'), '1': ('I', '1', 'R')},
        'J': {'0': ('J', '0', 'R'), '1': ('K', '0', 'R')},
        'K': {'0': ('A', '0', 'R'), '1': ('K', '1', 'R')},
        'L': {'0': ('O', '1', 'L'), '1': ('M', '1', 'L')},
        'M': {'0': ('N', '1', 'R'), '1': ('M', '1', 'L')},
        'N': {'0': ('-', '-', '-'), '1': ('K', '0', 'R')},
        'O': {'0': ('@', '1', 'R'), '1': ('@', '1', 'R')}
    }

    steps_html = "<div id='tape'>"
    while current_state != '@':
        current_symbol = tape[head_position]
        if current_state in transitions and current_symbol in transitions[current_state]:
            next_state, write_symbol, move_direction = transitions[current_state][current_symbol]
            tape[head_position] = write_symbol
            current_state = next_state

            # Actualizar la cinta
            steps_html += "<div class='tape'>"
            for i, symbol in enumerate(tape):
                cell_class = "cell head" if i == head_position else "cell"
                steps_html += f"<span class='{cell_class}'>{symbol}</span>"
            steps_html += "</div><br>"

            # Movimientos de cabezal
            if move_direction == 'R':
                head_position += 1
            elif move_direction == 'L':
                head_position -= 1

            display(HTML(steps_html))
            time.sleep(0.5)

# Registrar la función en Google Colab
import google.colab
google.colab.kernel.invokeFunction('multiply', multiply)
