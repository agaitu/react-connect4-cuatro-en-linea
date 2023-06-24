export const Celda = ({ children, index, onClick }) => {
  return (
    <div className='celda' onClick={() => onClick(index)}>{children}</div>
  )
}
