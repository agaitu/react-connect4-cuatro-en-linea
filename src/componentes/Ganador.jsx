import './Ganador.css'

export function Ganador ({ quienGano, reiniciarPartido }) {
  return (
    <section className='dialogoganador'>
      <div className='textodialogo'>
        <h2>El juego ha terminado</h2>
        <header>Ganador: {quienGano}</header>
        <footer><button onClick={() => reiniciarPartido()}>Reiniciar</button></footer>
      </div>
    </section>
  )
}
