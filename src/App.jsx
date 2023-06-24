import { useEffect, useState } from 'react'
import './App.css'
import { Celda } from './Celda'
import { crearTableroVacio, validarGanador } from './logic/tablero'
import { Ganador } from './componentes/Ganador'
import { CrearPartida } from './componentes/CrearPartida'

const tituloSegunCantidad = {
  3: 'Tres en línea',
  4: 'Cuatro en línea',
  5: 'Cinco en línea'
}

const partidaGuardada = JSON.parse(window.localStorage.getItem('partidaGuardada')) || { columnas: 10, filas: 8, jugadores: ['X', 'O'], paraGanar: 4 }

function App () {
  const [partida, setPartida] = useState(partidaGuardada)

  // Para que sea más sencillo leer los ídices.
  const Idx = (f, c) => f * partida.columnas + c
  const [tablero, setTablero] = useState(() => crearTableroVacio(partida.filas, partida.columnas))
  const [jugadorActual, setJugadorActual] = useState(0)
  const [ganador, setGanador] = useState(null)
  const estiloColumnas = { gridTemplateColumns: `repeat(${partida.columnas}, 1fr)` }

  useEffect(() => {
    reiniciarPartido()
  }, [partida])

  const reiniciarPartido = () => {
    const nuevoTablero = crearTableroVacio(partida.filas, partida.columnas)
    setTablero(nuevoTablero)
    setJugadorActual(0)
    setGanador(null)
  }

  const handleNuevaPartida = ({ nombre1, nombre2, cantidadParaGanar, filas, columnas }) => {
    setPartida({
      columnas, filas, jugadores: [nombre1, nombre2], paraGanar: cantidadParaGanar
    })
    console.log('por reiniciar')
    reiniciarPartido()
  }

  const marcarCasilla = (fila, columna) => {
    // Si ya ganó alguien, no seguir marcando.
    if (ganador) return

    // Actualizar tablero.
    const nuevoTablero = [...tablero]
    nuevoTablero[Idx(fila, columna)] = partida.jugadores[jugadorActual]
    setTablero(nuevoTablero)

    // Si la movida generó un ganador, notificarlo.
    if (validarGanador({ partida, tablero: nuevoTablero, jugadorActual, fila, columna })) {
      setGanador(partida.jugadores[jugadorActual])
    }

    // Cambiar el turno.
    setJugadorActual((jugadorActual + 1) % partida.jugadores.length)
  }

  const handleClick = (idx) => {
    const col = idx % partida.columnas

    for (let fil = partida.filas - 1; fil >= 0; fil--) {
      if (tablero[Idx(fil, col)] === '') {
        // Solo modificar el tablero si encontré un lugar en blanco.
        marcarCasilla(fil, col)
        return
      }
    }
  }

  return (
    <>
      <h1>{tituloSegunCantidad[partida.paraGanar]}</h1>

      <section className='tablero' style={estiloColumnas}>
        {
          tablero.map((_, idx) => {
            return (
              <Celda key={idx} index={idx} onClick={(cual) => handleClick(cual)}>
                {tablero[idx]}
              </Celda>
            )
          })
        }
      </section>
      {(
        ganador && (
          <Ganador quienGano={ganador} reiniciarPartido={reiniciarPartido} />
        )
      )}
      <CrearPartida notificarPartidaNueva={handleNuevaPartida} configuracionInicial={partida} />
    </>
  )
}

export default App
