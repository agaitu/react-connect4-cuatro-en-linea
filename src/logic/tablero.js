export function validarGanador ({ partida, tablero, jugadorActual, fila, columna }) {
  const buscarValor = (fila, columna) => {
    if (fila < 0 || fila > partida.filas) return undefined
    if (columna < 0 || columna > partida.columnas) return undefined
    return tablero[fila * partida.columnas + columna]
  }

  // Buscar cuántas fichas seguidas hay en cada uno de los 8 sentidos. Deja de buscar cuando encuentra algo distinto.
  const direcciones = [0, 0, 0, 0, 0, 0, 0, 0]
  for (let i = 1; i < partida.paraGanar; i++) {
    if (direcciones[0] === i - 1 && buscarValor(fila + i, columna) === partida.jugadores[jugadorActual]) direcciones[0] = i
    if (direcciones[1] === i - 1 && buscarValor(fila - i, columna) === partida.jugadores[jugadorActual]) direcciones[1] = i

    if (direcciones[2] === i - 1 && buscarValor(fila, columna + i) === partida.jugadores[jugadorActual]) direcciones[2] = i
    if (direcciones[3] === i - 1 && buscarValor(fila, columna - i) === partida.jugadores[jugadorActual]) direcciones[3] = i

    if (direcciones[4] === i - 1 && buscarValor(fila + i, columna + i) === partida.jugadores[jugadorActual]) direcciones[4] = i
    if (direcciones[5] === i - 1 && buscarValor(fila - i, columna - i) === partida.jugadores[jugadorActual]) direcciones[5] = i

    if (direcciones[6] === i - 1 && buscarValor(fila - i, columna + i) === partida.jugadores[jugadorActual]) direcciones[6] = i
    if (direcciones[7] === i - 1 && buscarValor(fila + i, columna - i) === partida.jugadores[jugadorActual]) direcciones[7] = i
  }

  // Si en dos sentidos opuestos sumados, más la ficha que se acaba de poner, hay la cantidad necesaria, el partido terminó.
  if (direcciones[0] + direcciones[1] + 1 >= partida.paraGanar ||
      direcciones[2] + direcciones[3] + 1 >= partida.paraGanar ||
      direcciones[4] + direcciones[5] + 1 >= partida.paraGanar ||
      direcciones[6] + direcciones[7] + 1 >= partida.paraGanar) {
    return true
  }

  return false
}

export function crearTableroVacio (filas, columnas) {
  const t = []
  for (let i = 0; i < columnas * filas; i++) t.push('')
  return t
}
