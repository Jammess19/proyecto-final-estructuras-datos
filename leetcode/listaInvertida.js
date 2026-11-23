var reverseList = function(head) {

    // Nodo anterior
    let prev = null;

    // Nodo actual
    let current = head;

    // Recorrer toda la lista
    while (current !== null) {

        // Guardar el siguiente nodo
        let next = current.next;

        // Invertir la conexion
        current.next = prev;

        // Avanzar el nodo anterior
        prev = current;

        // Avanzar el nodo actual
        current = next;
    }

    // Devolver el nuevo inicio
    return prev;
};




// Crear una clase para simular los nodos
class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

// Crear la lista: 1 -> 2 -> 3 -> 4 -> 5
let head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

// Ejecutar la funcion
let resultado = reverseList(head);

// Mostrar la lista invertida
let actual = resultado;

while (actual !== null) {
    console.log(actual.val);
    actual = actual.next;
}
