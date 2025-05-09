import { Link } from "react-router-dom"
import { ButtonMain } from '../buttons/button'

export function Error404() {
   return (
      <>
         <div className="flex flex-col gap-6 justify-center items-center">
            <div className="flex gap-16">
               <img src="/marketplace/images/errors/4.png" draggable="false" alt="Errors" />
               <img src="/marketplace/images/errors/0.png" draggable="false" alt="Errors" />
               <img src="/marketplace/images/errors/4.png" draggable="false" alt="Errors" />
            </div>
            <h1 className="text-4xl">Страница не найдена</h1>
            <Link to='/'><ButtonMain name='Продолжить покупки' /></Link>
         </div>
      </>
   )
}

export function Error500() {
   return (
      <>
         <div className="basket">
            <div className="flex gap-16">
               <img src="/marketplace/images/errors/5.png" draggable="false" alt="Errors" />
               <img src="/marketplace/images/errors/0.png" draggable="false" alt="Errors" />
               <img src="/marketplace/images/errors/0.png" draggable="false" alt="Errors" />
            </div>
            <h1 className="text-4xl mt-16">Ошибка сервера</h1>
            <Link to='/'><ButtonMain name='Продолжить покупки' /></Link>
         </div>
      </>
   )
}