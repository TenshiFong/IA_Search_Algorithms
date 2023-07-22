// class cola {
//   Cola = new Array(0);

//   constructor() {}

//   EliCola() {
//     cola.shift();
//   }

//   AgreCola(nodo) {
//     cola.push(nodo);
//   }
// }

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
  const cola = new Array(0);
  cola[0] = raiz;
  interaciones = 0;
  bAnchura(cola);
}
//busqueda por profundidad
function bAnchura(cola) {
  interaciones++;

  if (cola[0].nivel == 8) {
    encontrado = true;
    console.log("--------------- encontrado------------");
    console.log("Estado: " + cola[0].dato + " --" + cola[0].nivel);
    console.log("interaciones: " + interaciones);
    enviarAnimacion(cola[0].dato);
    // window.alert("GANASTE\n Interacciones: " + interaciones);
  }
  if (!encontrado) {
    // impres(cola);
    cola[0].getHijos();
    for (let i = 0; i < cola[0].hijos.length; i++) {
      cola.push(cola[0].hijos[i]);
    }
    cola.shift();
    bAnchura(cola);
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

function impres(cola) {
  let datos = new Array(0);
  for (let i = 0; i < cola.length; i++) {
    datos.push(cola[i].Posi);
  }
  console.log(datos);
}
