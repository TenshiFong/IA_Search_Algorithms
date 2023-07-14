public class Pila {
    nodo[] pila;

    public Pila(int longi) {
        this.pila = new nodo[longi];
    }

    public void Elipilla() { // elimina el tope de la pilla
       
        if (pila[TopPilla()] != null) {
            pila[TopPilla()] = null;
        }
    }

    public int TopPilla() { // regresa la longuitud del arreglo para tener el tope
        int top = 0;
        for (int i = 0; i < pila.length; i++) {
            if (pila[i] != null) {
                top++; // suma en 1 por cada valor
            }
        }
        top -= 1; // retorna la posicion exacta el arreglo
        return top;
    }

    public void AgrePilla(nodo nodo) {// agrega un nodo en el tope de la pilla
        int top = TopPilla();
        if (top < (pila.length - 1)) { // valida si esta lleno
            if (pila[top + 1] == null) { // le suma uno para avanzar a la posicion siguiente
                pila[top + 1] = nodo;
            }
        } else {
            System.out.println("pilla llena");
        }
    }
}
