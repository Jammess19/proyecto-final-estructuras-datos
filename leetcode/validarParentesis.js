function esValido(lista) {
    let pila = [];
    let pares = {
        ")": "(",
        "]": "[",
        "}": "{"
    }
    
    for (let caracter of lista) {

        if (caracter in pares) {
            let ultimo = pila.pop();

            if (ultimo !== pares[caracter]) {
                return false;
            }
        } else {
            pila.push(caracter);
        }
    }

    return pila.length === 0;
}

console.log(esValido("()"));
console.log(esValido("()[]{}"));
console.log(esValido("(]"));
console.log(esValido("([)]"));
console.log(esValido("{[]}"));

