const readline = require("readline");

// 1. configuracion

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function preguntar(mensaje) {
    return new Promise((respuesta) => {
        rl.question(mensaje, respuesta); 
    });
}

// 2. clase nodo

class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
    }
}

// 3. clase cola

class Cola {
    constructor(capacidadMax){
        this.inicio = null;
        this.final = null;
        this.tamano = 0;
        this.capacidadMax = capacidadMax;
    }

    //agregar un pedido a la cola

    encolar(valor) {

        if (this.tamano >= this.capacidadMax) {
        return false;
        }

        let nuevoNodo = new Nodo(valor);

        if (this.inicio === null) {
            this.inicio = nuevoNodo;
            this.final = nuevoNodo;
        } else {
            this.final.siguiente = nuevoNodo;
            this.final = nuevoNodo;
        }
        this.tamano++;

        return true;
    }

    //Atender primer pedido

    desencolar() {
        if (this.inicio === null) {
            return null;
        }

        let pedidoAtendido = this.inicio.valor;
        this.inicio = this.inicio.siguiente;
        this.tamano--;

        if(this.inicio === null) {
            this.final = null;
        }

        return pedidoAtendido;
    }

    //Consultar siguiente pedido

    consultarSiguiente() {
        if (this.inicio === null) {
            return null;
        }

        return this.inicio.valor;
    }

    //Monstrar todo los pedidos

    mostrarCola() {
        if(this.inicio === null) {
            return [];
        }

        let actual = this.inicio;
        let pedidos = [];

        while(actual !== null) {
            pedidos.push(actual.valor);
            actual = actual.siguiente;
        }

        return pedidos;
    }

}

// 4. Simulador


const N = 7;
const capacidadMax = (N % 4) + 3;

const pedidos = new Cola(capacidadMax);

// 5. MENU PRINCIPAL

async function menu() {
    let opcion;

    console.log("\n===============================");
    console.log("\n--- SISTEMA DE PEDIDOS ---");
    console.log("\n===============================");
    

    do {

        console.log("\n--- MENU PRINCIPAL ---");
        console.log("1. Agregar pedido");
        console.log("2. Atender pedido");
        console.log("3. Consultar siguiente pedido");
        console.log("4. Mostrar todos los pedidos");
        console.log("5. Salir");
        console.log("\n===============================");

        opcion = await preguntar("Seleccione una opción: ");

        switch(opcion.trim()) {
            case "1":
                let pedido = await preguntar("Ingrese el nombre del pedido: ");

                nombrePedido = pedido.trim();
                if(nombrePedido === "") {
                    console.log("ERROR: El nombre del pedido no puede estar vacío.");
                    break;
                } 

                if (pedidos.encolar(nombrePedido)) {
                    console.log("Pedido agregado correctamente: ");
                } else {
                    console.log("ERROR: OVERFLOW: La cola está llena. No se puede agregar más pedidos.");
                }

                break;

            case "2":
                let atendido = pedidos.desencolar();
                if (atendido === null) {
                    console.log("ERROR: UNDERFLOW: La cola está vacía. No hay pedidos para atender.");
                } else {
                    console.log("Pedido atendido correctamente: ", atendido);
                }
                break;
                
            case "3":
                let siguiente = pedidos.consultarSiguiente();
                if (siguiente === null) {
                    console.log("No hay pedidos pendientes.");
                } else {
                    console.log("Siguiente pedido: ", siguiente);
                }
                break;

            case "4":
                let lista = pedidos.mostrarCola();
                if (lista.length === 0) {
                    console.log("La cola está vacía.");
                } else {
                    console.log("Pedidos pendientes: ");

                    lista.forEach((pedido, indice) => {
                        console.log((indice + 1) + ". " + pedido);
                    });
                }
                
                console.log("Total de pedidos: ", pedidos.tamano);
                console.log("capacidad disponible: ", pedidos.capacidadMax - pedidos.tamano);
                
                break;

            case "5":
                console.log("Saliendo del sistema de pedidos...");
                break;

            default:
                console.log("Opción inválida. Por favor, seleccione una opción válida.");
        }

    } while(opcion.trim() !== "5");

    rl.close();

} 

// 6. Ejecutar el simulador

menu();

