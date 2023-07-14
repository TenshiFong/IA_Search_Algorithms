public class cola {
    nodo[] Cola;

    public cola(int longitud) {
        this.Cola = new nodo[longitud];
    }

    public void EliCola() {
        nodo x = null;
        for (int i = 0; i < this.Cola.length - 1; i++) {
            x = this.Cola[i + 1];
            this.Cola[i] = x;
            if (this.Cola[i + 1] == this.Cola[i]) {
                this.Cola[i + 1] = null;
            }
        }
    }

    public void AgreCola(nodo nodo) {
        int i = 0;
        while (Cola[i] != null & i < (Cola.length - 1)) {
            i++;
        }
        if (Cola[i] == null) {
            Cola[i] = nodo;
            // System.out.println("nodo agregado");

        } else {
            System.out.println("cola llena");
        }
    }
}
