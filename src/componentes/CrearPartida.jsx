import { useId, useState } from 'react'
import './CrearPartida.css'
import { GearIcon } from './Iconos.jsx'

export function CrearPartida ({ configuracionInicial, notificarPartidaNueva }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    const fields = new FormData(event.target)
    const nombre1 = fields.get('nombre1')
    const nombre2 = fields.get('nombre2')
    const cantidadParaGanar = fields.get('cantidadParaGanar')
    const filas = fields.get('filas')
    const columnas = fields.get('columnas')

    notificarPartidaNueva({ nombre1, nombre2, cantidadParaGanar, filas, columnas })
  }

  const [jugador1, setJugador1] = useState(configuracionInicial.jugadores[0])
  const [jugador2, setJugador2] = useState(configuracionInicial.jugadores[1])
  const [paraGanar, setParaGanar] = useState(configuracionInicial.paraGanar)
  const [columnas, setColumnas] = useState(configuracionInicial.columnas)
  const [filas, setFilas] = useState(configuracionInicial.filas)
  const idJugador1 = useId()
  const idJugador2 = useId()
  const idCantidadParaGanar = useId()
  const idFilas = useId()
  const idColumnas = useId()

  const idConfigurar = useId()

  return (
    <>
      <label className='abrirDialogoCrearPartida' htmlFor={idConfigurar}>
        <GearIcon />
      </label>
      <input type='checkbox' id={idConfigurar} hidden />
      <aside className='dialogoCrearPartida'>
        <form onSubmit={handleSubmit}>
          <div className='dialogoContenido'>
            <h2>Crear nueva partida</h2>
            <div>
              <label htmlFor={idJugador1}>Nombre del jugador 1</label>
              <input type='text' id={idJugador1} name='nombre1' placeholder='Jugador 1' onChange={(v) => setJugador1(v.target.value)} value={jugador1} required />
            </div>
            <div>
              <label htmlFor={idJugador2}>Nombre del jugador 2</label>
              <input type='text' id={idJugador2} name='nombre2' placeholder='Jugador 2' onChange={(v) => setJugador2(v.target.value)} value={jugador2} required />
            </div>
            <div>
              <label htmlFor={idCantidadParaGanar}>Cantidad en línea para ganar: {paraGanar}</label>
              <input type='range' id={idCantidadParaGanar} min='3' max='5' value={paraGanar} name='cantidadParaGanar' onChange={(v) => setParaGanar(v.target.value)} />
            </div>
            <div>
              <label htmlFor={idFilas}>Filas: {filas}</label>
              <input type='range' id={idFilas} min='4' max='10' name='filas' value={filas} onChange={(v) => setFilas(v.target.value)} />
            </div>
            <div>
              <label htmlFor={idColumnas}>Columnas: {columnas}</label>
              <input type='range' id={idColumnas} min='4' max='10' name='columnas' value={columnas} onChange={(v) => setColumnas(v.target.value)} />
            </div>
            <button>Aplicar</button>
          </div>
        </form>
      </aside>
    </>
  )
}
