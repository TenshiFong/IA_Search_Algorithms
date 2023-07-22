const Reynas = new Array();
Reynas.shift();

function colocarReyna(cuadro) {
  // esto es encontrar a la reyna en el tablero
  let valorBotton = cuadro;
  console.log("valor cuadro: " + valorBotton);
  const c = document.getElementById(`Cuadro${valorBotton}`);
  let encontrado = false;
  let posición;
  for (let index = 0; index < Reynas.length; index++) {
    if (valorBotton == Reynas[index][0]) {
      encontrado = true;
      posición = index;
    }
  }
  //esta función es para activar y desactivar a la reyna
  if (encontrado == false) {
    // crea la dama
    let rd = new Array();
    let atributo = c.getAttribute("class") + " Dama";
    c.setAttribute("class", atributo);
    Movimientos(valorBotton, false);
    rd[0] = valorBotton;
    rd[1] = true;
    Reynas.push(rd);
    c.setAttribute("class", atributo);
    c.disabled = false;
  } else {
    // elimina la dama
    console.log("ya existe");
    Movimientos(valorBotton, true);
    Reynas.splice(posición, posición + 1);
    Redibujar();
  }
  //valida si la ficha colocada completa el juego
//   Ganador();
}

// funcion para encontrar los movimientos se bloquean o liberan
function Movimientos(valor, bo) {
  for (let y = 0; y <= 7; y++) {
    let id = `${y}` + valor[1];
    if (bo) {
      activar(id);
    } else {
      Desactivar(id);
    }
  }

  for (let x = 0; x <= 7; x++) {
    let id = valor[0] + `${x}`;
    if (bo) {
      activar(id);
    } else {
      Desactivar(id);
    }
  }
  // abajo izquierda
  let p1 = valor[0];
  let p2 = valor[1];
  while (p1 <= 7 || p2 <= 7) {
    p1++;
    p2++;
    let id = `${p1}` + `${p2}`;
    if (bo) {
      activar(id);
    } else {
      Desactivar(id);
    }
  }

  p1 = valor[0];
  p2 = valor[1];

  // abajo derecha
  while (p1 <= 7 || p2 >= 0) {
    p1++;
    p2--;
    let id = `${p1}` + `${p2}`;
    if (bo) {
      activar(id);
    } else {
      Desactivar(id);
    }
  }

  // arriba izquierda
  p1 = valor[0];
  p2 = valor[1];
  while (p1 >= 0 || p2 >= 0) {
    p1--;
    p2--;
    let id = `${p1}` + `${p2}`;
    if (bo) {
      activar(id);
    } else {
      Desactivar(id);
    }
  }

  // arriba derecha
  p1 = valor[0];
  p2 = valor[1];
  while (p1 >= 0 || p2 <= 7) {
    p1--;
    p2++;
    let id = `${p1}` + `${p2}`;
    if (bo) {
      activar(id);
    } else {
      Desactivar(id);
    }
  }
}
// desactiva la casilla
function Desactivar(id) {
  const c = document.getElementById(`Cuadro${id}`);
  if (c != null) {
    if (c.disabled == false) {
      let atributo = c.getAttribute("class") + " efecto";
      c.setAttribute("Class", atributo);
      c.disabled = true;
    }
  }
}
// activala casilla
function activar(id) {
  const c = document.getElementById(`Cuadro${id}`);
  if (c != null) {
    let atributo = c.getAttribute("class");
    let a1 = atributo[0] + atributo[1];
    c.setAttribute("Class", a1);
    // console.log(c.getAttribute("class") + " -- " + id);
    c.disabled = false;
  }
}
//luego de eliminar el cuadro, arregla la tabla
function Redibujar() {
  let c;
  let atributo;
  for (let index = 0; index < Reynas.length; index++) {
    c = document.getElementById(`Cuadro${Reynas[index][0]}`);
    atributo = c.getAttribute("class");
    Movimientos(Reynas[index][0], false);
    c.setAttribute("Class", atributo);
    c.disabled = false;
  }
}
// anuncia si ganaste o perdiste
