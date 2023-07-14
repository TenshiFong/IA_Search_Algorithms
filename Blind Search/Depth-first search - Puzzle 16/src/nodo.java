public class nodo {

    int[] dato = new int[15]; //el dato es el estado del nodo
    nodo[] hijos = new nodo[3];
    nodo padre; // para enlazar con el padre
    int numNodo; //numero del nodo

    public nodo(int[] estado, int NumNodo, nodo padre) { 
        this.dato = estado;
        this.numNodo = NumNodo;
        this.padre = padre;
    }

    public void agreNodo(nodo x, int hijonum) { //agrega los hijos
        this.hijos[hijonum] = x;
    }

}
