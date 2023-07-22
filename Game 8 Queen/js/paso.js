//arreglo con las raynas colocadas

if (padre != null) {
  window.onload = crear;
}

//detecta el boton precionado

padre.addEventListener("click", (e) => {
  let valorBotton = e.target.value;
  colocarReyna(valorBotton);
  Ganador();
});

//reinicia el tablero de juego
function Reiniciar() {
  let c;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let valor = `${i}` + `${j}`;
      // console.log("-");
      c = document.getElementById(`Cuadro${valor}`);
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
}
function Ganador() {
  if (Reynas.length == 8) {
    window.alert("haz ganado");
  }
  let cantidad = Reynas.length;
  // console.log(cantidad + " -");

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let id = `${i}` + `${j}`;
      const c = document.getElementById(`Cuadro${id}`);
      if (c.disabled == true) {
        cantidad++;
      }
    }
  }
  // console.log(cantidad + " -");

  if (cantidad >= 64 && Reynas.length < 8) {
    window.alert("haz perdido");
  }
}
