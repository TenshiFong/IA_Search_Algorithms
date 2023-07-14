public class nodo {

    int[] dato = new int[15];
    nodo[] hijos = new nodo[3];
    nodo padre;
    int numNodo; // numero del nodo

    public nodo(int[] estado, int NumNodo, nodo padre) {
        this.dato = estado;
        this.numNodo = NumNodo;
        this.padre = padre;
    }

    public void agreNodo(nodo x, int n) {
        this.hijos[n] = x;
    }

}
