//cargar el tablero al iniciar
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
  raiz.setPosi(`${valor}`);
  raiz.setNivel(1);
  const pilla = new Array(0);
  pilla[0] = raiz;
  crearArbol(pilla);
  const pilla2 = new Array(0);
  pilla2[0] = raiz;
  interaciones = 0;
  bProfundidad(pilla2);
}
//busqueda por profundidad
function bProfundidad(pilla) {
  let top = pilla.length - 1;
  interaciones++;
  if (pilla[top].nivel == 8) {
    encontrado = true;
    console.log("--------------- encontrado------------");
    console.log("Estado: " + pilla[top].dato + " --" + pilla[top].nivel);
    console.log("interaciones: " + interaciones);
    PintarSolution(pilla[top].dato);
    window.alert("GANASTE\n Interacciones: " + interaciones);
  }
  if (!encontrado) {
    console.log("Rama: " + pilla[top].dato + " <-- Nodo entrante");
    pilla[top].getHijos();
    for (let i = 0; i < pilla[top].hijos.length; i++) {
      pilla[pilla.length] = pilla[top].hijos[i];
      bProfundidad(pilla);
      pilla.pop();
    }
  }
}

function crearArbol(pilla) {
  let top = pilla.length - 1;
  // console.log("Estado: " + pilla[top].dato + " -- " + pilla[top].nivel);
  tab.cambiarTablero(pilla[top].dato);

  //cumprueba si se lleno el tablero
  if (tab.lleno()) {
  } else {
    crearHijos(pilla[top]);
    for (let i = 0; i < pilla[top].hijos.length; i++) {
      pilla[pilla.length] = pilla[top].hijos[i];
      crearArbol(pilla);
      pilla.pop();
    }
  }
}

function crearHijos(padre) {
  let cantidadHIjos = 0;
  for (let filas = 0; filas <= 7; filas++) {
    for (let columnas = 0; columnas <= 7; columnas++) {
      let id = `${filas}` + `${columnas}`;
      if ((tab.tablero[filas][columnas] == "D") & (cantidadHIjos <= 6)) {
        const hijo = new nodo(padre);
        for (let j = 0; j < padre.dato.length; j++) {
          hijo.setDato(padre.dato[j]);
        }
        hijo.setDato(id);
        hijo.setPosi(id);
        hijo.setNivel(padre.nivel + 1);
        hijo.setCosto(padre.nivel + 1);
        padre.setHijos(hijo);
        cantidadHIjos++;
      }
    }
  }
}
