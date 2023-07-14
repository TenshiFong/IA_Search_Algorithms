import java.util.Arrays;

public class App {

    public static nodo nodoEncontrado = null;
    public static boolean encontrado = false;
    public static int costo = 0; // costo de ruta
    public static int numNodo = 0;
    public static int[][] estado_ini = { { 1, 2, 3, 4 }, { 5, 6, 7, 8 }, { 9, 0, 11, 12 }, { 13, 10, 14, 15 } };
    public static int[][] estado_fin = { { 1, 2, 3, 4 }, { 5, 6, 7, 8 }, { 9, 10, 11, 12 }, { 13, 14, 15, 0 } };
    public static nodo raiz;

    public static void main(String[] args) throws Exception {
        // crenado los estados manualmente

        // creando nodos
        raiz = new nodo(estado_ini, numNodo, null, 0, 0);
        // creacion de pilla
        Pila pila = new Pila(15);
        pila.AgrePilla(raiz);
        CrearArbol(pila);
        System.out.println("\n\n\nJuego Puzzle 16\nAscenso en la colina\n\n");
        System.out.print("Estado inical: ");
        imprime(estado_ini);
        System.out.println("\nBuscando... ");
        buscar(raiz);
        // impresion
        if (nodoEncontrado == null) {
            System.out.println("No se encontro una solución");
        } else {
            System.out.print("\nEncontrado en el nodo: " + nodoEncontrado.numNodo + "\n");
            System.out.print("Estado final: ");
            imprime(estado_fin);
            System.out.print("Ruta hecha :");
            ruta(nodoEncontrado);
            System.out.println("\nCoste de ruta: " + costo);
            System.out.println("");
        }
    }

    public static void buscar(nodo estado) {
        int hijosExistentes = 0;
        estado.setVisitado();
        System.out.println("--------------\n Nodo:" + estado.numNodo);
        // ordenarCosto(estado.hijos);
        OrdenarVisitados(estado.hijos);
        hijos(estado);

        for (int i = 0; i < estado.hijos.length; i++) {
            if (estado.hijos[i] != null) {
                hijosExistentes++;
            }
        }
        if (hijosExistentes == 0) {
            if (Arrays.deepEquals(estado_fin, estado.dato)) {
                System.out.println("--------------\n¡Estado Encontrado!, En el nodo: " + estado.numNodo);
                System.out.println("-----------------");
                nodoEncontrado = estado;
                encontrado = true;
            }
            if (!encontrado) {
                buscar(raiz);
            }
        }
        if (!encontrado) {
            buscar(estado.hijos[0]);
        }

    }

    public static void ruta(nodo x) { // imprime el estado del nodo recivido
        if (x.padre == null) {

        } else {
            costo += x.costo;
            ruta(x.padre);
        }
        System.out.print(" " + x.numNodo);
    }

