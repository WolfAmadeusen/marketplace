import './button.css'

export function ButtonMain({ name }) {
   return (
      <button className="button">{name}</button>
   )
}

export function ButtonProduct({ name, onClick="" }) {
   return <button className="ButtonProduct" onClick={onClick}>{name}</button>
}

export function ButtonL({ name }) {
   return <button className='ButtonL'>{name}</button>
}