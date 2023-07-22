//arreglo con las raynas colocadas
const Reynas = new Array(0);
Reynas.shift();

//detecta el boton precionado
if (padre != null) {
  window.onload = crear;
}

let iniciar = false;


padre.addEventListener("click", (e) => {
  let valorBotton = e.target.value;
  if (!iniciar) {
    iniciar = true;
    Resolver(valorBotton);
  }
});

//btn resolver
let interaciones = 0;
function Resolver(valorBotton) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let id = `${i}` + `${j}`;
      const c = document.getElementById(`Cuadro${id}`);
      c.value = "D";
    }
  }
  let id = valorBotton;
  let c = document.getElementById(`Cuadro${id}`);
  Movimientos(id, true);
  c.value = "ND";
  Reynas[0] = id;
  rfp();
}

//recursividad fuerza profunda
function rfp() {
  console.log("Estado: " + Reynas);
  interaciones++;
  let lo = Reynas.length;
  if (estadoFin()) {
    //cumprueba si se lleno el tablero
    if (Ganador(Reynas.length)) {
      // comprueba si existe un ganador
      PintarSolution(Reynas);
      console.log("interaciones: " + interaciones);
      window.alert("GANASTE\n Interacciones: " + interaciones);
    } else {
      // elimina la hoja
      // console.log(lo + ": id: " + " fin rama");
      borrarDama();
    }
  } else {
    // console.log(lo + ": else: ");
    for (let filas = 0; filas <= 7; filas++) {
      for (let columnas = 0; columnas <= 7; columnas++) {
        let id = `${filas}` + `${columnas}`;
        // console.log(Reynas.length + ": id: " + id);
        const c = document.getElementById(`Cuadro${id}`);
        if (c.value == "D") {
          Movimientos(id, true);
          c.value = "ND";
          Reynas[Reynas.length] = id;
          // console.log(Reynas);
          rfp();
        }
        if ((id == 77) & !estadoFin()) {
          // console.log("rama muerta");
          borrarDama();
        }
      }
    }
    console.log("--------------");
  }
}

function borrarDama() {
  Reynas.pop();
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let valor = `${i}` + `${j}`;
      activar(valor);
    }
  }
  for (let index = 0; index < Reynas.length; index++) {
    Movimientos(Reynas[index], true);
    Desactivar(Reynas[index]);
  }
}

function desicion(id, x) {
  if (x) {
    Desactivar(id);
  } else {
    activar(id);
  }
}

// funcion para encontrar los movimientos se bloquean o liberan
function Movimientos(valor, x) {
  for (let y = 0; y <= 7; y++) {
    let id = `${y}` + valor[1];
    desicion(id, x);
  }

  for (let xx = 0; xx <= 7; xx++) {
    let id = valor[0] + `${xx}`;
    desicion(id, x);
  }

  // abajo derecha
  let p1 = valor[0];
  let p2 = valor[1];
  while (p1 <= 7 || p2 <= 7) {
    p1++;
    p2++;
    let id = `${p1}` + `${p2}`;
    desicion(id, x);
  }

  p1 = valor[0];
  p2 = valor[1];

  // abajo izquierda
  while (p1 <= 7 || p2 >= 0) {
    p1++;
    p2--;
    let id = `${p1}` + `${p2}`;
    desicion(id, x);
  }

  // arriba izquierda
  p1 = valor[0];
  p2 = valor[1];
  while (p1 >= 0 || p2 >= 0) {
    p1--;
    p2--;
    let id = `${p1}` + `${p2}`;
    desicion(id, x);
  }

  // arriba derecha
  p1 = valor[0];
  p2 = valor[1];
  while (p1 >= 0 || p2 <= 7) {
    p1--;
    p2++;
    let id = `${p1}` + `${p2}`;
    desicion(id, x);
  }
}

// desactiva la casilla
function Desactivar(id) {
  const c = document.getElementById(`Cuadro${id}`);
  if (c != null) {
    c.value = "ND";
  }
}

// activala casilla
function activar(id) {
  const c = document.getElementById(`Cuadro${id}`);
  if (c != null) {
    c.value = "D";
  }
}

// anuncia si ganaste o perdiste
function Ganador(x) {
  if (x == 8) {
    console.log("ganaste");
    console.log(Reynas);
    return true;
  } else {
    return false;
  }
}
//comprueba si esta lleno el tablero
function estadoFin() {
  let cantidad = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let id = `${i}` + `${j}`;
      const c = document.getElementById(`Cuadro${id}`);
      if (c.value == "ND") {
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

//reinicia el tablero de juego
function Reiniciar() {
  let c;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let valor = `${i}` + `${j}`;
      // console.log("-");
      c = document.getElementById(`Cuadro${valor}`);
      // let r1 = document.getElementById(`Cuadro${Reynas[0]}`);
      // if (c != r1) {
      // }
      let atributo = c.getAttribute("class");
      let a1 = atributo[0] + atributo[1];
      c.setAttribute("Class", a1);
      c.disabled = false;
    }
  }

  let long = Reynas.length;
  for (let index = 0; index < long; index++) {
    Reynas.pop();
  }
  iniciar = false;
}
