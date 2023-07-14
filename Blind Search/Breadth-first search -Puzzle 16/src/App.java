public class App {
    public static int[] estado_ini = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 10, 14, 15 };
    public static int[] estado_fin = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0 };
    
    public static nodo encontrado = null;
    public static int costo = 0; // costo de ruta

    public static void main(String[] args) throws Exception {

        // crenado los estados manualmente
        int[] estado_2 = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 14, 15 };
        int[] estado_5 = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15 };

        int[] estado_3 = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 0, 12, 13, 10, 14, 15 };
        int[] estado_6 = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 0, 13, 10, 14, 15 };
        int[] estado_9 = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 13, 10, 14, 0 };

        int[] estado_4 = { 1, 2, 3, 4, 5, 0, 7, 8, 9, 6, 11, 12, 13, 10, 14, 15 };
        int[] estado_7 = { 1, 2, 3, 4, 5, 7, 0, 8, 9, 6, 11, 12, 13, 10, 14, 15 };
        int[] estado_10 = { 1, 2, 3, 4, 5, 7, 8, 0, 9, 6, 11, 12, 13, 10, 14, 15 };

        // creando nodos
        nodo raiz = new nodo(estado_ini, 1, null);

        nodo nodo_2 = new nodo(estado_2, 2, raiz);
        nodo nodo_5 = new nodo(estado_5, 5, nodo_2);
        nodo nodo_fin = new nodo(estado_fin, 8, nodo_5);

        nodo nodo_3 = new nodo(estado_3, 3, raiz);
        nodo nodo_6 = new nodo(estado_6, 6, nodo_3);
        nodo nodo_9 = new nodo(estado_9, 9, nodo_6);

        nodo nodo_4 = new nodo(estado_4, 4, raiz);
        nodo nodo_7 = new nodo(estado_7, 7, nodo_4);
        nodo nodo_10 = new nodo(estado_10, 10, nodo_7);

        // formando el arbol
        raiz.agreNodo(nodo_2, 0);
        nodo_2.agreNodo(nodo_5, 0);
        nodo_5.agreNodo(nodo_fin, 0);

        raiz.agreNodo(nodo_3, 1);
        nodo_3.agreNodo(nodo_6, 0);
        nodo_6.agreNodo(nodo_9, 0);

        raiz.agreNodo(nodo_4, 2);
        nodo_4.agreNodo(nodo_7, 0);
        nodo_7.agreNodo(nodo_10, 0);

        // creacion de cola
        cola Cola = new cola(10);
        Cola.AgreCola(raiz);
  

        System.out.println("\n\n\nJuego Puzzle 16\nPrimero en Anchura\n\n");
        System.out.print("Estado inical: ");
        Mostrar(raiz);
        System.out.println("\nBuscando...");
        buscar(Cola);
    }

    public static void buscar(cola cola) {

        if (cola.Cola[0].dato.equals(estado_fin)) {
            System.out.println("--------------\n¡Estado Encontrado!, En el nodo: " + cola.Cola[0].numNodo);
            System.out.println("-----------------");
            encontrado = cola.Cola[0];
        } else {
            System.out.println("En nodo: " + cola.Cola[0].numNodo + " ... Estado No Encontrado");
            for (int i = 0; i < cola.Cola[0].hijos.length; i++) {
                if (cola.Cola[0].hijos[i] != null) {
                    cola.AgreCola(cola.Cola[0].hijos[i]);
                }
            }
            int j = 0;
            while (cola.Cola[j] != null) {
                j++;
            }
            cola.EliCola();
            buscar(cola);
        }
    }

    public static void Mostrar(nodo x) { // imprime el estado del nodo recivido

        int j = 0;
        System.out.print("|");
        while (x != null && j < x.dato.length) {
            System.out.print(x.dato[j] + "|");
            j++;
        }

        System.out.println("");
    }

}
