public class nodo {

    int[][] dato = new int[4][4]; // el dato es el estado del nodo
    nodo[] hijos = new nodo[4];
    nodo padre; // para enlazar con el padre
    int numNodo; // numero del nodo
    int costo;
    int nivel;

    public nodo(int[][] estado, int NumNodo, nodo padre, int costo, int nivel) {
        this.dato = estado;
        this.numNodo = NumNodo;
        this.padre = padre;
        this.costo = costo;
        this.nivel = nivel;
    }

    public void agreNodo(nodo x, int hijonum) { // agrega los hijos
        this.hijos[hijonum] = x;
    }

}