    public static void imprime(int[][] estado) {
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 4; j++) {
                System.out.print(estado[i][j] + " ");
            }
            System.out.print("-- ");
        }
        System.out.println("");
        System.out.println("");
    }

    public static void CrearArbol(Pila Pilla) {
        int top = Pilla.TopPilla();
        if (Pilla.pila[top].nivel == 3) { // comprueba si el estado del nodo es igual al estado final
            // System.out.println("Fin de rama en el nodo : " + Pilla.pila[top].numNodo);
            // System.out.println("el costo de ruta es: " + Pilla.pila[top].costo);
            
        } else {
            // System.out.println("En nodo: " + Pilla.pila[top].numNodo + " ... Estado No
            // Encontrado");
            // System.out.println(" Nivel actual: " + Pilla.pila[top].nivel + ", Nodo: " +
            // Pilla.pila[top].numNodo);
            // System.out.println("el costo de ruta es: " + Pilla.pila[top].costo);
           

            movArr(Pilla.pila[top]);
            for (int i = 0; i < Pilla.pila[top].hijos.length; i++) { // busqueda
                if (Pilla.pila[top].hijos[i] != null) { // verifica si existe un hijo
                    Pilla.AgrePilla(Pilla.pila[top].hijos[i]);// si existe lo agrega a la pila
                    CrearArbol(Pilla);// se reinicia el ciclo con el nuevo hijo/nodo
                    Pilla.Elipilla();
                }
            }
        }
    }

    public static void movArr(nodo estado) {
        int[] p_v = new int[2];
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 4; j++) {
                if (estado.dato[i][j] == 0) {
                    p_v[0] = i;
                    p_v[1] = j;
                }
            }
        }
        // System.out.println("encontrado en: " + p_v[0] + " " + p_v[1]);
        // imprime(estado.dato);
        int nivel = estado.nivel + 1;
        // arriba

        int[][] arriba = copiar(estado.dato);
        int valorArriba;
        nodo[] arreglo = new nodo[4];
        arreglo[0] = null;
        if (p_v[0] > 0) {
            numNodo++;
            valorArriba = arriba[p_v[0] - 1][p_v[1]];
            // System.out.println("Valor arriba: " + valorArriba);
            arriba[p_v[0] - 1][p_v[1]] = 0;
            arriba[p_v[0]][p_v[1]] = valorArriba;
            arreglo[0] = new nodo(arriba, numNodo, estado, calcularCosto(arriba), nivel);
        }

        // imprime(arriba);
        // abajo
        int[][] abajo = copiar(estado.dato);
        int valorAbajo;
        arreglo[1] = null;
        if (p_v[0] < 3) {
            numNodo++;
            valorAbajo = abajo[p_v[0] + 1][p_v[1]];
            // System.out.println("Valor abajo: " + valorAbajo);
            abajo[p_v[0] + 1][p_v[1]] = 0;
            abajo[p_v[0]][p_v[1]] = valorAbajo;
            arreglo[1] = new nodo(abajo, numNodo, estado, calcularCosto(abajo), nivel);
        }
        // imprime(abajo);

        // izquierda
        int[][] izquierda = copiar(estado.dato);
        int valorIzquirda;
        arreglo[2] = null;
        if (p_v[1] > 0) {
            numNodo++;
            valorIzquirda = izquierda[p_v[0]][p_v[1] - 1];
            // System.out.println("Valor izquierda: " + valorIzquirda);
            izquierda[p_v[0]][p_v[1] - 1] = 0;
            izquierda[p_v[0]][p_v[1]] = valorIzquirda;
            arreglo[2] = new nodo(izquierda, numNodo, estado, calcularCosto(izquierda), nivel);
        }
        // imprime(izquierda);

        // derecha
        int[][] derecha = copiar(estado.dato);
        int valorDerecha;

        arreglo[3] = null;
        if (p_v[1] < 3) {
            numNodo++;
            valorDerecha = derecha[p_v[0]][p_v[1] + 1];
            // System.out.println("Valor Derecha: " + valorDerecha);
            derecha[p_v[0]][p_v[1] + 1] = 0;
            derecha[p_v[0]][p_v[1]] = valorDerecha;
            arreglo[3] = new nodo(derecha, numNodo, estado, calcularCosto(derecha), nivel);
        }
        // imprime(derecha);
        int hijo = 0;
        for (int i = 0; i < arreglo.length; i++) {
            if (arreglo[i] != null) {
                estado.agreNodo(arreglo[i], hijo);
                hijo++;
            }
        }

    }

    public static nodo[] ordenarCosto(nodo[] hijos) {
        nodo[] x = hijos;
        nodo respaldo;

        for (int j = 0; j < x.length; j++) {
            for (int i = 0; i < x.length - 1; i++) {
                if (x[i + 1] != null) {
                    if (x[i].costo < x[i + 1].costo) {
                        respaldo = x[i + 1];
                        x[i + 1] = x[i];
                        x[i] = respaldo;
                    }
                }
            }
        }
        return x;
    }

    public static nodo[] OrdenarVisitados(nodo[] hijos) {
        nodo[] x = hijos;
        nodo respaldo;

        for (int j = 0; j < x.length; j++) {
            for (int i = 0; i < x.length - 1; i++) {
                if (x[i + 1] != null) {
                    if (x[i].visitado > x[i + 1].visitado) {
                        respaldo = x[i + 1];
                        x[i + 1] = x[i];
                        x[i] = respaldo;
                    }
                }
            }
        }
        return x;
    }

    public static int calcularCosto(int[][] estado) {
        int costo = 0;
        for (int i = 0; i < estado.length; i++) {
            for (int j = 0; j < estado.length; j++) {
                if (estado[i][j] == estado_fin[i][j]) {
                    costo++;
                }
            }
        }
        return costo;
    }

    public static int[][] copiar(int[][] estado) {
        int[][] nuevo = new int[4][4];
        for (int i = 0; i < nuevo.length; i++) {
            for (int j = 0; j < nuevo.length; j++) {
                nuevo[i][j] = estado[i][j];
            }
        }
        return nuevo;
    }

    public static void hijos(nodo padre) {
        int cantidadHijos = 0;

        for (int i = 0; i < padre.hijos.length; i++) {
            if (padre.hijos[i] != null) {
                cantidadHijos++;
            }
        }
        if (cantidadHijos > 0) {
            System.out.print("Hijos:");

            for (int i = 0; i < padre.hijos.length; i++) {
                if (padre.hijos[i] != null) {
                    System.out.print("|" + padre.hijos[i].numNodo);
                }
            }
            System.out.println("");
            System.out.print("Costo:");

            for (int i = 0; i < padre.hijos.length; i++) {
                if (padre.hijos[i] != null) {
                    System.out.print("|" + padre.hijos[i].costo);
                }
            }
            System.out.println("");

        }

    }
}
