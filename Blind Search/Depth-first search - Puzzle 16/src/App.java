public class App {
    public static nodo encontrado = null;
    public static int costo = 0; //costo de ruta
    public static int[] estado_ini = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 10, 14, 15 };
    public static int[] estado_fin = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0 };

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

        // creacion de pilla
        Pila pila = new Pila(10);

        pila.AgrePilla(raiz);

        System.out.println("\n\n\nJuego Puzzle 16\nPrimero en Profundidad\n\n");
        System.out.print("Estado inical: ");
        Mostrar(raiz);
        System.out.println("\nBuscando... " + pila.TopPilla());
        buscar(pila);

        // impresion
        if (encontrado == null) {
            System.out.println("No se encontro una solución");
        } else {
            System.out.print("\nEncontrado en el nodo: " + encontrado.numNodo + "\n");
            System.out.print("Estado final: ");
            Mostrar(encontrado);
            System.out.print("Ruta hecha :");
            ruta(encontrado);
            System.out.println("\nCoste de ruta: " + costo);
            System.out.println("");
        }

    }

    public static void buscar(Pila Pilla) {

        int top = Pilla.TopPilla();
        if (Pilla.pila[top].dato.equals(estado_fin)) { // comprueba si el estado del nodo es igual al estado final
            System.out.println("--------------\n¡Estado Encontrado!, En el nodo: " + Pilla.pila[top].numNodo);
            System.out.println("-----------------");
            encontrado = Pilla.pila[top]; // almacena el nodo encontrado

        } else {
            System.out.println("En nodo: " + Pilla.pila[top].numNodo + " ... Estado No Encontrado");
            for (int i = 0; i < Pilla.pila[top].hijos.length; i++) { // busqueda
                if (Pilla.pila[top].hijos[i] != null) { // verifica si existe un hijo 
                    Pilla.AgrePilla(Pilla.pila[top].hijos[i]);//si existe lo agrega a la pila
                    buscar(Pilla); // se reinicia el ciclo con el nuevo hijo/nodo
                    Pilla.Elipilla(); 
                    ;
                }
            }
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

    public static void ruta(nodo x) { // imprime el estado del nodo recivido
        if (x.padre == null) {

        } else {
            costo++;
            ruta(x.padre);
        }
        System.out.print(" " + x.numNodo);
    }

}
