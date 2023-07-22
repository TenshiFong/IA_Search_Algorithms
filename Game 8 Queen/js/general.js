const padre = document.getElementById("Tabla");
//función para crear la tabla
function crear() {
  var d = 0;
  var dp = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const c = document.createElement("button"); //crea un botton que funciona como cuadro
      let id = `${i}` + `${j}`;
      c.setAttribute("id", `Cuadro${id}`);
      c.value = id;
      d = (j + dp) % 2;
      //pintar cuadros
      if (d == 0) {
        //cuadro color blanco
        c.setAttribute("class", "c1");
        padre.appendChild(c);
      } else {
        //cuadro color azul
        c.setAttribute("class", "c2");
        padre.appendChild(c);
      }
    }
    dp++;
  }
}

function PintarSolution(solucion, interaciones) {
  for (let index = 0; index < 8; index++) {
    for (let j = 0; j < 8; j++) {
      let valor = `${index}` + `${j}`;
      const c = document.getElementById(`Cuadro${valor}`);
      let atributo = c.getAttribute("class");
      let a1 = atributo[0] + atributo[1];
      c.setAttribute("class", a1);
      c.disabled = false;
    }
  }
  for (let index = 0; index < solucion.length; index++) {
    const c = document.getElementById(`Cuadro${solucion[index]}`);
    let atributo = c.getAttribute("class");
    let a1 = atributo[0] + atributo[1];
    a1 = a1 + " Dama";
    c.setAttribute("class", a1);
    c.disabled = false;
  }
}

class tablero {
  tablero = new Array(8);
  constructor() {
    for (let i = 0; i < 8; i++) {
      let x = new Array(8);
      this.tablero[i] = x;
      for (let j = 0; j < 8; j++) {
        this.tablero[i][j] = "D";
      }
    }
  }

  lleno() {
    let cantidad = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.tablero[i][j] == "N") {
          cantidad++;
        }
      }
    }

    if (cantidad >= 64) {
      return true;
    } else {
      return false;
    }
  }
  //Cambiar la disponibilidad del tablero

  // activala casilla
  activar(p1, p2) {
    if ((p1 <= 7) & (p1 >= 0) & (p2 <= 7) & (p2 >= 0)) {
      this.tablero[p1][p2] = "D";
    }
  }
  // desactiva la casilla
  Desactivar(p1, p2) {
    if ((p1 <= 7) & (p1 >= 0) & (p2 <= 7) & (p2 >= 0)) {
      this.tablero[p1][p2] = "N";
    }
  }
  //cambia el valor de las casillas
  desicion(p1, p2, x) {
    if (x) {
      this.Desactivar(p1, p2);
    } else {
      this.activar(p1, p2);
    }
  }

  // funcion para encontrar los movimientos se bloquean o liberan
  Movimientos(valor, x) {
    for (let y = 0; y <= 7; y++) {
      this.desicion(y, valor[1], x);
    }

    for (let xx = 0; xx <= 7; xx++) {
      this.desicion(valor[0], xx, x);
    }

    // abajo derecha
    let p1 = valor[0];
    let p2 = valor[1];
    while (p1 <= 7 || p2 <= 7) {
      p1++;
      p2++;
      this.desicion(p1, p2, x);
    }

    // abajo izquierda
    p1 = valor[0];
    p2 = valor[1];
    while (p1 <= 7 || p2 >= 0) {
      p1++;
      p2--;
      this.desicion(p1, p2, x);
    }

    // arriba izquierda
    p1 = valor[0];
    p2 = valor[1];
    while (p1 >= 0 || p2 >= 0) {
      p1--;
      p2--;
      this.desicion(p1, p2, x);
    }

    // arriba derecha
    p1 = valor[0];
    p2 = valor[1];
    while (p1 >= 0 || p2 <= 7) {
      p1--;
      p2++;
      this.desicion(p1, p2, x);
    }
  }

  cambiarTablero(estado) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.activar(i, j);
      }
    }

    for (let index = 0; index < estado.length; index++) {
      let id = estado[index];
      this.Movimientos(id, true);
      this.Desactivar(id[0], id[1]);
    }
  }
}

class nodo {
  dato = new Array(0);
  Posi;
  hijos = new Array(0);
  padre;
  costo;
  nivel;
  visitado;
  constructor(padre) {
    this.padre = padre;
    this.visitado = 0;
  }
  setCosto(cost) {
    this.costo = cost;
  }
  setNivel(nivel) {
    this.nivel = nivel;
  }
  setHijos(hijo) {
    let index = this.hijos.length;
    this.hijos[index] = hijo;
  }
  setDato(dato) {
    let index = this.dato.length;
    this.dato[index] = dato;
  }

  setPosi(dato) {
    this.Posi = dato;
  }

  setVisitado() {
    this.visitado++;
  }

  getHijos() {
    let h = new Array(0);
    if (this.hijos.length > 0) {
      for (let i = 0; i < this.hijos.length; i++) {
        h[i] = this.hijos[i].Posi;
      }
      console.log("Hijo: " + h);
    } else {
      console.log("Fin rama");
    }
  }

  getHijosCostos() {
    let h = new Array(0);
    if (this.hijos.length > 0) {
      for (let i = 0; i < this.hijos.length; i++) {
        h[i] = this.hijos[i].costo;
      }
      console.log("Costo: " + h);
    }
  }

  getVisitado() {
    return this.visitado;
  }
}

// recarga la pagina web
function Recargar() {
  location.reload();
}

function enviarAnimacion(pilla) {
  for (let i = 0; i < pilla.length; i++) {
    setTimeout(colocarReyna, 500 * i, pilla[i]);
  }
}
