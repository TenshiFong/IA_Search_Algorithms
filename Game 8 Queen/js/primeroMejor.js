if (padre != null) {
  window.onload = crear;
}

//globales
let tab = new tablero();
let interaciones = 0;
let encontrado = false;
let iniciar = false;

//funcion para detectar que cuadrado se preciono
padre.addEventListener("click", (e) => {
  let valorBotton = e.target.value;
  if (!iniciar) {
    iniciar = true;
    Resolver(valorBotton);
  }
});

function Resolver(valor) {
  let raiz = new nodo(null);
  raiz.setDato(`${valor}`);
  raiz.setNivel(1);
  raiz.setCosto(1);
  const pilla = new Array(0); //pila para crear arbol
  pilla[0] = raiz;
  crearArbol(pilla);
  const pilla2 = new Array(0); //pila para recorido
  pilla2[0] = raiz;
  interaciones = 0;
  cantidadNodos(raiz);
  console.log(" ui: " + interaciones);
  interaciones = 0;
  primeroMejor(pilla2);
}

function cantidadNodos(pilla) {
  interaciones++;
  for (let i = 0; i < pilla.hijos.length; i++) {
    cantidadNodos(pilla.hijos[i]);
  }
}

function primeroMejor(pilla) {
  let top = pilla.length - 1;
  interaciones++;

  if (pilla[top].nivel == 8) {
    encontrado = true;
    console.log("--------------- encontrado------------");
    console.log("Estado: " + pilla[top].dato);
    console.log("interaciones: " + interaciones);
    // PintarSolution(pilla[top].dato);
    enviarAnimacion(pilla[top].dato);
    console.log(pilla[top].dato);
    // window.alert("GANASTE\n Interacciones: " + interaciones);
  }
  if (!encontrado) {
    pilla[top].hijos = ordenarPM(pilla[top].hijos);
    console.log("------------------");
    console.log("Rama: " + pilla[top].dato + " <-- Nodo entrante");
    pilla[top].getHijos();
    pilla[top].getHijosCostos();
    for (let i = 0; i < pilla[top].hijos.length; i++) {
      pilla[pilla.length] = pilla[top].hijos[i];
      primeroMejor(pilla);
      pilla.pop();
    }
  }
}
//ordena por el Costo
function ordenarPM(hijos) {
  let x = hijos;
  let respaldo;
  for (j = 0; j < x.length; j++) {
    for (i = 0; i < x.length - 1; i++) {
      if (x[i].costo > x[i + 1].costo) {
        respaldo = x[i + 1];
        x[i + 1] = x[i];
        x[i] = respaldo;
      }
    }
  }

  return x;
}

//funcioes para creacion de arbol
function crearArbol(pilla) {
  let top = pilla.length - 1;
  // console.log("Estado: " + pilla[top].dato + " -- " + pilla[top].nivel);
  tab.cambiarTablero(pilla[top].dato);
  let costo = darCosto(tab);
  pilla[top].setCosto(costo);
  //cumprueba si se lleno el tablero
  if (tab.lleno()) {
    // console.log("fin")
    // darCosto(pilla[top]);
  } else {
    crearHijos(pilla[top]);
    // console.log("i: " + interaciones);
    for (let i = 0; i < pilla[top].hijos.length; i++) {
      pilla[pilla.length] = pilla[top].hijos[i];
      crearArbol(pilla);
      pilla.pop();
    }
  }
}

function darCosto(tablero) {
  let espaciosVacios = 0;
  for (let filas = 0; filas <= 7; filas++) {
    for (let columnas = 0; columnas <= 7; columnas++) {
      if (tablero.tablero[filas][columnas] == "D") {
        espaciosVacios++;
      }
    }
  }
  // console.log(espaciosVacios);
  return espaciosVacios;
}

function crearHijos(padre) {
  let cantidadHIjos = 0;

  for (let filas = 0; filas <= 7; filas++) {
    for (let columnas = 0; columnas <= 7; columnas++) {
      let id = `${filas}` + `${columnas}`;

      if ((tab.tablero[filas][columnas] == "D") & (cantidadHIjos <= 4)) {
        const hijo = new nodo(padre);
        for (let j = 0; j < padre.dato.length; j++) {
          hijo.setDato(padre.dato[j]);
        }
        hijo.setDato(id);
        hijo.setPosi(id);
        hijo.setNivel(padre.nivel + 1);
        padre.setHijos(hijo);
        cantidadHIjos++;
      }
    }
  }
}
