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
let raiz = new nodo(null);

function Resolver(valor) {
  raiz.setDato(`${valor}`);
  raiz.setPosi(`${valor}`);
  raiz.setNivel(1);
  raiz.setCosto(1);
  //pila para crear arbol
  const pilla = new Array(0);
  pilla[0] = raiz;
  crearArbol(pilla);

  interaciones = 0;
  asColina(raiz);
}

let enviados = 0;
//funcion de busqueda A Colina
function asColina(pilla) {
  interaciones++;
  enviados++;
  console.log("Rama: " + pilla.dato + " <-- Nodo entrante");

  pilla.hijos = ordenarCosto(pilla.hijos); //se ordenar primero por costo
  pilla.hijos = ordenarPM(pilla.hijos); //siempre se entrara el recorido con este orden
  pilla.getHijos(); // nuestro los hijos
  pilla.setVisitado(); // suma al noto la cantidad de visitas
  if (!encontrado) {
    colocarReyna(pilla.Posi);
  }
  //si se llega a un estado sin hijo, se vuelve a llamar
  if (pilla.hijos.length == 0) {
    if (pilla.nivel == 8) {
      encontrado = true;
      console.log("--------------- encontrado------------");
      console.log("Estado: " + pilla.dato);
      console.log("interaciones: " + interaciones);
      window.alert("GANASTE\n Interacciones: " + interaciones);
    }
    if (!encontrado) {
      //si llega a una hoja, se elimina, ya para que no entre de nuevo
      enviarAnimacion(pilla);
      borrarHoja(pilla.padre, pilla);
      console.log("                 raiz");
      enviados = 0;
      setTimeout(asColina, 50 * enviados, raiz);
    }
  }

  //entra al hijo si no se a encontrado una solución
  if (!encontrado) {
    let x = pilla.hijos[0];
    setTimeout(asColina, 50 * enviados, x);
  }
}

function enviarAnimacion(nodo) {
  if (nodo != null) {
    colocarReyna(nodo.Posi);
    enviarAnimacion(nodo.padre);
  }
}

// si se llega un nodo sin hijo se borra
function borrarHoja(padre, hijo) {
  for (let i = 0; i < padre.hijos.length; i++) {
    if (padre.hijos[i] == hijo) {
      padre.hijos.splice(i, 1);
    }
  }
}

//ordenar por visitado, en caso de que queden hijos
function ordenarPM(hijos) {
  let x = hijos;
  let respaldo;
  for (j = 0; j < x.length; j++) {
    for (i = 0; i < x.length - 1; i++) {
      if (x[i].getVisitado() > x[i + 1].getVisitado()) {
        respaldo = x[i + 1];
        x[i + 1] = x[i];
        x[i] = respaldo;
      }
    }
  }
  return x;
}

//ordena por el Costo
function ordenarCosto(hijos) {
  let x = hijos;
  let respaldo;
  for (j = 0; j < x.length; j++) {
    for (i = 0; i < x.length - 1; i++) {
      if (x[i].costo < x[i + 1].costo) {
        respaldo = x[i + 1];
        x[i + 1] = x[i];
        x[i] = respaldo;
      }
    }
  }

  return x;
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

function crearArbol(pilla) {
  let top = pilla.length - 1;
  // console.log("Estado: " + pilla[top].dato + " -- " + pilla[top].nivel);
  tab.cambiarTablero(pilla[top].dato);
  let costo = darCosto(tab);
  pilla[top].setCosto(costo);
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
      if ((tab.tablero[filas][columnas] == "D") & (cantidadHIjos <= 11)) {
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
